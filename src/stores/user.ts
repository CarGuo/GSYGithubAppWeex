/**
 * src/stores/user.ts
 *
 * Pinia store，对应原 src/core/store/modules/user.js（Vuex）。
 */

import { defineStore } from 'pinia'
import { loginByToken } from '@/api/user'
import http from '@/api/http'
import { TOKEN_KEY, USER_INFO } from '@/config'
import { getCache, removeCache, setCache } from '@/utils/storage'

interface UserInfo {
  login: string
  avatar_url: string
  id: number
  html_url: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    userInfo: null as UserInfo | null,
    loading: false as boolean,
    errorMsg: '' as string
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.token && state.userInfo)
  },

  actions: {
    async restore() {
      const token = await getCache<string>(TOKEN_KEY)
      const info = await getCache<UserInfo>(USER_INFO)
      if (token) {
        this.token = token
        http.setAuthorization(token)
      }
      if (info && typeof info === 'object') this.userInfo = info as UserInfo
    },

    async login(pat: string) {
      this.loading = true
      this.errorMsg = ''
      try {
        const res = await loginByToken(pat)
        if (!res.result) {
          this.errorMsg = `登录失败 (HTTP ${res.code})，请确认 PAT 是否有效`
          return false
        }
        this.userInfo = res.data as UserInfo
        this.token = pat.startsWith('token ') ? pat : `token ${pat}`
        await setCache(USER_INFO, this.userInfo)
        return true
      } catch (e: any) {
        this.errorMsg = e?.message || '网络错误'
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.token = ''
      this.userInfo = null
      await removeCache(TOKEN_KEY)
      await removeCache(USER_INFO)
      await http.clearAuthorization()
    }
  }
})
