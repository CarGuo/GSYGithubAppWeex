<template>
  <view class="main">
    <view class="navbar">
      <text class="navbar__title">动态</text>
      <view class="navbar__action">
        <text class="iconfont icon-sousuo navbar__icon" />
      </view>
    </view>
    <scroll-view class="main__scroll" scroll-y>
      <view class="empty">
        <text class="iconfont icon-shijian empty__icon" />
        <text class="empty__title">动态流</text>
        <text class="empty__hint">登录后将展示个人动态。完整列表迁移自旧工程
DynamicPage.vue（已纳入下个迭代）。</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onShow(async () => {
  await userStore.restore()
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $gsy-container;
}

.navbar {
  position: relative;
  width: 100%;
  height: 88rpx;
  background-color: $gsy-theme-color;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $gsy-box-shadow;

  &__title {
    color: #ffffff;
    font-size: 34rpx;
    font-weight: bold;
  }

  &__action {
    position: absolute;
    right: 24rpx;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }

  &__icon {
    color: #ffffff;
    font-size: 36rpx;
  }
}

.main__scroll {
  flex: 1;
  width: 100%;
}

.empty {
  margin: 60rpx auto;
  width: 700rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 60rpx 30rpx;
  box-shadow: $gsy-box-shadow;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon {
    color: $gsy-theme-color;
    font-size: 96rpx;
    margin-bottom: 20rpx;
  }
  &__title {
    color: $gsy-theme-color;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 12rpx;
  }
  &__hint {
    color: $gsy-gray;
    font-size: 26rpx;
    text-align: center;
    line-height: 1.6;
  }
}
</style>
