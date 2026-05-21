<template>
  <view class="repo">
    <view v-if="loading" class="repo__hint"><text>加载中…</text></view>
    <view v-else-if="!data" class="repo__hint"><text>未能获取仓库</text></view>
    <view v-else>
      <view class="repo__header">
        <view class="repo__title-row">
          <text class="repo__author">{{ data.owner.login }} /</text>
          <text class="repo__name">{{ data.name }}</text>
        </view>
        <text class="repo__desc">{{ data.description || '无描述' }}</text>
        <view class="repo__meta">
          <text v-if="data.language" class="repo__tag">{{ data.language }}</text>
          <text class="iconfont icon-star repo__meta-icon" />
          <text class="repo__meta-item">{{ data.stargazers_count }}</text>
          <text class="iconfont icon-xing repo__meta-icon" />
          <text class="repo__meta-item">{{ data.forks_count }}</text>
          <text class="iconfont icon-pinglun repo__meta-icon" />
          <text class="repo__meta-item">{{ data.open_issues_count }}</text>
        </view>
      </view>

      <view class="repo__list">
        <view class="repo__item" @click="openIssues">
          <text class="repo__item-title">Issues</text>
          <text class="repo__item-arrow">›</text>
        </view>
        <view class="repo__item" @click="openWeb(data.html_url)">
          <text class="repo__item-title">在 GitHub 打开</text>
          <text class="repo__item-arrow">›</text>
        </view>
        <view v-if="data.homepage" class="repo__item" @click="openWeb(data.homepage)">
          <text class="repo__item-title">主页</text>
          <text class="repo__item-arrow">›</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface RepoDetail {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  html_url: string
  homepage?: string | null
  owner: { login: string }
}

const data = ref<RepoDetail | null>(null)
const loading = ref(false)
const owner = ref('')
const name = ref('')

onLoad(async (q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  if (!owner.value || !name.value) return
  uni.setNavigationBarTitle({ title: `${owner.value}/${name.value}` })
  loading.value = true
  try {
    const res = await http.getFetch<RepoDetail>(Address.getReposDetail(owner.value, name.value))
    if (res.result && typeof res.data === 'object' && res.data !== null) {
      data.value = res.data as RepoDetail
    }
  } finally {
    loading.value = false
  }
})

function openIssues() {
  uni.navigateTo({ url: `/pages/repository-issues/index?owner=${owner.value}&name=${name.value}` })
}
function openWeb(url: string) {
  if (!url) return
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}
</script>

<style lang="scss" scoped>
.repo {
  padding: 24rpx;
  min-height: 100vh;
  background-color: $gsy-container;

  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 80rpx 0;
  }
  &__header {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 24rpx;
    box-shadow: $gsy-box-shadow;
    margin-bottom: 24rpx;
  }
  &__title-row { display: flex; flex-direction: row; }
  &__author { color: $gsy-action-blue; margin-right: 8rpx; font-weight: 600; font-size: 30rpx; }
  &__name { color: $gsy-theme-color; font-weight: 600; font-size: 30rpx; }
  &__desc {
    display: block;
    color: $gsy-gray;
    font-size: 26rpx;
    margin: 16rpx 0;
    line-height: 1.6;
  }
  &__meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  &__tag {
    background: $gsy-mi-white;
    color: $gsy-theme-color;
    font-size: 22rpx;
    padding: 2rpx 10rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
  }
  &__meta-icon {
    color: $gsy-theme-color;
    font-size: 24rpx;
    margin-right: 4rpx;
  }
  &__meta-item {
    color: $gsy-gray;
    font-size: 24rpx;
    margin-right: 16rpx;
  }
  &__list {
    background: #ffffff;
    border-radius: 10rpx;
    box-shadow: $gsy-box-shadow;
    overflow: hidden;
  }
  &__item {
    padding: 28rpx 24rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid $gsy-mi-white;
    &:last-child { border-bottom: none; }
  }
  &__item-title { color: $gsy-theme-color; font-size: 28rpx; }
  &__item-arrow { color: $gsy-gray; font-size: 32rpx; }
}
</style>
