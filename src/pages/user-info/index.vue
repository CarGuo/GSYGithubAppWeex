<template>
  <view class="user">
    <view v-if="loading" class="user__hint"><text>加载中…</text></view>
    <view v-else-if="!info" class="user__hint"><text>未能获取用户</text></view>
    <view v-else>
      <view class="user__header">
        <image class="user__avatar" :src="info.avatar_url" mode="aspectFill" />
        <text class="user__login">{{ info.login }}</text>
        <text v-if="info.name" class="user__name">{{ info.name }}</text>
        <text v-if="info.bio" class="user__bio">{{ info.bio }}</text>
        <view class="user__counter">
          <view class="user__counter-item">
            <text class="user__counter-num">{{ info.public_repos ?? 0 }}</text>
            <text class="user__counter-label">仓库</text>
          </view>
          <view class="user__counter-item">
            <text class="user__counter-num">{{ info.followers ?? 0 }}</text>
            <text class="user__counter-label">关注者</text>
          </view>
          <view class="user__counter-item">
            <text class="user__counter-num">{{ info.following ?? 0 }}</text>
            <text class="user__counter-label">关注中</text>
          </view>
        </view>
      </view>

      <view class="user__list">
        <view class="user__item" @click="openWeb(info.html_url)">
          <text class="user__item-title">在 GitHub 打开</text>
          <text class="user__item-arrow">›</text>
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

interface UserInfo {
  login: string
  name?: string
  bio?: string
  avatar_url: string
  html_url: string
  public_repos?: number
  followers?: number
  following?: number
}

const info = ref<UserInfo | null>(null)
const loading = ref(false)

onLoad(async (q: Record<string, string> | undefined) => {
  const login = q?.login
  if (!login) return
  uni.setNavigationBarTitle({ title: login })
  loading.value = true
  try {
    const res = await http.getFetch<UserInfo>(Address.getUser(login))
    if (res.result && typeof res.data === 'object' && res.data !== null) {
      info.value = res.data as UserInfo
    }
  } finally {
    loading.value = false
  }
})

function openWeb(url: string) {
  if (!url) return
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}
</script>

<style lang="scss" scoped>
.user {
  min-height: 100vh;
  background-color: $gsy-container;

  &__hint { text-align: center; color: $gsy-gray; padding: 80rpx 0; }
  &__header {
    background-color: $gsy-theme-color;
    padding: 60rpx 30rpx 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    border: 4rpx solid #ffffff;
    background: $gsy-mi-white;
    margin-bottom: 16rpx;
  }
  &__login { color: #ffffff; font-size: 34rpx; font-weight: 600; }
  &__name { color: $gsy-mi-white; font-size: 26rpx; margin-top: 8rpx; }
  &__bio {
    color: $gsy-mi-white;
    font-size: 24rpx;
    margin-top: 8rpx;
    text-align: center;
    padding: 0 32rpx;
  }
  &__counter {
    display: flex;
    flex-direction: row;
    margin-top: 24rpx;
    width: 100%;
    justify-content: space-around;
  }
  &__counter-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__counter-num { color: #ffffff; font-size: 30rpx; font-weight: 600; }
  &__counter-label { color: $gsy-mi-white; font-size: 22rpx; margin-top: 4rpx; }

  &__list {
    margin: 24rpx;
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
  }
  &__item-title { color: $gsy-theme-color; font-size: 28rpx; }
  &__item-arrow { color: $gsy-gray; font-size: 32rpx; }
}
</style>
