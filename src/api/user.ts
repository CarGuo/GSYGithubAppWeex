/**
 * src/api/user.ts
 *
 * 用户相关 API。覆盖原 src/core/net/user.js 的核心方法，并改用 PAT 登录。
 */

import http from './http'
import { Address } from './address'
import { TOKEN_KEY } from '@/config'
import { setCache } from '@/utils/storage'

/**
 * 通过 Personal Access Token 登录。
 * GitHub 已弃用 Basic Auth + /authorizations 流程（2020-11-13 起返回 410），
 * 所以登录页改为让用户粘贴 PAT，本方法验证 PAT 是否合法（拉一次 /user）。
 */
export async function loginByToken(token: string) {
  const auth = token.startsWith('token ') || token.startsWith('Bearer ') ? token : `token ${token}`
  await setCache(TOKEN_KEY, auth)
  http.setAuthorization(auth)
  return http.getFetch<{ login: string; avatar_url: string; id: number; html_url: string }>(
    Address.getAuthenticatedUser()
  )
}

export function getUserInfo(userName: string) {
  return http.getFetch(Address.getUser(userName))
}
