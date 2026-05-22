<template>
  <view class="dynamic">
    <view class="empty">
      <text class="iconfont icon-shijian empty__icon" />
      <text class="empty__title">动态</text>
      <text class="empty__hint">该入口已合并到底部 Tab 的「动态」页。</text>
      <view class="empty__btn" @click="back">
        <text>返回动态</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
function back() {
  uni.reLaunch({ url: '/pages/main/index' })
}
</script>

<style lang="scss" scoped>
.dynamic {
  min-height: 100vh;
  background-color: $gsy-container;
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

  &__icon { color: $gsy-theme-color; font-size: 96rpx; margin-bottom: 20rpx; }
  &__title { color: $gsy-theme-color; font-size: 32rpx; font-weight: bold; margin-bottom: 12rpx; }
  &__hint { color: $gsy-gray; font-size: 26rpx; text-align: center; line-height: 1.6; }
  &__btn {
    margin-top: 24rpx;
    background: $gsy-theme-color;
    color: #ffffff;
    padding: 16rpx 32rpx;
    border-radius: 8rpx;
    font-size: 26rpx;
  }
  &__btn text { color: #ffffff; }
}
</style>
