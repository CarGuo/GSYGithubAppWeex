<template>
  <view class="search">
    <view class="search__navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="search__navbar-back" @click="goBack">
        <text class="wxcIconFont search__navbar-icon">&#xe78a;</text>
      </view>
      <text class="search__navbar-title">搜索</text>
    </view>

    <view class="search__searchbar">
      <view class="search__input-wrap">
        <text class="wxcIconFont search__input-icon">&#xe61c;</text>
        <input
          v-model="keyword"
          class="search__input"
          :placeholder="type === 'users' ? '搜索 GitHub 用户' : '搜索 GitHub 仓库'"
          placeholder-style="color:#bbbbbb"
          confirm-type="search"
          @confirm="onSearch"
        />
      </view>
      <text class="search__cancel" @click="onSearch">搜索</text>
    </view>

    <view class="search__control">
      <text
        class="search__control-text"
        :style="{ color: type === 'repositories' ? '#FFFFFF' : '#AAAAAA' }"
        @click="setType('repositories')"
      >仓库</text>
      <text
        class="search__control-text"
        :style="{ color: type === 'users' ? '#FFFFFF' : '#AAAAAA' }"
        @click="setType('users')"
      >用户</text>
    </view>

    <scroll-view scroll-y class="search__scroll">
      <view v-if="loading" class="search__hint"><text>搜索中…</text></view>
      <view v-else-if="!hasSearched" class="search__hint"><text>输入关键字开始搜索</text></view>
      <view
        v-else-if="repos.length === 0 && users.length === 0"
        class="search__hint"
      ><text>暂无结果</text></view>

      <template v-else>
        <view
          v-for="(item, idx) in repos"
          :key="`r-${idx}`"
          class="card-white-wrapper search__repo"
          @click="openRepo(item.owner.login, item.name)"
        >
          <view class="search__repo-head">
            <image
              class="search__repo-avatar"
              :src="item.owner.avatar_url"
              mode="aspectFill"
              @click.stop="openUser(item.owner.login)"
            />
            <view class="search__repo-titles">
              <text class="name-text-theme">{{ item.name }}</text>
              <text class="content-text-gray search__repo-owner">{{ item.owner.login }}</text>
            </view>
            <text class="content-text-gray search__repo-type">{{ item.language || '' }}</text>
          </view>
          <text class="text-line-three content-text-gray search__repo-desc">{{ item.description || '' }}</text>
          <view class="search__repo-foot">
            <view class="search__repo-iconcell">
              <text class="wxcIconFont search__repo-iconfont">&#xe643;</text>
              <text class="search__repo-icontext">{{ item.stargazers_count }}</text>
            </view>
            <view class="search__repo-iconcell">
              <text class="wxcIconFont search__repo-iconfont">&#xe67e;</text>
              <text class="search__repo-icontext">{{ item.forks_count }}</text>
            </view>
            <view class="search__repo-iconcell">
              <text class="wxcIconFont search__repo-iconfont">&#xe661;</text>
              <text class="search__repo-icontext">{{ item.open_issues_count ?? 0 }}</text>
            </view>
          </view>
        </view>

        <view
          v-for="(u, idx) in users"
          :key="`u-${idx}`"
          class="card-white-wrapper search__user"
          @click="openUser(u.login)"
        >
          <image class="search__user-avatar" :src="u.avatar_url" mode="aspectFill" />
          <view class="search__user-meta">
            <text class="name-text-theme">{{ u.login }}</text>
            <text class="content-text-gray">{{ u.type }}</text>
          </view>
        </view>
      </template>
    </scroll-view>
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
  open_issues_count?: number
  owner: { login: string; avatar_url: string }
}
interface UserHit { login: string; avatar_url: string; type: string }

const keyword = ref('')
const type = ref<'repositories' | 'users'>('repositories')
const repos = ref<Repo[]>([])
const users = ref<UserHit[]>([])
const loading = ref(false)
const hasSearched = ref(false)
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

function setType(t: 'repositories' | 'users') {
  if (type.value === t) return
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
function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}
</script>

<style lang="scss" scoped>
.search {
  min-height: 100vh;
  background-color: $gsy-container;
  display: flex;
  flex-direction: column;
}

.search__navbar {
  position: relative;
  width: 100%;
  height: 100rpx;
  background: $gsy-theme-color;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $gsy-box-shadow;
  box-sizing: content-box;
  &-back {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100rpx;
    width: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-icon {
    color: #ffffff;
    font-size: 40rpx;
  }
  &-title {
    color: #ffffff;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 100rpx;
  }
}

.search__searchbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: $gsy-theme-color;
  padding: 16rpx 20rpx;
}
.search__input-wrap {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border-radius: 10rpx;
  padding: 8rpx 16rpx;
}
.search__input-icon {
  color: $gsy-theme-color;
  font-size: 32rpx;
  margin-right: 12rpx;
}
.search__input {
  flex: 1;
  height: 56rpx;
  color: $gsy-theme-color;
  font-size: 28rpx;
}
.search__cancel {
  color: #ffffff;
  font-size: 28rpx;
  padding-left: 20rpx;
}

.search__control {
  width: 710rpx;
  margin: 20rpx auto;
  background-color: $gsy-theme-color;
  border-radius: 30rpx;
  padding: 20rpx;
  box-shadow: $gsy-box-shadow;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &-text {
    flex: 1;
    text-align: center;
    color: rgba(255, 255, 255, 0.9);
    font-size: 26rpx;
  }
}

.search__scroll {
  flex: 1;
  width: 100%;
  padding-bottom: 20rpx;
}

.search__hint {
  text-align: center;
  color: $gsy-gray;
  font-size: 26rpx;
  padding: 64rpx 0;
}

.search__repo {
  margin-top: 20rpx;
  &-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15rpx;
  }
  &-avatar {
    width: 70rpx;
    height: 70rpx;
    border-radius: 35rpx;
    margin-right: 20rpx;
    background: $gsy-mi-white;
  }
  &-titles {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &-owner {
    margin-top: 4rpx;
  }
  &-type {
    font-size: 24rpx;
  }
  &-desc {
    display: block;
    margin-bottom: 20rpx;
  }
  &-foot {
    display: flex;
    flex-direction: row;
  }
  &-iconcell {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-iconfont {
    color: rgba(97, 97, 97, 0.6);
    font-size: 24rpx;
    margin-right: 6rpx;
  }
  &-icontext {
    color: rgba(97, 97, 97, 0.6);
    font-size: 24rpx;
  }
}

.search__user {
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  &-avatar {
    width: 70rpx;
    height: 70rpx;
    border-radius: 35rpx;
    margin-right: 20rpx;
    background: $gsy-mi-white;
  }
  &-meta {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
