<template>
  <view class="readme">
    <view v-if="loading" class="readme__hint"><text>加载中…</text></view>
    <template v-else-if="!content">
      <view class="readme__hint"><text>未能加载 README</text></view>
      <view class="card-white-wrapper readme__menu" @click="openWeb">
        <text class="content-text-black-bold">在 GitHub 查看</text>
        <text class="readme__arrow">›</text>
      </view>
    </template>
    <template v-else>
      <view class="card-white-wrapper readme__card">
        <text class="readme__title">{{ fileName || 'README' }}</text>
        <text class="content-text-gray readme__body">{{ content }}</text>
      </view>
      <view class="card-white-wrapper readme__menu" @click="openWeb">
        <text class="content-text-black-bold">在 GitHub 查看完整 README</text>
        <text class="readme__arrow">›</text>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface ReadmeRes {
  content: string
  encoding: string
  name?: string
  html_url?: string
  download_url?: string
}

const owner = ref('')
const name = ref('')
const content = ref('')
const fileName = ref('')
const htmlUrl = ref('')
const loading = ref(false)

function decodeBase64(b64: string): string {
  const cleaned = b64.replace(/\s+/g, '')
  try {
    if (typeof atob === 'function') {
      const binary = atob(cleaned)
      try {
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
        return new TextDecoder('utf-8').decode(bytes)
      } catch {
        return decodeURIComponent(escape(binary))
      }
    }
  } catch {
    // ignore
  }
  return cleaned
}

async function load() {
  if (!owner.value || !name.value) return
  loading.value = true
  try {
    const res = await http.getFetch<ReadmeRes>(Address.getReposReadme(owner.value, name.value))
    if (res.result && typeof res.data === 'object') {
      const r = res.data as ReadmeRes
      fileName.value = r.name || 'README'
      htmlUrl.value = r.html_url || ''
      if (r.encoding === 'base64' && typeof r.content === 'string') {
        content.value = decodeBase64(r.content)
      } else if (typeof r.content === 'string') {
        content.value = r.content
      }
    }
  } finally {
    loading.value = false
  }
}

function openWeb() {
  const url = htmlUrl.value || `https://github.com/${owner.value}/${name.value}#readme`
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  load()
})
</script>

<style lang="scss" scoped>
.readme {
  min-height: 100vh;
  background-color: $gsy-container;
  padding: 24rpx;

  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 48rpx 0;
  }
  &__card {
    margin-bottom: 16rpx;
  }
  &__title {
    color: $gsy-theme-color;
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
  &__body {
    display: block;
    line-height: 1.6;
    word-break: break-word;
    white-space: pre-wrap;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 26rpx;
  }
  &__menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;
  }
  &__arrow {
    color: $gsy-gray;
    font-size: 36rpx;
  }
}
</style>
