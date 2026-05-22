/**
 * src/api/trending.ts
 *
 * GitHub Trending 实现。
 *
 * 历史版本：原 [src/core/net/trending/GitHubTrending.js](file:///d:/workspace/project/GSYGithubAppWeex/src/core/net/trending/GitHubTrending.js)
 * 用 himalaya 解析 https://github.com/trending 的 HTML，H5 端跨域。
 *
 * 当前版本：与 GSY 系（RN / Flutter / Kotlin / Compose）保持一致——直接调
 * 作者本人维护的解析后端 `https://guoshuyu.cn/github/trend/list`，返回 JSON。
 * H5 端走 vite proxy `/gsy-trend`（在 [vite.config.ts](file:///d:/workspace/project/GSYGithubAppWeex/vite.config.ts) 注入 api-token）；
 * App/小程序直连绝对地址 + 手动带 api-token。
 *
 * 注意：不走 [src/api/http.ts](file:///d:/workspace/project/GSYGithubAppWeex/src/api/http.ts) 的 axios，否则拦截器会把 GitHub PAT 漏给 guoshuyu.cn。
 *
 * 兜底：GSY API 失败时回退 GitHub 官方 search，再失败回退到 mock。
 */

import http from './http'
import { Address } from './address'

export interface TrendItem {
  reposName: string
  reposAuthor: string
  reposDesc: string
  reposLanguage: string
  reposStars: string
  reposForks: string
  reposStarsAdded: string
  reposFullName?: string
}

const GSY_API_TOKEN = '4d65e2a5626103f92a71867d7b49fea0'

const FALLBACK: TrendItem[] = [
  {
    reposAuthor: 'CarGuo',
    reposName: 'GSYGithubApp',
    reposDesc: 'GitHub 客户端 - Flutter / Weex / RN 多端实现',
    reposLanguage: 'Dart',
    reposStars: '20k',
    reposForks: '2.3k',
    reposStarsAdded: '+12 stars today',
    reposFullName: 'CarGuo/GSYGithubApp'
  },
  {
    reposAuthor: 'CarGuo',
    reposName: 'GSYGithubAppFlutter',
    reposDesc: 'Flutter 完整版 GitHub 客户端',
    reposLanguage: 'Dart',
    reposStars: '14k',
    reposForks: '2.1k',
    reposStarsAdded: '+5 stars today',
    reposFullName: 'CarGuo/GSYGithubAppFlutter'
  },
  {
    reposAuthor: 'CarGuo',
    reposName: 'GSYGithubAppWeex',
    reposDesc: 'Weex 版（已迁移到 uni-app）',
    reposLanguage: 'Vue',
    reposStars: '1.8k',
    reposForks: '350',
    reposStarsAdded: '+1 star today',
    reposFullName: 'CarGuo/GSYGithubAppWeex'
  }
]

interface GsyTrendItem {
  fullName?: string
  reposName?: string
  name?: string
  description?: string
  language?: string
  starCount?: string | number
  forkCount?: string | number
  meta?: string
}

function sinceToISO(since: 'daily' | 'weekly' | 'monthly'): string {
  const now = new Date()
  const offset = since === 'daily' ? 1 : since === 'weekly' ? 7 : 30
  const d = new Date(now.getTime() - offset * 24 * 60 * 60 * 1000)
  return d.toISOString().slice(0, 10)
}

function fmtCount(n: number | string | undefined): string {
  if (n === undefined || n === null || n === '') return '0'
  const num = typeof n === 'number' ? n : parseInt(String(n).replace(/[^\d]/g, ''), 10) || 0
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return String(num)
}

interface SearchRepoItem {
  full_name: string
  name: string
  owner: { login: string }
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
}

/**
 * 直接打 guoshuyu.cn / vite proxy，不经 axios，避免泄露 GitHub PAT。
 */
function rawRequest<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: 'GET',
      header: headers,
      timeout: 12000,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
        } else {
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      },
      fail: (err) => reject(err)
    })
  })
}

async function fetchFromGsy(
  since: 'daily' | 'weekly' | 'monthly',
  language: string
): Promise<TrendItem[] | null> {
  try {
    const url = Address.gsyTrending(since, language)
    // H5 经过 vite proxy 已注入 api-token，无需重复带；
    // 非 H5 端必须手动带 api-token
    let headers: Record<string, string> = {}
    // #ifndef H5
    headers = { 'api-token': GSY_API_TOKEN }
    // #endif
    const data = await rawRequest<
      GsyTrendItem[] | { data?: GsyTrendItem[]; status?: number; error?: string }
    >(url, headers)
    // GSY 后端业务异常时会以 200 包返回 { status:500, error:"...", message:"..." }
    if (
      data &&
      typeof data === 'object' &&
      !Array.isArray(data) &&
      ((data as { status?: number }).status === 500 || (data as { error?: string }).error)
    ) {
      return null
    }
    const list = Array.isArray(data)
      ? data
      : Array.isArray((data as { data?: GsyTrendItem[] })?.data)
        ? (data as { data: GsyTrendItem[] }).data
        : []
    if (!list.length) return null
    const sinceLabel = since === 'daily' ? 'today' : since === 'weekly' ? 'this week' : 'this month'
    return list.map<TrendItem>((it) => {
      const fullName = it.fullName ?? `${it.name ?? ''}/${it.reposName ?? ''}`
      const [author = '', repo = ''] = fullName.split('/')
      return {
        reposAuthor: author || it.name || '',
        reposName: repo || it.reposName || '',
        reposFullName: fullName,
        reposDesc: it.description ?? '',
        reposLanguage: it.language ?? '',
        reposStars: fmtCount(it.starCount),
        reposForks: fmtCount(it.forkCount),
        reposStarsAdded: it.meta ? it.meta.trim() : `★ ${fmtCount(it.starCount)} ${sinceLabel}`
      }
    })
  } catch {
    return null
  }
}

async function fetchFromSearch(
  since: 'daily' | 'weekly' | 'monthly',
  language: string
): Promise<TrendItem[] | null> {
  try {
    const sinceISO = sinceToISO(since)
    const url = Address.trendingFromSearch(sinceISO, language, 1)
    const res = await http.getFetch<{ items?: SearchRepoItem[] }>(url)
    if (!res.result || typeof res.data !== 'object' || res.data === null) return null
    const items = (res.data as { items?: SearchRepoItem[] }).items ?? []
    if (!items.length) return null
    const sinceLabel = since === 'daily' ? 'today' : since === 'weekly' ? 'this week' : 'this month'
    return items.slice(0, 25).map<TrendItem>((it) => ({
      reposAuthor: it.owner?.login ?? '',
      reposName: it.name,
      reposFullName: it.full_name,
      reposDesc: it.description ?? '',
      reposLanguage: it.language ?? '',
      reposStars: fmtCount(it.stargazers_count),
      reposForks: fmtCount(it.forks_count),
      reposStarsAdded: `★ ${fmtCount(it.stargazers_count)} ${sinceLabel}`
    }))
  } catch {
    return null
  }
}

export async function fetchTrending(
  since: 'daily' | 'weekly' | 'monthly' = 'daily',
  language = ''
): Promise<TrendItem[]> {
  const fromGsy = await fetchFromGsy(since, language)
  if (fromGsy && fromGsy.length) return fromGsy
  const fromSearch = await fetchFromSearch(since, language)
  if (fromSearch && fromSearch.length) return fromSearch
  return FALLBACK
}
