/**
 * src/utils/htmlUtils.ts
 *
 * 严格移植自原 GSYGithubAppWeex 的 src/core/common/htmlUtils.js。
 * 用于把 GitHub `application/vnd.github.html` 返回的 HTML（markdown 渲染版
 * 或带 `instapaper_body XXX` 语言标记的代码片段）二次包裹成可在 webview
 * 里渲染的完整 HTML，并叠 highlight.js Dracula 主题。
 *
 * 原版常量（src/config/Config.js）：
 *   primaryColor            = '#3c3f41'
 *   primaryLightColor       = '#42464b'
 *   actionBlue              = '#267aff'
 *   miWhite                 = '#ececec'
 *   webDraculaBackgroundColor = '#282a36'
 *
 * 不要改写算法、不要"优化"模板字符串结构，新增改动等于偏离原版 UI。
 */

const PRIMARY_LIGHT_COLOR = '#42464b'
const ACTION_BLUE = '#267aff'
const MI_WHITE = '#ececec'
export const WEB_DRACULA_BACKGROUND_COLOR = '#282a36'

/**
 * markdown HTML 二次处理：
 * 1. <code>...</code> 内换行 → \n\r<br>
 * 2. 不含 <code> 的 <pre> 内换行 → \n\r<br>
 * 3. 裸 <pre> → 包一层 <code>
 * 4. 站内相对链接 href="xxx" → href="gsygithub://xxx"
 */
export function generateHtml(
  mdData: string,
  backgroundColor = '#FFFFFF',
  userBR = true
): string {
  if (!mdData) return ''

  let mdDataCode = mdData.replace(/<code(([\s\S])*?)<\/code>/gi, (match) => {
    if (match) {
      if (match.indexOf('\n') !== -1) {
        match = match.replace(/[\n]/g, '\n\r<br>')
      }
      return match
    }
    return match
  })

  mdDataCode = mdDataCode.replace(/<pre(([\s\S])*?)<\/pre>/gi, (match) => {
    if (match) {
      if (match.indexOf('<code>') < 0) {
        if (match.indexOf('\n') !== -1) {
          match = match.replace(/[\n]/g, '\n\r<br>')
        }
      }
      return match
    }
    return match
  })

  mdDataCode = mdDataCode.replace(/<pre>(([\s\S])*?)<\/pre>/gi, (match, capture) => {
    if (match && capture) {
      if (match.indexOf('<code>') < 0) {
        let code = `<pre><code>${capture}</code></pre>`
        if (code.indexOf('\n') !== -1) {
          code = code.replace(/[\n]/g, '\n\r<br>')
        }
        return code
      }
      return match
    }
    return match
  })

  const data = mdDataCode.replace(/href="(.*?)"/gi, (match, capture) => {
    if (match && capture) {
      if (
        capture.indexOf('http://') < 0 &&
        capture.indexOf('https://') < 0 &&
        capture.indexOf('#') !== 0
      ) {
        const fixedUrl = 'gsygithub://' + capture
        return `href="${fixedUrl}"`
      }
      return match
    }
    return match
  })

  return generateCodeHtml(data, false, backgroundColor, ACTION_BLUE, userBR)
}

/**
 * 完整 HTML 文档模板（含 highlight.js Dracula 主题 + 表格/链接样式）。
 * 直接抄原版 generateCodeHtml，仅类型化。
 */
function generateCodeHtml(
  mdHTML: string,
  wrap: boolean,
  backgroundColor: string,
  actionColor: string,
  userBR: boolean
): string {
  return (
    '<html>\n' +
    '<head>\n' +
    '<meta charset="utf-8" />\n' +
    '<title></title>\n' +
    '<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>' +
    '<link href="https://cdn.bootcss.com/highlight.js/9.12.0/styles/dracula.min.css" rel="stylesheet">\n' +
    '<script src="https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"></script>  ' +
    "<script>hljs.configure({'useBR': " +
    String(userBR) +
    '});hljs.initHighlightingOnLoad();</script> ' +
    '<style>' +
    'body{background: ' +
    backgroundColor +
    ';}' +
    'a {color:' +
    actionColor +
    ' !important;}' +
    '.highlight pre, pre {' +
    ' word-wrap: ' +
    (wrap ? 'break-word' : 'normal') +
    '; ' +
    ' white-space: ' +
    (wrap ? 'pre-wrap' : 'pre') +
    '; ' +
    '}' +
    'thead, tr {' +
    'background:' +
    MI_WHITE +
    ';}' +
    'td, th {' +
    'padding: 5px 10px;' +
    'font-size: 12px;' +
    'direction:hor' +
    '}' +
    '.highlight {overflow: scroll; background: ' +
    WEB_DRACULA_BACKGROUND_COLOR +
    '}' +
    'tr:nth-child(even) {' +
    'background:' +
    PRIMARY_LIGHT_COLOR +
    ';' +
    'color:' +
    MI_WHITE +
    ';' +
    '}' +
    'tr:nth-child(odd) {' +
    'background: ' +
    MI_WHITE +
    ';' +
    'color:' +
    PRIMARY_LIGHT_COLOR +
    ';' +
    '}' +
    'th {' +
    'font-size: 14px;' +
    'color:' +
    MI_WHITE +
    ';' +
    'background:' +
    PRIMARY_LIGHT_COLOR +
    ';' +
    '}' +
    '</style>' +
    '</head>\n' +
    '<body>\n' +
    mdHTML +
    '</body>\n' +
    '</html>'
  )
}

/**
 * 代码片段（非 markdown）→ 完整 HTML：包一层 <pre><code lang='xxx'>，再
 * 走 generateHtml。与原版 generateCode2HTml 字段顺序一致。
 */
export function generateCode2Html(
  mdData: string,
  backgroundColor = '#FFFFFF',
  lang = 'java',
  userBR = true
): string {
  const currentData =
    mdData && mdData.indexOf('<code>') === -1
      ? '<body>\n' +
        '<pre class="pre">\n' +
        `<code lang='${lang}'>\n` +
        mdData +
        '</code>\n' +
        '</pre>\n' +
        '</body>\n'
      : '<body>\n' + '<pre class="pre">\n' + mdData + '</pre>\n' + '</body>\n'
  return generateHtml(currentData, backgroundColor, userBR)
}

/**
 * 后缀 → highlight.js 语言名映射（原 formName 完整迁移）。
 */
export function formName(name: string): string {
  switch (name) {
    case 'sh':
      return 'shell'
    case 'js':
      return 'javascript'
    case 'kt':
      return 'kotlin'
    case 'c':
    case 'cpp':
      return 'cpp'
    case 'md':
      return 'markdown'
    case 'html':
      return 'xml'
  }
  return name
}
