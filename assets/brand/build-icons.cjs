/* 循链 LoopLink · 站点图标生成器
 *
 * 用法（一次性装依赖，不入库）：
 *   npm i @resvg/resvg-js --no-save
 *   node assets/brand/build-icons.cjs
 *
 * 输入：本目录下的三个 SVG 源文件
 * 输出：站点根目录下的 favicon / apple-touch / PWA 图标与 site.webmanifest
 */
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const BRAND = __dirname;                        // assets/brand
const OUT = path.resolve(__dirname, '..', '..'); // 站点根目录

// 品牌绿渐变：与 assets/app.css 里 .brand-mark 用的是同一个 token
const A1 = '#16bd93', A2 = '#0f8b6c', A3 = '#0a6b53';

function gradDefs(extra = '') {
  return `
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${A1}"/><stop offset="0.55" stop-color="${A2}"/><stop offset="1" stop-color="${A3}"/>
  </linearGradient>
  <radialGradient id="sheen" cx="0.3" cy="0.16" r="0.95">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.24"/><stop offset="0.62" stop-color="#ffffff" stop-opacity="0"/>
  </radialGradient>
  ${extra}
</defs>`;
}

// 两个互扣圆环。r=半径, sw=描边, cxL/cxR=两环圆心 x, cut=true 时左下环在交叉处断开（上压下）
function glyphRing({ r, sw, cxL, cxR, cy = 256, cut }) {
  const maskId = 'cutRight';
  const extra = cut ? `<mask id="${maskId}">
    <rect width="512" height="512" fill="#fff"/>
    <circle cx="${cxR}" cy="${cy}" r="${r}" fill="none" stroke="#000" stroke-width="${sw * 1.6}" stroke-linecap="round"/>
  </mask>` : '';
  const leftAttr = cut ? ` mask="url(#${maskId})"` : '';
  return { defs: extra, body: `<g fill="none" stroke="#fff" stroke-width="${sw}" stroke-linecap="round">
    <circle cx="${cxL}" cy="${cy}" r="${r}"${leftAttr}/>
    <circle cx="${cxR}" cy="${cy}" r="${r}"/>
  </g>` };
}

function svgMarkup({ rounded = true, ring, pad = 1 }) {
  const g = glyphRing(ring);
  const plate = rounded
    ? `<rect width="512" height="512" rx="116" fill="url(#g)"/><rect width="512" height="512" rx="116" fill="url(#sheen)"/>`
    : `<rect width="512" height="512" fill="url(#g)"/><rect width="512" height="512" fill="url(#sheen)"/>`;
  const scale = pad === 1 ? '' : `<g transform="translate(256 256) scale(${pad}) translate(-256 -256)">`;
  const close = pad === 1 ? '' : '</g>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
${gradDefs(g.defs)}${plate}${scale}${g.body}${close}</svg>`;
}

// ---- 三档几何 ----
// fine: 大尺寸精致版（带断口）
// bold: 小尺寸加粗版（无断口，16/32px 才看得清）
const GEOM = {
  fine: { r: 92, sw: 42, cxL: 178, cxR: 334, cut: true },
  bold: { r: 96, sw: 54, cxL: 176, cxR: 336, cut: false },
};

const svgFine = svgMarkup({ rounded: true, ring: GEOM.fine });
const svgBold = svgMarkup({ rounded: true, ring: GEOM.bold });
const svgFlat = svgMarkup({ rounded: false, ring: GEOM.fine });
// maskable：图形缩到中心 80% 安全区内（保留断口，与 fine 档同风格）
const svgFlatMask = svgMarkup({ rounded: false, ring: { ...GEOM.fine, r: 74, sw: 34, cxL: 199, cxR: 313 } });

// 源文件回写，保证 assets/brand/ 下三个 SVG 与生成器同源
fs.writeFileSync(path.join(BRAND, 'looplink-mark.svg'), svgFine);
fs.writeFileSync(path.join(BRAND, 'looplink-mark-small.svg'), svgBold);
fs.writeFileSync(path.join(BRAND, 'looplink-mark-flat.svg'), svgFlat);

function png(svg, outPath, size, opaque = false) {
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: opaque ? A2 : 'rgba(0,0,0,0)',
  });
  fs.writeFileSync(outPath, r.render().asPng());
}
const pngBuf = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

// 浏览器标签图标：16/32 用加粗版，48 用精致版
png(svgBold, path.join(OUT, 'favicon-16.png'), 16);
png(svgBold, path.join(OUT, 'favicon-32.png'), 32);
png(svgFine, path.join(OUT, 'favicon-48.png'), 48);
fs.writeFileSync(path.join(OUT, 'favicon.svg'), svgBold);

// iOS 主屏：全出血无圆角（系统自裁圆角）
png(svgFlat, path.join(OUT, 'apple-touch-icon.png'), 180, true);

// PWA
png(svgFine, path.join(OUT, 'icon-192.png'), 192);
png(svgFine, path.join(OUT, 'icon-512.png'), 512);
png(svgFlatMask, path.join(OUT, 'icon-maskable-512.png'), 512, true);

// ICO 容器：内嵌 PNG，省掉 ico 依赖
const icoEntries = [
  { size: 16, buf: pngBuf(svgBold, 16) },
  { size: 32, buf: pngBuf(svgBold, 32) },
  { size: 48, buf: pngBuf(svgFine, 48) },
];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(icoEntries.length, 4);
let offset = 6 + icoEntries.length * 16;
const dir = [];
for (const e of icoEntries) {
  const b = Buffer.alloc(16);
  b.writeUInt8(e.size === 256 ? 0 : e.size, 0);
  b.writeUInt8(e.size === 256 ? 0 : e.size, 1);
  b.writeUInt8(0, 2); b.writeUInt8(0, 3);
  b.writeUInt16LE(1, 4); b.writeUInt16LE(32, 6);
  b.writeUInt32LE(e.buf.length, 8); b.writeUInt32LE(offset, 12);
  offset += e.buf.length;
  dir.push(b);
}
fs.writeFileSync(path.join(OUT, 'favicon.ico'), Buffer.concat([header, ...dir, ...icoEntries.map(e => e.buf)]));

fs.writeFileSync(path.join(OUT, 'site.webmanifest'), JSON.stringify({
  name: '循链 LoopLink · 全国工业废物资源化撮合平台',
  short_name: '循链',
  description: '把「谁有废物」「谁能处理」「谁要再生料」在全国范围内对上，并把跨省物流成本算进撮合决策。',
  start_url: 'index.html',
  display: 'standalone',
  background_color: '#f3f7f5',
  theme_color: A2,
  lang: 'zh-CN',
  icons: [
    { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: 'favicon-32.png', sizes: '32x32', type: 'image/png' },
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n');

console.log('图标已重新生成 ->', OUT);
