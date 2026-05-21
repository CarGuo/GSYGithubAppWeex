<template>
  <web-view v-if="url" :src="url" />
  <view v-else class="hint"><text>缺少 url 参数</text></view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const url = ref('')

onLoad((q: Record<string, string> | undefined) => {
  url.value = q?.url ? decodeURIComponent(q.url) : ''
  if (url.value) {
    try {
      uni.setNavigationBarTitle({ title: new URL(url.value).host })
    } catch {
      // ignore
    }
  }
})
</script>

<style lang="scss" scoped>
.hint { padding: 64rpx; text-align: center; color: $gsy-gray; }
</style>
