<template>
  <view class="main">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="navbar__title">GSYGithubApp</text>
      <view class="navbar__action" @click="goSearch">
        <text class="wxcIconFont navbar__icon">&#xe61c;</text>
      </view>
    </view>

    <scroll-view class="main__scroll" scroll-y refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="onRefresh">
      <view v-if="!isLoggedIn" class="card-white-wrapper empty">
        <text class="empty__title">请先登录查看动态</text>
      </view>

      <view v-else>
        <view v-if="loading && events.length === 0" class="card-white-wrapper empty">
          <text class="empty__hint">加载中…</text>
        </view>

        <view v-for="(ev, idx) in events" :key="ev.id || idx" class="card-white-wrapper event-card" @click="openRepo(ev.repo?.name)">
          <view class="event-card__head">
            <image class="event-card__avatar" :src="ev.actor.avatar_url" mode="aspectFill" @click.stop="openUser(ev.actor.display_login || ev.actor.login)" />
            <text class="name-text event-card__login">{{ ev.actor.display_login || ev.actor.login }}</text>
            <text class="content-text-gray">{{ formatTime(ev.created_at) }}</text>
          </view>
          <text class="content-text-black-bold event-card__action">{{ describeEvent(ev) }}</text>
          <text v-if="describeEvent2(ev)" class="content-text-gray text-line-three">{{ describeEvent2(ev) }}</text>
        </view>

        <view v-if="!loading && events.length === 0" class="card-white-wrapper empty">
          <text class="empty__hint">暂无动态</text>
        </view>
      </view>
      <view class="main__bottom-pad" />
    </scroll-view>

    <MainTabBar :active="0" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'
import http from '@/api/http'
import { Address } from '@/api/address'
import MainTabBar from '@/components/MainTabBar.vue'

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
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

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
  const repo = ev.repo?.name || ''
  switch (ev.type) {
    case 'PushEvent': return `推送了 ${ev.payload?.commits?.length ?? 0} 个 commit 到 ${repo}`
    case 'WatchEvent': return `Star 了 ${repo}`
    case 'ForkEvent': return `Fork 了 ${repo}`
    case 'CreateEvent': return `创建了 ${ev.payload?.ref_type || ''} ${ev.payload?.ref || ''} @ ${repo}`
    case 'IssuesEvent': return `${ev.payload?.action || ''} 了 Issue #${ev.payload?.issue?.number || ''} @ ${repo}`
    case 'IssueCommentEvent': return `评论了 Issue #${ev.payload?.issue?.number || ''} @ ${repo}`
    case 'PullRequestEvent': return `${ev.payload?.action || ''} 了 PR #${ev.payload?.number || ''} @ ${repo}`
    case 'PullRequestReviewCommentEvent': return `评论了 PR @ ${repo}`
    case 'ReleaseEvent': return `发布了 ${ev.payload?.release?.tag_name || ''} @ ${repo}`
    case 'PublicEvent': return `公开了仓库 ${repo}`
    default: return `${ev.type} @ ${repo}`
  }
}

function describeEvent2(ev: GhEvent): string {
  switch (ev.type) {
    case 'PushEvent': return (ev.payload?.commits || []).map((c: any) => c.message).join('\n')
    case 'IssuesEvent':
    case 'IssueCommentEvent': return ev.payload?.issue?.title || ''
    case 'PullRequestEvent': return ev.payload?.pull_request?.title || ''
    case 'ReleaseEvent': return ev.payload?.release?.name || ''
    default: return ''
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

function openRepo(fullName?: string) {
  if (!fullName) return
  const [owner, name] = fullName.split('/')
  if (!owner || !name) return
  uni.navigateTo({ url: `/pages/repository-detail/index?owner=${owner}&name=${name}` })
}
function openUser(login: string) {
  if (!login) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${login}` })
}
function goSearch() {
  uni.navigateTo({ url: '/pages/search/index' })
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
  &__action {
    position: absolute;
    right: 24rpx;
    bottom: 0;
    height: 100rpx;
    display: flex;
    align-items: center;
  }
  &__icon {
    color: #ffffff;
    font-size: 40rpx;
  }
}

.main__scroll {
  flex: 1;
  width: 100%;
}

.main__bottom-pad {
  height: calc(120rpx + env(safe-area-inset-bottom) + 20rpx);
}

.event-card {
  margin: 20rpx auto;
  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20rpx;
  }
  &__avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 25rpx;
    margin-right: 20rpx;
    background: $gsy-mi-white;
  }
  &__login {
    flex: 1;
  }
  &__action {
    display: block;
    margin-bottom: 20rpx;
  }
}

.empty {
  margin: 30rpx auto;
  text-align: center;
  &__title {
    color: $gsy-theme-color;
    font-size: 30rpx;
    font-weight: bold;
  }
  &__hint {
    color: $gsy-gray;
    font-size: 26rpx;
  }
}
</style>
