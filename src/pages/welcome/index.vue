<template>
  <view class="welcome">
    <image class="welcome__logo" src="/static/logo.png" mode="aspectFit" />
    <text class="welcome__title">GSY GitHub App</text>
    <text class="welcome__subtitle">uni-app 版 · v{{ version }}</text>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { APP_VERSION } from '@/config'
import { useUserStore } from '@/stores/user'

const version = APP_VERSION

onLoad(async () => {
  const user = useUserStore()
  await user.restore()
  setTimeout(() => {
    if (user.isLoggedIn) {
      uni.switchTab({ url: '/pages/main/index' })
    } else {
      uni.redirectTo({ url: '/pages/login/index' })
    }
  }, 800)
})
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, #2196f3 0%, #1976d2 100%);

  &__logo {
    width: 140rpx;
    height: 140rpx;
    margin-bottom: 32rpx;
  }

  &__title {
    color: #fff;
    font-size: 44rpx;
    font-weight: 600;
    margin-bottom: 12rpx;
  }

  &__subtitle {
    color: rgba(255, 255, 255, 0.85);
    font-size: 26rpx;
  }
}
</style>
