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
  getReceivedEvents: (userName: string, page = 1) =>
    `${HOST_API}users/${userName}/received_events?page=${page}&per_page=${PAGE_SIZE}`,
  getUserEvents: (userName: string, page = 1) =>
    `${HOST_API}users/${userName}/events?page=${page}&per_page=${PAGE_SIZE}`,
  getReposDetail: (owner: string, name: string) => `${HOST_API}repos/${owner}/${name}`,
  getReposReadme: (owner: string, name: string) => `${HOST_API}repos/${owner}/${name}/readme`,
  getReposIssues: (owner: string, name: string, state = 'open', page = 1) =>
    `${HOST_API}repos/${owner}/${name}/issues?state=${state}&page=${page}&per_page=${PAGE_SIZE}`,
  getIssueDetail: (owner: string, name: string, number: number | string) =>
    `${HOST_API}repos/${owner}/${name}/issues/${number}`,
  getIssueComments: (owner: string, name: string, number: number | string, page = 1) =>
    `${HOST_API}repos/${owner}/${name}/issues/${number}/comments?page=${page}&per_page=${PAGE_SIZE}`,
  createIssueComment: (owner: string, name: string, number: number | string) =>
    `${HOST_API}repos/${owner}/${name}/issues/${number}/comments`,
  getReposStargazers: (owner: string, name: string, page = 1) =>
    `${HOST_API}repos/${owner}/${name}/stargazers?page=${page}&per_page=${PAGE_SIZE}`,
  getReposForks: (owner: string, name: string, page = 1) =>
    `${HOST_API}repos/${owner}/${name}/forks?page=${page}&per_page=${PAGE_SIZE}`,
  getReposSubscribers: (owner: string, name: string, page = 1) =>
    `${HOST_API}repos/${owner}/${name}/subscribers?page=${page}&per_page=${PAGE_SIZE}`,
  getReposContributors: (owner: string, name: string, page = 1) =>
    `${HOST_API}repos/${owner}/${name}/contributors?page=${page}&per_page=${PAGE_SIZE}`,
  getReposBranches: (owner: string, name: string) =>
    `${HOST_API}repos/${owner}/${name}/branches?per_page=100`,
  /** 仓库 star 状态（GET 200=已 star / 404=未 star） */
  getReposStarStatus: (owner: string, name: string) =>
    `${HOST_API}user/starred/${owner}/${name}`,
  /** 仓库 watch 状态（GET 200=已订阅 / 404=未订阅） */
  getReposWatchStatus: (owner: string, name: string) =>
    `${HOST_API}repos/${owner}/${name}/subscription`,
  /** PUT/DELETE 都用这个端点，PUT=Star，DELETE=Unstar */
  doStar: (owner: string, name: string) =>
    `${HOST_API}user/starred/${owner}/${name}`,
  /** PUT 订阅 watch 时 body 是 { subscribed: true }；DELETE 退订 */
  doWatch: (owner: string, name: string) =>
    `${HOST_API}repos/${owner}/${name}/subscription`,
  /** POST 创建 fork */
  doFork: (owner: string, name: string) =>
    `${HOST_API}repos/${owner}/${name}/forks`,
  /** 用户的仓库 / 星标 / 粉丝 / 关注列表 */
  getUserRepos: (userName: string, page = 1) =>
    `${HOST_API}users/${userName}/repos?page=${page}&per_page=${PAGE_SIZE}&sort=pushed`,
  getUserStarred: (userName: string, page = 1) =>
    `${HOST_API}users/${userName}/starred?page=${page}&per_page=${PAGE_SIZE}`,
  getUserFollowers: (userName: string, page = 1) =>
    `${HOST_API}users/${userName}/followers?page=${page}&per_page=${PAGE_SIZE}`,
  getUserFollowing: (userName: string, page = 1) =>
    `${HOST_API}users/${userName}/following?page=${page}&per_page=${PAGE_SIZE}`,
  getReposEvent: (owner: string, name: string, page = 1) =>
    `${HOST_API}repos/${owner}/${name}/events?page=${page}&per_page=${PAGE_SIZE}`,
  getReposCommits: (owner: string, name: string, branch = '', page = 1) => {
    const sha = branch ? `&sha=${encodeURIComponent(branch)}` : ''
    return `${HOST_API}repos/${owner}/${name}/commits?page=${page}&per_page=${PAGE_SIZE}${sha}`
  },
  getReposContent: (owner: string, name: string, path = '', branch = '') => {
    const cleanPath = path.replace(/^\/+/, '')
    const ref = branch ? `?ref=${encodeURIComponent(branch)}` : ''
    return `${HOST_API}repos/${owner}/${name}/contents/${cleanPath}${ref}`
  },
  /** 与 getReposContent 同一端点；保留独立命名以表达"取单文件 HTML"语义。 */
  getReposFileContent: (owner: string, name: string, path: string, branch = '') =>
    Address.getReposContent(owner, name, path, branch),
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
  },
  /**
   * 用 GitHub 官方 search 当 trending 替代：取最近 since 区间内创建且星标多的仓库。
   * 比 HTML 抓取稳定且无跨域。
   */
  trendingFromSearch: (sinceISO: string, language = '', page = 1) => {
    const langPart = language ? `+language:${encodeURIComponent(language)}` : ''
    const q = `created:>${sinceISO}${langPart}`
    return `${HOST_API}search/repositories?q=${q}&sort=stars&order=desc&page=${page}&per_page=${PAGE_SIZE}`
  }
}
