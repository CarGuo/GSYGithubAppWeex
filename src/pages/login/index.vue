<template>
  <view class="login">
    <view class="login__hero">
      <image class="login__logo" src="/static/logo.png" mode="aspectFit" />
      <text class="login__title">登录到 GitHub</text>
      <text class="login__hint">
        Basic Auth 已被 GitHub 弃用，请贴入 Personal Access Token (PAT) 登录。
        创建入口：Settings → Developer settings → Personal access tokens。
      </text>
    </view>

    <view class="login__form">
      <input
        v-model="token"
        class="login__input"
        :placeholder="'ghp_xxxxxxxxxxxxxxxxxxxx'"
        :password="masked"
      />

      <view class="login__row">
        <text class="login__row-label">隐藏 token</text>
        <switch :checked="masked" @change="onToggleMask" color="#2196F3" />
      </view>

      <button
        class="login__submit"
        :loading="userStore.loading"
        :disabled="!token || userStore.loading"
        @click="onLogin"
      >
        {{ userStore.loading ? '登录中…' : '登录' }}
      </button>

      <text v-if="userStore.errorMsg" class="login__error">{{ userStore.errorMsg }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const token = ref('')
const masked = ref(true)

function onToggleMask(e: any) {
  masked.value = e.detail.value
}

async function onLogin() {
  if (!token.value.trim()) return
  const ok = await userStore.login(token.value.trim())
  if (ok) {
    uni.showToast({ title: `欢迎，${userStore.userInfo?.login}`, icon: 'success' })
    setTimeout(() => uni.switchTab({ url: '/pages/main/index' }), 600)
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 48rpx 32rpx;

  &__hero {
    text-align: center;
    margin-bottom: 64rpx;
  }

  &__logo {
    width: 120rpx;
    height: 120rpx;
    margin: 0 auto 24rpx;
    display: block;
  }

  &__title {
    display: block;
    font-size: 40rpx;
    font-weight: 600;
    margin-bottom: 16rpx;
  }

  &__hint {
    display: block;
    color: #888;
    font-size: 24rpx;
    line-height: 1.5;
    padding: 0 16rpx;
  }

  &__form {
    background: #fff;
    border-radius: 12rpx;
    padding: 32rpx;
  }

  &__input {
    border: 1px solid #e5e5e5;
    border-radius: 8rpx;
    padding: 20rpx 24rpx;
    font-size: 28rpx;
    margin-bottom: 24rpx;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
  }

  &__row-label {
    color: #555;
    font-size: 26rpx;
  }

  &__submit {
    background: #2196f3;
    color: #fff;
    border-radius: 8rpx;
    font-size: 30rpx;
  }

  &__error {
    display: block;
    margin-top: 24rpx;
    color: #f44336;
    font-size: 26rpx;
    text-align: center;
  }
}
</style>
