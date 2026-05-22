<template>
  <view class="main-tabbar">
    <view
      v-for="(item, idx) in tabs"
      :key="item.key"
      class="main-tabbar__item"
      @click="onTap(idx)"
    >
      <text
        class="main-tabbar__icon wxcIconFont"
        :style="{ color: idx === active ? activeColor : normalColor }"
      >{{ item.icon }}</text>
      <text
        class="main-tabbar__text"
        :style="{ color: idx === active ? activeColor : normalColor }"
      >{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{ active: number }>()

const activeColor = '#3c3f41'
const normalColor = 'rgba(97,97,97,0.9)'

const tabs = [
  { key: 'dynamic', text: '动态',  icon: '\ue684', path: '/pages/main/index' },
  { key: 'trend',   text: '推荐',  icon: '\ue818', path: '/pages/trend/index' },
  { key: 'person',  text: '我的',  icon: '\ue6d0', path: '/pages/person/index' }
]

function onTap(idx: number) {
  if (idx === props.active) return
  uni.redirectTo({ url: tabs[idx].path })
}
</script>

<style lang="scss" scoped>
.main-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(120rpx + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fbfbfb;
  border-top: 1rpx solid #e5e5e5;
  display: flex;
  flex-direction: row;
  z-index: 99;

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    font-size: 40rpx;
    line-height: 48rpx;
    margin-bottom: 4rpx;
  }

  &__text {
    font-size: 22rpx;
    line-height: 28rpx;
  }
}
</style>
