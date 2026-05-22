<template>
  <view class="issue">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">Issue 详情</text>
    </view>
    <scroll-view
      scroll-y
      class="issue__scroll"
      :style="{ height: scrollHeight + 'px' }"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
    >
      <view v-if="loading && !data" class="issue__hint"><text>加载中…</text></view>
      <template v-else-if="!data">
        <view class="issue__hint"><text>未能获取 Issue</text></view>
      </template>
      <template v-else>
        <view class="card-white-wrapper issue__head">
          <view class="issue__title-row">
            <text
              class="wxcIconFont issue__state"
              :style="{ color: data.state === 'open' ? '#2cbe4e' : '#cb2431' }"
            >&#xe661;</text>
            <text class="issue__number">#{{ data.number }}</text>
            <text class="issue__title">{{ data.title }}</text>
          </view>
          <view class="issue__author-row" @click="openUser(data.user?.login)">
            <image v-if="data.user?.avatar_url" :src="data.user.avatar_url" class="issue__avatar" />
            <view class="issue__author-main">
              <text class="name-text-theme">{{ data.user?.login }}</text>
              <text class="content-text-gray issue__time">{{ formatTime(data.updated_at || data.created_at) }}</text>
            </view>
            <text v-if="data.locked" class="issue__lock-tag">已锁定</text>
          </view>
          <text v-if="data.body" class="content-text-gray issue__body">{{ data.body }}</text>
          <text v-else class="content-text-gray issue__body">无描述</text>
        </view>

        <view class="issue__section">
          <text class="issue__section-title">评论 ({{ data.comments }})</text>
        </view>

        <view v-if="comments.length === 0 && !loading" class="issue__hint"><text>暂无评论</text></view>
        <view
          v-for="(c, idx) in comments"
          :key="c.id || idx"
          class="card-white-wrapper issue__comment"
          @longpress="openCommentMenu(idx)"
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
        <view v-if="loadingMore" class="issue__hint"><text>加载更多…</text></view>
        <view v-else-if="!hasMore && comments.length > 0" class="issue__hint"><text>没有更多了</text></view>
      </template>
    </scroll-view>

    <view v-if="data" class="issue__bottom-bar">
      <view class="issue__bottom-item issue__bottom-line" @click="replyClick">
        <text class="issue__bottom-text">回复</text>
      </view>
      <view class="issue__bottom-item issue__bottom-line" @click="editIssueClick">
        <text class="issue__bottom-text">编辑</text>
      </view>
      <view class="issue__bottom-item issue__bottom-line" @click="closeClick">
        <text class="issue__bottom-text">{{ data.state === 'closed' ? '打开' : '关闭' }}</text>
      </view>
      <view class="issue__bottom-item" @click="lockClick">
        <text class="issue__bottom-text">{{ data.locked ? '解锁' : '锁定' }}</text>
      </view>
    </view>

    <view v-if="showCommentMenu" class="issue__mask" @click="closeCommentMenu">
      <view class="issue__sheet" @click.stop>
        <text class="issue__sheet-item" @click="onCommentEdit">编辑</text>
        <text class="issue__sheet-item issue__sheet-item--danger" @click="onCommentDelete">删除</text>
        <text class="issue__sheet-item" @click="onCommentCopy">复制</text>
        <text class="issue__sheet-cancel" @click="closeCommentMenu">取消</text>
      </view>
    </view>

    <view v-if="busy" class="issue__loading-mask">
      <text class="issue__loading-text">处理中…</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'
import { PAGE_SIZE } from '@/config'

interface User { login: string; avatar_url?: string }
interface IssueData {
  id: number
  number: number
  title: string
  body?: string
  state: string
  locked?: boolean
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
const loadingMore = ref(false)
const refreshing = ref(false)
const hasMore = ref(true)
const currentPage = ref(1)
const statusBarHeight = ref(0)
const screenHeight = ref(0)
const showCommentMenu = ref(false)
const activeCommentIdx = ref(-1)
const busy = ref(false)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
  screenHeight.value = sys.windowHeight || 0
} catch (_) {}

const scrollHeight = computed(() => {
  // 屏高 - 自画 navbar(50)+statusBar - 底部操作栏(50)
  const nav = 50 + statusBarHeight.value
  const bottom = 50
  return Math.max(0, screenHeight.value - nav - bottom)
})

function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}

async function loadDetail() {
  if (!owner.value || !name.value || !number.value) return
  const d = await http.getFetch<IssueData>(Address.getIssueDetail(owner.value, name.value, number.value))
  if (d.result && typeof d.data === 'object') data.value = d.data as IssueData
}

async function loadComments(page = 1, append = false) {
  if (!owner.value || !name.value || !number.value) return
  if (append) loadingMore.value = true
  const c = await http.getFetch<Comment[]>(
    Address.getIssueComments(owner.value, name.value, number.value, page)
  )
  if (c.result && Array.isArray(c.data)) {
    const list = c.data as Comment[]
    comments.value = append ? comments.value.concat(list) : list
    hasMore.value = list.length >= PAGE_SIZE
  } else if (!append) {
    comments.value = []
    hasMore.value = false
  }
  loadingMore.value = false
}

async function load(reset = true) {
  if (reset) {
    loading.value = true
    currentPage.value = 1
    hasMore.value = true
  }
  try {
    await Promise.all([loadDetail(), loadComments(currentPage.value, false)])
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

function onRefresh() {
  refreshing.value = true
  load(true)
}

async function onLoadMore() {
  if (loadingMore.value || !hasMore.value) return
  currentPage.value += 1
  await loadComments(currentPage.value, true)
}

function openUser(login?: string) {
  if (!login) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${login}` })
}

function replyClick() {
  uni.navigateTo({
    url: `/pages/edit-issue/index?owner=${owner.value}&name=${name.value}&number=${number.value}&type=commentIssue`
  })
}

function editIssueClick() {
  if (!data.value) return
  const params = new URLSearchParams({
    owner: owner.value,
    name: name.value,
    number: number.value,
    type: 'editIssue',
    needTitle: '1',
    editTitle: data.value.title || '',
    editValue: data.value.body || ''
  })
  uni.navigateTo({ url: `/pages/edit-issue/index?${params.toString()}` })
}

async function closeClick() {
  if (!data.value) return
  busy.value = true
  try {
    const next = data.value.state === 'closed' ? 'open' : 'closed'
    await http.netFetch(
      Address.editIssue(owner.value, name.value, number.value),
      'PATCH',
      { state: next },
      true
    )
    await loadDetail()
    uni.showToast({ title: next === 'closed' ? '已关闭' : '已打开', icon: 'none' })
  } finally {
    busy.value = false
  }
}

async function lockClick() {
  if (!data.value) return
  busy.value = true
  try {
    const locked = !!data.value.locked
    await http.netFetch(
      Address.lockIssue(owner.value, name.value, number.value),
      locked ? 'DELETE' : 'PUT',
      locked ? null : { lock_reason: 'off-topic' },
      true
    )
    await loadDetail()
    uni.showToast({ title: locked ? '已解锁' : '已锁定', icon: 'none' })
  } finally {
    busy.value = false
  }
}

function openCommentMenu(idx: number) {
  activeCommentIdx.value = idx
  showCommentMenu.value = true
}

function closeCommentMenu() {
  showCommentMenu.value = false
  activeCommentIdx.value = -1
}

function onCommentEdit() {
  const idx = activeCommentIdx.value
  closeCommentMenu()
  if (idx < 0) return
  const c = comments.value[idx]
  if (!c) return
  const params = new URLSearchParams({
    owner: owner.value,
    name: name.value,
    number: number.value,
    type: 'editComment',
    commentNum: String(c.id),
    editValue: c.body || ''
  })
  uni.navigateTo({ url: `/pages/edit-issue/index?${params.toString()}` })
}

async function onCommentDelete() {
  const idx = activeCommentIdx.value
  closeCommentMenu()
  if (idx < 0) return
  const c = comments.value[idx]
  if (!c) return
  busy.value = true
  try {
    await http.netFetch(Address.issueComment(owner.value, name.value, c.id), 'DELETE', null, true)
    await load(true)
    uni.showToast({ title: '已删除', icon: 'none' })
  } finally {
    busy.value = false
  }
}

function onCommentCopy() {
  const idx = activeCommentIdx.value
  closeCommentMenu()
  if (idx < 0) return
  const c = comments.value[idx]
  if (!c) return
  uni.setClipboardData({ data: c.body || '' })
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
  load(true)
})

onShow(() => {
  if (data.value) load(true)
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
.issue {
  padding: 0 0 24rpx;
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
  &__lock-tag {
    margin-left: 12rpx;
    color: #cb2431;
    font-size: 22rpx;
    border: 1rpx solid #cb2431;
    border-radius: 8rpx;
    padding: 2rpx 10rpx;
  }
  &__bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    box-shadow: $gsy-box-shadow;
    z-index: 10;
  }
  &__bottom-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__bottom-line {
    border-right: 1rpx solid #ececec;
  }
  &__bottom-text {
    color: $gsy-theme-color;
    font-size: 28rpx;
  }
  &__mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 100;
    display: flex;
    align-items: flex-end;
  }
  &__sheet {
    width: 100%;
    background-color: #ffffff;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    padding: 12rpx 0 24rpx;
  }
  &__sheet-item {
    display: block;
    text-align: center;
    color: $gsy-theme-color;
    font-size: 30rpx;
    padding: 28rpx 0;
    border-bottom: 1rpx solid #ececec;
    &--danger {
      color: #cb2431;
    }
  }
  &__sheet-cancel {
    display: block;
    text-align: center;
    color: $gsy-gray;
    font-size: 30rpx;
    padding: 28rpx 0 0;
  }
  &__loading-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
  }
  &__loading-text {
    color: #ffffff;
    background: rgba(0, 0, 0, 0.6);
    padding: 16rpx 32rpx;
    border-radius: 8rpx;
    font-size: 26rpx;
  }
}
</style>
