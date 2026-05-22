<template>
  <view class="trend">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="navbar__title">趋势</text>
    </view>

    <scroll-view class="trend__scroll" scroll-y>
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

      <view class="trend__lang-row">
        <view
          v-for="opt in langOptions"
          :key="opt.value || 'all'"
          :class="['trend__lang-chip', { 'is-active': language === opt.value }]"
          @click="onPickLang(opt.value)"
        >
          <text>{{ opt.label }}</text>
        </view>
      </view>

      <view v-if="loading" class="trend__loading">
        <text>加载中…</text>
      </view>

      <view v-else>
        <view v-for="(item, idx) in list" :key="idx" class="trend__item" @click="openRepo(item)">
          <view class="trend__item-row">
            <text class="trend__item-author">{{ item.reposAuthor }} /</text>
            <text class="trend__item-name">{{ item.reposName }}</text>
          </view>
          <text class="trend__item-desc">{{ item.reposDesc }}</text>
          <view class="trend__item-meta">
            <text v-if="item.reposLanguage" class="trend__item-tag">{{ item.reposLanguage }}</text>
            <text class="wxcIconFont trend__item-meta-icon">&#xe643;</text>
            <text class="trend__item-meta-item">{{ item.reposStars }}</text>
            <text class="wxcIconFont trend__item-meta-icon">&#xe67e;</text>
            <text class="trend__item-meta-item">{{ item.reposForks }}</text>
            <text class="trend__item-meta-add">{{ item.reposStarsAdded }}</text>
          </view>
        </view>
      </view>
      <view class="trend__bottom-pad" />
    </scroll-view>

    <MainTabBar :active="1" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { fetchTrending, type TrendItem } from '@/api/trending'
import MainTabBar from '@/components/MainTabBar.vue'

const sinceOptions = [
  { label: '今日', value: 'daily' as const },
  { label: '本周', value: 'weekly' as const },
  { label: '本月', value: 'monthly' as const }
]

const langOptions = [
  { label: '全部', value: '' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Vue', value: 'Vue' },
  { label: 'Java', value: 'Java' },
  { label: 'Kotlin', value: 'Kotlin' },
  { label: 'Dart', value: 'Dart' },
  { label: 'Python', value: 'Python' },
  { label: 'Go', value: 'Go' },
  { label: 'Rust', value: 'Rust' }
]

const since = ref<'daily' | 'weekly' | 'monthly'>('daily')
const language = ref<string>('')
const list = ref<TrendItem[]>([])
const loading = ref(false)
const loadedKey = ref<string>('')
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

async function load(force = false) {
  const key = `${since.value}|${language.value}`
  if (!force && loadedKey.value === key && list.value.length) return
  loading.value = true
  try {
    list.value = await fetchTrending(since.value, language.value)
    loadedKey.value = key
  } finally {
    loading.value = false
  }
}

function onPickSince(v: 'daily' | 'weekly' | 'monthly') {
  if (since.value === v) return
  since.value = v
  load(true)
}

function onPickLang(v: string) {
  if (language.value === v) return
  language.value = v
  load(true)
}

function openRepo(item: TrendItem) {
  if (!item.reposAuthor || !item.reposName) return
  uni.navigateTo({
    url: `/pages/repository-detail/index?owner=${item.reposAuthor}&name=${item.reposName}`
  })
}

onShow(() => load(false))
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $gsy-container;
}

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
}

.trend__scroll {
  flex: 1;
  width: 100%;
}

.trend__bottom-pad {
  height: calc(120rpx + env(safe-area-inset-bottom) + 20rpx);
}

.trend {
  padding: 0;

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
  &__lang-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 16rpx;
  }
  &__lang-chip {
    padding: 8rpx 20rpx;
    margin-right: 12rpx;
    margin-bottom: 12rpx;
    background: #ffffff;
    color: $gsy-gray;
    border-radius: 30rpx;
    font-size: 24rpx;
    box-shadow: $gsy-box-shadow;
    &.is-active {
      background: $gsy-theme-color;
      color: #ffffff;
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
