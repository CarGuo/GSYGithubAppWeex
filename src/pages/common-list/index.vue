<template>
  <view class="list">
    <view v-if="loading && page === 1" class="list__hint"><text>加载中…</text></view>
    <view v-else-if="items.length === 0" class="list__hint"><text>暂无数据</text></view>
    <view v-else>
      <view
        v-for="(it, idx) in items"
        :key="it.id || idx"
        class="card-white-wrapper list__card"
        @click="onItem(it)"
      >
        <image
          v-if="it.avatar_url"
          :src="it.avatar_url"
          class="list__avatar"
        />
        <view class="list__main">
          <text class="name-text-theme">{{ it.login }}</text>
          <text v-if="it.subText" class="content-text-gray list__sub">{{ it.subText }}</text>
        </view>
        <text class="list__arrow">›</text>
      </view>
      <view v-if="loading && page > 1" class="list__hint"><text>加载更多…</text></view>
      <view v-else-if="!noMore" class="list__more" @click="loadMore">
        <text>加载更多</text>
      </view>
      <view v-else class="list__hint"><text>—— 到底了 ——</text></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

interface Item {
  id?: number
  login: string
  avatar_url?: string
  subText?: string
}

const owner = ref('')
const name = ref('')
const dataType = ref('')
const items = ref<Item[]>([])
const page = ref(1)
const loading = ref(false)
const noMore = ref(false)

function buildUrl(p: number): string {
  switch (dataType.value) {
    case 'reposStarer':
      return Address.getReposStargazers(owner.value, name.value, p)
    case 'reposForker':
      return Address.getReposForks(owner.value, name.value, p)
    case 'reposWatcher':
      return Address.getReposSubscribers(owner.value, name.value, p)
    case 'reposContributor':
      return Address.getReposContributors(owner.value, name.value, p)
    default:
      return ''
  }
}

function normalize(raw: any[]): Item[] {
  if (dataType.value === 'reposForker') {
    return raw.map((r) => ({
      id: r.id,
      login: r.owner?.login || r.full_name || '',
      avatar_url: r.owner?.avatar_url,
      subText: r.full_name
    }))
  }
  return raw.map((r) => ({
    id: r.id,
    login: r.login || '',
    avatar_url: r.avatar_url,
    subText: r.contributions ? `贡献 ${r.contributions} commits` : ''
  }))
}

async function load(p: number) {
  const url = buildUrl(p)
  if (!url) return
  loading.value = true
  try {
    const res = await http.getFetch<any[]>(url)
    if (res.result && Array.isArray(res.data)) {
      const next = normalize(res.data as any[])
      if (p === 1) items.value = next
      else items.value = items.value.concat(next)
      if (next.length === 0) noMore.value = true
    } else {
      noMore.value = true
    }
  } finally {
    loading.value = false
  }
}

function loadMore() {
  if (loading.value || noMore.value) return
  page.value += 1
  load(page.value)
}

function onItem(it: Item) {
  if (!it.login) return
  if (dataType.value === 'reposForker' && it.subText) {
    const [o, n] = it.subText.split('/')
    if (o && n) {
      uni.navigateTo({ url: `/pages/repository-detail/index?owner=${o}&name=${n}` })
      return
    }
  }
  uni.navigateTo({ url: `/pages/user-info/index?login=${it.login}` })
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  dataType.value = q?.dataType || ''
  const title = q?.title ? decodeURIComponent(q.title) : '列表'
  uni.setNavigationBarTitle({ title })
  load(1)
})
</script>

<style lang="scss" scoped>
.list {
  padding: 24rpx;
  min-height: 100vh;
  background-color: $gsy-container;

  &__hint {
    text-align: center;
    color: $gsy-gray;
    padding: 48rpx 0;
  }
  &__card {
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
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__sub {
    margin-top: 6rpx;
    font-size: 24rpx;
  }
  &__arrow {
    color: $gsy-gray;
    font-size: 36rpx;
    margin-left: 12rpx;
  }
  &__more {
    text-align: center;
    color: $gsy-action-blue;
    padding: 24rpx 0;
  }
}
</style>
