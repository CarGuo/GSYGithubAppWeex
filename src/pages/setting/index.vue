<template>
  <view class="setting">
    <view class="setting__list">
      <view class="setting__item">
        <text class="setting__item-title">版本</text>
        <text class="setting__item-value">{{ version }}</text>
      </view>
      <view class="setting__item">
        <text class="setting__item-title">登录账号</text>
        <text class="setting__item-value">{{ userStore.userInfo?.login || '未登录' }}</text>
      </view>
      <view class="setting__item" @click="openProject">
        <text class="setting__item-title">项目主页</text>
        <text class="setting__item-arrow">›</text>
      </view>
      <view v-if="userStore.userInfo" class="setting__item setting__item--danger" @click="onLogout">
        <text class="setting__item-title">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { APP_VERSION } from '@/config'

const userStore = useUserStore()
const version = APP_VERSION

function openProject() {
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent('https://github.com/CarGuo/GSYGithubAppWeex')}` })
}

async function onLogout() {
  await userStore.logout()
  uni.showToast({ title: '已退出登录', icon: 'none' })
  setTimeout(() => uni.reLaunch({ url: '/pages/login/index' }), 400)
}
</script>

<style lang="scss" scoped>
.setting {
  min-height: 100vh;
  background-color: $gsy-container;
  padding: 24rpx;

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
    &--danger .setting__item-title { color: #d8534f; }
  }
  &__item-title { color: $gsy-theme-color; font-size: 28rpx; }
  &__item-value { color: $gsy-gray; font-size: 26rpx; }
  &__item-arrow { color: $gsy-gray; font-size: 32rpx; }
}
</style>
