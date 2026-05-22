<template>
  <view class="issues">
    <view class="issues__filter">
      <text :class="['issues__filter-item', { 'is-active': state === 'open' }]" @click="setState('open')">Open</text>
      <text :class="['issues__filter-item', { 'is-active': state === 'closed' }]" @click="setState('closed')">Closed</text>
      <text :class="['issues__filter-item', { 'is-active': state === 'all' }]" @click="setState('all')">All</text>
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
            class="content-text-gray issues__state iconfont"
            :style="{ color: it.state === 'open' ? '#2cbe4e' : '#cb2431' }"
          >{{ '\ue661' }}</text>
          <text class="content-text-gray issues__number">{{ ' #' + it.number }}</text>
          <text class="content-text-gray issues__comment iconfont">{{ '\ue6ba ' + (it.comments ?? 0) }}</text>
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

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  load()
})
</script>

<style lang="scss" scoped>
.issues {
  padding: 24rpx;
  min-height: 100vh;
  background-color: $gsy-container;

  &__filter {
    display: flex;
    background: #ffffff;
    border-radius: 10rpx;
    margin-bottom: 24rpx;
    overflow: hidden;
    box-shadow: $gsy-box-shadow;
  }
  &__filter-item {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    color: $gsy-gray;
    &.is-active {
      color: $gsy-theme-color;
      font-weight: 600;
      border-bottom: 4rpx solid $gsy-theme-color;
    }
  }
  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 64rpx 0;
  }
  &__card {
    margin-bottom: 16rpx;
  }
  &__row {
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
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
  &__content {
    margin-top: 12rpx;
  }
  &__time {
    font-size: 22rpx;
    margin-top: 6rpx;
    margin-left: 12rpx;
  }
  &__bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
  }
  &__state {
    margin-left: 90rpx;
    font-family: 'wxcIconFont';
  }
  &__number {
    font-size: 24rpx;
    flex: 1;
    margin-left: 10rpx;
  }
  &__comment {
    text-align: right;
    font-size: 24rpx;
    font-family: 'wxcIconFont';
  }
}
</style>
