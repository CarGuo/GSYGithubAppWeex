#!/usr/bin/env node
/**
 * scripts/check-deps-cooldown.mjs
 *
 * 供应链安全护栏：禁止安装"发布不足 N 天"的 npm 包版本。
 * 默认 N=15。可通过环境变量 DEPS_COOLDOWN_DAYS 调整。
 *
 * 触发点：
 *   - npm preinstall 钩子（package.json -> scripts.preinstall）
 *   - GitHub Actions 中作为单独 step 调用：node scripts/check-deps-cooldown.mjs
 *
 * 工作流程：
 *   1. 读取 package.json 中 dependencies / devDependencies / optionalDependencies
 *      声明的"具体版本号"（不解析 ^/~ 范围，按声明字面值校验）
 *   2. 对每个 (name, version) 调 https://registry.npmjs.org/<name> 的 time 字段
 *   3. 若版本发布日距今 < N 天，则 fail 并列出违规包
 *
 * 设计取舍：
 *   - 直接读 package.json 里的固定版本号，不解析 lockfile：因为我们要求所有
 *     直接依赖必须钉死字面版本，做到 reproducible install
 *   - 不递归校验间接依赖：那是 lockfile 的责任，且会让本脚本运行时间不可控
 *     CI 中如需更严格，可单独跑 `npm audit` + `npm-check-updates`
 *   - 失败 fast，不修复（不替你升级到合规版本）
 *
 * 注意：使用国内 npm mirror（如 npmmirror）时，time 字段可能延迟，
 *   建议本脚本始终走官方 registry.npmjs.org 以保证可信。
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG_JSON_PATH = resolve(__dirname, '..', 'package.json')

const COOLDOWN_DAYS = Number(process.env.DEPS_COOLDOWN_DAYS || 15)
const REGISTRIES = (process.env.NPM_AUDIT_REGISTRY || 'https://registry.npmjs.org,https://registry.npmmirror.com')
  .split(',')
  .map((s) => s.trim().replace(/\/$/, ''))
  .filter(Boolean)
const NOW = Date.now()
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000

function readPkg() {
  const raw = readFileSync(PKG_JSON_PATH, 'utf8')
  return JSON.parse(raw)
}

function collectDeps(pkg) {
  const buckets = ['dependencies', 'devDependencies', 'optionalDependencies']
  const list = []
  for (const b of buckets) {
    const obj = pkg[b] || {}
    for (const [name, ver] of Object.entries(obj)) {
      list.push({ name, version: ver, bucket: b })
    }
  }
  return list
}

async function fetchTime(name) {
  let lastErr
  for (const registry of REGISTRIES) {
    const url = `${registry}/${name.replace('/', '%2F')}`
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' }
      })
      if (!res.ok) {
        lastErr = new Error(`HTTP ${res.status} for ${name} via ${registry}`)
        continue
      }
      const json = await res.json()
      if (json && json.time && Object.keys(json.time).length > 0) {
        return json.time
      }
      lastErr = new Error(`registry ${registry} returned no time field for ${name}`)
    } catch (e) {
      lastErr = e
    }
  }
  throw lastErr || new Error(`failed to query any registry for ${name}`)
}

function isPinned(version) {
  if (!version) return false
  if (version.startsWith('npm:')) return false
  if (version.startsWith('file:') || version.startsWith('link:')) return false
  if (version.startsWith('git') || version.includes('://')) return false
  return /^\d+\.\d+\.\d+/.test(version)
}

async function main() {
  const pkg = readPkg()
  const deps = collectDeps(pkg)
  const violations = []
  const skipped = []
  const passed = []

  console.log(`[cooldown] checking ${deps.length} declared deps, cooldown = ${COOLDOWN_DAYS} days`)
  console.log(`[cooldown] cutoff: must be published before ${new Date(NOW - COOLDOWN_MS).toISOString().slice(0, 10)}`)

  for (const dep of deps) {
    if (!isPinned(dep.version)) {
      skipped.push({ ...dep, reason: 'not pinned to exact version' })
      continue
    }
    try {
      const time = await fetchTime(dep.name)
      const releasedAt = time[dep.version]
      if (!releasedAt) {
        violations.push({ ...dep, reason: `version ${dep.version} not found on registry` })
        continue
      }
      const ageMs = NOW - new Date(releasedAt).getTime()
      const ageDays = Math.floor(ageMs / (24 * 60 * 60 * 1000))
      if (ageMs < COOLDOWN_MS) {
        violations.push({ ...dep, releasedAt, ageDays, reason: `published only ${ageDays} day(s) ago` })
      } else {
        passed.push({ ...dep, releasedAt, ageDays })
      }
    } catch (e) {
      violations.push({ ...dep, reason: `lookup failed: ${e.message}` })
    }
  }

  if (skipped.length) {
    console.log(`\n[cooldown] SKIPPED (${skipped.length}) — non-pinned ranges:`)
    for (const s of skipped) console.log(`  ~ ${s.name}@${s.version} [${s.bucket}]`)
  }

  if (violations.length) {
    console.error(`\n[cooldown] FAIL — ${violations.length} package(s) violate the ${COOLDOWN_DAYS}-day cooldown:`)
    for (const v of violations) {
      console.error(`  X ${v.name}@${v.version} [${v.bucket}] — ${v.reason}` + (v.releasedAt ? ` (released ${v.releasedAt})` : ''))
    }
    console.error(`\nFix: bump to a version that is at least ${COOLDOWN_DAYS} days old, or wait for the cooldown to elapse.`)
    process.exit(1)
  }

  console.log(`\n[cooldown] OK — ${passed.length} package(s) pass.`)
}

main().catch((err) => {
  console.error('[cooldown] unexpected error:', err)
  process.exit(2)
})
