<template>
  <view class="edit">
    <view class="card-white-wrapper edit__card">
      <text class="edit__title">在 #{{ number }} 添加评论</text>
      <textarea
        v-model="body"
        class="edit__input"
        :placeholder="'请输入评论内容（支持 Markdown）'"
        :maxlength="-1"
        auto-height
      />
      <view class="edit__row">
        <text class="content-text-gray">{{ body.length }} 字</text>
        <view
          :class="['edit__submit', { 'is-disabled': submitting || !body.trim() }]"
          @click="onSubmit"
        >
          <text>{{ submitting ? '提交中…' : '提交' }}</text>
        </view>
      </view>
      <text v-if="errorMsg" class="edit__error">{{ errorMsg }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/api/http'
import { Address } from '@/api/address'

const owner = ref('')
const name = ref('')
const number = ref('')
const body = ref('')
const submitting = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  if (submitting.value) return
  const trimmed = body.value.trim()
  if (!trimmed) return
  submitting.value = true
  errorMsg.value = ''
  try {
    const res = await http.netFetch(
      Address.createIssueComment(owner.value, name.value, number.value),
      'POST',
      { body: trimmed },
      true
    )
    if (res.result) {
      uni.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => uni.navigateBack({}), 600)
    } else {
      errorMsg.value = `提交失败 (HTTP ${res.code})`
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
})
</script>

<style lang="scss" scoped>
.edit {
  min-height: 100vh;
  background-color: $gsy-container;
  padding: 24rpx;

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
  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
  }
  &__submit {
    background-color: $gsy-theme-color;
    color: #ffffff;
    padding: 16rpx 36rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    &.is-disabled {
      background-color: $gsy-theme-light;
      color: rgba(255, 255, 255, 0.6);
    }
  }
  &__submit text {
    color: #ffffff;
  }
  &__error {
    margin-top: 16rpx;
    color: $uni-color-error;
    font-size: 24rpx;
  }
}
</style>
