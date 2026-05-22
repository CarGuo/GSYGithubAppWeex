<template>
  <view class="repo">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">{{ owner ? `${owner}/${name}` : '仓库' }}</text>
      <view class="navbar__action" @click="openOnGitHub">
        <text class="wxcIconFont navbar__icon">&#xea0a;</text>
      </view>
    </view>

    <view class="tabbar">
      <view
        v-for="(t, idx) in tabTitles"
        :key="t"
        class="tabbar__item"
        :class="{ 'tabbar__item--active': tab === idx }"
        @click="onPickTab(idx)"
      >
        <text class="tabbar__text" :style="{ color: tab === idx ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }">{{ t }}</text>
      </view>
    </view>

    <view class="repo__body">
      <!-- README tab -->
      <view v-show="tab === 0" class="repo__tab">
        <web-view
          v-if="readmeSrcDoc"
          :webview-styles="webviewStyles"
          :update-title="false"
          :src="readmeUri"
        ></web-view>
        <view v-else-if="readmeLoading" class="repo__hint"><text>加载中…</text></view>
        <view v-else class="repo__hint"><text>暂无 README</text></view>
      </view>

      <!-- Info tab -->
      <scroll-view v-show="tab === 1" class="repo__tab" scroll-y refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="onRefresh">
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
                <text class="wxcIconFont repo__bottom-text">{{ '\ue643 ' + (data.stargazers_count ?? '---') }}</text>
              </view>
              <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposForker', 'Forker')">
                <text class="wxcIconFont repo__bottom-text">{{ '\ue67e ' + (data.forks_count ?? '---') }}</text>
              </view>
              <view class="repo__bottom-item repo__bottom-line" @click="goCommonList('reposWatcher', 'Watcher')">
                <text class="wxcIconFont repo__bottom-text">{{ '\ue681 ' + (data.subscribers_count ?? '---') }}</text>
              </view>
              <view class="repo__bottom-item" @click="onPickTab(3)">
                <text class="wxcIconFont repo__bottom-text">{{ '\ue661 ' + (data.open_issues_count ?? '---') }}</text>
              </view>
            </view>
          </view>

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
          </view>
          <view v-if="!events.length" class="repo__hint"><text>暂无动态</text></view>
        </template>
        <view class="repo__bottom-pad" />
      </scroll-view>

      <!-- Files tab -->
      <scroll-view v-show="tab === 2" class="repo__tab" scroll-y>
        <view v-if="filesLoading" class="repo__hint"><text>加载中…</text></view>
        <view v-else>
          <view v-if="filePath" class="files__crumb" @click="goUpDir">
            <text class="wxcIconFont files__crumb-icon">&#xe78a;</text>
            <text class="files__crumb-text">{{ filePath || '/' }}</text>
          </view>
          <view
            v-for="(f, idx) in files"
            :key="f.sha || idx"
            class="card-white-wrapper files__item"
            @click="onFileClick(f)"
          >
            <text class="wxcIconFont files__icon">{{ f.type === 'dir' ? '\ue793' : '\uea77' }}</text>
            <text class="files__name">{{ f.name }}</text>
            <text class="wxcIconFont files__arrow">&#xe610;</text>
          </view>
          <view v-if="!files.length" class="repo__hint"><text>暂无文件</text></view>
        </view>
        <view class="repo__bottom-pad" />
      </scroll-view>

      <!-- Issues tab -->
      <scroll-view v-show="tab === 3" class="repo__tab" scroll-y>
        <view class="control-container">
          <text
            v-for="s in (['open','closed','all'] as const)"
            :key="s"
            class="control-text"
            :style="{ color: issueState === s ? '#FFFFFF' : '#AAAAAA' }"
            @click="onPickIssueState(s)"
          >{{ s === 'open' ? 'Open' : s === 'closed' ? 'Closed' : 'All' }}</text>
        </view>

        <view v-if="issuesLoading" class="repo__hint"><text>加载中…</text></view>
        <view v-else>
          <view
            v-for="(it, idx) in issues"
            :key="it.id || idx"
            class="card-white-wrapper issue__card"
            @click="openIssueDetail(it)"
          >
            <view class="issue__row">
              <text
                class="wxcIconFont issue__state"
                :style="{ color: it.state === 'open' ? '#2cbe4e' : '#cb2431' }"
              >&#xe661;</text>
              <text class="issue__num">#{{ it.number }}</text>
              <text class="issue__title">{{ it.title }}</text>
            </view>
            <view class="issue__foot">
              <text class="content-text-gray">{{ it.user?.login || '' }}</text>
              <text class="wxcIconFont issue__cmt">&#xe6ba; {{ it.comments }}</text>
            </view>
          </view>
          <view v-if="!issues.length" class="repo__hint"><text>暂无 Issues</text></view>
        </view>
        <view class="repo__bottom-pad" />
      </scroll-view>
    </view>

    <!-- Bottom Star / Watch / Fork / Branch -->
    <view class="control">
      <view class="control__item control__line" @click="onStar">
        <text class="wxcIconFont control__text">{{ (starred ? '\ue698' : '\ue630') + ' ' + (starred ? 'UnStar' : 'Star') }}</text>
      </view>
      <view class="control__item control__line" @click="onWatch">
        <text class="wxcIconFont control__text">{{ (watched ? '\ue629' : '\ue681') + ' ' + (watched ? 'UnWatch' : 'Watch') }}</text>
      </view>
      <view class="control__item control__line" @click="onFork">
        <text class="wxcIconFont control__text">&#xe67e; Fork</text>
      </view>
      <view class="control__item" @click="onBranch">
        <text class="wxcIconFont control__text">&#xe61a; {{ curBranch || '---' }}</text>
      </view>
    </view>

    <!-- Branch popover -->
    <view v-if="branchOpen" class="popover-mask" @click="branchOpen = false">
      <view class="popover" @click.stop>
        <view
          v-for="b in branches"
          :key="b"
          class="popover__item"
          @click="onPickBranch(b)"
        >
          <text class="popover__text">{{ b }}</text>
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
import { generateHtml } from '@/utils/htmlUtils'

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

interface FileNode {
  name: string
  type: 'file' | 'dir' | string
  sha?: string
  path: string
}

interface IssueLite {
  id: number
  number: number
  title: string
  state: string
  comments: number
  user?: { login: string }
}

const tabTitles = ['README', 'Info', 'Files', 'Issues']
const data = ref<RepoDetail | null>(null)
const loading = ref(false)
const refreshing = ref(false)
const owner = ref('')
const name = ref('')
const tab = ref(0)
const events = ref<GhEvent[]>([])
const statusBarHeight = ref(0)

const readmeSrcDoc = ref('')
const readmeLoading = ref(false)
const readmeLoaded = ref(false)

const files = ref<FileNode[]>([])
const filePath = ref('')
const filesLoading = ref(false)
const filesLoaded = ref(false)

const issues = ref<IssueLite[]>([])
const issueState = ref<'open' | 'closed' | 'all'>('open')
const issuesLoading = ref(false)
const issuesLoaded = ref(false)

const eventsLoaded = ref(false)

const starred = ref(false)
const watched = ref(false)

const curBranch = ref('')
const branches = ref<string[]>([])
const branchOpen = ref(false)

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

const webviewStyles = { progress: { color: '#3c3f41' } }
const readmeUri = computed(() => {
  if (!readmeSrcDoc.value) return ''
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(readmeSrcDoc.value)
})

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
      curBranch.value = data.value.default_branch || curBranch.value
    }
  } finally {
    loading.value = false
  }
}

async function loadEvents(force = false) {
  if (!owner.value || !name.value) return
  if (!force && eventsLoaded.value) return
  const res = await http.getFetch<GhEvent[]>(Address.getReposEvent(owner.value, name.value, 1))
  if (res.result && Array.isArray(res.data)) events.value = res.data as GhEvent[]
  eventsLoaded.value = true
}

async function loadReadme(force = false) {
  if (!owner.value || !name.value) return
  if (!force && readmeLoaded.value) return
  if (readmeLoading.value) return
  readmeLoading.value = true
  try {
    const res = await http.getFetch<string>(
      Address.getReposReadme(owner.value, name.value),
      { Accept: 'application/vnd.github.html' }
    )
    if (res.result && typeof res.data === 'string' && res.data.length > 0) {
      readmeSrcDoc.value = generateHtml(res.data)
    }
    readmeLoaded.value = true
  } catch (_) {
    // ignore
  } finally {
    readmeLoading.value = false
  }
}

async function loadFiles(path = '') {
  if (!owner.value || !name.value) return
  filesLoading.value = true
  try {
    const res = await http.getFetch<FileNode[] | FileNode>(
      Address.getReposContent(owner.value, name.value, path, curBranch.value)
    )
    if (res.result && Array.isArray(res.data)) {
      const arr = res.data as FileNode[]
      arr.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name)
        return a.type === 'dir' ? -1 : 1
      })
      files.value = arr
      filePath.value = path
      filesLoaded.value = true
    }
  } finally {
    filesLoading.value = false
  }
}

async function loadIssues(force = false) {
  if (!owner.value || !name.value) return
  if (!force && issuesLoaded.value) return
  issuesLoading.value = true
  try {
    const res = await http.getFetch<IssueLite[]>(
      Address.getReposIssues(owner.value, name.value, issueState.value, 1)
    )
    if (res.result && Array.isArray(res.data)) issues.value = res.data as IssueLite[]
    issuesLoaded.value = true
  } finally {
    issuesLoading.value = false
  }
}

async function loadStatus() {
  if (!owner.value || !name.value) return
  try {
    const r1 = await http.netFetch(Address.getReposStarStatus(owner.value, name.value), 'GET', null, true)
    starred.value = !!r1.result
  } catch (_) {}
  try {
    const r2 = await http.netFetch(Address.getReposWatchStatus(owner.value, name.value), 'GET', null, true)
    watched.value = !!r2.result
  } catch (_) {}
}

async function loadBranches() {
  if (!owner.value || !name.value) return
  const res = await http.getFetch<{ name: string }[]>(Address.getReposBranches(owner.value, name.value))
  if (res.result && Array.isArray(res.data)) {
    branches.value = (res.data as { name: string }[]).map((b) => b.name)
  }
}

function onPickTab(v: number) {
  console.info('[repo-detail] tab clicked', v)
  tab.value = v
  if (v === 0 && !readmeLoaded.value) loadReadme()
  if (v === 1 && !eventsLoaded.value) loadEvents()
  if (v === 2 && !filesLoaded.value) loadFiles('')
  if (v === 3 && !issuesLoaded.value) loadIssues()
}

async function onRefresh() {
  refreshing.value = true
  try {
    await loadRepo()
    await loadEvents(true)
  } finally {
    refreshing.value = false
  }
}

onLoad(async (q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  await loadRepo()
  loadReadme()
  loadEvents()
  loadStatus()
  loadBranches()
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

function onFileClick(f: FileNode) {
  if (f.type === 'dir') {
    loadFiles(f.path)
  } else {
    uni.navigateTo({
      url: `/pages/code-detail/index?owner=${owner.value}&name=${name.value}&path=${encodeURIComponent(f.path)}&branch=${encodeURIComponent(curBranch.value)}`
    })
  }
}

function goUpDir() {
  if (!filePath.value) return
  const parts = filePath.value.split('/').filter(Boolean)
  parts.pop()
  loadFiles(parts.join('/'))
}

function onPickIssueState(s: 'open' | 'closed' | 'all') {
  if (s === issueState.value) return
  issueState.value = s
  issues.value = []
  issuesLoaded.value = false
  loadIssues()
}

function openIssueDetail(it: IssueLite) {
  uni.navigateTo({
    url: `/pages/issue-detail/index?owner=${owner.value}&name=${name.value}&number=${it.number}`
  })
}

async function onStar() {
  try {
    const res = await http.netFetch(
      Address.doStar(owner.value, name.value),
      starred.value ? 'DELETE' : 'PUT',
      null,
      true
    )
    if (res.result) {
      starred.value = !starred.value
      uni.showToast({ title: starred.value ? '已 Star' : '已取消 Star', icon: 'none' })
    }
  } catch (_) {}
}

async function onWatch() {
  try {
    const res = await http.netFetch(
      Address.doWatch(owner.value, name.value),
      watched.value ? 'DELETE' : 'PUT',
      watched.value ? null : { subscribed: true },
      true
    )
    if (res.result) {
      watched.value = !watched.value
      uni.showToast({ title: watched.value ? '已 Watch' : '已取消 Watch', icon: 'none' })
    }
  } catch (_) {}
}

async function onFork() {
  uni.showLoading({ title: 'Fork 中…' })
  try {
    const res = await http.netFetch(Address.doFork(owner.value, name.value), 'POST', null, true)
    uni.showToast({ title: res.result ? 'Fork 成功' : 'Fork 失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

function onBranch() {
  if (!branches.value.length) return
  branchOpen.value = !branchOpen.value
}

function onPickBranch(b: string) {
  curBranch.value = b
  branchOpen.value = false
  readmeSrcDoc.value = ''
  readmeLoaded.value = false
  files.value = []
  filePath.value = ''
  filesLoaded.value = false
  if (tab.value === 0) loadReadme()
  if (tab.value === 2) loadFiles('')
}

function openOnGitHub() {
  if (!data.value) return
  uni.navigateTo({ url: `/pages/web/index?url=${encodeURIComponent(data.value.html_url)}` })
}

function openOwner() {
  if (!data.value) return
  uni.navigateTo({ url: `/pages/user-info/index?login=${data.value.owner.login}` })
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

.tabbar {
  display: flex;
  flex-direction: row;
  background-color: $gsy-theme-color;
  height: 80rpx;
  align-items: center;
  border-top: 1rpx solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  &__item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 4rpx solid transparent;
    cursor: pointer;
  }
  &__item--active {
    border-bottom-color: #ffffff;
  }
  &__text {
    font-size: 28rpx;
    pointer-events: none;
  }
}

.repo__body {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.repo__tab {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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

.files__crumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16rpx 30rpx;
  background: #ffffff;
  border-bottom: 1rpx solid $gsy-mi-white;
}
.files__crumb-icon {
  color: $gsy-theme-color;
  font-size: 32rpx;
  margin-right: 12rpx;
}
.files__crumb-text {
  color: $gsy-theme-color;
  font-size: 26rpx;
}
.files__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24rpx 30rpx;
  margin: 16rpx 24rpx 0;
}
.files__icon {
  color: $gsy-theme-color;
  font-size: 36rpx;
  margin-right: 20rpx;
}
.files__name {
  flex: 1;
  color: $gsy-theme-color;
  font-size: 28rpx;
}
.files__arrow {
  color: $gsy-gray;
  font-size: 28rpx;
}

.control-container {
  display: flex;
  flex-direction: row;
  width: 710rpx;
  margin: 24rpx auto 16rpx;
  background-color: $gsy-theme-color;
  border-radius: 30rpx;
  padding: 20rpx;
  box-shadow: $gsy-box-shadow;
}
.control-text {
  flex: 1;
  text-align: center;
  font-size: 26rpx;
}
.issue__card {
  margin: 16rpx 24rpx 0;
}
.issue__row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.issue__state {
  margin-right: 12rpx;
  font-size: 30rpx;
}
.issue__num {
  color: $gsy-gray;
  font-size: 24rpx;
  margin-right: 12rpx;
}
.issue__title {
  flex: 1;
  color: $gsy-theme-color;
  font-size: 28rpx;
  font-weight: 600;
}
.issue__foot {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
}
.issue__cmt {
  color: $gsy-gray;
  font-size: 24rpx;
}

.control {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  height: 96rpx;
  align-items: center;
  border-top: 1rpx solid $gsy-mi-white;
  padding-bottom: env(safe-area-inset-bottom);
  &__item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  &__line {
    border-right: 1rpx solid $gsy-mi-white;
  }
  &__text {
    color: $gsy-theme-color;
    font-size: 24rpx;
  }
}

.popover-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 200;
}
.popover {
  position: absolute;
  bottom: 110rpx;
  right: 30rpx;
  max-height: 600rpx;
  width: 320rpx;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 10rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
  padding: 10rpx 0;
}
.popover__item {
  padding: 24rpx 30rpx;
  border-bottom: 1rpx solid $gsy-mi-white;
}
.popover__item:last-child { border-bottom: none; }
.popover__text {
  color: $gsy-theme-color;
  font-size: 26rpx;
}
</style>
