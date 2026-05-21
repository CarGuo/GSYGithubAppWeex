/**
 * src/api/http.ts
 *
 * 取代原 src/core/net/api.js（Weex stream module + 自实现 Promise.race timeout）。
 * 现在用 axios，统一在 H5 / 小程序 / App 端工作（uni-app 也支持 uni.request，
 * 但 axios 有更成熟的拦截器/取消/类型支持，且体积可接受）。
 *
 * 重要兼容点：保持原工程返回格式 { result, code, data, headers? }，避免上层
 * 业务代码大改。
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { DEBUG, HOST_API, REQUEST_TIMEOUT_MS, TOKEN_KEY, USER_BASIC_CODE } from '@/config'
import { getCache, removeCache, setCache } from '@/utils/storage'

export const NETWORK_ERROR = 1
export const NETWORK_TIMEOUT = 2
export const NETWORK_JSON_EXCEPTION = 3
export const SUCCESS = 200

export interface ApiResponse<T = unknown> {
  result: boolean
  code: number
  data: T | string
  headers?: Record<string, string>
}

class HttpManager {
  private client: AxiosInstance
  private authorizationCode: string | null = null

  constructor() {
    this.client = axios.create({
      baseURL: HOST_API,
      timeout: REQUEST_TIMEOUT_MS
    })

    this.client.interceptors.request.use(async (config) => {
      if (!this.authorizationCode) {
        const token = await this.resolveAuthorization()
        if (token) this.authorizationCode = token
      }
      if (this.authorizationCode) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = this.authorizationCode
      }
      return config
    })

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status
        if (status === 401) {
          this.authorizationCode = null
          await removeCache(TOKEN_KEY)
          try {
            uni.showToast({ title: '登录失效，请重新登录', icon: 'none' })
            uni.reLaunch({ url: '/pages/login/index' })
          } catch {
            // ignore in non-uni env
          }
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * 兼容原 getFetch(url, header, type) 签名。
   */
  getFetch<T = unknown>(url: string, header?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.netFetch(url, 'GET', null, false, header)
  }

  /**
   * 兼容原 netFetch(url, method, params, json, header, type) 签名。
   */
  async netFetch<T = unknown>(
    url: string,
    method: AxiosRequestConfig['method'] = 'GET',
    params: Record<string, unknown> | null = null,
    json = false,
    header: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: { ...header }
    }

    if (method !== 'GET' && params) {
      if (json) {
        ;(config.headers as Record<string, string>)['Content-Type'] = 'application/json'
        config.data = params
      } else {
        ;(config.headers as Record<string, string>)['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = new URLSearchParams(params as Record<string, string>).toString()
      }
    }

    try {
      const response = await this.client.request<T>(config)
      if (DEBUG) {
        console.info('[http] req', method, url, params)
        console.info('[http] res', response.status, response.data)
      }

      // 旧逻辑：登录成功（201）会从 body 里捞 token 持久化。GitHub 在新流程里
      // 通常直接发 PAT，因此这条只在调用 /authorizations 时还有意义。
      if (
        response.status === 201 &&
        typeof response.data === 'object' &&
        response.data !== null &&
        'token' in response.data
      ) {
        const token = (response.data as { token: string }).token
        this.authorizationCode = `token ${token}`
        await setCache(TOKEN_KEY, this.authorizationCode)
      }

      if ([200, 201, 202, 204].includes(response.status)) {
        return {
          result: true,
          code: SUCCESS,
          data: response.data,
          headers: response.headers as Record<string, string>
        }
      }

      return { result: false, code: response.status, data: '' }
    } catch (err: any) {
      if (DEBUG) console.warn('[http] err', method, url, err?.message)
      const status = err?.response?.status
      if (err?.code === 'ECONNABORTED') {
        return { result: false, code: NETWORK_TIMEOUT, data: '' }
      }
      if (status) {
        return { result: false, code: status, data: err?.response?.data ?? '' }
      }
      return { result: false, code: NETWORK_ERROR, data: '' }
    }
  }

  async resolveAuthorization(): Promise<string | null> {
    const token = await getCache<string>(TOKEN_KEY)
    if (token) {
      this.authorizationCode = token
      return token
    }
    const basic = await getCache<string>(USER_BASIC_CODE)
    if (basic) return `Basic ${basic}`
    return null
  }

  setAuthorization(token: string) {
    this.authorizationCode = token
    return setCache(TOKEN_KEY, token)
  }

  clearAuthorization() {
    this.authorizationCode = null
    return removeCache(TOKEN_KEY)
  }
}

export default new HttpManager()
