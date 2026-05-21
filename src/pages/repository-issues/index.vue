<template>
  <view class="issues">
    <view class="issues__filter">
      <text :class="['issues__filter-item', { 'is-active': state === 'open' }]" @click="setState('open')">Open</text>
      <text :class="['issues__filter-item', { 'is-active': state === 'closed' }]" @click="setState('closed')">Closed</text>
      <text :class="['issues__filter-item', { 'is-active': state === 'all' }]" @click="setState('all')">All</text>
    </view>
    <view v-if="loading" class="issues__hint"><text>加载中…</text></view>
    <view v-else-if="list.length === 0" class="issues__hint"><text>暂无 Issue</text></view>
    <view v-else>
      <view v-for="(it, idx) in list" :key="it.id || idx" class="issues__item">
        <view class="issues__item-row">
          <text class="issues__item-num">#{{ it.number }}</text>
          <text class="issues__item-title">{{ it.title }}</text>
        </view>
        <text class="issues__item-meta">{{ it.user.login }} · {{ it.state }} · 评论 {{ it.comments }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface Issue {
  id: number
  number: number
  title: string
  state: string
  comments: number
  user: { login: string }
}

const owner = ref('')
const name = ref('')
const state = ref<'open' | 'closed' | 'all'>('open')
const list = ref<Issue[]>([])
const loading = ref(false)

async function load() {
  if (!owner.value || !name.value) return
  loading.value = true
  try {
    const res = await http.getFetch<Issue[]>(Address.getReposIssues(owner.value, name.value, state.value, 1))
    if (res.result && Array.isArray(res.data)) list.value = res.data as Issue[]
    else list.value = []
  } finally {
    loading.value = false
  }
}

function setState(s: 'open' | 'closed' | 'all') {
  state.value = s
  load()
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  load()
})
</script>

<style lang="scss" scoped>
.issues {
  padding: 24rpx;
  min-height: 100vh;
  background-color: $gsy-container;

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
  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 64rpx 0;
  }
  &__item {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 20rpx 24rpx;
    margin-bottom: 16rpx;
    box-shadow: $gsy-box-shadow;
  }
  &__item-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__item-num {
    color: $gsy-action-blue;
    font-size: 26rpx;
    margin-right: 12rpx;
    font-weight: 600;
  }
  &__item-title {
    color: $gsy-theme-color;
    font-size: 28rpx;
    font-weight: 600;
    flex: 1;
  }
  &__item-meta {
    display: block;
    color: $gsy-gray;
    font-size: 22rpx;
    margin-top: 8rpx;
  }
}
</style>
