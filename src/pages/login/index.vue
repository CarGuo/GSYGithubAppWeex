<template>
  <view class="login">
    <view class="login__card">
      <image class="login__logo" src="/static/logo.png" mode="aspectFit" />

      <text class="login__title">登录到 GitHub</text>
      <text class="login__hint">
        Basic Auth 已被 GitHub 弃用，请贴入 Personal Access Token (PAT) 登录。
        创建入口：Settings → Developer settings → Personal access tokens。
      </text>

      <input
        v-model="token"
        class="login__input"
        :placeholder="'ghp_xxxxxxxxxxxxxxxxxxxx'"
        :password="masked"
      />

      <view class="login__row">
        <text class="login__row-label">隐藏 token</text>
        <switch :checked="masked" @change="onToggleMask" :color="themeColor" />
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
const themeColor = '#3c3f41'

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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $gsy-theme-color;
  padding: 48rpx 32rpx;

  &__card {
    width: 600rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
    padding: 50rpx 40rpx;
    box-shadow: $gsy-box-shadow;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &__logo {
    width: 160rpx;
    height: 160rpx;
    margin: 0 auto 24rpx;
  }

  &__title {
    text-align: center;
    color: $gsy-theme-color;
    font-size: 36rpx;
    font-weight: 600;
    margin-bottom: 16rpx;
  }

  &__hint {
    color: $gsy-gray;
    font-size: 24rpx;
    line-height: 1.5;
    margin-bottom: 40rpx;
    text-align: center;
  }

  &__input {
    border: 2rpx solid $gsy-theme-color;
    border-radius: 12rpx;
    padding: 20rpx 24rpx;
    font-size: 30rpx;
    color: $gsy-input-color;
    margin-bottom: 24rpx;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32rpx;
  }

  &__row-label {
    color: $gsy-input-color;
    font-size: 26rpx;
  }

  &__submit {
    background-color: $gsy-theme-color;
    color: #ffffff;
    border-radius: 12rpx;
    font-size: 30rpx;

    &[disabled] {
      background-color: $gsy-theme-light;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  &__error {
    margin-top: 24rpx;
    color: $uni-color-error;
    font-size: 26rpx;
    text-align: center;
  }
}
</style>
