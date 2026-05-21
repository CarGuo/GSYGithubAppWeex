/**
 * src/api/trending.ts
 *
 * GitHub Trending 抓取。原 src/core/net/trending/GitHubTrending.js 用 himalaya
 * 解析 HTML —— 在 H5 端跨域必失败（github.com 不允许跨域），所以建议接入
 * 第三方代理（GSY 系列经典做法是用阿里 mock 或自部署 GitHub-Trending-API）。
 *
 * 先写一个 facade，真实抓取留 TODO；UI 层默认走 mock 数据，保证页面能跑通。
 */

import { Address } from './address'

export interface TrendItem {
  reposName: string
  reposAuthor: string
  reposDesc: string
  reposLanguage: string
  reposStars: string
  reposForks: string
  reposStarsAdded: string
}

export async function fetchTrending(since: 'daily' | 'weekly' | 'monthly' = 'daily', language = ''): Promise<TrendItem[]> {
  // TODO: 接入 GitHub Trending API 代理或自实现 HTML 抓取后再解析。
  // 当前为 H5 跑通而返回 mock，避免立即报跨域。
  console.warn('[trending] stub returns mock data; integrate proxy at', Address.trending(since, language))
  return [
    {
      reposAuthor: 'CarGuo',
      reposName: 'GSYGithubApp',
      reposDesc: 'GitHub 客户端 - Flutter / Weex / RN 多端实现',
      reposLanguage: 'Dart',
      reposStars: '20k',
      reposForks: '2.3k',
      reposStarsAdded: '+12 stars today'
    },
    {
      reposAuthor: 'CarGuo',
      reposName: 'GSYGithubAppFlutter',
      reposDesc: 'Flutter 完整版完成版 GitHub 客户端',
      reposLanguage: 'Dart',
      reposStars: '14k',
      reposForks: '2.1k',
      reposStarsAdded: '+5 stars today'
    },
    {
      reposAuthor: 'CarGuo',
      reposName: 'GSYGithubAppWeex',
      reposDesc: 'Weex 版（已迁移到 uni-app）',
      reposLanguage: 'Vue',
      reposStars: '1.8k',
      reposForks: '350',
      reposStarsAdded: '+1 star today'
    }
  ]
}
