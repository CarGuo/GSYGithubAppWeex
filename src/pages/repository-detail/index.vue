<template>
  <view class="repo">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">{{ owner ? `${owner}/${name}` : '仓库' }}</text>
      <view class="navbar__action" @click="togglePopover">
        <text class="wxcIconFont navbar__icon">&#xe674;</text>
      </view>
    </view>

    <scroll-view class="repo__scroll" scroll-y refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="onRefresh">
      <view v-if="loading && !data" class="repo__hint"><text>加载中…</text></view>
      <view v-else-if="!data" class="repo__hint"><text>未能获取仓库</text></view>
      <template v-else>
        <view class="card-black-wrapper repo__head">
          <view class="repo__title-row" @click="openOwner">
            <text class="repo__user">{{ data.owner.login }}</text>
            <text class="repo__user repo__name">{{ ' / ' }}</text>
            <text class="repo__user repo__name">{{ data.name }}</text>
          </view>
          <view class="repo__meta">
            <text class="repo__meta-text">{{ data.language || '' }}</text>
            <text class="repo__meta-text">{{ data.size ? (data.size / 1024).toFixed(2) + 'M' : '' }}</text>
            <text class="repo__meta-text">{{ data.license?.name || '' }}</text>
          </view>
          <text class="repo__des">{{ data.description || '无描述' }}</text>
          <text class="repo__time">{{ infoText }}</text>

          <view class="repo__bottom">
            <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposStarer', 'Starer')">
              <text class="wxcIconFont repo__bottom-text">{{ '\ue643 ' + (data.watchers_count ?? '---') }}</text>
            </view>
            <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposForker', 'Forker')">
              <text class="wxcIconFont repo__bottom-text">{{ '\ue67e ' + (data.forks_count ?? '---') }}</text>
            </view>
            <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposWatcher', 'Watcher')">
              <text class="wxcIconFont repo__bottom-text">{{ '\ue681 ' + (data.subscribers_count ?? '---') }}</text>
            </view>
            <view class="repo__bottom-item" @click="openIssues">
              <text class="wxcIconFont repo__bottom-text">{{ '\ue661 ' + (data.open_issues_count ?? '---') }}</text>
            </view>
          </view>
        </view>

        <view class="control-container">
          <text
            class="control-text"
            :style="{ color: tab === 1 ? '#FFFFFF' : '#AAAAAA' }"
            @click="onPickTab(1)"
          >动态</text>
          <text
            class="control-text"
            :style="{ color: tab === 2 ? '#FFFFFF' : '#AAAAAA' }"
            @click="onPickTab(2)"
          >提交</text>
        </view>

        <view v-if="tabLoading" class="repo__hint"><text>加载中…</text></view>

        <template v-else-if="tab === 1">
          <view
            v-for="(ev, idx) in events"
            :key="ev.id || idx"
            class="card-white-wrapper repo__event"
          >
            <view class="repo__event-head">
              <image class="repo__event-avatar" :src="ev.actor.avatar_url" mode="aspectFill" />
              <text class="name-text repo__event-login">{{ ev.actor.display_login || ev.actor.login }}</text>
              <text class="content-text-gray">{{ formatTime(ev.created_at) }}</text>
            </view>
            <text class="content-text-black-bold">{{ describeEvent(ev) }}</text>
            <text v-if="describeEvent2(ev)" class="content-text-gray text-line-three">{{ describeEvent2(ev) }}</text>
          </view>
          <view v-if="!events.length" class="repo__hint"><text>暂无动态</text></view>
        </template>

        <template v-else>
          <view
            v-for="(c, idx) in commits"
            :key="c.sha || idx"
            class="card-white-wrapper repo__event"
            @click="openCommit(c)"
          >
            <view class="repo__event-head">
              <image class="repo__event-avatar" :src="c.author?.avatar_url || '/static/default_img.png'" mode="aspectFill" />
              <text class="name-text repo__event-login">{{ c.author?.login || c.commit?.author?.name || '---' }}</text>
              <text class="content-text-gray">{{ formatTime(c.commit?.author?.date || '') }}</text>
            </view>
            <text class="content-text-black-bold text-line-three">{{ c.commit?.message || '' }}</text>
            <text class="content-text-gray repo__sha">{{ (c.sha || '').slice(0, 7) }}</text>
          </view>
          <view v-if="!commits.length" class="repo__hint"><text>暂无提交</text></view>
        </template>
      </template>
      <view class="repo__bottom-pad" />
    </scroll-view>

    <view v-if="popoverOpen" class="popover-mask" @click="popoverOpen = false">
      <view class="popover" @click.stop>
        <view class="popover__item" @click="closeAnd(openReadme)">
          <text class="popover__text">仓库简介</text>
        </view>
        <view class="popover__item" @click="closeAnd(openFiles)">
          <text class="popover__text">文件浏览</text>
        </view>
        <view class="popover__item" @click="closeAnd(openIssues)">
          <text class="popover__text">Issues</text>
        </view>
        <view class="popover__item" @click="closeAnd(() => goCommonList('reposContributor', 'Contributors'))">
          <text class="popover__text">Contributors</text>
        </view>
        <view class="popover__item" @click="closeAnd(() => openWeb(data?.html_url))">
          <text class="popover__text">在 GitHub 打开</text>
        </view>
        <view v-if="data?.homepage" class="popover__item" @click="closeAnd(() => openWeb(data?.homepage || ''))">
          <text class="popover__text">主页</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface RepoDetail {
  name: string
  description: string | null
  language: string | null
  size?: number
  license?: { name?: string } | null
  stargazers_count: number
  watchers_count?: number
  forks_count: number
  subscribers_count?: number
  open_issues_count: number
  html_url: string
  homepage?: string | null
  default_branch?: string
  pushed_at?: string
  created_at?: string
  owner: { login: string; avatar_url?: string }
}

interface GhEvent {
  id: string
  type: string
  created_at: string
  actor: { login: string; display_login?: string; avatar_url: string }
  repo: { name: string }
  payload: Record<string, any>
}

interface GhCommit {
  sha: string
  html_url?: string
  commit?: { message?: string; author?: { name?: string; date?: string } }
  author?: { login?: string; avatar_url?: string }
}

const data = ref<RepoDetail | null>(null)
const loading = ref(false)
const refreshing = ref(false)
const owner = ref('')
const name = ref('')
const tab = ref<1 | 2>(1)
const events = ref<GhEvent[]>([])
const commits = ref<GhCommit[]>([])
const tabLoading = ref(false)
const popoverOpen = ref(false)
const statusBarHeight = ref(0)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

const infoText = computed(() => {
  if (!data.value) return ''
  const t = data.value.pushed_at ? new Date(data.value.pushed_at) : null
  if (!t || isNaN(t.getTime())) return ''
  return `最后更新 ${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
})

async function loadRepo() {
  if (!owner.value || !name.value) return
  loading.value = true
  try {
    const res = await http.getFetch<RepoDetail>(Address.getReposDetail(owner.value, name.value))
    if (res.result && typeof res.data === 'object' && res.data !== null) {
      data.value = res.data as RepoDetail
    }
  } finally {
    loading.value = false
  }
}

async function loadEvents() {
  if (!owner.value || !name.value) return
  tabLoading.value = true
  try {
    const res = await http.getFetch<GhEvent[]>(Address.getReposEvent(owner.value, name.value, 1))
    if (res.result && Array.isArray(res.data)) events.value = res.data as GhEvent[]
  } finally {
    tabLoading.value = false
  }
}

async function loadCommits() {
  if (!owner.value || !name.value) return
  tabLoading.value = true
  try {
    const branch = data.value?.default_branch || ''
    const res = await http.getFetch<GhCommit[]>(Address.getReposCommits(owner.value, name.value, branch, 1))
    if (res.result && Array.isArray(res.data)) commits.value = res.data as GhCommit[]
  } finally {
    tabLoading.value = false
  }
}

function onPickTab(v: 1 | 2) {
  if (tab.value === v) return
  tab.value = v
  if (v === 1 && !events.value.length) loadEvents()
  if (v === 2 && !commits.value.length) loadCommits()
}

async function onRefresh() {
  refreshing.value = true
  try {
    await loadRepo()
    if (tab.value === 1) await loadEvents()
    else await loadCommits()
  } finally {
    refreshing.value = false
  }
}

onLoad(async (q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  await loadRepo()
  await loadEvents()
})

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
    case 'ReleaseEvent': return `发布了 ${ev.payload?.release?.tag_name || ''} @ ${repo}`
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
  if (isNaN(t)) return ''
  const diff = Math.floor((Date.now() - t) / 1000)
  if (diff < 60) return `${diff}s 前`
  if (diff < 3600) return `${Math.floor(diff / 60)}m 前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h 前`
  return `${Math.floor(diff / 86400)}d 前`
}

function openIssues() {
  uni.navigateTo({ url: `/pages/repository-issues/index?owner=${owner.value}&name=${name.value}` })
}
function openReadme() {
  uni.navigateTo({ url: `/pages/repository-detail-info/index?owner=${owner.value}&name=${name.value}` })
}
function openFiles() {
  const branch = data.value?.default_branch || ''
  uni.navigateTo({
    url: `/pages/repository-files/index?owner=${owner.value}&name=${name.value}&branch=${encodeURIComponent(branch)}`
  })
}
function openWeb(url?: string | null) {
  if (!url) return
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(url)}` })
}
function openOwner() {
  if (!data.value) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${data.value.owner.login}` })
}
function openCommit(c: GhCommit) {
  if (c.html_url) openWeb(c.html_url)
}
function goCommonList(dataType: string, title: string) {
  uni.navigateTo({
    url: `/pages/common-list/index?owner=${owner.value}&name=${name.value}&dataType=${dataType}&title=${encodeURIComponent(title)}`
  })
}
function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}
function togglePopover() { popoverOpen.value = !popoverOpen.value }
function closeAnd(fn: () => void) { popoverOpen.value = false; fn() }
</script>

<style lang="scss" scoped>
.repo {
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
    max-width: 500rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  &__action {
    position: absolute;
    right: 0;
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

.repo__scroll {
  flex: 1;
  width: 100%;
}
.repo__hint {
  text-align: center;
  color: $gsy-gray;
  padding: 60rpx 0;
}
.repo__bottom-pad {
  height: 40rpx;
}

.repo__head {
  margin-top: 0;
}
.repo__title-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.repo__user {
  color: #ffffff;
  font-weight: bold;
  font-size: 32rpx;
}
.repo__name { font-size: 34rpx; }

.repo__meta {
  display: flex;
  flex-direction: row;
  margin-top: 20rpx;
}
.repo__meta-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
  margin-right: 20rpx;
}

.repo__des {
  display: block;
  color: rgba(227, 227, 227, 0.85);
  font-size: 28rpx;
  font-weight: bold;
  margin-top: 20rpx;
}
.repo__time {
  display: block;
  color: rgba(255, 255, 255, 0.5);
  font-size: 22rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  text-align: right;
}

.repo__bottom {
  display: flex;
  flex-direction: row;
  margin-top: 20rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.5);
  padding-top: 16rpx;
}
.repo__bottom-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8rpx 0;
}
.repo__bottom-line {
  border-right: 1rpx solid rgba(255, 255, 255, 0.5);
}
.repo__bottom-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 26rpx;
}

.control-container {
  display: flex;
  flex-direction: row;
  width: 710rpx;
  margin: 30rpx auto 20rpx;
  background-color: $gsy-theme-color;
  border-radius: 15rpx;
  padding: 20rpx;
  box-shadow: $gsy-box-shadow;
  align-items: center;
  justify-content: center;
}
.control-text {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
}

.repo__event {
  margin-top: 20rpx;
}
.repo__event-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16rpx;
}
.repo__event-avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 25rpx;
  margin-right: 20rpx;
  background: $gsy-mi-white;
}
.repo__event-login {
  flex: 1;
}
.repo__sha {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
}

.popover-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 200;
}
.popover {
  position: absolute;
  top: calc(100rpx + env(safe-area-inset-top) + 10rpx);
  right: 20rpx;
  width: 300rpx;
  background: #ffffff;
  border-radius: 10rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
  padding: 10rpx 0;
}
.popover__item {
  padding: 24rpx 30rpx;
  border-bottom: 1rpx solid #eaeaea;
}
.popover__item:last-child { border-bottom: none; }
.popover__text {
  color: $gsy-theme-color;
  font-size: 28rpx;
}
</style>
