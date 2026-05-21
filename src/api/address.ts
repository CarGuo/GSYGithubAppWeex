/**
 * src/api/address.ts
 *
 * GitHub REST API 端点拼接。原工程 src/core/net/address.js 的 TS 化迁移版。
 * 仅保留与初版 trending/login/repository/issue 必需的端点，剩余按需补齐。
 */

import { HOST_API, HOST_WEB, PAGE_SIZE } from '@/config'

export const hostApi = HOST_API
export const hostWeb = HOST_WEB
export const graphicHost = 'https://ghchart.rshah.org/'

export const Address = {
  getAuthorization: () => `${HOST_API}authorizations`,
  getAuthenticatedUser: () => `${HOST_API}user`,
  getUser: (userName: string) => `${HOST_API}users/${userName}`,
  getReposDetail: (owner: string, name: string) => `${HOST_API}repos/${owner}/${name}`,
  getReposIssues: (owner: string, name: string, state = 'open', page = 1) =>
    `${HOST_API}repos/${owner}/${name}/issues?state=${state}&page=${page}&per_page=${PAGE_SIZE}`,
  search: (q: string, page = 1, type: 'repositories' | 'users' = 'repositories') => {
    if (type === 'users') {
      return `${HOST_API}search/users?q=${encodeURIComponent(q)}&page=${page}&per_page=${PAGE_SIZE}`
    }
    return `${HOST_API}search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&page=${page}&per_page=${PAGE_SIZE}`
  },
  /**
   * GitHub Trending 没有官方 API，原工程通过抓取 https://github.com/trending 然后
   * 用 himalaya 解析 HTML。这里保留 URL 构造，具体抓取改到 trendingService 里
   * 完成（参见 src/api/trending.ts）。
   */
  trending: (since = 'daily', language = '') => {
    const lang = language ? `${language}` : ''
    return `${HOST_WEB}trending/${lang}?since=${since}`
  }
}
