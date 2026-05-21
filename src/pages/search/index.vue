<template>
  <view class="search">
    <view class="search__bar">
      <view class="search__tabs">
        <text :class="['search__tab', { 'is-active': type === 'repositories' }]" @click="setType('repositories')">仓库</text>
        <text :class="['search__tab', { 'is-active': type === 'users' }]" @click="setType('users')">用户</text>
      </view>
      <view class="search__input-row">
        <text class="iconfont icon-sousuo search__input-icon" />
        <input
          v-model="keyword"
          class="search__input"
          :placeholder="type === 'users' ? '搜索 GitHub 用户' : '搜索 GitHub 仓库'"
          confirm-type="search"
          @confirm="onSearch"
        />
        <text class="search__btn" @click="onSearch">搜索</text>
      </view>
    </view>

    <view v-if="loading" class="search__hint"><text>搜索中…</text></view>
    <view v-else-if="!hasSearched" class="search__hint"><text>输入关键字开始搜索</text></view>
    <view v-else-if="repos.length === 0 && users.length === 0" class="search__hint"><text>暂无结果</text></view>

    <view v-else class="search__list">
      <view
        v-for="(item, idx) in repos"
        :key="`r-${idx}`"
        class="search__card"
        @click="openRepo(item.owner.login, item.name)"
      >
        <view class="search__card-row">
          <text class="search__card-author">{{ item.owner.login }} /</text>
          <text class="search__card-name">{{ item.name }}</text>
        </view>
        <text class="search__card-desc">{{ item.description || '' }}</text>
        <view class="search__card-meta">
          <text v-if="item.language" class="search__card-tag">{{ item.language }}</text>
          <text class="iconfont icon-star search__card-meta-icon" />
          <text class="search__card-meta-item">{{ item.stargazers_count }}</text>
          <text class="iconfont icon-xing search__card-meta-icon" />
          <text class="search__card-meta-item">{{ item.forks_count }}</text>
        </view>
      </view>

      <view
        v-for="(u, idx) in users"
        :key="`u-${idx}`"
        class="search__user"
        @click="openUser(u.login)"
      >
        <image class="search__user-avatar" :src="u.avatar_url" mode="aspectFill" />
        <view class="search__user-meta">
          <text class="search__user-login">{{ u.login }}</text>
          <text class="search__user-type">{{ u.type }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import http from '@/api/http'
import { Address } from '@/api/address'

interface Repo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  owner: { login: string }
}
interface UserHit { login: string; avatar_url: string; type: string }

const keyword = ref('')
const type = ref<'repositories' | 'users'>('repositories')
const repos = ref<Repo[]>([])
const users = ref<UserHit[]>([])
const loading = ref(false)
const hasSearched = ref(false)

function setType(t: 'repositories' | 'users') {
  type.value = t
  if (hasSearched.value && keyword.value.trim()) onSearch()
}

async function onSearch() {
  const q = keyword.value.trim()
  if (!q) {
    uni.showToast({ title: '请输入关键字', icon: 'none' })
    return
  }
  loading.value = true
  hasSearched.value = true
  try {
    const res = await http.getFetch<{ items?: any[] }>(Address.search(q, 1, type.value))
    if (res.result && typeof res.data === 'object' && res.data !== null) {
      const items = (res.data as { items?: any[] }).items ?? []
      if (type.value === 'repositories') {
        repos.value = items as Repo[]
        users.value = []
      } else {
        users.value = items as UserHit[]
        repos.value = []
      }
    } else {
      repos.value = []
      users.value = []
      uni.showToast({ title: '搜索失败', icon: 'none' })
    }
  } finally {
    loading.value = false
  }
}

function openRepo(owner: string, name: string) {
  uni.navigateTo({ url: `/pages/repository-detail/index?owner=${owner}&name=${name}` })
}
function openUser(login: string) {
  uni.navigateTo({ url: `/pages/user-info/index?login=${login}` })
}
</script>

<style lang="scss" scoped>
.search {
  padding: 24rpx;
  background-color: $gsy-container;
  min-height: 100vh;

  &__bar {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 16rpx 24rpx;
    margin-bottom: 24rpx;
    box-shadow: $gsy-box-shadow;
  }
  &__tabs {
    display: flex;
    flex-direction: row;
    margin-bottom: 16rpx;
  }
  &__tab {
    margin-right: 32rpx;
    color: $gsy-gray;
    font-size: 28rpx;
    padding: 8rpx 0;
    &.is-active {
      color: $gsy-theme-color;
      font-weight: 600;
      border-bottom: 4rpx solid $gsy-theme-color;
    }
  }
  &__input-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: $gsy-mi-white;
    border-radius: 8rpx;
    padding: 8rpx 16rpx;
  }
  &__input-icon {
    color: $gsy-input-color;
    font-size: 28rpx;
    margin-right: 12rpx;
  }
  &__input {
    flex: 1;
    height: 60rpx;
    color: $gsy-theme-color;
    font-size: 28rpx;
  }
  &__btn {
    color: $gsy-action-blue;
    font-size: 28rpx;
    padding: 0 12rpx;
  }
  &__hint {
    text-align: center;
    color: $gsy-gray;
    font-size: 26rpx;
    padding: 64rpx 0;
  }
  &__list { display: block; }
  &__card {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 24rpx;
    margin-bottom: 16rpx;
    box-shadow: $gsy-box-shadow;
  }
  &__card-row { display: flex; flex-direction: row; }
  &__card-author { color: $gsy-action-blue; margin-right: 8rpx; font-weight: 600; }
  &__card-name { color: $gsy-theme-color; font-weight: 600; }
  &__card-desc {
    display: block;
    color: $gsy-gray;
    font-size: 26rpx;
    margin: 12rpx 0;
  }
  &__card-meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  &__card-tag {
    background: $gsy-mi-white;
    color: $gsy-theme-color;
    font-size: 22rpx;
    padding: 2rpx 10rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
  }
  &__card-meta-icon {
    color: $gsy-theme-color;
    font-size: 24rpx;
    margin-right: 4rpx;
  }
  &__card-meta-item {
    color: $gsy-gray;
    font-size: 24rpx;
    margin-right: 16rpx;
  }
  &__user {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 20rpx 24rpx;
    margin-bottom: 16rpx;
    box-shadow: $gsy-box-shadow;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__user-avatar {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    margin-right: 20rpx;
    background: $gsy-mi-white;
  }
  &__user-meta { display: flex; flex-direction: column; }
  &__user-login {
    color: $gsy-theme-color;
    font-size: 28rpx;
    font-weight: 600;
  }
  &__user-type {
    color: $gsy-gray;
    font-size: 22rpx;
  }
}
</style>
