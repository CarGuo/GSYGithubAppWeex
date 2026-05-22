<template>
  <view class="person">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="navbar__title">我的</text>
    </view>

    <scroll-view class="person__scroll" scroll-y>
    <view class="card-black-full-wrapper person__head">
      <view class="person__row">
        <image
          v-if="userInfo"
          class="person__avatar"
          :src="userInfo.avatar_url"
          mode="aspectFill"
        />
        <image
          v-else
          class="person__avatar"
          src="/static/default_img.png"
          mode="aspectFill"
        />
        <view class="person__info">
          <text class="name-text-white">{{ userInfo?.login || '未登录' }}</text>
          <text class="person__name">{{ userInfo?.name || '---' }}</text>
          <view class="person__line">
            <text class="wxcIconFont person__line-icon">&#xe604;</text>
            <text class="person__line-text">{{ userInfo?.company || '---' }}</text>
          </view>
          <view class="person__line">
            <text class="wxcIconFont person__line-icon">&#xe7e6;</text>
            <text class="person__line-text">{{ userInfo?.location || '---' }}</text>
          </view>
        </view>
      </view>
      <text class="person__link">{{ userInfo?.blog || '---' }}</text>
      <text class="person__des">{{ userInfo?.bio || '' }}{{ createdLine }}</text>

      <view class="person__bottom">
        <view class="person__bottom-item person__bottom-line" @click="openSelf">
          <text class="person__b-text">仓库</text>
          <text class="person__b-value">{{ userInfo?.public_repos ?? '---' }}</text>
        </view>
        <view class="person__bottom-item person__bottom-line" @click="openSelf">
          <text class="person__b-text">粉丝</text>
          <text class="person__b-value">{{ userInfo?.followers ?? '---' }}</text>
        </view>
        <view class="person__bottom-item person__bottom-line" @click="openSelf">
          <text class="person__b-text">关注</text>
          <text class="person__b-value">{{ userInfo?.following ?? '---' }}</text>
        </view>
        <view class="person__bottom-item person__bottom-line" @click="openSelf">
          <text class="person__b-text">星标</text>
          <text class="person__b-value">---</text>
        </view>
        <view class="person__bottom-item">
          <text class="person__b-text">荣耀</text>
          <text class="person__b-value">---</text>
        </view>
      </view>
    </view>

    <view
      v-for="(ev, idx) in events"
      :key="ev.id || idx"
      class="card-white-wrapper person__event"
      @click="openRepo(ev.repo?.name)"
    >
      <view class="person__event-head">
        <image class="person__event-avatar" :src="ev.actor.avatar_url" mode="aspectFill" />
        <text class="name-text person__event-login">{{ ev.actor.display_login || ev.actor.login }}</text>
        <text class="content-text-gray">{{ formatTime(ev.created_at) }}</text>
      </view>
      <text class="content-text-black-bold person__event-action">{{ describeEvent(ev) }}</text>
    </view>

    <view v-if="!userInfo" class="card-white-wrapper person__menu" @click="goLogin">
      <text class="content-text-black-bold">前往登录</text>
    </view>
    <view v-else class="card-white-wrapper person__menu" @click="onLogout">
      <text class="content-text-black-bold person__menu--danger">退出登录</text>
    </view>
    <view class="card-white-wrapper person__menu" @click="goSetting">
      <text class="content-text-black-bold">设置</text>
    </view>
    <view class="person__bottom-pad" />
    </scroll-view>

    <MainTabBar :active="2" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'
import http from '@/api/http'
import { Address } from '@/api/address'
import MainTabBar from '@/components/MainTabBar.vue'

interface FullUser {
  login: string
  avatar_url: string
  name?: string
  company?: string
  location?: string
  blog?: string
  bio?: string
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

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo as FullUser | null)
const events = ref<GhEvent[]>([])
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

const createdLine = computed(() => {
  const u = userInfo.value as FullUser | null
  if (!u?.created_at) return ''
  const t = new Date(u.created_at)
  if (isNaN(t.getTime())) return ''
  return `\n创建于 ${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
})

async function refreshFull() {
  if (!userStore.userInfo?.login) return
  const res = await http.getFetch<FullUser>(Address.getUser(userStore.userInfo.login))
  if (res.result && typeof res.data === 'object' && res.data !== null) {
    userStore.userInfo = { ...userStore.userInfo, ...(res.data as FullUser) } as any
  }
}

async function loadEvents() {
  if (!userStore.userInfo?.login) return
  const res = await http.getFetch<GhEvent[]>(Address.getUserEvents(userStore.userInfo.login, 1))
  if (res.result && Array.isArray(res.data)) {
    events.value = res.data as GhEvent[]
  }
}

onShow(async () => {
  await userStore.restore()
  if (userStore.isLoggedIn) {
    refreshFull()
    loadEvents()
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

function openSelf() {
  if (!userInfo.value) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${userInfo.value.login}` })
}

function goLogin() { uni.reLaunch({ url: '/pages/login/index' }) }
function goSetting() { uni.navigateTo({ url: '/pages/setting/index' }) }
async function onLogout() {
  await userStore.logout()
  uni.showToast({ title: '已退出登录', icon: 'none' })
  setTimeout(() => uni.reLaunch({ url: '/pages/login/index' }), 400)
}
</script>

<style lang="scss" scoped>
.person {
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

.person__scroll {
  flex: 1;
  width: 100%;
}

.person__bottom-pad {
  height: calc(120rpx + env(safe-area-inset-bottom) + 20rpx);
}

.person__head {
  padding: 30rpx 24rpx;
}

.person__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24rpx;
}
.person__avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 70rpx;
  margin-right: 24rpx;
  background: $gsy-mi-white;
}
.person__info { flex: 1; display: flex; flex-direction: column; }
.person__name {
  color: rgba(255, 255, 255, 0.6);
  font-size: 26rpx;
  margin-top: 6rpx;
}
.person__line {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8rpx;
}
.person__line-icon {
  color: rgba(255, 255, 255, 0.9);
  font-size: 24rpx;
  margin-right: 8rpx;
}
.person__line-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 24rpx;
}
.person__link {
  display: block;
  color: rgba(38, 122, 255, 0.7);
  font-size: 24rpx;
  margin-top: 16rpx;
}
.person__des {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 26rpx;
  margin-top: 16rpx;
  line-height: 1.6;
}

.person__bottom {
  display: flex;
  flex-direction: row;
  margin-top: 24rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.5);
  padding-top: 16rpx;
}
.person__bottom-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rpx 0;
}
.person__bottom-line {
  border-right: 1rpx solid rgba(255, 255, 255, 0.5);
}
.person__b-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
}
.person__b-value {
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
  margin-top: 6rpx;
}

.person__event {
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
  &-action { display: block; }
}

.person__menu {
  margin-top: 20rpx;
  &--danger { color: #d8534f; }
}
</style>
