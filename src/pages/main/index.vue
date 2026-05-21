<template>
  <view class="main">
    <view class="main__header">
      <text class="main__title">动态</text>
    </view>
    <view class="main__placeholder">
      <text>动态流页面 — 待迁移自旧工程 src/components/DynamicPage.vue</text>
    </view>
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
  padding: 32rpx;

  &__header {
    margin-bottom: 24rpx;
  }
  &__title {
    font-size: 40rpx;
    font-weight: 600;
  }
  &__placeholder {
    color: #888;
    background: #fff;
    border-radius: 12rpx;
    padding: 48rpx;
    text-align: center;
  }
}
</style>
