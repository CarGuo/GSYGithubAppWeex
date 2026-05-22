<template>
  <view class="code">
    <view class="card-white-wrapper code__head">
      <text class="code__path">{{ filePath }}</text>
      <text class="code__meta">{{ metaText }}</text>
    </view>

    <view v-if="loading" class="code__hint"><text>加载中…</text></view>

    <template v-else-if="content">
      <view class="card-white-full-wrapper code__body">
        <text class="code__pre">{{ content }}</text>
      </view>
      <view class="card-white-wrapper code__menu" @click="openWeb">
        <text class="content-text-black-bold">在 GitHub 查看</text>
        <text class="code__arrow">›</text>
      </view>
    </template>

    <template v-else-if="errorMsg">
      <view class="card-white-wrapper code__warn">
        <text class="code__warn-text">{{ errorMsg }}</text>
      </view>
      <view class="card-white-wrapper code__menu" @click="openWeb">
        <text class="content-text-black-bold">在 GitHub 查看</text>
        <text class="code__arrow">›</text>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface FileRes {
  name: string
  path: string
  size: number
  type: string
  encoding?: string
  content?: string
  html_url?: string
  download_url?: string
}

const owner = ref('')
const name = ref('')
const branch = ref('')
const filePath = ref('')
const content = ref('')
const fileSize = ref(0)
const htmlUrl = ref('')
const errorMsg = ref('')
const loading = ref(false)

const MAX_RENDER_BYTES = 512 * 1024

const metaText = computed(() => {
  if (!fileSize.value) return ''
  if (fileSize.value < 1024) return `${fileSize.value} B`
  if (fileSize.value < 1024 * 1024) return `${(fileSize.value / 1024).toFixed(1)} KB`
  return `${(fileSize.value / 1024 / 1024).toFixed(2)} MB`
})

function decodeBase64(b64: string): string {
  const cleaned = b64.replace(/\s+/g, '')
  if (typeof atob !== 'function') return cleaned
  try {
    const binary = atob(cleaned)
    try {
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
      return new TextDecoder('utf-8', { fatal: false }).decode(bytes)
    } catch {
      return decodeURIComponent(escape(binary))
    }
  } catch {
    return ''
  }
}

function looksBinary(text: string): boolean {
  if (!text) return false
  const sample = text.slice(0, 4096)
  let suspicious = 0
  for (let i = 0; i < sample.length; i++) {
    const code = sample.charCodeAt(i)
    if (code === 0) return true
    if (code === 0xfffd) suspicious++
  }
  return suspicious > sample.length * 0.02
}

async function load() {
  if (!owner.value || !name.value || !filePath.value) return
  loading.value = true
  errorMsg.value = ''
  try {
    const url = Address.getReposFileContent(owner.value, name.value, filePath.value, branch.value)
    const res = await http.getFetch<FileRes>(url)
    if (!res.result || typeof res.data !== 'object') {
      errorMsg.value = '加载失败'
      return
    }
    const r = res.data as FileRes
    fileSize.value = r.size || 0
    htmlUrl.value = r.html_url || ''

    if (r.size && r.size > MAX_RENDER_BYTES) {
      errorMsg.value = '文件较大（>512 KB），未在客户端渲染，建议在 GitHub 查看。'
      return
    }
    if (r.encoding === 'base64' && typeof r.content === 'string') {
      const text = decodeBase64(r.content)
      if (!text) {
        errorMsg.value = '无法解码该文件，可能是二进制文件。'
        return
      }
      if (looksBinary(text)) {
        errorMsg.value = '检测到二进制文件，未在客户端渲染。'
        return
      }
      content.value = text
    } else if (typeof r.content === 'string') {
      content.value = r.content
    } else {
      errorMsg.value = '该文件没有可显示的内容。'
    }
  } catch {
    errorMsg.value = '加载失败'
  } finally {
    loading.value = false
  }
}

function openWeb() {
  const url = htmlUrl.value
    || `https://github.com/${owner.value}/${name.value}/blob/${branch.value || 'HEAD'}/${filePath.value}`
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  branch.value = q?.branch || ''
  filePath.value = decodeURIComponent(q?.path || '')
  uni.setNavigationBarTitle({ title: filePath.value.split('/').pop() || '代码' })
  load()
})
</script>

<style lang="scss" scoped>
.code {
  min-height: 100vh;
  background-color: $gsy-container;
  padding: 16rpx 16rpx 40rpx;

  &__head {
    margin-bottom: 12rpx;
    display: flex;
    flex-direction: column;
  }
  &__path {
    color: $gsy-theme-color;
    font-size: 28rpx;
    font-weight: 600;
    word-break: break-all;
  }
  &__meta {
    color: $gsy-gray;
    font-size: 22rpx;
    margin-top: 6rpx;
  }
  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 48rpx 0;
  }
  &__body {
    margin-bottom: 12rpx;
    padding: 16rpx;
    overflow: auto;
  }
  &__pre {
    display: block;
    line-height: 1.55;
    word-break: break-all;
    white-space: pre-wrap;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 24rpx;
    color: $gsy-theme-color;
  }
  &__warn {
    margin-bottom: 12rpx;
  }
  &__warn-text {
    color: $gsy-gray;
    font-size: 26rpx;
    line-height: 1.6;
  }
  &__menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__arrow {
    color: $gsy-gray;
    font-size: 36rpx;
  }
}
</style>
