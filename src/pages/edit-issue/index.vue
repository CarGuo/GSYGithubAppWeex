<template>
  <view class="edit">
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar__back" @click="goBack">
        <text class="wxcIconFont navbar__icon">&#xe78a;</text>
      </view>
      <text class="navbar__title">{{ navTitle }}</text>
    </view>
    <view class="edit__inner">
      <view class="card-white-wrapper edit__card">
        <text class="edit__title">{{ headerHint }}</text>
        <input
          v-if="needTitle"
          v-model="titleVal"
          class="edit__input-title"
          placeholder="请输入标题"
          :maxlength="-1"
        />
        <textarea
          v-model="body"
          class="edit__input"
          :placeholder="bodyPlaceholder"
          :maxlength="-1"
          auto-height
        />
        <view class="edit__row">
          <text class="content-text-gray">{{ body.length }} 字</text>
          <view class="edit__btn-group">
            <view class="edit__btn edit__btn--cancel" @click="goBack">
              <text>取消</text>
            </view>
            <view
              :class="['edit__btn', 'edit__btn--ok', { 'is-disabled': submitting || !canSubmit }]"
              @click="onSubmit"
            >
              <text>{{ submitting ? '提交中…' : '确定' }}</text>
            </view>
          </view>
        </view>
        <text v-if="errorMsg" class="edit__error">{{ errorMsg }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

type EditType = 'createIssue' | 'editIssue' | 'commentIssue' | 'editComment'

const owner = ref('')
const name = ref('')
const number = ref('')
const commentNum = ref('')
const type = ref<EditType>('commentIssue')
const titleVal = ref('')
const body = ref('')
const submitting = ref(false)
const errorMsg = ref('')
const statusBarHeight = ref(0)
const needTitle = computed(() => type.value === 'createIssue' || type.value === 'editIssue')

const navTitle = computed(() => {
  switch (type.value) {
    case 'createIssue': return '创建 Issue'
    case 'editIssue': return '编辑 Issue'
    case 'commentIssue': return '回复 Issue'
    case 'editComment': return '编辑评论'
    default: return '编辑'
  }
})

const headerHint = computed(() => {
  switch (type.value) {
    case 'createIssue': return `在 ${owner.value}/${name.value} 创建新 Issue`
    case 'editIssue': return `编辑 #${number.value}`
    case 'commentIssue': return `在 #${number.value} 添加评论`
    case 'editComment': return `编辑评论`
    default: return ''
  }
})

const bodyPlaceholder = computed(() => {
  if (type.value === 'editComment' || type.value === 'commentIssue') return '请输入评论内容（支持 Markdown）'
  return '请输入正文（支持 Markdown）'
})

const canSubmit = computed(() => {
  if (needTitle.value && !titleVal.value.trim()) return false
  return !!body.value.trim()
})

try {
  const sys = uni.getSystemInfoSync()
  statusBarHeight.value = sys.statusBarHeight || 0
} catch (_) {}

function goBack() {
  if (getCurrentPages().length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/main/index' })
}

async function onSubmit() {
  if (submitting.value || !canSubmit.value) return
  submitting.value = true
  errorMsg.value = ''
  const t = titleVal.value.trim()
  const b = body.value.trim()
  try {
    let res
    switch (type.value) {
      case 'createIssue':
        res = await http.netFetch(
          Address.getReposIssues(owner.value, name.value),
          'POST',
          { title: t, body: b },
          true
        )
        break
      case 'editIssue':
        res = await http.netFetch(
          Address.editIssue(owner.value, name.value, number.value),
          'PATCH',
          { title: t, body: b },
          true
        )
        break
      case 'commentIssue':
        res = await http.netFetch(
          Address.createIssueComment(owner.value, name.value, number.value),
          'POST',
          { body: b },
          true
        )
        break
      case 'editComment':
        res = await http.netFetch(
          Address.issueComment(owner.value, name.value, commentNum.value),
          'PATCH',
          { body: b },
          true
        )
        break
    }
    if (res?.result) {
      uni.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => uni.navigateBack({}), 600)
    } else {
      errorMsg.value = `提交失败 (HTTP ${res?.code})`
    }
  } catch (e: any) {
    errorMsg.value = e?.message || '网络错误'
  } finally {
    submitting.value = false
  }
}

onLoad((q: Record<string, string> | undefined) => {
  owner.value = q?.owner || ''
  name.value = q?.name || ''
  number.value = q?.number || ''
  commentNum.value = q?.commentNum || ''
  if (q?.type) type.value = q.type as EditType
  titleVal.value = q?.editTitle || ''
  body.value = q?.editValue || ''
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
.edit {
  min-height: 100vh;
  background-color: $gsy-container;

  &__inner {
    padding: 24rpx;
  }
  &__card {
    display: flex;
    flex-direction: column;
  }
  &__title {
    color: $gsy-theme-color;
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
  }
  &__input {
    border: 2rpx solid $gsy-mi-white;
    border-radius: 12rpx;
    padding: 20rpx 24rpx;
    font-size: 28rpx;
    color: $gsy-input-color;
    min-height: 320rpx;
    width: 100%;
    box-sizing: border-box;
  }
  &__input-title {
    border-bottom: 2rpx solid $gsy-mi-white;
    padding: 16rpx 0;
    margin-bottom: 16rpx;
    font-size: 30rpx;
    color: $gsy-input-color;
    width: 100%;
    box-sizing: border-box;
  }
  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
  }
  &__btn-group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__btn {
    padding: 14rpx 32rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    margin-left: 16rpx;
    &--cancel {
      background-color: #ffffff;
      border: 1rpx solid #969896;
    }
    &--cancel text {
      color: #969896;
    }
    &--ok {
      background-color: $gsy-theme-color;
    }
    &--ok text {
      color: #ffffff;
    }
    &.is-disabled {
      background-color: $gsy-theme-light;
    }
    &.is-disabled text {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  &__error {
    margin-top: 16rpx;
    color: $uni-color-error;
    font-size: 24rpx;
  }
}
</style>
