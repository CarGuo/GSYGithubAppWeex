/**
 * src/config/index.ts
 *
 * 全局常量配置，对应原 Weex 工程的 src/config/Config.js。
 * 注意：GitHub Basic Auth 的 client_id / client_secret 已废弃（GitHub 在 2020-11
 * 起强制要求 personal access token），所以登录页改用 PAT；保留常量避免大量
 * 改动旧代码引用。
 */

export const APP_NAME = 'GSY GitHub App'
export const APP_VERSION = '2.0.0-uniapp.0'

export const CLIENT_ID = ''
export const CLIENT_SECRET = ''

export const TOKEN_KEY = 'TOKEN_KEY'
export const USER_BASIC_CODE = 'USER_BASIC_CODE'
export const USER_INFO = 'USER_INFO'

export const PAGE_SIZE = 30
export const REQUEST_TIMEOUT_MS = 15_000

/**
 * 调试开关：production 构建会被替换为 false（vite define）。
 */
export const DEBUG = !!(import.meta as any).env?.DEV

export const HOST_API = 'https://api.github.com/'
export const HOST_WEB = 'https://github.com/'
export const DOWNLOAD_URL = 'https://www.pgyer.com/GSYGithubApp'
export const GRAPHIC_HOST = 'https://ghchart.rshah.org/'
