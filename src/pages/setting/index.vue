<template>
  <view class="setting">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">设置</text>
    </view>
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
        <text class="setting__item-title">关于</text>
        <text class="wxcIconFont setting__item-arrow">&#xe610;</text>
      </view>
    </view>
    <view v-if="userStore.userInfo" class="setting__btn-row">
      <view class="setting__btn" @click="onLogout">
        <text class="setting__btn-text">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { APP_VERSION } from '@/config'

const userStore = useUserStore()
const version = APP_VERSION
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}

function openProject() {
  uni.navigateTo({
    url: `/pages/repository-detail/index?owner=CarGuo&name=GSYGithubAppWeex`
  })
}

async function onLogout() {
  await userStore.logout()
  uni.showToast({ title: '已退出登录', icon: 'none' })
  setTimeout(() => uni.reLaunch({ url: '/pages/login/index' }), 400)
}
</script>

<style lang="scss" scoped>
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
.setting {
  min-height: 100vh;
  background-color: $gsy-container;

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
    border-bottom: 1rpx solid $gsy-mi-white;
    &:last-child { border-bottom: none; }
  }
  &__item-title { color: $gsy-theme-color; font-size: 28rpx; }
  &__item-value { color: $gsy-gray; font-size: 26rpx; }
  &__item-arrow { color: $gsy-gray; font-size: 32rpx; }
  &__btn-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40rpx;
  }
  &__btn {
    width: 650rpx;
    height: 88rpx;
    background-color: #d8534f;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__btn-text {
    color: #ffffff;
    font-size: 30rpx;
  }
}
</style>
