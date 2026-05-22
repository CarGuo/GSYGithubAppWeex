<template>
  <view class="issues">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">Issues</text>
      <view class="navbar__action" @click="newIssue">
        <text class="wxcIconFont navbar__icon">&#xe674;</text>
      </view>
    </view>

    <view class="issues__filter">
      <text
        class="issues__filter-item"
        :style="{ color: state === 'open' ? '#FFFFFF' : '#AAAAAA' }"
        @click="setState('open')"
      >Open</text>
      <text
        class="issues__filter-item"
        :style="{ color: state === 'closed' ? '#FFFFFF' : '#AAAAAA' }"
        @click="setState('closed')"
      >Closed</text>
      <text
        class="issues__filter-item"
        :style="{ color: state === 'all' ? '#FFFFFF' : '#AAAAAA' }"
        @click="setState('all')"
      >All</text>
    </view>

    <view v-if="loading" class="issues__hint"><text>加载中…</text></view>
    <view v-else-if="list.length === 0" class="issues__hint"><text>暂无 Issue</text></view>
    <view v-else>
      <view
        v-for="(it, idx) in list"
        :key="it.id || idx"
        class="card-white-wrapper issues__card"
        @click="openIssue(it)"
      >
        <view class="issues__row">
          <image
            v-if="it.user?.avatar_url"
            :src="it.user.avatar_url"
            class="issues__avatar"
            @click.stop="openUser(it.user.login)"
          />
          <view class="issues__main">
            <text class="name-text-theme">{{ it.user?.login || '' }}</text>
            <text class="content-text-gray issues__content text-line-three">{{ it.title }}</text>
          </view>
          <text class="content-text-gray issues__time">{{ formatTime(it.updated_at || it.created_at) }}</text>
        </view>
        <view class="issues__bottom">
          <text
            class="wxcIconFont issues__state"
            :style="{ color: it.state === 'open' ? '#2cbe4e' : '#cb2431' }"
          >&#xe661;</text>
          <text class="content-text-gray issues__number">{{ ' #' + it.number }}</text>
          <text class="wxcIconFont issues__comment">{{ '\ue6ba ' + (it.comments ?? 0) }}</text>
        </view>
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
  html_url?: string
  created_at?: string
  updated_at?: string
  user: { login: string; avatar_url?: string }
}

const owner = ref('')
const name = ref('')
const state = ref<'open' | 'closed' | 'all'>('open')
const list = ref<Issue[]>([])
const loading = ref(false)
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

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
  if (state.value === s) return
  state.value = s
  load()
}

function openIssue(it: Issue) {
  if (!it.number) return
  uni.navigateTo({
    url: `/pages/issue-detail/index?owner=${owner.value}&name=${name.value}&number=${it.number}`
  })
}

function openUser(login?: string) {
  if (!login) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${login}` })
}

function formatTime(iso?: string): string {
  if (!iso) return ''
  const t = Date.parse(iso)
  if (isNaN(t)) return iso
  const diff = Math.floor((Date.now() - t) / 1000)
  if (diff < 60) return `${diff}s 前`
  if (diff < 3600) return `${Math.floor(diff / 60)}m 前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h 前`
  return `${Math.floor(diff / 86400)}d 前`
}

function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}

function newIssue() {
  uni.navigateTo({ url: `/pages/edit-issue/index?owner=${owner.value}&name=${name.value}` })
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  load()
})
</script>

<style lang="scss" scoped>
.issues {
  min-height: 100vh;
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
  &__back, &__action {
    position: absolute;
    bottom: 0;
    height: 100rpx;
    width: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__back { left: 0; }
  &__action { right: 0; }
  &__icon {
    color: #ffffff;
    font-size: 40rpx;
  }
}

.issues__filter {
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
}
.issues__filter-item {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 26rpx;
}
.issues__hint {
  text-align: center;
  color: $gsy-gray;
  padding: 64rpx 0;
}
.issues__card {
  margin-bottom: 16rpx;
}
.issues__row {
  display: flex;
  flex-direction: row;
  margin-bottom: 20rpx;
}
.issues__avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 35rpx;
  margin-right: 20rpx;
}
.issues__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.issues__content {
  margin-top: 12rpx;
}
.issues__time {
  font-size: 22rpx;
  margin-top: 6rpx;
  margin-left: 12rpx;
}
.issues__bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}
.issues__state {
  margin-left: 90rpx;
  font-size: 24rpx;
}
.issues__number {
  font-size: 24rpx;
  flex: 1;
  margin-left: 10rpx;
}
.issues__comment {
  text-align: right;
  font-size: 24rpx;
  color: rgba(97, 97, 97, 0.9);
}
</style>
