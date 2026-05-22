<template>
  <view class="issue">
    <view v-if="loading" class="issue__hint"><text>加载中…</text></view>
    <template v-else-if="!data">
      <view class="issue__hint"><text>未能获取 Issue</text></view>
    </template>
    <template v-else>
      <view class="card-white-wrapper issue__head">
        <view class="issue__title-row">
          <text
            class="content-text-gray issue__state iconfont"
            :style="{ color: data.state === 'open' ? '#2cbe4e' : '#cb2431' }"
          >{{ '\ue661' }}</text>
          <text class="issue__number">#{{ data.number }}</text>
          <text class="issue__title">{{ data.title }}</text>
        </view>
        <view class="issue__author-row" @click="openUser(data.user?.login)">
          <image v-if="data.user?.avatar_url" :src="data.user.avatar_url" class="issue__avatar" />
          <view class="issue__author-main">
            <text class="name-text-theme">{{ data.user?.login }}</text>
            <text class="content-text-gray issue__time">{{ formatTime(data.updated_at || data.created_at) }}</text>
          </view>
        </view>
        <text v-if="data.body" class="content-text-gray issue__body">{{ data.body }}</text>
        <text v-else class="content-text-gray issue__body">无描述</text>
      </view>

      <view class="issue__section">
        <text class="issue__section-title">评论 ({{ data.comments }})</text>
        <view
          class="issue__action"
          @click="goEdit"
        >
          <text class="iconfont icon-pinglun issue__action-icon" />
          <text>发表评论</text>
        </view>
      </view>

      <view v-if="comments.length === 0" class="issue__hint"><text>暂无评论</text></view>
      <view
        v-for="(c, idx) in comments"
        :key="c.id || idx"
        class="card-white-wrapper issue__comment"
      >
        <view class="issue__author-row" @click="openUser(c.user?.login)">
          <image v-if="c.user?.avatar_url" :src="c.user.avatar_url" class="issue__avatar" />
          <view class="issue__author-main">
            <text class="name-text-theme">{{ c.user?.login }}</text>
            <text class="content-text-gray issue__time">{{ formatTime(c.updated_at || c.created_at) }}</text>
          </view>
        </view>
        <text class="content-text-gray issue__body">{{ c.body }}</text>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface User { login: string; avatar_url?: string }
interface IssueData {
  id: number
  number: number
  title: string
  body?: string
  state: string
  comments: number
  user?: User
  created_at?: string
  updated_at?: string
}
interface Comment {
  id: number
  body: string
  user?: User
  created_at?: string
  updated_at?: string
}

const owner = ref('')
const name = ref('')
const number = ref('')
const data = ref<IssueData | null>(null)
const comments = ref<Comment[]>([])
const loading = ref(false)

async function load() {
  if (!owner.value || !name.value || !number.value) return
  loading.value = true
  try {
    const [d, c] = await Promise.all([
      http.getFetch<IssueData>(Address.getIssueDetail(owner.value, name.value, number.value)),
      http.getFetch<Comment[]>(Address.getIssueComments(owner.value, name.value, number.value, 1))
    ])
    if (d.result && typeof d.data === 'object') data.value = d.data as IssueData
    if (c.result && Array.isArray(c.data)) comments.value = c.data as Comment[]
    else comments.value = []
  } finally {
    loading.value = false
  }
}

function openUser(login?: string) {
  if (!login) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${login}` })
}

function goEdit() {
  uni.navigateTo({
    url: `/pages/edit-issue/index?owner=${owner.value}&name=${name.value}&number=${number.value}`
  })
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
  number.value = q?.number || ''
  load()
})

onShow(() => {
  if (data.value) load()
})
</script>

<style lang="scss" scoped>
.issue {
  padding: 24rpx;
  min-height: 100vh;
  background-color: $gsy-container;

  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 48rpx 0;
  }
  &__head {
    margin-bottom: 16rpx;
  }
  &__title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16rpx;
  }
  &__state {
    font-family: 'wxcIconFont';
    margin-right: 12rpx;
  }
  &__number {
    color: $gsy-gray;
    font-size: 26rpx;
    margin-right: 12rpx;
  }
  &__title {
    color: $gsy-theme-color;
    font-size: 30rpx;
    font-weight: 600;
    flex: 1;
  }
  &__author-row {
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
  &__author-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__time {
    font-size: 22rpx;
    margin-top: 4rpx;
  }
  &__body {
    display: block;
    line-height: 1.6;
    word-break: break-word;
  }
  &__section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 12rpx 12rpx;
  }
  &__section-title {
    color: $gsy-theme-color;
    font-size: 28rpx;
    font-weight: 600;
  }
  &__action {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $gsy-action-blue;
    font-size: 26rpx;
    background: #ffffff;
    padding: 12rpx 24rpx;
    border-radius: 8rpx;
    box-shadow: $gsy-box-shadow;
  }
  &__action-icon {
    font-family: 'wxcIconFont';
    color: $gsy-action-blue;
    margin-right: 8rpx;
  }
  &__action text {
    color: $gsy-action-blue;
  }
  &__comment {
    margin-bottom: 16rpx;
  }
}
</style>
