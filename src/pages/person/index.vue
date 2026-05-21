<template>
  <view class="person">
    <view class="person__head">
      <view class="person__row">
        <image v-if="userInfo" class="person__avatar" :src="userInfo.avatar_url" mode="aspectFill" />
        <image v-else class="person__avatar" src="/static/default_img.png" mode="aspectFill" />
        <view class="person__info">
          <text class="person__user">{{ userInfo?.login || '未登录' }}</text>
          <text class="person__name">{{ userInfo?.name || '---' }}</text>
          <text class="person__org">⌂ {{ userInfo?.company || '---' }}</text>
          <text class="person__loc">📍 {{ userInfo?.location || '---' }}</text>
        </view>
      </view>
      <text class="person__link">🔗 {{ userInfo?.blog || '---' }}</text>
      <text class="person__des">{{ userInfo?.bio || '' }}{{ createdLine }}</text>

      <view class="person__bottom">
        <view class="person__bottom-item person__bottom-line" @click="openRepos">
          <text class="person__b-text">仓库</text>
          <text class="person__b-value">{{ userInfo?.public_repos ?? '---' }}</text>
        </view>
        <view class="person__bottom-item person__bottom-line" @click="openFollowers">
          <text class="person__b-text">粉丝</text>
          <text class="person__b-value">{{ userInfo?.followers ?? '---' }}</text>
        </view>
        <view class="person__bottom-item person__bottom-line" @click="openFollowing">
          <text class="person__b-text">关注</text>
          <text class="person__b-value">{{ userInfo?.following ?? '---' }}</text>
        </view>
        <view class="person__bottom-item person__bottom-line" @click="openStarred">
          <text class="person__b-text">星标</text>
          <text class="person__b-value">{{ userInfo ? '---' : '---' }}</text>
        </view>
        <view class="person__bottom-item">
          <text class="person__b-text">荣耀</text>
          <text class="person__b-value">---</text>
        </view>
      </view>
    </view>

    <view class="person__menu">
      <view class="person__menu-item" @click="goSetting">
        <text class="person__menu-title">设置</text>
        <text class="person__menu-arrow">›</text>
      </view>
      <view v-if="!userInfo" class="person__menu-item" @click="goLogin">
        <text class="person__menu-title">前往登录</text>
        <text class="person__menu-arrow">›</text>
      </view>
      <view v-else class="person__menu-item person__menu-item--danger" @click="onLogout">
        <text class="person__menu-title">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'
import http from '@/api/http'
import { Address } from '@/api/address'

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

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo as FullUser | null)
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

onShow(async () => {
  await userStore.restore()
  refreshFull()
})

function goLogin() { uni.reLaunch({ url: '/pages/login/index' }) }
function goSetting() { uni.navigateTo({ url: '/pages/setting/index' }) }
function openRepos() {
  if (!userInfo.value) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${userInfo.value.login}` })
}
function openFollowers() { openRepos() }
function openFollowing() { openRepos() }
function openStarred() { openRepos() }
async function onLogout() {
  await userStore.logout()
  uni.showToast({ title: '已退出登录', icon: 'none' })
  setTimeout(() => uni.reLaunch({ url: '/pages/login/index' }), 400)
}
</script>

<style lang="scss" scoped>
.person {
  min-height: 100vh;
  background-color: $gsy-container;
}

.person__head {
  background-color: $gsy-theme-color;
  padding: 30rpx 24rpx;
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
  box-shadow: $gsy-box-shadow;
}

.person__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30rpx;
}
.person__avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 70rpx;
  margin-right: 24rpx;
  background: $gsy-mi-white;
}
.person__info { flex: 1; display: flex; flex-direction: column; }
.person__user {
  color: #ffffff;
  font-weight: bold;
  font-size: 40rpx;
}
.person__name {
  color: rgba(255, 255, 255, 0.6);
  font-size: 26rpx;
  margin-top: 4rpx;
}
.person__org, .person__loc {
  color: rgba(255, 255, 255, 0.9);
  font-size: 24rpx;
  margin-top: 6rpx;
}
.person__link {
  display: block;
  color: rgba(0, 111, 255, 0.7);
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
}
.person__bottom-line {
  border-right: 1rpx solid rgba(255, 255, 255, 0.5);
}
.person__b-text {
  color: rgba(97, 97, 97, 0.6);
  font-size: 26rpx;
}
.person__b-value {
  color: rgba(255, 255, 255, 0.7);
  font-size: 26rpx;
  margin-top: 8rpx;
}

.person__menu {
  margin: 24rpx;
  background: #ffffff;
  border-radius: 10rpx;
  box-shadow: $gsy-box-shadow;
  overflow: hidden;
}
.person__menu-item {
  padding: 28rpx 24rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid $gsy-mi-white;
  &:last-child { border-bottom: none; }
  &--danger .person__menu-title { color: #d8534f; }
}
.person__menu-title { color: $gsy-theme-color; font-size: 28rpx; }
.person__menu-arrow { color: $gsy-gray; font-size: 32rpx; }
</style>
