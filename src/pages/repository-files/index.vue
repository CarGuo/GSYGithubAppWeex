<template>
  <view class="files">
    <view class="files__crumb card-white-wrapper">
      <text class="files__crumb-repo">{{ owner }}/{{ name }}</text>
      <text class="files__crumb-sep" v-if="branch"> · </text>
      <text class="files__crumb-branch" v-if="branch">{{ branch }}</text>
    </view>
    <view class="files__crumb card-white-wrapper" v-if="path">
      <text class="files__crumb-path">/{{ path }}</text>
    </view>

    <view v-if="loading" class="files__hint"><text>加载中…</text></view>
    <view v-else-if="!list.length" class="files__hint"><text>该目录为空</text></view>

    <view
      v-for="it in list"
      :key="it.sha || it.path"
      class="card-white-wrapper files__row"
      @click="onItem(it)"
    >
      <text
        class="iconfont files__icon"
        :class="it.type === 'dir' ? 'files__icon--dir' : 'files__icon--file'"
      >{{ it.type === 'dir' ? '\ue6e1' : '\ue63e' }}</text>
      <view class="files__meta">
        <text class="name-text-theme">{{ it.name }}</text>
        <text class="content-text-gray files__sub">{{ subTextOf(it) }}</text>
      </view>
      <text class="files__arrow">›</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onBackPress } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface ContentItem {
  name: string
  path: string
  sha: string
  size: number
  type: 'dir' | 'file' | 'symlink' | 'submodule'
  download_url?: string | null
  html_url?: string
}

const owner = ref('')
const name = ref('')
const branch = ref('')
const path = ref('')
const list = ref<ContentItem[]>([])
const loading = ref(false)
const pathStack = ref<string[]>([])

function subTextOf(it: ContentItem): string {
  if (it.type === 'dir') return '目录'
  if (it.type === 'submodule') return 'submodule'
  if (it.type === 'symlink') return 'symlink'
  if (typeof it.size === 'number' && it.size >= 0) {
    if (it.size < 1024) return `${it.size} B`
    if (it.size < 1024 * 1024) return `${(it.size / 1024).toFixed(1)} KB`
    return `${(it.size / 1024 / 1024).toFixed(2)} MB`
  }
  return '文件'
}

async function load(targetPath: string) {
  loading.value = true
  list.value = []
  try {
    const url = Address.getReposContent(owner.value, name.value, targetPath, branch.value)
    const res = await http.getFetch<ContentItem[] | ContentItem>(url)
    if (res.result && res.data) {
      const data = res.data as ContentItem[] | ContentItem
      const arr = Array.isArray(data) ? data : [data]
      arr.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name)
        return a.type === 'dir' ? -1 : 1
      })
      list.value = arr
    }
  } finally {
    loading.value = false
  }
  uni.setNavigationBarTitle({ title: targetPath ? `/${targetPath}` : `${owner.value}/${name.value}` })
}

function onItem(it: ContentItem) {
  if (it.type === 'dir') {
    pathStack.value.push(path.value)
    path.value = it.path
    load(path.value)
  } else if (it.type === 'file') {
    const url = `/pages/code-detail/index?owner=${owner.value}&name=${name.value}&path=${encodeURIComponent(it.path)}&branch=${encodeURIComponent(branch.value)}`
    uni.navigateTo({ url })
  } else if (it.type === 'symlink' && it.download_url) {
    uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(it.download_url)}` })
  } else if (it.html_url) {
    uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(it.html_url)}` })
  }
}

onBackPress(() => {
  if (pathStack.value.length > 0) {
    const prev = pathStack.value.pop() ?? ''
    path.value = prev
    load(prev)
    return true
  }
  return false
})

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  branch.value = q?.branch || ''
  path.value = q?.path || ''
  load(path.value)
})
</script>

<style lang="scss" scoped>
.files {
  min-height: 100vh;
  background-color: $gsy-container;
  padding: 16rpx 16rpx 40rpx;

  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 48rpx 0;
  }

  &__crumb {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 12rpx;
  }
  &__crumb-repo {
    color: $gsy-theme-color;
    font-weight: 600;
    font-size: 28rpx;
  }
  &__crumb-sep {
    color: $gsy-gray;
    font-size: 26rpx;
    margin: 0 8rpx;
  }
  &__crumb-branch {
    color: $gsy-action-blue;
    font-size: 26rpx;
  }
  &__crumb-path {
    color: $gsy-gray;
    font-size: 26rpx;
    word-break: break-all;
  }

  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12rpx;
  }
  &__icon {
    font-size: 36rpx;
    width: 56rpx;
    text-align: center;
    margin-right: 16rpx;
    &--dir {
      color: $gsy-action-blue;
    }
    &--file {
      color: $gsy-gray;
    }
  }
  &__meta {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__sub {
    margin-top: 4rpx;
    font-size: 22rpx;
  }
  &__arrow {
    color: $gsy-gray;
    font-size: 36rpx;
    margin-left: 8rpx;
  }
}
</style>
