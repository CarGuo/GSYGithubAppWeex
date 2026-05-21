<template>
  <view class="trend">
    <view class="trend__filter">
      <view
        v-for="opt in sinceOptions"
        :key="opt.value"
        :class="['trend__filter-item', { 'is-active': since === opt.value }]"
        @click="onPickSince(opt.value)"
      >
        <text>{{ opt.label }}</text>
      </view>
    </view>

    <view v-if="loading" class="trend__loading">
      <text>加载中…</text>
    </view>

    <view v-else>
      <view v-for="(item, idx) in list" :key="idx" class="trend__item">
        <view class="trend__item-row">
          <text class="trend__item-author">{{ item.reposAuthor }} /</text>
          <text class="trend__item-name">{{ item.reposName }}</text>
        </view>
        <text class="trend__item-desc">{{ item.reposDesc }}</text>
        <view class="trend__item-meta">
          <text v-if="item.reposLanguage" class="trend__item-tag">{{ item.reposLanguage }}</text>
          <text class="iconfont icon-star trend__item-meta-icon" />
          <text class="trend__item-meta-item">{{ item.reposStars }}</text>
          <text class="iconfont icon-xing trend__item-meta-icon" />
          <text class="trend__item-meta-item">{{ item.reposForks }}</text>
          <text class="trend__item-meta-add">{{ item.reposStarsAdded }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { fetchTrending, type TrendItem } from '@/api/trending'

const sinceOptions = [
  { label: '今日', value: 'daily' as const },
  { label: '本周', value: 'weekly' as const },
  { label: '本月', value: 'monthly' as const }
]

const since = ref<'daily' | 'weekly' | 'monthly'>('daily')
const list = ref<TrendItem[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    list.value = await fetchTrending(since.value)
  } finally {
    loading.value = false
  }
}

function onPickSince(v: 'daily' | 'weekly' | 'monthly') {
  since.value = v
  load()
}

onShow(load)
</script>

<style lang="scss" scoped>
.trend {
  padding: 24rpx;

  &__filter {
    display: flex;
    background: #ffffff;
    border-radius: 10rpx;
    margin-bottom: 24rpx;
    overflow: hidden;
    box-shadow: $gsy-box-shadow;
  }
  &__filter-item {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    color: $gsy-gray;
    &.is-active {
      color: $gsy-theme-color;
      font-weight: 600;
      border-bottom: 4rpx solid $gsy-theme-color;
    }
  }
  &__loading {
    text-align: center;
    color: $gsy-gray;
    padding: 64rpx 0;
  }
  &__item {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 24rpx;
    margin-bottom: 16rpx;
    box-shadow: $gsy-box-shadow;
  }
  &__item-row {
    display: flex;
    flex-direction: row;
  }
  &__item-author { color: $gsy-action-blue; margin-right: 8rpx; font-weight: 600; }
  &__item-name { color: $gsy-theme-color; font-weight: 600; }
  &__item-desc {
    display: block;
    color: $gsy-gray;
    font-size: 26rpx;
    margin: 12rpx 0;
  }
  &__item-meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  &__item-tag {
    background: $gsy-mi-white;
    color: $gsy-theme-color;
    font-size: 22rpx;
    padding: 2rpx 10rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
  }
  &__item-meta-item {
    color: $gsy-gray;
    font-size: 24rpx;
    margin-right: 16rpx;
  }
  &__item-meta-icon {
    color: $gsy-theme-color;
    font-size: 24rpx;
    margin-right: 4rpx;
  }
  &__item-meta-add {
    color: $uni-color-warning;
    font-size: 24rpx;
  }
}
</style>
