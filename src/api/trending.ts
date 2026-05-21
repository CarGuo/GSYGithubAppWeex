/**
 * src/api/trending.ts
 *
 * GitHub Trending 抓取。原 src/core/net/trending/GitHubTrending.js 用 himalaya
 * 解析 HTML —— 在 H5 端跨域必失败（github.com 不允许跨域），所以本工程改用
 * 官方 search/repositories?q=created:>YYYY-MM-DD&sort=stars 当 trending：
 * 既不需要代理也不会跨域。
 *
 * 失败时回退到 mock，保证 UI 永远不会空屏。
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
    reposDesc: 'Flutter 完整版完成版 GitHub 客户端',
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

function sinceToISO(since: 'daily' | 'weekly' | 'monthly'): string {
  const now = new Date()
  const offset = since === 'daily' ? 1 : since === 'weekly' ? 7 : 30
  const d = new Date(now.getTime() - offset * 24 * 60 * 60 * 1000)
  return d.toISOString().slice(0, 10)
}

function fmtCount(n: number | undefined): string {
  if (!n && n !== 0) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
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

export async function fetchTrending(
  since: 'daily' | 'weekly' | 'monthly' = 'daily',
  language = ''
): Promise<TrendItem[]> {
  try {
    const sinceISO = sinceToISO(since)
    const url = Address.trendingFromSearch(sinceISO, language, 1)
    const res = await http.getFetch<{ items?: SearchRepoItem[] }>(url)
    if (!res.result || typeof res.data !== 'object' || res.data === null) {
      return FALLBACK
    }
    const items = (res.data as { items?: SearchRepoItem[] }).items ?? []
    if (items.length === 0) return FALLBACK
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
    return FALLBACK
  }
}
