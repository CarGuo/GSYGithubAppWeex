<template>
  <view class="repo">
    <view v-if="loading" class="repo__hint"><text>加载中…</text></view>
    <view v-else-if="!data" class="repo__hint"><text>未能获取仓库</text></view>
    <template v-else>
      <view class="card-black-wrapper repo__head">
        <view class="repo__title-row" @click="openOwner">
          <text class="repo__user">{{ data.owner.login }}</text>
          <text class="repo__user repo__name">{{ ' / ' }}</text>
          <text class="repo__user repo__name">{{ data.name }}</text>
        </view>
        <view class="repo__meta">
          <text class="repo__meta-text">{{ data.language || '' }}</text>
          <text class="repo__meta-text">{{ data.size ? (data.size / 1024).toFixed(2) + 'M' : '' }}</text>
          <text class="repo__meta-text">{{ data.license?.name || '' }}</text>
        </view>
        <text class="repo__des">{{ data.description || '无描述' }}</text>
        <text class="repo__time">{{ infoText }}</text>

        <view class="repo__bottom">
          <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposStarer', 'Starer')">
            <text class="iconfont icon-star repo__bottom-icon" />
            <text class="repo__bottom-text">{{ data.watchers_count ?? '---' }}</text>
          </view>
          <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposForker', 'Forker')">
            <text class="iconfont icon-xing repo__bottom-icon" />
            <text class="repo__bottom-text">{{ data.forks_count ?? '---' }}</text>
          </view>
          <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposWatcher', 'Watcher')">
            <text class="iconfont icon-shijian repo__bottom-icon" />
            <text class="repo__bottom-text">{{ data.subscribers_count ?? '---' }}</text>
          </view>
          <view class="repo__bottom-item" @click="openIssues">
            <text class="iconfont icon-pinglun repo__bottom-icon" />
            <text class="repo__bottom-text">{{ data.open_issues_count ?? '---' }}</text>
          </view>
        </view>
      </view>

      <view class="card-white-wrapper repo__menu" @click="openReadme">
        <text class="content-text-black-bold">README</text>
        <text class="repo__menu-arrow">›</text>
      </view>
      <view class="card-white-wrapper repo__menu" @click="openIssues">
        <text class="content-text-black-bold">Issues</text>
        <text class="repo__menu-arrow">›</text>
      </view>
      <view class="card-white-wrapper repo__menu" @click="goCommonList('reposContributor', 'Contributors')">
        <text class="content-text-black-bold">Contributors</text>
        <text class="repo__menu-arrow">›</text>
      </view>
      <view class="card-white-wrapper repo__menu" @click="openWeb(data.html_url)">
        <text class="content-text-black-bold">在 GitHub 打开</text>
        <text class="repo__menu-arrow">›</text>
      </view>
      <view v-if="data.homepage" class="card-white-wrapper repo__menu" @click="openWeb(data.homepage)">
        <text class="content-text-black-bold">主页</text>
        <text class="repo__menu-arrow">›</text>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface RepoDetail {
  name: string
  description: string | null
  language: string | null
  size?: number
  license?: { name?: string } | null
  stargazers_count: number
  watchers_count?: number
  forks_count: number
  subscribers_count?: number
  open_issues_count: number
  html_url: string
  homepage?: string | null
  pushed_at?: string
  created_at?: string
  owner: { login: string; avatar_url?: string }
}

const data = ref<RepoDetail | null>(null)
const loading = ref(false)
const owner = ref('')
const name = ref('')

const infoText = computed(() => {
  if (!data.value) return ''
  const t = data.value.pushed_at ? new Date(data.value.pushed_at) : null
  if (!t || isNaN(t.getTime())) return ''
  return `最后更新 ${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
})

onLoad(async (q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  if (!owner.value || !name.value) return
  uni.setNavigationBarTitle({ title: `${owner.value}/${name.value}` })
  loading.value = true
  try {
    const res = await http.getFetch<RepoDetail>(Address.getReposDetail(owner.value, name.value))
    if (res.result && typeof res.data === 'object' && res.data !== null) {
      data.value = res.data as RepoDetail
    }
  } finally {
    loading.value = false
  }
})

function openIssues() {
  uni.navigateTo({ url: `/pages/repository-issues/index?owner=${owner.value}&name=${name.value}` })
}
function openReadme() {
  uni.navigateTo({ url: `/pages/repository-detail-info/index?owner=${owner.value}&name=${name.value}` })
}
function openWeb(url?: string | null) {
  if (!url) return
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}
function openOwner() {
  if (!data.value) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${data.value.owner.login}` })
}
function goCommonList(dataType: string, title: string) {
  uni.navigateTo({
    url: `/pages/common-list/index?owner=${owner.value}&name=${name.value}&dataType=${dataType}&title=${encodeURIComponent(title)}`
  })
}
</script>

<style lang="scss" scoped>
.repo {
  min-height: 100vh;
  background-color: $gsy-container;
  padding: 20rpx 0 40rpx;
}
.repo__hint {
  text-align: center;
  color: $gsy-gray;
  padding: 60rpx 0;
}

.repo__head {
  margin-top: 0;
}
.repo__title-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.repo__user {
  color: #ffffff;
  font-weight: bold;
  font-size: 32rpx;
}
.repo__name { font-size: 34rpx; }

.repo__meta {
  display: flex;
  flex-direction: row;
  margin-top: 20rpx;
}
.repo__meta-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
  margin-right: 20rpx;
}

.repo__des {
  display: block;
  color: rgba(227, 227, 227, 0.7);
  font-size: 28rpx;
  font-weight: bold;
  margin-top: 20rpx;
}
.repo__time {
  display: block;
  color: rgba(255, 255, 255, 0.5);
  font-size: 22rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  text-align: right;
}

.repo__bottom {
  display: flex;
  flex-direction: row;
  margin-top: 20rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.7);
  padding-top: 10rpx;
}
.repo__bottom-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8rpx 0;
}
.repo__bottom-line {
  border-right: 1rpx solid rgba(255, 255, 255, 0.5);
}
.repo__bottom-icon {
  color: rgba(255, 255, 255, 0.7);
  font-size: 24rpx;
  margin-right: 6rpx;
}
.repo__bottom-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 24rpx;
}

.repo__menu {
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.repo__menu-arrow {
  color: $gsy-gray;
  font-size: 32rpx;
}
</style>
