<template>
  <view class="user">
    <view v-if="loading" class="user__hint"><text>加载中…</text></view>
    <view v-else-if="!info" class="user__hint"><text>未能获取用户</text></view>
    <template v-else>
      <view class="card-black-full-wrapper user__head">
        <view class="user__row">
          <image class="user__avatar" :src="info.avatar_url" mode="aspectFill" />
          <view class="user__info">
            <text class="user__user">{{ info.login }}</text>
            <text class="user__name">{{ info.name || '---' }}</text>
            <view class="user__line">
              <text class="iconfont icon-ren user__line-icon" />
              <text class="user__line-text">{{ info.company || '---' }}</text>
            </view>
            <view class="user__line">
              <text class="iconfont icon-shijian user__line-icon" />
              <text class="user__line-text">{{ info.location || '---' }}</text>
            </view>
          </view>
        </view>
        <text class="user__link">{{ info.blog || '---' }}</text>
        <text class="user__des">{{ info.bio || '' }}{{ createdLine }}</text>

        <view class="user__bottom">
          <view class="user__bottom-item user__bottom-line">
            <text class="user__b-text">仓库</text>
            <text class="user__b-value">{{ info.public_repos ?? '---' }}</text>
          </view>
          <view class="user__bottom-item user__bottom-line">
            <text class="user__b-text">粉丝</text>
            <text class="user__b-value">{{ info.followers ?? '---' }}</text>
          </view>
          <view class="user__bottom-item user__bottom-line">
            <text class="user__b-text">关注</text>
            <text class="user__b-value">{{ info.following ?? '---' }}</text>
          </view>
          <view class="user__bottom-item user__bottom-line" @click="openWeb(info.html_url)">
            <text class="user__b-text">主页</text>
            <text class="user__b-value">›</text>
          </view>
          <view class="user__bottom-item">
            <text class="user__b-text">荣耀</text>
            <text class="user__b-value">---</text>
          </view>
        </view>
      </view>

      <view
        v-for="(ev, idx) in events"
        :key="ev.id || idx"
        class="card-white-wrapper user__event"
        @click="openRepo(ev.repo?.name)"
      >
        <view class="user__event-head">
          <image class="user__event-avatar" :src="ev.actor.avatar_url" mode="aspectFill" />
          <text class="name-text user__event-login">{{ ev.actor.display_login || ev.actor.login }}</text>
          <text class="content-text-gray">{{ formatTime(ev.created_at) }}</text>
        </view>
        <text class="content-text-black-bold">{{ describeEvent(ev) }}</text>
      </view>

      <view v-if="!loading && events.length === 0" class="card-white-wrapper user__hint"><text>暂无动态</text></view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface UserInfo {
  login: string
  name?: string
  bio?: string
  avatar_url: string
  html_url: string
  blog?: string
  company?: string
  location?: string
  created_at?: string
  public_repos?: number
  followers?: number
  following?: number
}

interface GhEvent {
  id: string
  type: string
  created_at: string
  actor: { login: string; display_login?: string; avatar_url: string }
  repo: { name: string }
  payload: Record<string, any>
}

const info = ref<UserInfo | null>(null)
const events = ref<GhEvent[]>([])
const loading = ref(false)

const createdLine = computed(() => {
  if (!info.value?.created_at) return ''
  const t = new Date(info.value.created_at)
  if (isNaN(t.getTime())) return ''
  return `\n创建于 ${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
})

onLoad(async (q: Record<string, string> | undefined) => {
  const login = q?.login
  if (!login) return
  uni.setNavigationBarTitle({ title: login })
  loading.value = true
  try {
    const res = await http.getFetch<UserInfo>(Address.getUser(login))
    if (res.result && typeof res.data === 'object' && res.data !== null) {
      info.value = res.data as UserInfo
    }
    const ev = await http.getFetch<GhEvent[]>(Address.getUserEvents(login, 1))
    if (ev.result && Array.isArray(ev.data)) {
      events.value = ev.data as GhEvent[]
    }
  } finally {
    loading.value = false
  }
})

function describeEvent(ev: GhEvent): string {
  const repo = ev.repo?.name || ''
  switch (ev.type) {
    case 'PushEvent': return `推送了 ${ev.payload?.commits?.length ?? 0} 个 commit 到 ${repo}`
    case 'WatchEvent': return `Star 了 ${repo}`
    case 'ForkEvent': return `Fork 了 ${repo}`
    case 'CreateEvent': return `创建了 ${ev.payload?.ref_type || ''} @ ${repo}`
    case 'IssuesEvent': return `${ev.payload?.action || ''} 了 Issue @ ${repo}`
    case 'PullRequestEvent': return `${ev.payload?.action || ''} 了 PR @ ${repo}`
    case 'ReleaseEvent': return `发布了 ${ev.payload?.release?.tag_name || ''} @ ${repo}`
    default: return `${ev.type} @ ${repo}`
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

function openWeb(url: string) {
  if (!url) return
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}
</script>

<style lang="scss" scoped>
.user {
  min-height: 100vh;
  background-color: $gsy-container;
  padding-bottom: 40rpx;
}

.user__hint {
  text-align: center;
  color: $gsy-gray;
  padding: 60rpx 0;
}

.user__head {
  padding: 30rpx 24rpx;
}
.user__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24rpx;
}
.user__avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 70rpx;
  margin-right: 24rpx;
  background: $gsy-mi-white;
}
.user__info { flex: 1; display: flex; flex-direction: column; }
.user__user {
  color: #ffffff;
  font-weight: bold;
  font-size: 40rpx;
}
.user__name {
  color: rgba(255, 255, 255, 0.6);
  font-size: 26rpx;
  margin-top: 6rpx;
}
.user__line {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8rpx;
}
.user__line-icon {
  color: rgba(255, 255, 255, 0.9);
  font-size: 24rpx;
  margin-right: 8rpx;
}
.user__line-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 24rpx;
}
.user__link {
  display: block;
  color: rgba(38, 122, 255, 0.7);
  font-size: 24rpx;
  margin-top: 16rpx;
}
.user__des {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 26rpx;
  margin-top: 16rpx;
  line-height: 1.6;
}

.user__bottom {
  display: flex;
  flex-direction: row;
  margin-top: 24rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.5);
  padding-top: 16rpx;
}
.user__bottom-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rpx 0;
}
.user__bottom-line {
  border-right: 1rpx solid rgba(255, 255, 255, 0.5);
}
.user__b-text { color: rgba(255, 255, 255, 0.6); font-size: 24rpx; }
.user__b-value {
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
  margin-top: 6rpx;
}

.user__event {
  margin-top: 20rpx;
  &-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16rpx;
  }
  &-avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 25rpx;
    margin-right: 20rpx;
    background: $gsy-mi-white;
  }
  &-login { flex: 1; }
}
</style>
