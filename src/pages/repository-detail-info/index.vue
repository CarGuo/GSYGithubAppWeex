<template>
  <view class="readme">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">仓库简介</text>
      <view class="navbar__action" @click="openWeb">
        <text class="wxcIconFont navbar__icon">&#xea0a;</text>
      </view>
    </view>

    <web-view
      v-if="srcdoc"
      :webview-styles="webviewStyles"
      :update-title="false"
      :src="dataUri"
    ></web-view>
    <view v-else-if="loading" class="readme__hint"><text>加载中…</text></view>
    <view v-else class="readme__hint">
      <text>未能加载 README</text>
      <view class="readme__link" @click="openWeb">
        <text class="readme__link-text">在 GitHub 查看</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'
import { generateHtml } from '@/utils/htmlUtils'

const owner = ref('')
const name = ref('')
const srcdoc = ref('')
const loading = ref(false)
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

const webviewStyles = {
  progress: { color: '#3c3f41' }
}

const dataUri = computed(() => {
  if (!srcdoc.value) return ''
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(srcdoc.value)
})

async function load() {
  if (!owner.value || !name.value) return
  loading.value = true
  try {
    const url = Address.getReposReadme(owner.value, name.value)
    const res = await http.getFetch<string>(url, { Accept: 'application/vnd.github.html' })
    if (res.result && typeof res.data === 'string' && res.data.length > 0) {
      srcdoc.value = generateHtml(res.data)
    }
  } catch {
    // ignore
  } finally {
    loading.value = false
  }
}

function openWeb() {
  const url = `https://github.com/${owner.value}/${name.value}#readme`
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}

function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  load()
})
</script>

<style lang="scss" scoped>
.readme {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
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
  &__action {
    position: absolute;
    right: 0;
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

.readme__hint {
  text-align: center;
  color: $gsy-gray;
  padding: 60rpx 0;
}
.readme__link {
  margin-top: 30rpx;
  text-align: center;
}
.readme__link-text {
  color: $gsy-action-blue;
  font-size: 28rpx;
}
</style>
