<template>
  <view class="welcome">
    <image class="welcome__bg" :src="welcomeImg" mode="aspectFill" />
    <view class="welcome__overlay">
      <text class="welcome__version">v{{ version }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { APP_VERSION } from '@/config'
import { useUserStore } from '@/stores/user'
import welcomeImg from '@/static/welcome.png'

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
  }, 1500)
})
</script>

<style lang="scss" scoped>
.welcome {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $gsy-theme-color;
  overflow: hidden;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__overlay {
    position: absolute;
    bottom: 60rpx;
    left: 0;
    right: 0;
    text-align: center;
  }

  &__version {
    color: rgba(255, 255, 255, 0.85);
    font-size: 26rpx;
  }
}
</style>
