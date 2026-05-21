<template>
  <view class="main">
    <view class="navbar">
      <text class="navbar__title">动态</text>
      <view class="navbar__action" @click="goSearch">
        <text class="iconfont icon-sousuo navbar__icon" />
      </view>
    </view>

    <scroll-view class="main__scroll" scroll-y refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="onRefresh">
      <view v-if="!isLoggedIn" class="empty">
        <text class="iconfont icon-shijian empty__icon" />
        <text class="empty__title">动态流</text>
        <text class="empty__hint">登录后将展示个人动态。</text>
      </view>

      <view v-else>
        <view v-if="loading && events.length === 0" class="empty">
          <text class="empty__hint">加载中…</text>
        </view>

        <view v-for="(ev, idx) in events" :key="ev.id || idx" class="event-card">
          <view class="event-card__head">
            <image class="event-card__avatar" :src="ev.actor.avatar_url" mode="aspectFill" />
            <view class="event-card__meta">
              <text class="event-card__actor">{{ ev.actor.display_login || ev.actor.login }}</text>
              <text class="event-card__time">{{ formatTime(ev.created_at) }}</text>
            </view>
          </view>
          <text class="event-card__action">{{ describeEvent(ev) }}</text>
          <view v-if="ev.repo" class="event-card__repo" @click="openRepo(ev.repo.name)">
            <text class="iconfont icon-GitHub event-card__repo-icon" />
            <text class="event-card__repo-name">{{ ev.repo.name }}</text>
          </view>
        </view>

        <view v-if="!loading && events.length === 0" class="empty">
          <text class="empty__hint">暂无动态</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'
import http from '@/api/http'
import { Address } from '@/api/address'

interface GhEvent {
  id: string
  type: string
  created_at: string
  actor: { login: string; display_login?: string; avatar_url: string }
  repo: { name: string }
  payload: Record<string, any>
}

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)
const events = ref<GhEvent[]>([])
const loading = ref(false)
const refreshing = ref(false)

async function load() {
  if (!userStore.userInfo?.login) return
  loading.value = true
  try {
    const res = await http.getFetch<GhEvent[]>(Address.getReceivedEvents(userStore.userInfo.login, 1))
    if (res.result && Array.isArray(res.data)) {
      events.value = res.data as GhEvent[]
    }
  } finally {
    loading.value = false
  }
}

async function onRefresh() {
  refreshing.value = true
  await load()
  refreshing.value = false
}

function describeEvent(ev: GhEvent): string {
  switch (ev.type) {
    case 'PushEvent': {
      const n = ev.payload?.commits?.length ?? 0
      return `推送了 ${n} 个 commit 到 ${ev.payload?.ref || ''}`
    }
    case 'WatchEvent':
      return 'Star 了仓库'
    case 'ForkEvent':
      return 'Fork 了仓库'
    case 'CreateEvent':
      return `创建了 ${ev.payload?.ref_type || ''} ${ev.payload?.ref || ''}`
    case 'IssuesEvent':
      return `${ev.payload?.action || ''} 了 Issue #${ev.payload?.issue?.number || ''}`
    case 'IssueCommentEvent':
      return `评论了 Issue #${ev.payload?.issue?.number || ''}`
    case 'PullRequestEvent':
      return `${ev.payload?.action || ''} 了 PR #${ev.payload?.number || ''}`
    case 'PullRequestReviewCommentEvent':
      return '评论了 PR'
    case 'ReleaseEvent':
      return `发布了 ${ev.payload?.release?.tag_name || ''}`
    case 'PublicEvent':
      return '公开了仓库'
    default:
      return ev.type
  }
}

function formatTime(iso: string): string {
  if (!iso) return ''
  const t = Date.parse(iso)
  if (isNaN(t)) return iso
  const diff = Math.floor((Date.now() - t) / 1000)
  if (diff < 60) return `${diff}s 前`
  if (diff < 3600) return `${Math.floor(diff / 60)}m 前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h 前`
  return `${Math.floor(diff / 86400)}d 前`
}

function openRepo(fullName: string) {
  if (!fullName) return
  const [owner, name] = fullName.split('/')
  uni.navigateTo({ url: `/pages/repository-detail/index?owner=${owner}&name=${name}` })
}

function goSearch() {
  uni.switchTab({ url: '/pages/search/index' })
}

onShow(async () => {
  await userStore.restore()
  if (userStore.isLoggedIn) load()
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $gsy-container;
}

.navbar {
  position: relative;
  width: 100%;
  height: 88rpx;
  background-color: $gsy-theme-color;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $gsy-box-shadow;

  &__title {
    color: #ffffff;
    font-size: 34rpx;
    font-weight: bold;
  }

  &__action {
    position: absolute;
    right: 24rpx;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }

  &__icon {
    color: #ffffff;
    font-size: 36rpx;
  }
}

.main__scroll {
  flex: 1;
  width: 100%;
}

.empty {
  margin: 60rpx auto;
  width: 700rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 60rpx 30rpx;
  box-shadow: $gsy-box-shadow;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon {
    color: $gsy-theme-color;
    font-size: 96rpx;
    margin-bottom: 20rpx;
  }
  &__title {
    color: $gsy-theme-color;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 12rpx;
  }
  &__hint {
    color: $gsy-gray;
    font-size: 26rpx;
    text-align: center;
    line-height: 1.6;
  }
}

.event-card {
  margin: 16rpx 24rpx;
  background: #ffffff;
  border-radius: 10rpx;
  padding: 24rpx;
  box-shadow: $gsy-box-shadow;

  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12rpx;
  }
  &__avatar {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    margin-right: 16rpx;
    background: $gsy-mi-white;
  }
  &__meta {
    display: flex;
    flex-direction: column;
  }
  &__actor {
    color: $gsy-action-blue;
    font-size: 28rpx;
    font-weight: 600;
  }
  &__time {
    color: $gsy-gray;
    font-size: 22rpx;
  }
  &__action {
    display: block;
    color: $gsy-theme-color;
    font-size: 26rpx;
    margin-bottom: 8rpx;
  }
  &__repo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8rpx;
  }
  &__repo-icon {
    color: $gsy-theme-color;
    font-size: 26rpx;
    margin-right: 8rpx;
  }
  &__repo-name {
    color: $gsy-theme-color;
    font-size: 26rpx;
    font-weight: 600;
  }
}
</style>
