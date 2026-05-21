/**
 * src/utils/storage.ts
 *
 * 替代原 src/core/common/storageUtils.js（基于 weex.requireModule('storage')）。
 * uni-app 提供 uni.setStorage 等全平台一致的 API；H5 端走 localStorage、
 * 小程序端走原生 storage、App 端走 plus.storage。我们仅薄封装 Promise 化。
 */

export function setCache(key: string, value: unknown): Promise<void> {
  return new Promise((resolve, reject) => {
    uni.setStorage({
      key,
      data: typeof value === 'string' ? value : JSON.stringify(value),
      success: () => resolve(),
      fail: (err) => reject(err)
    })
  })
}

export function getCache<T = string>(key: string): Promise<T | null> {
  return new Promise((resolve) => {
    uni.getStorage({
      key,
      success: (res) => {
        if (typeof res.data !== 'string') {
          resolve(res.data as T)
          return
        }
        try {
          resolve(JSON.parse(res.data) as T)
        } catch {
          resolve(res.data as unknown as T)
        }
      },
      fail: () => resolve(null)
    })
  })
}

export function removeCache(key: string): Promise<void> {
  return new Promise((resolve) => {
    uni.removeStorage({
      key,
      success: () => resolve(),
      fail: () => resolve()
    })
  })
}
