<template>
  <view class="placeholder">
    <view class="placeholder__card">
      <text class="iconfont icon-GitHub placeholder__icon" />
      <text class="placeholder__title">仓库文件</text>
      <text class="placeholder__hint">文件树/源码浏览将在下个迭代补全，可在 GitHub 网页端浏览。</text>
    </view>
  </view>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.placeholder { min-height: 100vh; background-color: $gsy-container; padding: 24rpx; }
.placeholder__card {
  background: #ffffff; border-radius: 10rpx; padding: 60rpx 30rpx;
  box-shadow: $gsy-box-shadow;
  display: flex; flex-direction: column; align-items: center;
}
.placeholder__icon { color: $gsy-theme-color; font-size: 96rpx; margin-bottom: 20rpx; }
.placeholder__title { color: $gsy-theme-color; font-size: 32rpx; font-weight: bold; margin-bottom: 12rpx; }
.placeholder__hint { color: $gsy-gray; font-size: 26rpx; text-align: center; line-height: 1.6; }
</style>
