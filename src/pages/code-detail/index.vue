<template>
  <view class="code">
    <web-view
      v-if="srcdoc"
      :webview-styles="webviewStyles"
      :update-title="false"
      :src="dataUri"
    ></web-view>
    <view v-else-if="loading" class="code__hint"><text>加载中…</text></view>
    <view v-else class="code__hint"><text>不支持打开</text></view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'
import {
  formName,
  generateHtml,
  generateCode2Html,
  WEB_DRACULA_BACKGROUND_COLOR
} from '@/utils/htmlUtils'

const owner = ref('')
const name = ref('')
const branch = ref('')
const filePath = ref('')
const title = ref('')
const srcdoc = ref('')
const loading = ref(false)

const webviewStyles = {
  progress: { color: '#3c3f41' }
}

const dataUri = computed(() => {
  if (!srcdoc.value) return ''
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(srcdoc.value)
})

async function load() {
  if (!owner.value || !name.value || !filePath.value) {
    srcdoc.value = '<h1>不支持打开</h1>'
    return
  }
  loading.value = true
  try {
    const url = Address.getReposFileContent(owner.value, name.value, filePath.value, branch.value)
    const res = await http.getFetch<string>(url, { Accept: 'application/vnd.github.html' })
    if (res.result && typeof res.data === 'string' && res.data.length > 0) {
      const raw = res.data
      const startTag = 'class="instapaper_body '
      const startLang = raw.indexOf(startTag)
      const endLang = raw.indexOf('" data-path="')
      let lang: string | undefined
      if (startLang >= 0 && endLang >= 0) {
        const tmpLang = raw.substring(startLang + startTag.length, endLang)
        if (tmpLang) lang = formName(tmpLang.toLowerCase())
      }
      if (!lang) lang = 'java'
      if (lang === 'markdown') {
        srcdoc.value = generateHtml(raw)
      } else {
        srcdoc.value = generateCode2Html(raw, WEB_DRACULA_BACKGROUND_COLOR, lang)
      }
    } else {
      srcdoc.value = '<h1>不支持打开</h1>'
    }
  } catch {
    srcdoc.value = '<h1>不支持打开</h1>'
  } finally {
    loading.value = false
  }
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  branch.value = q?.branch || ''
  filePath.value = decodeURIComponent(q?.path || '')
  title.value = decodeURIComponent(q?.title || '') || filePath.value.split('/').pop() || '代码'
  uni.setNavigationBarTitle({ title: title.value })
  load()
})
</script>

<style lang="scss" scoped>
.code {
  height: 100vh;
  background-color: $gsy-web-dracula-bg;
}
.code__hint {
  text-align: center;
  color: $gsy-gray;
  padding: 48rpx 0;
}
</style>
