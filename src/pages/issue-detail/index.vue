<template>
  <view class="placeholder">
    <view class="placeholder__card">
      <text class="iconfont icon-pinglun placeholder__icon" />
      <text class="placeholder__title">Issue 详情</text>
      <text class="placeholder__hint">基础信息见上一页 Issues 列表，详情页将在下个迭代补全。</text>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.placeholder {
  min-height: 100vh;
  background-color: $gsy-container;
  padding: 24rpx;

  &__card {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 60rpx 30rpx;
    box-shadow: $gsy-box-shadow;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__icon { color: $gsy-theme-color; font-size: 96rpx; margin-bottom: 20rpx; }
  &__title { color: $gsy-theme-color; font-size: 32rpx; font-weight: bold; margin-bottom: 12rpx; }
  &__hint { color: $gsy-gray; font-size: 26rpx; text-align: center; line-height: 1.6; }
}
</style>
