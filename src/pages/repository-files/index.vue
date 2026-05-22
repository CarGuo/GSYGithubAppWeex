<template>
  <view class="files">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">{{ name || '文件' }}</text>
    </view>

    <scroll-view
      class="files__crumb"
      scroll-x="true"
      :show-scrollbar="false"
    >
      <view class="files__crumb-row">
        <view
          v-for="(seg, idx) in headerList"
          :key="idx"
          class="files__crumb-item"
          @click="onCrumbClick(idx)"
        >
          <text class="files__crumb-text">{{ seg }} &gt;</text>
        </view>
      </view>
    </scroll-view>

    <view v-if="loading && !list.length" class="files__hint"><text>加载中…</text></view>
    <view v-else-if="!loading && !list.length" class="files__hint"><text>该目录为空</text></view>

    <view
      v-for="(it, index) in list"
      :key="it.sha || it.path"
      class="card-white-wrapper files__row"
      @click="onItem(index)"
    >
      <text class="wxcIconFont files__icon">{{ it.type !== 'file' ? '\ue793' : '\uea77' }}</text>
      <text class="content-text-gray text-line-one files__name">{{ it.name }}</text>
      <text v-if="it.type !== 'file'" class="wxcIconFont files__arrow">&#xe610;</text>
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
const headerList = ref<string[]>(['.'])
const list = ref<ContentItem[]>([])
const loading = ref(false)
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}

function currentPath(): string {
  if (headerList.value.length <= 1) return ''
  return headerList.value.slice(1).join('/')
}

async function load() {
  if (!owner.value || !name.value) return
  loading.value = true
  list.value = []
  try {
    const url = Address.getReposContent(owner.value, name.value, currentPath(), branch.value)
    const res = await http.getFetch<ContentItem[] | ContentItem>(url)
    if (res.result && res.data) {
      const data = res.data as ContentItem[] | ContentItem
      list.value = Array.isArray(data) ? data : [data]
    }
  } finally {
    loading.value = false
  }
}

function onItem(index: number) {
  if (loading.value) return
  const it = list.value[index]
  if (!it) return
  if (it.type === 'file') {
    const path = currentPath() ? `${currentPath()}/${it.name}` : it.name
    const url = `/pages/code-detail/index?owner=${owner.value}&name=${name.value}&path=${encodeURIComponent(path)}&branch=${encodeURIComponent(branch.value)}&title=${encodeURIComponent(it.name)}`
    uni.navigateTo({ url })
  } else {
    headerList.value.push(it.name)
    load()
  }
}

function onCrumbClick(idx: number) {
  if (loading.value) return
  if (headerList.value[idx] === '.') {
    headerList.value = ['.']
  } else {
    headerList.value = headerList.value.slice(0, idx + 1)
  }
  load()
}

onBackPress(() => {
  if (headerList.value.length > 1) {
    headerList.value.pop()
    load()
    return true
  }
  return false
})

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  branch.value = q?.branch || ''
  load()
})
</script>

<style lang="scss" scoped>
.files {
  min-height: 100vh;
  background-color: $gsy-container;
}
.navbar {
  position: relative;
  width: 100%;
  height: 100rpx;
  background-color: $gsy-theme-color;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $gsy-box-shadow;
  box-sizing: content-box;
  &__title {
    color: #ffffff;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 100rpx;
  }
  &__back {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100rpx;
    width: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__icon {
    color: #ffffff;
    font-size: 40rpx;
  }
}
.files {

  &__crumb {
    width: 100%;
    height: 80rpx;
    background-color: $gsy-mi-white;
    white-space: nowrap;
  }
  &__crumb-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80rpx;
    padding: 0 20rpx;
  }
  &__crumb-item {
    height: 80rpx;
    padding: 0 6rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__crumb-text {
    color: $gsy-theme-color;
    font-size: 28rpx;
    margin-left: 15rpx;
    height: 70rpx;
    line-height: 70rpx;
  }

  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 48rpx 0;
  }

  &__row {
    height: 80rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__icon {
    color: $gsy-theme-color;
    font-size: 30rpx;
  }
  &__name {
    margin-left: 20rpx;
    flex: 1;
  }
  &__arrow {
    color: $gsy-theme-color;
    font-size: 30rpx;
  }
}
</style>
