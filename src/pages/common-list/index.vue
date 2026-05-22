<template>
  <view class="list">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">{{ navTitle }}</text>
    </view>
    <view v-if="loading && page === 1" class="list__hint"><text>加载中…</text></view>
    <view v-else-if="items.length === 0" class="list__hint"><text>暂无数据</text></view>
    <view v-else class="list__inner">
      <view
        v-for="(it, idx) in items"
        :key="it.id || idx"
        class="card-white-wrapper list__card"
        @click="onItem(it)"
      >
        <image
          v-if="it.avatar_url"
          :src="it.avatar_url"
          class="list__avatar"
        />
        <view class="list__main">
          <text class="name-text-theme">{{ it.login }}</text>
          <text v-if="it.subText" class="content-text-gray list__sub">{{ it.subText }}</text>
        </view>
        <text class="wxcIconFont list__arrow">&#xe610;</text>
      </view>
      <view v-if="loading && page > 1" class="list__hint"><text>加载更多…</text></view>
      <view v-else-if="!noMore" class="list__more" @click="loadMore">
        <text>加载更多</text>
      </view>
      <view v-else class="list__hint"><text>—— 到底了 ——</text></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface Item {
  id?: number
  login: string
  avatar_url?: string
  subText?: string
  /** 仓库类项目 owner/name，用于点击跳 repository-detail */
  repoOwner?: string
  repoName?: string
}

const owner = ref('')
const name = ref('')
const user = ref('')
const dataType = ref('')
const items = ref<Item[]>([])
const page = ref(1)
const loading = ref(false)
const noMore = ref(false)
const navTitle = ref('列表')
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}

function buildUrl(p: number): string {
  switch (dataType.value) {
    case 'reposStarer':
      return Address.getReposStargazers(owner.value, name.value, p)
    case 'reposForker':
      return Address.getReposForks(owner.value, name.value, p)
    case 'reposWatcher':
      return Address.getReposSubscribers(owner.value, name.value, p)
    case 'reposContributor':
      return Address.getReposContributors(owner.value, name.value, p)
    case 'userRepos':
      return Address.getUserRepos(user.value, p)
    case 'userStars':
      return Address.getUserStarred(user.value, p)
    case 'followers':
      return Address.getUserFollowers(user.value, p)
    case 'following':
      return Address.getUserFollowing(user.value, p)
    default:
      return ''
  }
}

function normalize(raw: any[]): Item[] {
  if (dataType.value === 'reposForker'
    || dataType.value === 'userRepos'
    || dataType.value === 'userStars') {
    return raw.map((r) => ({
      id: r.id,
      login: r.full_name || r.name || (r.owner?.login ? `${r.owner.login}/${r.name}` : ''),
      avatar_url: r.owner?.avatar_url,
      subText: r.description || r.language || '',
      repoOwner: r.owner?.login,
      repoName: r.name
    }))
  }
  return raw.map((r) => ({
    id: r.id,
    login: r.login || '',
    avatar_url: r.avatar_url,
    subText: r.contributions ? `贡献 ${r.contributions} commits` : ''
  }))
}

async function load(p: number) {
  const url = buildUrl(p)
  if (!url) return
  loading.value = true
  try {
    const res = await http.getFetch<any[]>(url)
    if (res.result && Array.isArray(res.data)) {
      const next = normalize(res.data as any[])
      if (p === 1) items.value = next
      else items.value = items.value.concat(next)
      if (next.length === 0) noMore.value = true
    } else {
      noMore.value = true
    }
  } finally {
    loading.value = false
  }
}

function loadMore() {
  if (loading.value || noMore.value) return
  page.value += 1
  load(page.value)
}

function onItem(it: Item) {
  if (it.repoOwner && it.repoName) {
    uni.navigateTo({ url: `/pages/repository-detail/index?owner=${it.repoOwner}&name=${it.repoName}` })
    return
  }
  if (!it.login) return
  if (dataType.value === 'reposForker' && it.subText) {
    const [o, n] = it.subText.split('/')
    if (o && n) {
      uni.navigateTo({ url: `/pages/repository-detail/index?owner=${o}&name=${n}` })
      return
    }
  }
  uni.navigateTo({ url: `/pages/user-info/index?login=${it.login}` })
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  user.value = q?.user || ''
  dataType.value = q?.dataType || ''
  navTitle.value = q?.title ? decodeURIComponent(q.title) : '列表'
  load(1)
})
</script>

<style lang="scss" scoped>
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
  &__back {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100rpx;
    width: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__icon {
    color: #ffffff;
    font-size: 40rpx;
  }
}
.list {
  padding: 0;
  min-height: 100vh;
  background-color: $gsy-container;

  &__inner {
    padding: 24rpx;
  }
  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 48rpx 0;
  }
  &__card {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16rpx;
  }
  &__avatar {
    width: 70rpx;
    height: 70rpx;
    border-radius: 35rpx;
    margin-right: 20rpx;
  }
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__sub {
    margin-top: 6rpx;
    font-size: 24rpx;
  }
  &__arrow {
    color: $gsy-gray;
    font-size: 32rpx;
    margin-left: 12rpx;
  }
  &__more {
    text-align: center;
    color: $gsy-action-blue;
    padding: 24rpx 0;
  }
}
</style>
