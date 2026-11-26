/* =========================================================
   1. 基础数据
   ========================================================= */
const WASTE = {
  '废纸':      { color:'#c08457', co2:1.8 },
  '废塑料':    { color:'#5b9bd5', co2:2.5 },
  '废金属':    { color:'#8d99ae', co2:9.5 },
  '废玻璃':    { color:'#5cbdb8', co2:0.6 },
  '废纺织品':  { color:'#b07cc6', co2:3.2 },
  '废旧锂电池':{ color:'#dd8b0b', co2:4.8 },
  '废木材':    { color:'#a1785a', co2:1.2 },
  '餐厨垃圾':  { color:'#7bc043', co2:0.9 },
  '废橡胶':    { color:'#5f6c7b', co2:2.1 },
  '电子废弃物':{ color:'#d8525a', co2:5.5 }
};
const WASTE_TYPES = Object.keys(WASTE);

/* 主要工业城市经纬度（用于估算公路运输距离，非测绘数据） */
const CITY = {
  '广州':[23.13,113.26], '深圳':[22.54,114.06], '东莞':[23.02,113.75], '佛山':[23.02,113.12], '清远':[23.68,113.06],
  '南京':[32.06,118.80], '苏州':[31.30,120.58], '无锡':[31.49,120.31], '南通':[31.98,120.89],
  '常州':[31.81,119.97], '徐州':[34.26,117.19], '宿迁':[33.96,118.28],
  '杭州':[30.27,120.15], '宁波':[29.87,121.55], '绍兴':[30.00,120.58], '台州':[28.66,121.42],
  '济南':[36.65,117.12], '青岛':[36.07,120.38], '潍坊':[36.71,119.16], '临沂':[35.10,118.36], '淄博':[36.81,118.06],
  '石家庄':[38.04,114.51], '唐山':[39.63,118.18], '保定':[38.87,115.46],
  '郑州':[34.75,113.62], '洛阳':[34.62,112.45], '武汉':[30.59,114.31], '长沙':[28.23,112.94],
  '成都':[30.57,104.07], '绵阳':[31.47,104.68], '重庆':[29.56,106.55],
  '南昌':[28.68,115.86], '宜春':[27.81,114.42], '福州':[26.07,119.30], '泉州':[24.87,118.68],
  '沈阳':[41.80,123.43], '大连':[38.91,121.61], '合肥':[31.82,117.23], '西安':[34.34,108.94], '太原':[37.87,112.55]
};

/* 省份 → 经济大区 */
const PROVINCE_REGION = {
  '上海':'华东','江苏':'华东','浙江':'华东','安徽':'华东','福建':'华东','江西':'华东','山东':'华东',
  '广东':'华南','广西':'华南','海南':'华南',
  '河南':'华中','湖北':'华中','湖南':'华中',
  '北京':'华北','天津':'华北','河北':'华北','山西':'华北','内蒙古':'华北',
  '辽宁':'东北','吉林':'东北','黑龙江':'东北',
  '重庆':'西南','四川':'西南','贵州':'西南','云南':'西南','西藏':'西南',
  '陕西':'西北','甘肃':'西北','青海':'西北','宁夏':'西北','新疆':'西北'
};
const REGION_ORDER = ['华东','华南','华中','华北','东北','西南','西北'];
const regionOf = p => PROVINCE_REGION[p] || '其他';

const SEED = {
  supplies: [
    { id:'S1', company:'东莞恒昌包装制品',     province:'广东', city:'东莞', type:'废塑料',     qty:480, price:760 },
    { id:'S2', company:'佛山南海铝型材厂',     province:'广东', city:'佛山', type:'废金属',     qty:520, price:2100 },
    { id:'S3', company:'苏州华科电子装配',     province:'江苏', city:'苏州', type:'电子废弃物', qty:180, price:900 },
    { id:'S4', company:'南通家纺印染集团',     province:'江苏', city:'南通', type:'废纺织品',   qty:260, price:540 },
    { id:'S5', company:'绍兴柯桥印染集群',     province:'浙江', city:'绍兴', type:'废纺织品',   qty:320, price:560 },
    { id:'S6', company:'台州塑料制品产业带',   province:'浙江', city:'台州', type:'废塑料',     qty:350, price:780 },
    { id:'S7', company:'潍坊晨鸣包装材料',     province:'山东', city:'潍坊', type:'废纸',       qty:420, price:1180 },
    { id:'S8', company:'临沂板材加工集群',     province:'山东', city:'临沂', type:'废木材',     qty:280, price:220 },
    { id:'S9', company:'淄博玻璃制品厂',       province:'山东', city:'淄博', type:'废玻璃',     qty:240, price:180 },
    { id:'S10',company:'唐山钢材加工基地',     province:'河北', city:'唐山', type:'废金属',     qty:600, price:2050 },
    { id:'S11',company:'保定轮胎制造厂',       province:'河北', city:'保定', type:'废橡胶',     qty:210, price:410 },
    { id:'S12',company:'郑州纸品包装工业园',   province:'河南', city:'郑州', type:'废纸',       qty:380, price:1150 },
    { id:'S13',company:'武汉光电子产业园',     province:'湖北', city:'武汉', type:'电子废弃物', qty:150, price:880 },
    { id:'S14',company:'成都餐厨废弃物收运中心',province:'四川', city:'成都', type:'餐厨垃圾',   qty:420, price:260 },
    { id:'S15',company:'重庆汽摩配件集群',     province:'重庆', city:'重庆', type:'废塑料',     qty:300, price:760 },
    { id:'S16',company:'江西洪都印务有限公司', province:'江西', city:'南昌', type:'废纸',       qty:320, price:1180 },
    { id:'S17',company:'宜春锂电产业园',       province:'江西', city:'宜春', type:'废旧锂电池', qty:260, price:1800 },
    { id:'S18',company:'泉州鞋服产业基地',     province:'福建', city:'泉州', type:'废纺织品',   qty:240, price:520 },
    { id:'S19',company:'沈阳橡胶制品厂',       province:'辽宁', city:'沈阳', type:'废橡胶',     qty:190, price:400 },
    { id:'S20',company:'佛山陶瓷包装厂',       province:'广东', city:'佛山', type:'废玻璃',     qty:180, price:190 },
    { id:'S21',company:'武汉餐饮集团',         province:'湖北', city:'武汉', type:'餐厨垃圾',   qty:350, price:280 }
  ],
  processors: [
    { id:'P1', name:'东莞再生塑料科技',   province:'广东', city:'东莞', rating:4.8,
      accepts:['废塑料'], cap:1200, load:780,
      outputs:[{type:'再生塑料粒子',ratio:0.75},{type:'塑料碎片',ratio:0.12}] },
    { id:'P2', name:'清远金属熔炼集团',   province:'广东', city:'清远', rating:4.7,
      accepts:['废金属'], cap:1500, load:900,
      outputs:[{type:'再生金属锭',ratio:0.90}] },
    { id:'P3', name:'苏州电子废弃物处置中心', province:'江苏', city:'苏州', rating:4.6,
      accepts:['电子废弃物'], cap:600, load:380,
      outputs:[{type:'再生铜',ratio:0.22},{type:'贵金属精矿',ratio:0.03},{type:'再生塑料粒子',ratio:0.30}] },
    { id:'P4', name:'南通纺织再生科技',   province:'江苏', city:'南通', rating:4.5,
      accepts:['废纺织品'], cap:700, load:300,
      outputs:[{type:'再生纤维',ratio:0.68},{type:'擦机布',ratio:0.20}] },
    { id:'P5', name:'绍兴再生纤维集团',   province:'浙江', city:'绍兴', rating:4.6,
      accepts:['废纺织品'], cap:800, load:620,
      outputs:[{type:'再生纤维',ratio:0.70},{type:'擦机布',ratio:0.18}] },
    { id:'P6', name:'台州循环塑料',       province:'浙江', city:'台州', rating:4.5,
      accepts:['废塑料'], cap:900, load:420,
      outputs:[{type:'再生塑料粒子',ratio:0.78},{type:'塑料碎片',ratio:0.10}] },
    { id:'P7', name:'潍坊再生纸业',       province:'山东', city:'潍坊', rating:4.7,
      accepts:['废纸'], cap:1400, load:700,
      outputs:[{type:'再生纸浆',ratio:0.82},{type:'纸板',ratio:0.10}] },
    { id:'P8', name:'唐山再生金属冶炼',   province:'河北', city:'唐山', rating:4.6,
      accepts:['废金属'], cap:1600, load:850,
      outputs:[{type:'再生金属锭',ratio:0.88}] },
    { id:'P9', name:'保定橡胶再生',       province:'河北', city:'保定', rating:4.4,
      accepts:['废橡胶'], cap:500, load:200,
      outputs:[{type:'再生胶',ratio:0.55},{type:'胶粉',ratio:0.35}] },
    { id:'P10',name:'郑州纸业循环',       province:'河南', city:'郑州', rating:4.5,
      accepts:['废纸'], cap:900, load:500,
      outputs:[{type:'再生纸浆',ratio:0.80},{type:'纸板',ratio:0.12}] },
    { id:'P11',name:'武汉电子拆解',       province:'湖北', city:'武汉', rating:4.5,
      accepts:['电子废弃物'], cap:400, load:200,
      outputs:[{type:'再生铜',ratio:0.20},{type:'贵金属精矿',ratio:0.04},{type:'再生塑料粒子',ratio:0.28}] },
    { id:'P12',name:'成都餐厨资源化',     province:'四川', city:'成都', rating:4.4,
      accepts:['餐厨垃圾'], cap:800, load:400,
      outputs:[{type:'工业油脂',ratio:0.08},{type:'有机肥',ratio:0.25}] },
    { id:'P13',name:'重庆塑料再生',       province:'重庆', city:'重庆', rating:4.3,
      accepts:['废塑料'], cap:700, load:300,
      outputs:[{type:'再生塑料粒子',ratio:0.72},{type:'塑料碎片',ratio:0.15}] },
    { id:'P14',name:'洪都再生纸业',       province:'江西', city:'南昌', rating:4.8,
      accepts:['废纸'], cap:500, load:420,
      outputs:[{type:'再生纸浆',ratio:0.82},{type:'纸板',ratio:0.10}] },
    { id:'P15',name:'宜春锂电循环',       province:'江西', city:'宜春', rating:4.9,
      accepts:['废旧锂电池'], cap:900, load:400,
      outputs:[{type:'黑粉',ratio:0.40},{type:'再生锂盐',ratio:0.12},{type:'再生铜',ratio:0.15}] },
    { id:'P16',name:'泉州纺织再生',       province:'福建', city:'泉州', rating:4.4,
      accepts:['废纺织品'], cap:500, load:300,
      outputs:[{type:'再生纤维',ratio:0.66},{type:'擦机布',ratio:0.22}] },
    { id:'P17',name:'沈阳橡胶循环',       province:'辽宁', city:'沈阳', rating:4.3,
      accepts:['废橡胶'], cap:450, load:180,
      outputs:[{type:'再生胶',ratio:0.58},{type:'胶粉',ratio:0.32}] },
    { id:'P18',name:'临沂木业再生',       province:'山东', city:'临沂', rating:4.2,
      accepts:['废木材'], cap:600, load:220,
      outputs:[{type:'再生板材',ratio:0.60},{type:'生物质燃料',ratio:0.30}] },
    { id:'P19',name:'徐州玻璃再生',       province:'江苏', city:'徐州', rating:4.3,
      accepts:['废玻璃'], cap:500, load:200,
      outputs:[{type:'玻璃熟料',ratio:0.85}] },
    { id:'P20',name:'佛山玻璃循环',       province:'广东', city:'佛山', rating:4.4,
      accepts:['废玻璃'], cap:400, load:250,
      outputs:[{type:'玻璃熟料',ratio:0.86}] }
  ],
  demands: [
    { id:'D1', company:'广州金发再生材料',   province:'广东', city:'广州', type:'再生塑料粒子', qty:600, price:8600 },
    { id:'D2', company:'佛山铝业集团',       province:'广东', city:'佛山', type:'再生金属锭',   qty:700, price:15800 },
    { id:'D3', company:'无锡铜业',           province:'江苏', city:'无锡', type:'再生铜',       qty:200, price:62000 },
    { id:'D4', company:'南通家纺集团',       province:'江苏', city:'南通', type:'再生纤维',     qty:400, price:5200 },
    { id:'D5', company:'南通工装制造',       province:'江苏', city:'南通', type:'擦机布',       qty:200, price:1400 },
    { id:'D6', company:'常州橡胶制品',       province:'江苏', city:'常州', type:'胶粉',         qty:200, price:1150 },
    { id:'D7', company:'杭州纺织科技',       province:'浙江', city:'杭州', type:'再生纤维',     qty:350, price:5400 },
    { id:'D8', company:'宁波塑胶制品',       province:'浙江', city:'宁波', type:'再生塑料粒子', qty:500, price:8800 },
    { id:'D9', company:'台州注塑产业联盟',   province:'浙江', city:'台州', type:'塑料碎片',     qty:150, price:2600 },
    { id:'D10',company:'青岛纸业',           province:'山东', city:'青岛', type:'再生纸浆',     qty:600, price:2400 },
    { id:'D11',company:'济南家居板材',       province:'山东', city:'济南', type:'再生板材',     qty:250, price:1450 },
    { id:'D12',company:'石家庄金属制品',     province:'河北', city:'石家庄', type:'再生金属锭', qty:500, price:15600 },
    { id:'D13',company:'郑州纸品',           province:'河南', city:'郑州', type:'再生纸浆',     qty:400, price:2350 },
    { id:'D14',company:'洛阳包装',           province:'河南', city:'洛阳', type:'纸板',         qty:200, price:2100 },
    { id:'D15',company:'武汉铜材',           province:'湖北', city:'武汉', type:'再生铜',       qty:150, price:61500 },
    { id:'D16',company:'成都生态农业',       province:'四川', city:'成都', type:'有机肥',       qty:500, price:950 },
    { id:'D17',company:'绵阳油脂化工',       province:'四川', city:'绵阳', type:'工业油脂',     qty:120, price:5400 },
    { id:'D18',company:'重庆汽配注塑',       province:'重庆', city:'重庆', type:'再生塑料粒子', qty:350, price:8500 },
    { id:'D19',company:'江西晨鸣纸业',       province:'江西', city:'南昌', type:'再生纸浆',     qty:320, price:2400 },
    { id:'D20',company:'江西华锂新材料',     province:'江西', city:'宜春', type:'黑粉',         qty:400, price:32000 },
    { id:'D21',company:'赣远新能源',         province:'江西', city:'宜春', type:'再生锂盐',     qty:120, price:68000 },
    { id:'D22',company:'泉州再生纤维',       province:'福建', city:'泉州', type:'再生纤维',     qty:280, price:5300 },
    { id:'D23',company:'大连轮胎翻新',       province:'辽宁', city:'大连', type:'再生胶',       qty:300, price:3800 },
    { id:'D24',company:'徐州建材集团',       province:'江苏', city:'徐州', type:'玻璃熟料',     qty:300, price:780 },
    { id:'D25',company:'深圳稀贵金属',       province:'广东', city:'深圳', type:'贵金属精矿',   qty:20,  price:180000 }
  ]
};

let state = { supplies:[], processors:[], demands:[], matches:[], lastRun:null,
              threshold:0, crossFilter:'all', stats:null, flows:[], unmet:[] };
let seq = 1000;

function clone(o){ return JSON.parse(JSON.stringify(o)); }

/* =========================================================
   0. 多页模式 · 页面识别 / 公共外壳 / 本地持久化
   -------------------------------------------------
   单文件版靠内存 state 在视图间共享数据；拆成多页后每次跳转
   都会重载脚本，state 随之清空。因此：
     · 三方登记（供给 / 加工 / 需求）写入 localStorage；
     · 任意页面加载时从 localStorage 恢复数据并重新求解撮合，
       保证 6 个页面看到的是同一份数据。
   ========================================================= */
const PAGE   = document.body.dataset.page || 'overview';
const LS_KEY = 'looplink.state.v1';

const PAGE_META = {
  overview:['平台总览','全国工业废物资源化撮合 · 供给 / 加工 / 需求 三端联动'],
  match:   ['智能撮合','全国范围按「品类 → 产能 → 收率 → 物流 → 需求」求解最优链路'],
  region:  ['区域联动','跨省调运流向、大区联动矩阵与省份供需台账'],
  supply:  ['供给方 · 废物登记','登记工业废物的品类、产生量、所在省份与期望处置价'],
  proc:    ['加工厂 · 处理能力','登记可接收品类、产能余量与再生品收率'],
  demand:  ['需求方 · 产品需求','登记对再生材料的需求量、品类与可接受价格']
};

/* 侧栏 / 移动端导航的唯一定义源 */
const NAV = [
  { group:'工作台' },
  { page:'overview', href:'index.html',  label:'平台总览', short:'总览',
    ico:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>' },
  { page:'match', href:'match.html', label:'智能撮合', short:'撮合', badge:'badge-match',
    ico:'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><path d="M7 12h10"/><circle cx="12" cy="12" r="1.6"/>' },
  { page:'region', href:'region.html', label:'区域联动', short:'联动', badge:'badge-region',
    ico:'<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="M12 7.4v3.2"/><path d="M10.3 11.7 6.4 16.7"/><path d="M13.7 11.7l3.9 5"/>' },
  { group:'三方登记' },
  { page:'supply', href:'supply.html', label:'供给方 · 废物', short:'供给', badge:'badge-supply',
    ico:'<path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M3 9v6l9 5 9-5V9"/>' },
  { page:'proc', href:'proc.html', label:'加工厂 · 能力', short:'加工', badge:'badge-proc',
    ico:'<path d="M3 20h18"/><path d="M5 20V9l4 2V9l4 2V8l4 2v10"/><path d="M9 20v-4h6v4"/>' },
  { page:'demand', href:'demand.html', label:'需求方 · 产品', short:'需求', badge:'badge-demand',
    ico:'<path d="M6 2h9l4 4v16H6z"/><path d="M15 2v4h4"/><path d="M9 12h7"/><path d="M9 16h5"/>' }
];

/* 注入公共外壳：侧栏 + 顶栏 + 移动端导航（6 个页面共用同一份定义） */
function buildShell(){
  const meta = PAGE_META[PAGE] || PAGE_META.overview;

  const aside = $('#sidebar');
  if (aside){
    aside.innerHTML = `
      <a class="brand" href="index.html">
        <div class="brand-mark">
          <!-- 循链单色标：与 favicon 同源，见 assets/brand/looplink-mark-mono.svg -->
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.531" stroke-linecap="round">
            <circle cx="8.25" cy="12" r="4.5"/>
            <circle cx="15.75" cy="12" r="4.5"/>
          </svg>
        </div>
        <div>
          <div class="brand-name">循链 LoopLink</div>
          <div class="brand-sub">Waste Matching</div>
        </div>
      </a>
      ${NAV.map(n => n.group
        ? `<div class="nav-label">${n.group}</div>`
        : `<a class="nav-item${n.page===PAGE?' active':''}" href="${n.href}"${n.page===PAGE?' aria-current="page"':''}>
             <svg viewBox="0 0 24 24">${n.ico}</svg>
             <span>${n.label}</span>
             ${n.badge?`<span class="nav-badge" id="${n.badge}">0</span>`:''}
           </a>`).join('')}
      <div class="side-foot">
        <div><span class="dot-live"></span>撮合引擎运行中</div>
        <div style="margin-top:4px">覆盖全国 12 省 · 33 市</div>
        <div style="margin-top:4px">演示数据 · 每日 06:00 同步</div>
      </div>`;
  }

  const top = $('#topbar');
  if (top){
    top.innerHTML = `
      <div>
        <h1 id="page-title">${meta[0]}</h1>
        <div class="crumb" id="page-crumb">${meta[1]}</div>
      </div>
      <div class="top-actions">
        <button class="btn btn-ghost btn-sm" id="btn-reset">重置演示数据</button>
        <button class="btn btn-primary" id="btn-run">
          <svg viewBox="0 0 24 24"><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z"/></svg>
          运行智能撮合
        </button>
      </div>`;
  }

  const mnav = $('#mnav');
  if (mnav){
    mnav.innerHTML = NAV.filter(n=>n.page)
      .map(n=>`<a class="mnav-b${n.page===PAGE?' on':''}" href="${n.href}"${n.page===PAGE?' aria-current="page"':''}>${n.short}</a>`)
      .join('');
  }

  document.title = '循链 LoopLink · ' + meta[0];
}

/* ---------- localStorage 持久化 ---------- */
function saveState(){
  try{
    localStorage.setItem(LS_KEY, JSON.stringify({
      supplies: state.supplies, processors: state.processors, demands: state.demands, seq
    }));
  }catch(e){ /* 隐私模式等场景静默降级为单页内内存态 */ }
}
function loadState(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const o = JSON.parse(raw);
    if (!o || !Array.isArray(o.supplies) || !Array.isArray(o.processors) || !Array.isArray(o.demands)) return false;
    state.supplies   = o.supplies;
    state.processors = o.processors;
    state.demands    = o.demands;
    seq = o.seq || 1000;
    return true;
  }catch(e){ return false; }
}
function seedState(){
  state.supplies   = clone(SEED.supplies);
  state.processors = clone(SEED.processors);
  state.demands    = clone(SEED.demands);
  seq = 1000;
}

/* 侧栏角标：每个页面都刷新，与当前页无关 */
function updateBadges(){
  const set = (id, v)=>{ const el = document.getElementById(id); if (el) el.textContent = v; };
  set('badge-match',  state.matches.length);
  set('badge-supply', state.supplies.length);
  set('badge-proc',   state.processors.length);
  set('badge-demand', state.demands.length);
  set('badge-region', state.stats ? (state.stats.provinceCount || 0) : 0);
}

/* 渲染全部视图（各 render 内部自带「本页无该容器则跳过」守卫） */
function renderAll(){
  updateBadges();
  renderOverview();
  renderSupplyView();
  renderProcView();
  renderDemandView();
  renderMatchView();
  renderRegionView();
}

/* =========================================================
   2. 工具
   ========================================================= */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = (n,d=0) => Number(n).toLocaleString('zh-CN',{minimumFractionDigits:d,maximumFractionDigits:d});
const pct = n => (n*100).toFixed(0)+'%';

function toast(msg, isErr){
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'show' + (isErr ? ' err' : '');
  clearTimeout(t._t);
  t._t = setTimeout(()=>{ t.className=''; }, 2400);
}

/* ---------- 地理与物流成本模型 ---------- */
const FREIGHT_PER_TKM = 0.35;   // 公路大宗散货运费 元/吨·公里
const HANDLING_FEE    = 20;     // 装卸短驳 元/吨
const ROAD_FACTOR     = 1.25;   // 公路绕行系数（直线距离 → 实际里程）

function haversine(p, q){
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(q[0] - p[0]), dLng = toRad(q[1] - p[1]);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(p[0])) * Math.cos(toRad(q[0])) * Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/* 两地公路运输里程（km）：同城按 25km 计，其余按直线距离 × 绕行系数 */
function distKm(a, b){
  if (!a || !b) return 600;
  const p = CITY[a.city], q = CITY[b.city];
  if (!p || !q) return 600;
  if (a.city === b.city) return 25;
  return Math.max(30, Math.round(haversine(p, q) * ROAD_FACTOR));
}

/* 单位运费（元/吨） */
const freightPerTon = km => Math.round(km * FREIGHT_PER_TKM + HANDLING_FEE);
const sameProvince  = (a, b) => !!a && !!b && a.province === b.province;
/* 到厂净价：需求方报价扣除配送运费后，加工厂实际到手 */
const netPrice = (demand, proc) => (demand.price || 0) - freightPerTon(distKm(proc, demand));

/* =========================================================
   3. 撮合引擎
   -------------------------------------------------
   核心：对每条「废物」在全国范围内寻找加工厂
        → 把废物按收率拆成再生品 → 分配给需求方
        → 按「品类 / 产能 / 需求吸收 / 物流 / 评级」五维打分
   ========================================================= */
function computeMatches(){
  const procState = state.processors.map(p => ({
    ref:p, free: Math.max(0, p.cap - p.load), free0: Math.max(0, p.cap - p.load)
  }));
  const demState = state.demands.map(d => ({ ref:d, need: d.qty, need0: d.qty }));
  const results = [];
  const usedProc = {};   // 工厂累计吃进量
  const usedDem  = {};   // 需求方累计获得量

  state.supplies.forEach(s => {
    let left = s.qty;
    const legs = [];

    const cands = procState
      .filter(p => p.free > 0 && p.ref.accepts.includes(s.type))
      .map(p => ({ st:p, pre: scoreLeg(s, p, null, demState) }))
      .sort((a,b) => b.pre - a.pre || b.st.free - a.st.free);

    cands.forEach(({st}) => {
      if (left <= 0) return;
      const p = st.ref;
      const take = Math.min(left, st.free);
      if (take <= 0) return;

      // 产出物
      const outputs = p.outputs
        .filter(o => o.ratio > 0)
        .map(o => ({ type:o.type, qty: take * o.ratio, ratio:o.ratio }));

      // 分配产出物给需求方
      const allocs = [];
      let outTotal = outputs.reduce((a,b)=>a+b.qty, 0);
      let outMatched = 0;
      outputs.forEach(o => {
        let q = o.qty;
        // 需求方按「到厂净价」排序：报价高但远在天边的，未必比就近的划算
        const ds = demState
          .filter(d => d.need > 1e-6 && d.ref.type === o.type)
          .sort((a,b) => netPrice(b.ref, p) - netPrice(a.ref, p));
        ds.forEach(d => {
          if (q <= 1e-6) return;
          const use = Math.min(q, d.need);
          d.need -= use; q -= use;
          outMatched += use;
          usedDem[d.ref.id] = (usedDem[d.ref.id]||0) + use;
          // 再生品从加工厂配送到需求方的第二段运输
          const km2 = distKm(p, d.ref);
          const uf2 = freightPerTon(km2);
          allocs.push({ demand:d.ref, product:o.type, qty:use, price:d.ref.price,
                        km2, cross2: !sameProvince(p, d.ref), unitFreight2: uf2, freight2: uf2 * use });
        });
        if (q > 1e-6) allocs.push({ demand:null, product:o.type, qty:q, price:null,
                                    km2:0, cross2:false, unitFreight2:0, freight2:0 });
      });

      const coverage = outTotal > 0 ? outMatched / outTotal : 0;
      const score = scoreLeg(s, { ref:p, free:take, free0:st.free0 }, allocs, null, take, left, coverage);

      // 第一段：废物从供给方收运到加工厂
      const km = distKm(s, p);
      const unitF1 = freightPerTon(km);
      const freight1 = unitF1 * take;
      // 第二段：再生品从加工厂配送到需求方
      const a2 = allocs.filter(a=>a.demand);
      const qty2 = a2.reduce((a,x)=>a+x.qty, 0);
      const freight2 = a2.reduce((a,x)=>a+x.freight2, 0);
      const km2 = qty2 > 0 ? a2.reduce((a,x)=>a+x.km2*x.qty, 0) / qty2 : 0;
      const cross2Qty = a2.filter(x=>x.cross2).reduce((a,x)=>a+x.qty, 0);

      legs.push({
        processor:p, take, outputs, allocs, coverage, score,
        value: allocs.filter(a=>a.demand).reduce((a,b)=>a+b.qty*b.price, 0),
        km, cross: !sameProvince(s, p), unitFreight: unitF1, freight1,
        km2, unitFreight2: qty2 > 0 ? freight2/qty2 : 0, freight2, cross2Qty,
        freight: freight1 + freight2
      });

      st.free -= take;
      left -= take;
      usedProc[p.id] = (usedProc[p.id]||0) + take;
    });

    // 汇总
    const matchedQty = s.qty - left;
    const totalOut = legs.reduce((a,l)=>a+l.outputs.reduce((x,y)=>x+y.qty,0), 0);
    const totalOutMatched = legs.reduce((a,l)=>a+l.allocs.filter(x=>x.demand).reduce((x,y)=>x+y.qty,0), 0);
    const avgScore = legs.length
      ? legs.reduce((a,l)=>a + l.score*l.take, 0) / Math.max(matchedQty,1) : 0;

    results.push({
      supply:s, legs, left, matchedQty, totalOut, totalOutMatched,
      score: Math.round(avgScore),
      status: left <= 1e-6 ? 'closed' : (matchedQty > 0 ? 'partial' : 'failed'),
      co2: matchedQty * (WASTE[s.type]?.co2 || 1),
      crossQty: legs.filter(l=>l.cross).reduce((a,l)=>a+l.take, 0),
      cross2Qty: legs.reduce((a,l)=>a+l.cross2Qty, 0),
      freight1Sum: legs.reduce((a,l)=>a+l.freight1, 0),
      freight2Sum: legs.reduce((a,l)=>a+l.freight2, 0),
      freightSum: legs.reduce((a,l)=>a+l.freight, 0),
      avgKm: matchedQty > 0 ? legs.reduce((a,l)=>a+l.km*l.take,0)/matchedQty : 0,
      avgKm2: legs.reduce((a,l)=>a+l.km2*l.take,0)/Math.max(matchedQty,1)
    });
  });

  // 未满足的需求
  const unmet = demState.filter(d => d.need > 1e-6).map(d => ({ ref:d.ref, need:d.need }));

  // 全国联动统计
  const flows = {};
  let crossQty = 0, sameQty = 0, freightTotal = 0, freight1Total = 0, freight2Total = 0;
  let kmWeighted = 0, km2Weighted = 0, crossLegs = 0, totalLegs = 0, matched = 0, cross2Qty = 0;
  results.forEach(m => m.legs.forEach(l => {
    const k = m.supply.province + '|' + l.processor.province;
    if (!flows[k]) flows[k] = { from:m.supply.province, to:l.processor.province, qty:0, km:l.km, cross:l.cross };
    flows[k].qty += l.take;
    if (l.cross) crossQty += l.take; else sameQty += l.take;
    freightTotal += l.freight;
    freight1Total += l.freight1;
    freight2Total += l.freight2;
    kmWeighted  += l.km * l.take;
    km2Weighted += l.km2 * l.take;
    matched     += l.take;
    cross2Qty   += l.cross2Qty;
    totalLegs++; if (l.cross) crossLegs++;
  }));
  const provinceSet = new Set(state.supplies.map(s=>s.province)
    .concat(state.processors.map(p=>p.province), state.demands.map(d=>d.province)));
  const citySet = new Set(state.supplies.map(s=>s.city)
    .concat(state.processors.map(p=>p.city), state.demands.map(d=>d.city)));

  state.matches = results;
  state.unmet = unmet;
  state.usedProc = usedProc;
  state.usedDem = usedDem;
  state.flows = Object.values(flows).sort((a,b)=>b.qty-a.qty);
  state.stats = {
    crossQty, sameQty, freightTotal, freight1Total, freight2Total,
    avgKm:  matched > 0 ? kmWeighted / matched : 0,
    avgKm2: matched > 0 ? km2Weighted / matched : 0,
    crossLegs, totalLegs, matched, cross2Qty,
    provinceCount: provinceSet.size, cityCount: citySet.size,
    crossRate: matched > 0 ? crossQty / matched : 0
  };
  state.lastRun = new Date();
}

/* 打分：品类 35 / 产能满足 14 / 产出需求覆盖 25 / 物流经济性 18 / 评级 8
   物流权重刻意给高：全国撮合时「就近消纳」应该优先于「找大厂」，
   否则南昌的废纸会被 1100km 外的山东大厂抢走，运费吃掉全部收益。 */
function scoreLeg(s, p, allocs, demState, take, left, coverage){
  const W = 35 + 14 + 25 + 18 + 8;
  const free = p.free != null ? p.free : Math.max(0, p.ref.cap - p.ref.load);
  const capFit  = Math.min(1, free / Math.max(left != null ? left : s.qty, 1));
  const cov     = coverage != null ? coverage : 0.4;
  const km      = distKm(s, p.ref);
  const logi    = 1 / (1 + km / 400);   // 0km→1.00 / 200km→0.67 / 400km→0.50 / 1200km→0.25
  const rating  = (p.ref.rating || 4) / 5;
  const raw = 35*1 + 14*capFit + 25*cov + 18*logi + 8*rating;
  return Math.round(raw / W * 100);
}

/* =========================================================
   4. 渲染 · 总览
   ========================================================= */
/* 省份维度汇总：产出 / 产能 / 需求 / 跨省调出调入 */
function provinceStats(){
  const set = new Set([
    ...state.supplies.map(s=>s.province),
    ...state.processors.map(p=>p.province),
    ...state.demands.map(d=>d.province)
  ]);
  const out = {}, inb = {};
  (state.matches||[]).forEach(m => m.legs.forEach(l => {
    if (!l.cross) return;
    out[m.supply.province] = (out[m.supply.province]||0) + l.take;
    inb[l.processor.province] = (inb[l.processor.province]||0) + l.take;
  }));
  return Array.from(set).map(pv => ({
    province: pv,
    region: regionOf(pv),
    supply:  state.supplies.filter(s=>s.province===pv).reduce((a,s)=>a+s.qty,0),
    cap:     state.processors.filter(p=>p.province===pv).reduce((a,p)=>a+p.cap,0),
    freeCap: state.processors.filter(p=>p.province===pv).reduce((a,p)=>a+Math.max(0,p.cap-p.load),0),
    demand:  state.demands.filter(d=>d.province===pv).reduce((a,d)=>a+d.qty,0),
    out: out[pv]||0,
    in:  inb[pv]||0
  })).sort((a,b) => (b.supply-b.freeCap) - (a.supply-a.freeCap));
}

function renderOverview(){
  if (!$('#kpi-grid')) return;          // 非「平台总览」页，跳过
  const st         = state.stats || {};
  const totalSupply= state.supplies.reduce((a,s)=>a+s.qty,0);
  const totalDemand= state.demands.reduce((a,d)=>a+d.qty,0);
  const matchedQty = state.matches.reduce((a,m)=>a+m.matchedQty,0);
  const co2        = state.matches.reduce((a,m)=>a+m.co2,0);
  const outMatched = state.matches.reduce((a,m)=>a+m.totalOutMatched,0);
  const outTotal   = state.matches.reduce((a,m)=>a+m.totalOut,0);
  const demRate    = totalDemand > 0 ? outMatched/totalDemand : 0;
  const matchRate  = totalSupply > 0 ? matchedQty/totalSupply : 0;

  const kpis = [
    { label:'全国覆盖', val: fmt(st.provinceCount||0), unit:'省',
      foot:`${st.cityCount||0} 个城市纳入撮合池`,
      ico:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3.2 9h17.6 M3.2 15h17.6',
      bg:'var(--blue-soft)', cl:'#3778c9' },
    { label:'撮合消纳量', val: fmt(matchedQty), unit:'吨/月',
      foot:`<span class="trend-up">${pct(matchRate)}</span> 撮合率 · 废物总量 ${fmt(totalSupply)} 吨`,
      ico:'M4 12l5 5L20 6', bg:'var(--green-soft)', cl:'var(--green-2)' },
    { label:'跨省联动量', val: fmt(st.crossQty||0), unit:'吨/月',
      foot:`占撮合量 <b>${pct(st.crossRate||0)}</b> · ${st.crossLegs||0} 条跨省链路`,
      ico:'M4 8h14l-3.5-3.5 M20 16H6l3.5 3.5',
      bg:'var(--amber-soft)', cl:'var(--amber)' },
    { label:'物流成本', val: `¥${fmt((st.freightTotal||0)/10000,1)}`, unit:'万/月',
      foot:`收运 ${fmt(st.avgKm||0)}km + 配送 ${fmt(st.avgKm2||0)}km · 吨均 ¥${fmt(matchedQty?(st.freightTotal||0)/matchedQty:0)}`,
      ico:'M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M7 16.5C7 12 10 9 16.5 7.5',
      bg:'var(--lime-soft)', cl:'#5d9b1f' }
  ];

  $('#kpi-grid').innerHTML = kpis.map(k=>`
    <div class="card kpi">
      <div class="kpi-top">
        <div class="kpi-ico" style="background:${k.bg}">
          <svg viewBox="0 0 24 24" style="stroke:${k.cl}">${pathOf(k.ico)}</svg>
        </div>
        <div class="kpi-label">${k.label}</div>
      </div>
      <div class="kpi-val num">${k.val}${k.unit?`<small>${k.unit}</small>`:''}</div>
      <div class="kpi-foot">${k.foot}</div>
    </div>`).join('');

  $('#badge-region').textContent = (st.provinceCount||0);

  renderRegionChart();
  renderCrossFlows();
  renderUtilChart();
  renderGapPanel();
}

function pathOf(d){
  // 简化：把 d 按 "M...空间..." 的写法拆成多条 path
  return d.split(' M').map((seg,i)=>`<path d="${i===0?seg:'M'+seg}"/>`).join('');
}

/* 各省「废物产出 vs 本地加工余量」，缺口即为需要跨省调出的量 */
function renderRegionChart(){
  const rows = provinceStats().filter(r=>r.supply>0 || r.freeCap>0)
    .sort((a,b)=>b.supply-a.supply).slice(0,12);
  if (!rows.length){ $('#chart-region').innerHTML = `<div class="empty" style="padding:24px 0">暂无数据</div>`; return; }
  const max = Math.max(...rows.map(r=>Math.max(r.supply, r.freeCap)), 1);

  $('#chart-region').innerHTML = rows.map(r=>{
    const gap = r.supply - r.freeCap;
    const tag = gap > 1
      ? `<span class="tag tag-red">缺口 ${fmt(gap)}</span>`
      : `<span class="tag tag-green">余量 ${fmt(-gap)}</span>`;
    return `<div class="bar-row">
      <div class="bar-head">
        <span class="bar-name">${r.province}<span style="font-weight:400;color:var(--muted);margin-left:6px;font-size:11px">${r.region}</span></span>
        <span class="bar-val num">产出 ${fmt(r.supply)} / 余量 ${fmt(r.freeCap)} ${tag}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.max(r.supply/max*100, r.supply>0?1.5:0)}%;background:#8d99ae"></div>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.max(r.freeCap/max*100, r.freeCap>0?1.5:0)}%;background:linear-gradient(90deg,#12a37e,#3ac49b)"></div>
      </div>
    </div>`;
  }).join('') + `
    <div style="margin-top:14px;padding:10px 12px;background:var(--surface-2);border:1px solid var(--line-2);
      border-radius:9px;font-size:11.5px;color:var(--muted);line-height:1.7">
      按省份汇总的宏观缺口。<b style="color:var(--ink-2)">即便全省总量平衡，具体品类仍可能不匹配</b>——
      例如广东废塑料产能不足而废金属有富余，结果仍会产生跨省调运。精确到品类的流向见「区域联动」页。
    </div>`;
}

/* 跨省流向：只列真正跨省的链路，省内自消纳由区域联动页承载 */
function renderCrossFlows(){
  if (!$('#flow-panel')) return;
  const all = (state.flows || []).filter(f=>f.cross);
  const st  = state.stats || {};
  $('#flow-sub').innerHTML = all.length
    ? `跨省 ${fmt(st.crossQty||0)} 吨 · 占 ${pct(st.crossRate||0)} · ${all.length} 条流向`
    : '';

  if (!all.length){
    $('#flow-panel').innerHTML = `<div class="empty" style="padding:26px 0">
      <div class="empty-title">当前无跨省调运</div>
      <div style="font-size:12px">所有废物均在本省消纳</div></div>`;
    return;
  }
  const max = Math.max(...all.map(f=>f.qty), 1);
  $('#flow-panel').innerHTML = all.map(f=>`
    <div style="padding:8px 0;border-bottom:1px dashed var(--line-2)">
      <div style="display:flex;align-items:center;gap:8px;font-size:12.3px">
        <span style="font-weight:650">${f.from}</span>
        <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:#c9a45c;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;flex:0 0 12px"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
        <span style="font-weight:650">${f.to}</span>
        <span class="tag tag-amber" style="margin-left:2px">跨省</span>
        <span class="num" style="margin-left:auto;font-weight:700">${fmt(f.qty)} <small style="font-weight:600;color:var(--muted)">吨</small></span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:5px">
        <div style="flex:1;height:5px;border-radius:4px;background:#f0f5f2;overflow:hidden">
          <div style="width:${Math.max(f.qty/max*100,4)}%;height:100%;border-radius:4px;background:linear-gradient(90deg,#dd8b0b,#f0b95a)"></div>
        </div>
        <span class="num" style="font-size:11px;color:var(--muted);flex:0 0 auto">${fmt(f.km)} km</span>
      </div>
    </div>`).join('') +
    `<div style="margin-top:12px;padding-top:11px;border-top:1px solid var(--line-2);display:flex;justify-content:space-between;font-size:12px">
      <span style="color:var(--muted)">省内就近消纳 <b class="num" style="color:var(--ink-2)">${fmt(st.sameQty||0)}</b> 吨</span>
      <span style="color:var(--muted)">跨省占比 <b class="num" style="color:var(--amber)">${pct(st.crossRate||0)}</b></span>
    </div>`;
}

function renderUtilChart(){
  if (!$('#chart-util')) return;
  const list = state.processors.map(p=>{
    const used = state.usedProc[p.id] || 0;
    const base = p.load;
    const rate = p.cap>0 ? Math.min(1,(base+used)/p.cap) : 0;
    return { p, rate, used };
  }).sort((a,b)=>b.rate-a.rate).slice(0,10);

  $('#chart-util').innerHTML = list.map(({p,rate})=>{
    const c = rate>=0.98 ? 'var(--red)' : rate>0.8 ? 'var(--amber)' : 'var(--green-2)';
    return `<div class="util-row">
      <div class="util-name" title="${esc(p.province)}｜${esc(p.name)}"><span style="color:var(--muted);font-size:11px">${esc(p.province)}</span> ${esc(p.name)}</div>
      <div class="util-track"><div class="util-fill" style="width:${Math.max(rate*100,2)}%;background:${c}"></div></div>
      <div class="util-pct num" style="color:${c}">${pct(rate)}</div>
    </div>`;
  }).join('') || `<div class="empty" style="padding:24px 0">暂无加工厂</div>`;

  const capSum = state.processors.reduce((a,p)=>a+p.cap,0);
  const usedSum = state.processors.reduce((a,p)=>a+p.load+(state.usedProc[p.id]||0),0);
  if (state.processors.length){
    $('#chart-util').insertAdjacentHTML('beforeend', `
      <div style="margin-top:14px;padding-top:11px;border-top:1px solid var(--line-2);display:flex;justify-content:space-between;font-size:12px">
        <span style="color:var(--muted)">全国合计产能 <b class="num" style="color:var(--ink-2)">${fmt(capSum)}</b> 吨/月</span>
        <span style="color:var(--muted)">平均利用率 <b class="num" style="color:var(--ink-2)">${capSum?pct(usedSum/capSum):'—'}</b></span>
      </div>`);
  }
}

function renderGapPanel(){
  if (!$('#gap-panel')) return;
  const st = state.matches;
  if (!st.length){
    $('#gap-panel').innerHTML = `<div class="empty">
      <div class="empty-ico"><svg viewBox="0 0 24 24"><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z"/></svg></div>
      <div class="empty-title">尚未运行撮合</div>
      <div style="font-size:12px">点击右上角「运行智能撮合」生成链路诊断</div>
    </div>`;
    return;
  }
  const S           = state.stats || {};
  const totalSupply = state.supplies.reduce((a,s)=>a+s.qty,0);
  const totalDemand = state.demands.reduce((a,d)=>a+d.qty,0) || 1;
  const matched     = st.reduce((a,m)=>a+m.matchedQty,0);
  const shortCap    = st.filter(m=>m.status!=='closed').reduce((a,m)=>a+m.left,0);
  const overCap     = st.reduce((a,m)=>a + m.legs.reduce((x,l)=>x + l.allocs.filter(al=>!al.demand).reduce((y,al)=>y+al.qty,0),0), 0);
  const unmetQty    = (state.unmet||[]).reduce((a,u)=>a+u.need,0);
  const co2         = st.reduce((a,m)=>a+m.co2,0);
  const outMatched  = st.reduce((a,m)=>a+m.totalOutMatched,0);

  // 找不到承接方的废物集中在哪些省份
  const failPv = {};
  st.filter(m=>m.status!=='closed').forEach(m=>{
    failPv[m.supply.province] = (failPv[m.supply.province]||0) + m.left;
  });
  const failTop = Object.entries(failPv).sort((a,b)=>b[1]-a[1])[0];

  const items = [
    { label:'废物找不到承接方', val: fmt(shortCap), unit:'吨', level: shortCap>0?'red':'ok',
      note: shortCap>0
        ? `全国均无富余产能承接${failTop?`，集中在 ${failTop[0]}（${fmt(failTop[1])} 吨）`:''}，建议跨区新建处置产能`
        : '全部废物均已被承接' },
    { label:'再生品找不到买家', val: fmt(overCap), unit:'吨', level: overCap>0?'amber':'ok',
      note: overCap>0 ? '产出物在平台上无对应需求，建议开发下游或调整收率' : '产出物全部被需求方吸收' },
    { label:'省际产能错配', val: fmt(S.crossQty||0), unit:'吨', level: S.crossQty>0?'amber':'ok',
      note: (S.crossQty||0)>0
        ? `${S.crossLegs} 条链路需跨省调运，收运段平均 ${fmt(S.avgKm)} km，运费 ¥${fmt(S.freight1Total/10000,1)} 万`
        : '所有废物均在本省消纳' },
    { label:'需求缺口', val: fmt(unmetQty), unit:'吨', level: unmetQty>0?'amber':'ok',
      note: unmetQty>0 ? `全国再生料供给 ${fmt(unmetQty+outMatched)} 吨，仍缺 ${fmt(unmetQty)} 吨` : '所有需求已被满足' }
  ];

  $('#gap-panel').innerHTML = items.map(it=>`
    <div style="display:flex;gap:12px;align-items:flex-start;padding:11px 0;border-bottom:1px dashed var(--line-2)">
      <div style="width:8px;height:8px;border-radius:50%;margin-top:7px;flex:0 0 8px;background:${
        it.level==='ok'?'var(--green-2)':it.level==='amber'?'var(--amber)':'var(--red)'}"></div>
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;gap:10px">
          <span style="font-size:12.8px;font-weight:600;color:var(--ink-2)">${it.label}</span>
          <span class="num" style="font-size:13px;font-weight:700">${it.val}<small style="font-size:11px;color:var(--muted);font-weight:600"> ${it.unit}</small></span>
        </div>
        <div style="font-size:11.5px;color:var(--muted);margin-top:2px">${it.note}</div>
      </div>
    </div>`).join('') +
    `<div style="margin-top:13px;padding:10px 12px;background:var(--green-soft);border-radius:9px;font-size:12px;color:var(--green-deep);line-height:1.7">
      <b>撮合率 ${pct(totalSupply? matched/totalSupply:0)}</b> · 平均匹配度 ${Math.round(st.reduce((a,m)=>a+m.score,0)/st.length)} 分 ·
      需求满足率 ${pct(outMatched/totalDemand)}<br>
      碳减排 ${fmt(co2,0)} tCO₂e · 单月减少填埋 ${fmt(matched)} 吨
    </div>`;
}

/* =========================================================
   5. 渲染 · 供给方
   ========================================================= */
function renderSupplyView(){
  if (!$('#tbody-supply')) return;
  const byType = WASTE_TYPES.map(t=>({
    t, qty: state.supplies.filter(s=>s.type===t).reduce((a,s)=>a+s.qty,0)
  })).filter(x=>x.qty>0).sort((a,b)=>b.qty-a.qty);
  const total = byType.reduce((a,b)=>a+b.qty,0) || 1;

  $('#supply-structure').innerHTML = byType.length ? `
    <div style="display:flex;height:12px;border-radius:7px;overflow:hidden;gap:2px;margin-bottom:14px">
      ${byType.map(x=>`<div title="${x.t} ${fmt(x.qty)}吨" style="width:${x.qty/total*100}%;background:${WASTE[x.t].color};min-width:3px"></div>`).join('')}
    </div>
    ${byType.map(x=>`
      <div style="display:flex;align-items:center;gap:9px;padding:6px 0;font-size:12.3px">
        <span style="width:8px;height:8px;border-radius:2px;background:${WASTE[x.t].color};flex:0 0 8px"></span>
        <span style="flex:1;color:var(--ink-2);font-weight:550">${x.t}</span>
        <span class="num" style="color:var(--muted)">${fmt(x.qty)} 吨</span>
        <span class="num" style="font-weight:700;width:38px;text-align:right">${pct(x.qty/total)}</span>
      </div>`).join('')}
    <div style="margin-top:12px;padding-top:11px;border-top:1px solid var(--line-2);display:flex;justify-content:space-between;font-size:12px">
      <span style="color:var(--muted)">合计</span>
      <span class="num" style="font-weight:700">${fmt(total)} 吨/月</span>
    </div>` : `<div class="empty" style="padding:24px 0">暂无登记</div>`;

  $('#supply-count').textContent = `${state.supplies.length} 条记录`;
  $('#badge-supply').textContent = state.supplies.length;

  $('#tbody-supply').innerHTML = state.supplies.map(s=>{
    const cp    = state.processors.filter(p=>p.accepts.includes(s.type));
    const local = cp.filter(p=>p.province===s.province);
    const capFree    = cp.reduce((a,p)=>a+Math.max(0,p.cap-p.load),0);
    const localFree  = local.reduce((a,p)=>a+Math.max(0,p.cap-p.load),0);
    const m = state.matches.find(x=>x.supply.id===s.id);

    // 承接方标签：本省余量够 → 绿；本省不够但全国够 → 橙（需跨省）；全国都不够 → 红
    let capTag;
    if (!cp.length)            capTag = `<span class="tag tag-red">全国无承接方</span>`;
    else if (localFree >= s.qty) capTag = `<span class="tag tag-green">本省可消纳 · ${local.length}家</span>`;
    else if (capFree >= s.qty)   capTag = `<span class="tag tag-amber">需跨省 · 全国${cp.length}家</span>`;
    else                         capTag = `<span class="tag tag-red">产能不足 · 余量仅 ${fmt(capFree)}吨</span>`;

    let dest;
    if (!m || !m.legs.length) dest = `<span class="tag tag-red">未匹配</span>`;
    else dest = m.legs.map(l=>`<div style="font-size:11.5px;line-height:1.7">
        <span class="num" style="font-weight:650">${fmt(l.take)}</span> 吨 →
        ${l.cross?`<span class="tag tag-amber" style="padding:1px 5px">跨省</span>`:''}
        <span style="color:var(--ink-2)">${esc(l.processor.province)}·${esc(l.processor.name)}</span>
        <span class="td-mute num">${l.km}km</span>
      </div>`).join('');

    return `<tr>
      <td class="td-strong">${esc(s.company)}</td>
      <td><span class="tag tag-soft"><i style="background:${WASTE[s.type]?.color||'#999'}"></i>${esc(s.type)}</span></td>
      <td class="num td-strong">${fmt(s.qty)} 吨</td>
      <td class="num">${s.price?`¥${fmt(s.price)}`:'<span class="td-mute">面议</span>'}</td>
      <td><span style="font-weight:600">${esc(s.province)}</span><span class="td-mute"> · ${esc(s.city)}</span></td>
      <td>${capTag}</td>
      <td style="min-width:190px">${dest}</td>
      <td style="text-align:right">
        <button class="btn btn-ghost btn-sm" onclick="delSupply('${s.id}')">移除</button>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="8" class="td-mute" style="text-align:center;padding:28px">暂无数据</td></tr>`;
}

/* =========================================================
   6. 渲染 · 加工厂
   ========================================================= */
function renderProcView(){
  if (!$('#proc-cards')) return;
  const byType = WASTE_TYPES.map(t=>({
    t,
    free: state.processors.filter(p=>p.accepts.includes(t)).reduce((a,p)=>a+Math.max(0,p.cap-p.load),0),
    cap:  state.processors.filter(p=>p.accepts.includes(t)).reduce((a,p)=>a+p.cap,0)
  })).filter(x=>x.cap>0).sort((a,b)=>b.free-a.free);
  const totalFree = byType.reduce((a,b)=>a+b.free,0) || 1;

  $('#proc-structure').innerHTML = `
    <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:12px">
      <span class="num" style="font-size:26px;font-weight:700;letter-spacing:-.5px">${fmt(totalFree)}</span>
      <span style="font-size:12px;color:var(--muted);font-weight:600">吨/月 可用余量</span>
    </div>
    ${byType.map(x=>`
      <div style="padding:7px 0">
        <div style="display:flex;justify-content:space-between;font-size:12.2px;margin-bottom:4px">
          <span style="color:var(--ink-2);font-weight:550">${x.t}</span>
          <span class="num" style="color:var(--muted)">${fmt(x.free)} / ${fmt(x.cap)}</span>
        </div>
        <div style="height:6px;border-radius:4px;background:#f0f5f2;overflow:hidden">
          <div style="width:${x.free/x.cap*100}%;height:100%;border-radius:4px;background:linear-gradient(90deg,#12a37e,#4ecfa8)"></div>
        </div>
      </div>`).join('') || `<div class="empty" style="padding:20px 0">暂无</div>`}`;

  $('#badge-proc').textContent = state.processors.length;

  $('#proc-cards').innerHTML = state.processors.map(p=>{
    const free = Math.max(0, p.cap - p.load);
    const used = Math.min(state.usedProc[p.id] || 0, free);
    const totalRate = p.cap ? Math.min(1, (p.load + used) / p.cap) : 0;
    const loadW = p.cap ? Math.min(100, p.load/p.cap*100) : 0;
    const usedW = p.cap ? Math.min(100 - loadW, used/p.cap*100) : 0;
    const c = totalRate>=0.98?'var(--red)':totalRate>0.8?'var(--amber)':'var(--green-2)';
    return `<div class="card" style="padding:14px 16px">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:9px">
        <div style="min-width:0">
          <div style="font-size:13.2px;font-weight:650;margin-bottom:3px">${esc(p.name)}</div>
          <div style="font-size:11.5px;color:var(--muted)">
            <span style="display:inline-block;background:var(--green-soft);color:var(--green-deep);padding:0 6px;border-radius:5px;font-weight:600">${esc(p.province)}</span>
            ${esc(p.city)} · 评分 <span class="num" style="color:var(--amber);font-weight:700">${p.rating||'—'}</span>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="delProc('${p.id}')">移除</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
        ${p.accepts.map(t=>`<span class="tag tag-soft"><i style="background:${WASTE[t]?.color||'#999'}"></i>${t}</span>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="flex:1;height:7px;border-radius:5px;background:#f0f5f2;overflow:hidden;display:flex">
          <div style="width:${loadW}%;background:#a9bdb4"></div>
          <div style="width:${usedW}%;background:${c}"></div>
        </div>
        <span class="num" style="font-size:11.5px;font-weight:650;color:${c};flex:0 0 auto">${pct(totalRate)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--muted);margin-bottom:9px">
        <span>已占用 <b class="num" style="color:var(--ink-2)">${fmt(p.load)}</b> + 撮合吃进 <b class="num" style="color:var(--ink-2)">${fmt(used)}</b></span>
        <span>余 <b class="num" style="color:var(--green)">${fmt(Math.max(0,free-used))}</b> / 能力 <b class="num" style="color:var(--ink-2)">${fmt(p.cap)}</b></span>
      </div>
      <div style="border-top:1px dashed var(--line-2);padding-top:9px">
        <div style="font-size:10.5px;color:var(--muted);font-weight:650;letter-spacing:.4px;margin-bottom:5px">产出物 · 收率</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">
          ${p.outputs.map(o=>`<span class="tag tag-amber">${esc(o.type)} <b class="num">${(o.ratio*100).toFixed(0)}%</b></span>`).join('') || '<span class="td-mute">未设置</span>'}
        </div>
      </div>
    </div>`;
  }).join('') || `<div class="card"><div class="empty"><div class="empty-title">暂无加工厂</div></div></div>`;
}

/* =========================================================
   7. 渲染 · 需求方
   ========================================================= */
function renderDemandView(){
  if (!$('#tbody-demand')) return;
  const total = state.demands.reduce((a,d)=>a+d.qty,0) || 1;
  const rows = state.demands.map(d=>{
    const got = state.usedDem[d.id] || 0;
    return { d, got, rate: Math.min(1, got/d.qty) };
  }).sort((a,b)=>a.rate-b.rate);

  const satisfied = rows.reduce((a,r)=>a+r.got,0);

  // 各再生品的平台总产出，用于区分「平台没货」和「出价没竞争力」
  const produced = {};
  state.matches.forEach(m=>m.legs.forEach(l=>l.outputs.forEach(o=>{
    produced[o.type] = (produced[o.type]||0) + o.qty;
  })));

  $('#demand-structure').innerHTML = `
    <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:4px">
      <span class="num" style="font-size:26px;font-weight:700;letter-spacing:-.5px">${pct(satisfied/total)}</span>
      <span style="font-size:12px;color:var(--muted);font-weight:600">整体满足率</span>
    </div>
    <div style="font-size:11.5px;color:var(--muted);margin-bottom:13px">
      已满足 <b class="num" style="color:var(--green)">${fmt(satisfied)}</b> 吨 / 总需求 <b class="num">${fmt(total)}</b> 吨
    </div>
    ${rows.slice(0,8).map(r=>`
      <div style="padding:6px 0">
        <div style="display:flex;justify-content:space-between;font-size:12.2px;margin-bottom:4px;gap:8px">
          <span style="color:var(--ink-2);font-weight:550;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
            ${esc(r.d.type)}<span style="font-weight:400;color:var(--muted)"> · ${esc(r.d.company)}</span></span>
          <span class="num" style="color:${r.rate>=0.99?'var(--green)':r.rate>0?'var(--amber)':'var(--red)'};font-weight:650;flex:0 0 auto">${pct(r.rate)}</span>
        </div>
        <div style="height:5px;border-radius:4px;background:#f0f5f2;overflow:hidden">
          <div style="width:${Math.max(r.rate*100,1)}%;height:100%;border-radius:4px;background:${r.rate>=0.99?'var(--green-2)':r.rate>0?'var(--amber)':'var(--red)'}"></div>
        </div>
      </div>`).join('')}`;

  $('#demand-count').textContent = `${state.demands.length} 条记录`;
  $('#badge-demand').textContent = state.demands.length;

  const srcOf = {};
  state.matches.forEach(m=>m.legs.forEach(l=>l.allocs.forEach(a=>{
    if (!a.demand) return;
    (srcOf[a.demand.id] = srcOf[a.demand.id] || []).push({
      p:l.processor, qty:a.qty, product:a.product,
      km:a.km2, cross:a.cross2, unit:a.unitFreight2
    });
  })));

  $('#tbody-demand').innerHTML = rows.map(({d,got,rate})=>{
    const srcs = (srcOf[d.id]||[]).sort((a,b)=>b.qty-a.qty);
    const srcCell = srcs.length
      ? srcs.slice(0,2).map(s=>`<div style="font-size:11.5px;line-height:1.7">
          <span class="num" style="font-weight:650">${fmt(s.qty,1)}</span> 吨 ←
          ${s.cross?`<span class="tag tag-amber" style="padding:1px 5px">跨省</span>`:''}
          <span style="color:var(--ink-2)">${esc(s.p.province)}·${esc(s.p.name)}</span>
          <span class="td-mute num">配送 ${s.km}km</span>
        </div>`).join('') + (srcs.length>2?`<div class="td-mute" style="font-size:11px">等 ${srcs.length} 家供货</div>`:'')
      : (produced[d.type] > 0.5
          ? `<span class="tag tag-amber" title="平台有 ${fmt(produced[d.type],1)} 吨产出，但被出价更高的买家拿走了">出价偏低</span>`
          : `<span class="tag tag-red">无货源</span>`);
    return `<tr>
      <td class="td-strong">${esc(d.company)}</td>
      <td><span class="tag tag-blue">${esc(d.type)}</span></td>
      <td class="num td-strong">${fmt(d.qty)} 吨</td>
      <td class="num">${d.price?`¥${fmt(d.price)}`:'<span class="td-mute">面议</span>'}</td>
      <td><span style="font-weight:600">${esc(d.province)}</span><span class="td-mute"> · ${esc(d.city)}</span></td>
      <td>
        <span class="tag ${rate>=0.99?'tag-green':rate>0?'tag-amber':'tag-red'}">${pct(rate)}</span>
        <span class="td-mute num" style="margin-left:6px">${fmt(got)}吨</span>
      </td>
      <td style="min-width:190px">${srcCell}</td>
      <td style="text-align:right"><button class="btn btn-ghost btn-sm" onclick="delDemand('${d.id}')">移除</button></td>
    </tr>`;
  }).join('') || `<tr><td colspan="8" class="td-mute" style="text-align:center;padding:28px">暂无数据</td></tr>`;
}

/* =========================================================
   8. 渲染 · 撮合结果
   ========================================================= */
function renderMatchView(){
  if (!$('#match-list')) return;
  const st = state.matches;
  $('#badge-match').textContent = st.length;

  const totalSupply = state.supplies.reduce((a,s)=>a+s.qty,0);
  const matchedQty  = st.reduce((a,m)=>a+m.matchedQty,0);
  const outTotal    = st.reduce((a,m)=>a+m.totalOut,0);
  const outMatched  = st.reduce((a,m)=>a+m.totalOutMatched,0);
  const totalDemand = state.demands.reduce((a,d)=>a+d.qty,0) || 1;
  const closed      = st.filter(m=>m.status==='closed').length;
  const partial     = st.filter(m=>m.status==='partial').length;

  $('#match-time').textContent = state.lastRun
    ? '上次运行：' + state.lastRun.toLocaleString('zh-CN',{hour12:false}).replace(/\//g,'-')
    : '尚未运行';

  const S = state.stats || {};
  $('#match-summary').innerHTML = `
    <div class="flow-box">
      <div class="fb-label">废物入池</div>
      <div class="fb-val num">${fmt(totalSupply)}<small>吨/月</small></div>
      <div class="fb-sub">${state.supplies.length} 家供给方 · 分布于 ${new Set(state.supplies.map(s=>s.province)).size} 省</div>
    </div>
    <div class="flow-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></div>
    <div class="flow-box" style="border-color:#bfe6d8;background:linear-gradient(180deg,#f2fcf8,#fff)">
      <div class="fb-label" style="color:var(--green)">撮合消纳</div>
      <div class="fb-val num" style="color:var(--green-deep)">${fmt(matchedQty)}<small>吨/月</small></div>
      <div class="fb-sub">撮合率 ${pct(totalSupply?matchedQty/totalSupply:0)} · 跨省 ${pct(S.crossRate||0)}</div>
    </div>
    <div class="flow-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></div>
    <div class="flow-box" style="border-color:#f2e0bb;background:linear-gradient(180deg,#fffcf5,#fff)">
      <div class="fb-label" style="color:var(--amber)">再生品产出</div>
      <div class="fb-val num">${fmt(outTotal,1)}<small>吨/月</small></div>
      <div class="fb-sub">已被吸收 ${fmt(outMatched,1)} 吨</div>
    </div>
    <div class="flow-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></div>
    <div class="flow-box" style="border-color:#c9ddf5;background:linear-gradient(180deg,#f7fbff,#fff)">
      <div class="fb-label" style="color:var(--blue)">物流成本</div>
      <div class="fb-val num" style="color:#2a63a8">¥${fmt((S.freightTotal||0)/10000,1)}<small>万/月</small></div>
      <div class="fb-sub">平均 ${fmt(S.avgKm||0)} km · 吨均 ¥${fmt(matchedQty?(S.freightTotal||0)/matchedQty:0)}</div>
    </div>`;

  let list = st.filter(m=>m.score >= state.threshold);
  if (state.crossFilter === 'cross')      list = list.filter(m=>m.legs.some(l=>l.cross));
  else if (state.crossFilter === 'same')  list = list.filter(m=>m.legs.some(l=>!l.cross));
  $('#chip-total').textContent = `共 ${list.length} 条链路`;
  $('#chip-ok').textContent = `已闭环 ${closed}`;
  $('#chip-part').textContent = `部分匹配 ${partial}`;

  if (!list.length){
    $('#match-list').innerHTML = `<div class="empty">
      <div class="empty-ico"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></div>
      <div class="empty-title">没有符合阈值的撮合链路</div>
      <div style="font-size:12px">试着降低匹配度阈值，或补充加工厂 / 需求登记</div>
    </div>`;
    return;
  }

  $('#match-list').innerHTML = list.map(m=>{
    const s = m.supply;
    const C = 113.1;
    const dash = m.score/100*C;
    const ringColor = m.score>=80?'var(--green-2)':m.score>=60?'var(--amber)':'var(--red)';
    const statusTag = m.status==='closed'
      ? '<span class="tag tag-green">链路闭环</span>'
      : m.status==='partial'
        ? `<span class="tag tag-amber">部分匹配 ${pct(m.matchedQty/s.qty)}</span>`
        : '<span class="tag tag-red">匹配失败</span>';

    const legs = m.legs.map(l=>{
      const byDem = {};
      l.allocs.filter(a=>a.demand).forEach(a=>{
        const k = a.demand.id;
        if(!byDem[k]) byDem[k] = { d:a.demand, items:[] };
        byDem[k].items.push(a);
      });
      const demKeys = Object.keys(byDem);
      const lostOut = l.allocs.filter(a=>!a.demand).reduce((x,a)=>x+a.qty,0);

      return `
      <div class="chain">
        <div class="chain-node supply">
          <div class="chain-tag">供给方</div>
          <div class="chain-name">${esc(s.company)}</div>
          <div class="chain-meta">${esc(s.type)} · <b>${fmt(l.take)}</b> 吨<br>
            <span class="geo ${l.cross?'cross':''}">${esc(s.province)}·${esc(s.city)}</span><br>
            运距 <b class="num">${l.km}</b> km · 运费 <b class="num">¥${fmt(l.unitFreight)}</b>/吨</div>
        </div>
        <div class="chain-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></div>
        <div class="chain-node proc">
          <div class="chain-tag">加工厂${l.cross?' · 跨省调运':''}</div>
          <div class="chain-name">${esc(l.processor.name)}</div>
          <div class="chain-meta"><span class="geo ${l.cross?'cross':''}">${esc(l.processor.province)}·${esc(l.processor.city)}</span>
            处理 <b>${fmt(l.take)}</b> 吨<br>匹配度 <b style="color:${l.score>=80?'var(--green)':l.score>=60?'var(--amber)':'var(--red)'}">${l.score}</b></div>
        </div>
        <div class="chain-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></div>
        <div class="chain-node out">
          <div class="chain-tag">再生品</div>
          ${l.outputs.map(o=>`<div class="chain-meta" style="margin-bottom:2px"><b>${esc(o.type)}</b> ${fmt(o.qty,1)} 吨</div>`).join('')}
          ${lostOut>0.5?`<div class="chain-meta" style="color:var(--amber)">其中 ${fmt(lostOut,1)} 吨待寻单</div>`:''}
        </div>
        <div class="chain-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></div>
        <div class="chain-node dem">
          <div class="chain-tag">需求方</div>
          ${demKeys.length
            ? demKeys.map(k=>{
                const g = byDem[k];
                return `<div class="chain-name" style="font-size:12px;margin-bottom:3px">${esc(g.d.company)}</div>
                  ${g.items.map(it=>`<div class="chain-meta" style="margin-bottom:5px">
                      <span class="geo ${it.cross2?'cross':''}">${esc(g.d.province)}·${esc(g.d.city)}</span>
                      ${esc(it.product)} <b>${fmt(it.qty,1)}</b> 吨<br>
                      配送 <b class="num">${it.km2}</b> km · ¥${fmt(it.unitFreight2)}/吨
                    </div>`).join('')}`;
              }).join('')
            : `<div class="chain-meta" style="color:var(--red)">暂无买家<br>产出物需另寻下游</div>`}
        </div>
      </div>`;
    }).join('');

    return `<div class="match-card">
      <div class="match-head">
        <svg class="ring" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="#e9f1ee" stroke-width="4"/>
          <circle cx="22" cy="22" r="18" fill="none" stroke="${ringColor}" stroke-width="4"
            stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${(C-dash).toFixed(1)}"
            transform="rotate(-90 22 22)"/>
          <text x="22" y="26.5" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0f231d">${m.score}</text>
        </svg>
        <div class="match-head-main">
          <div class="match-head-title">
            ${esc(s.company)} · ${esc(s.type)} ${fmt(s.qty)} 吨
            ${statusTag}
            ${m.crossQty > 0.5 ? `<span class="tag tag-amber">跨省 ${fmt(m.crossQty)} 吨</span>` : `<span class="tag tag-soft">省内消纳</span>`}
          </div>
          <div class="match-head-sub">
            ${m.legs.length} 家加工厂承接 · 产出 ${fmt(m.totalOut,1)} 吨 · 被吸收 ${fmt(m.totalOutMatched,1)} 吨 ·
            收运 ${fmt(m.avgKm)} km / 配送 ${fmt(m.avgKm2)} km · 减碳 ${fmt(m.co2,1)} tCO₂e
          </div>
        </div>
      </div>
      ${legs}
      ${m.left > 0.5 ? `<div style="padding:0 16px 12px;display:flex;align-items:flex-start;gap:7px;font-size:11.8px;color:#b23b42;line-height:1.6">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--red);flex:0 0 6px;margin-top:6px"></span>
        <span>仍有 <b>${fmt(m.left)} 吨</b> ${esc(s.type)} 未匹配到加工厂 —— 全国范围内该品类均无富余产能，建议跨区新建处置能力</span>
      </div>` : ''}
      <div class="match-foot">
        <span>交易额预估 <b class="num">¥${fmt(m.legs.reduce((a,l)=>a+l.value,0))}</b></span>
        <span>物流成本 <b class="num">¥${fmt(m.freightSum)}</b>
          <span class="td-mute">（收运 ¥${fmt(m.freight1Sum)} + 配送 ¥${fmt(m.freight2Sum)}）</span></span>
        <span>未消纳废物 <b class="num" style="color:${m.left>0.5?'var(--red)':'var(--green)'}">${fmt(m.left)} 吨</b></span>
        <span>碳减排 <b class="num">${fmt(m.co2,1)} tCO₂e</b></span>
        <span style="margin-left:auto;color:var(--muted)">${new Date().toLocaleTimeString('zh-CN',{hour12:false})}</span>
      </div>
    </div>`;
  }).join('');
}

/* =========================================================
   8b. 渲染 · 区域联动
   ========================================================= */
function renderRegionView(){
  if (!$('#region-matrix')) return;
  const st = state.stats || {};
  const stats = provinceStats();

  /* --- 大区联动矩阵 --- */
  const regions = REGION_ORDER.filter(r =>
    stats.some(s=>s.region===r) || (state.flows||[]).some(f=>regionOf(f.from)===r || regionOf(f.to)===r));
  const mat = {};
  (state.flows||[]).forEach(f=>{
    const a = regionOf(f.from), b = regionOf(f.to);
    mat[a+'|'+b] = (mat[a+'|'+b]||0) + f.qty;
  });
  const cellMax = Math.max(...Object.values(mat), 1);
  // 跨大区流量远小于大区内自消纳，单独用一个色阶，否则跨区格子几乎看不见
  const offMax  = Math.max(...Object.entries(mat).filter(([k])=>{
    const [a,b] = k.split('|'); return a!==b;
  }).map(([,v])=>v), 1);

  const head = `<tr><th style="text-align:left">产出大区 ＼ 消纳大区</th>${
    regions.map(r=>`<th style="text-align:center;font-size:11px">${r}</th>`).join('')}<th style="text-align:center">调出合计</th></tr>`;
  const body = regions.map(a=>{
    const rowSum = regions.reduce((x,b)=>x+(mat[a+'|'+b]||0),0);
    return `<tr>
      <td class="td-strong">${a}</td>
      ${regions.map(b=>{
        const v = mat[a+'|'+b] || 0;
        const isSelf = a===b;
        const ref = isSelf ? cellMax : offMax;
        const alpha = v>0 ? 0.12 + 0.66*(v/ref) : 0;
        const bg = v>0
          ? (isSelf ? `rgba(18,163,126,${alpha})` : `rgba(221,139,11,${alpha})`)
          : 'transparent';
        return `<td class="num" style="text-align:center;background:${bg};font-weight:${v>0?650:400};
          color:${v>0?'#0f231d':'#c3d0cb'};border-radius:6px">${v>0?fmt(v):'—'}</td>`;
      }).join('')}
      <td class="num" style="text-align:center;font-weight:700">${rowSum>0?fmt(rowSum):'—'}</td>
    </tr>`;
  }).join('');

  $('#region-matrix').innerHTML = `
    <div class="tbl-wrap"><table style="font-size:12.3px">
      <thead>${head}</thead><tbody>${body}</tbody>
    </table></div>
    <div style="display:flex;gap:16px;margin-top:12px;font-size:11.5px;color:var(--muted);flex-wrap:wrap">
      <span class="lg"><i style="background:rgba(18,163,126,.5)"></i>大区内自消纳</span>
      <span class="lg"><i style="background:rgba(221,139,11,.5)"></i>跨大区调运（独立色阶）</span>
    </div>`;

  /* --- 省内 / 跨省结构 --- */
  const crossQty = st.crossQty||0, sameQty = st.sameQty||0;
  const tot = (crossQty + sameQty) || 1;
  const C = 2*Math.PI*54;
  const crossArc = crossQty/tot*C;
  $('#region-split').innerHTML = `
    <div style="display:flex;align-items:center;gap:20px">
      <svg viewBox="0 0 140 140" style="width:140px;height:140px;flex:0 0 140px">
        <circle cx="70" cy="70" r="54" fill="none" stroke="#eef4f1" stroke-width="18"/>
        <circle cx="70" cy="70" r="54" fill="none" stroke="#12a37e" stroke-width="18"
          stroke-dasharray="${C.toFixed(1)} ${(C*2).toFixed(1)}" transform="rotate(-90 70 70)"/>
        ${crossQty>0?`<circle cx="70" cy="70" r="54" fill="none" stroke="#dd8b0b" stroke-width="18"
          stroke-linecap="butt" stroke-dasharray="${crossArc.toFixed(1)} ${(C*2).toFixed(1)}"
          stroke-dashoffset="${(-(sameQty/tot*C)).toFixed(1)}" transform="rotate(-90 70 70)"/>`:''}
        <text x="70" y="66" text-anchor="middle" font-size="22" font-weight="700" fill="#0f231d">${pct(crossQty/tot)}</text>
        <text x="70" y="85" text-anchor="middle" font-size="11" fill="#7e918a">跨省占比</text>
      </svg>
      <div style="flex:1;min-width:0">
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--line-2);font-size:12.5px">
          <span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#12a37e;margin-right:7px"></i>省内消纳</span>
          <span class="num" style="font-weight:700">${fmt(sameQty)} 吨</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--line-2);font-size:12.5px">
          <span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#dd8b0b;margin-right:7px"></i>跨省调运</span>
          <span class="num" style="font-weight:700">${fmt(crossQty)} 吨</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--line-2);font-size:12.5px">
          <span>废物跨省链路</span>
          <span class="num" style="font-weight:700">${st.crossLegs||0} / ${st.totalLegs||0} 条</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed var(--line-2);font-size:12.5px">
          <span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#3778c9;margin-right:7px"></i>再生品跨省配送</span>
          <span class="num" style="font-weight:700">${fmt(st.cross2Qty||0)} 吨</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:12.5px">
          <span>收运段 / 配送段运费</span>
          <span class="num" style="font-weight:700">¥${fmt((st.freight1Total||0)/10000,1)}万 / ¥${fmt((st.freight2Total||0)/10000,1)}万</span>
        </div>
        <div style="margin-top:10px;padding:10px 12px;background:var(--amber-soft);border-radius:9px;font-size:11.5px;color:#8a5a05;line-height:1.7">
          废物跨省调运 <b>${fmt(st.crossQty||0)} 吨</b>，收运段平均 ${fmt(st.avgKm||0)} km，
          运费 <b>¥${fmt((st.freight1Total||0)/10000,1)} 万/月</b>；<br>
          另有 <b>${fmt(st.cross2Qty||0)} 吨</b>再生品需跨省配送给需求方。
        </div>
      </div>
    </div>`;

  /* --- 省份台账 --- */
  const ordered = stats.slice().sort((a,b)=> (b.out+b.in) - (a.out+a.in) || b.supply - a.supply);
  $('#tbody-region').innerHTML = ordered.map(r=>{
    const gap = r.supply - r.freeCap;
    let stateTag;
    if (r.out > 0 && r.in > 0)  stateTag = '<span class="tag tag-amber">双向调剂</span>';
    else if (r.out > 0)         stateTag = '<span class="tag tag-amber">净调出</span>';
    else if (r.in > 0)          stateTag = '<span class="tag tag-blue">净调入</span>';
    else if (gap > 1)           stateTag = '<span class="tag tag-red">产能缺口</span>';
    else if (gap < -1)          stateTag = '<span class="tag tag-green">产能富余</span>';
    else                        stateTag = '<span class="tag tag-soft">自平衡</span>';
    return `<tr>
      <td class="td-strong">${r.province}</td>
      <td><span class="tag tag-soft">${r.region}</span></td>
      <td class="num">${r.supply?fmt(r.supply)+' 吨':'<span class="td-mute">—</span>'}</td>
      <td class="num">${r.freeCap?fmt(r.freeCap)+' 吨':'<span class="td-mute">—</span>'}</td>
      <td class="num">${r.demand?fmt(r.demand)+' 吨':'<span class="td-mute">—</span>'}</td>
      <td class="num" style="color:${r.out>0?'var(--amber)':'var(--muted)'};font-weight:${r.out>0?650:400}">${r.out?fmt(r.out)+' 吨':'—'}</td>
      <td class="num" style="color:${r.in>0?'var(--amber)':'var(--muted)'};font-weight:${r.in>0?650:400}">${r.in?fmt(r.in)+' 吨':'—'}</td>
      <td>${stateTag}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="8" class="td-mute" style="text-align:center;padding:28px">暂无数据</td></tr>`;

  /* --- 跨省链路明细 --- */
  const crossLegs = [];
  state.matches.forEach(m => m.legs.forEach(l => { if (l.cross) crossLegs.push({ m, l }); }));
  crossLegs.sort((a,b)=>b.l.take - a.l.take);
  $('#cross-count').textContent = crossLegs.length
    ? `${crossLegs.length} 条 · 合计 ${fmt(crossLegs.reduce((a,x)=>a+x.l.take,0))} 吨/月`
    : '暂无跨省链路';
  $('#tbody-cross').innerHTML = crossLegs.map(({m,l})=>`
    <tr>
      <td><span class="td-strong">${esc(m.supply.province)}·${esc(m.supply.city)}</span>
        <div class="td-mute">${esc(m.supply.company)}</div></td>
      <td><span class="td-strong">${esc(l.processor.province)}·${esc(l.processor.city)}</span>
        <div class="td-mute">${esc(l.processor.name)}</div></td>
      <td><span class="tag tag-soft"><i style="background:${WASTE[m.supply.type]?.color||'#999'}"></i>${esc(m.supply.type)}</span></td>
      <td class="num td-strong">${fmt(l.take)} 吨</td>
      <td class="num">${fmt(l.km)} km</td>
      <td class="num">¥${fmt(l.unitFreight)}/吨</td>
      <td class="num td-strong">¥${fmt(l.freight1)}</td>
      <td><span class="tag ${l.score>=80?'tag-green':l.score>=60?'tag-amber':'tag-red'}">${l.score}</span></td>
    </tr>`).join('') || `<tr><td colspan="8" class="td-mute" style="text-align:center;padding:28px">
      当前所有废物均在本省消纳，无跨省链路</td></tr>`;
}

/* =========================================================
   9. 表单 / 交互
   ========================================================= */
let outRowSeq = 0;
function addOutRow(name='', ratio=''){
  const box = $('#outs-box');
  if (!box) return;                    // 仅在「加工厂」页存在
  outRowSeq++;
  const id = 'out'+outRowSeq;
  const div = document.createElement('div');
  div.className = 'out-row';
  div.id = id;
  div.innerHTML = `
    <input class="o-name" placeholder="产出物名称，如：再生纸浆" value="${esc(name)}">
    <input class="o-ratio" type="number" min="0" max="1" step="0.01" placeholder="收率 0.82" value="${esc(ratio)}">
    <button type="button" class="del" onclick="document.getElementById('${id}').remove()">×</button>`;
  box.appendChild(div);
}

function buildStaticOptions(){
  const selType = $('#sel-supply-type');
  if (selType) selType.innerHTML = WASTE_TYPES.map(t=>`<option value="${t}">${t}</option>`).join('');

  const provList = Object.keys(PROVINCE_REGION);
  $$('.sel-province').forEach(sel=>{
    const cur = sel.value;
    sel.innerHTML = provList.map(p=>`<option value="${p}">${p} · ${PROVINCE_REGION[p]}</option>`).join('');
    sel.value = (cur && provList.includes(cur)) ? cur : '江西';
  });

  const chk = $('#chk-accepts');
  if (chk){
    chk.innerHTML = WASTE_TYPES.map(t=>
      `<label class="chk" data-type="${t}"><input type="checkbox" value="${t}">${t}</label>`).join('');
    $$('#chk-accepts .chk').forEach(el=>{
      el.addEventListener('click', e=>{
        e.preventDefault();
        const inp = el.querySelector('input');
        inp.checked = !inp.checked;
        el.classList.toggle('on', inp.checked);
      });
    });
  }

  const pl = $('#product-list');
  if (pl){
    const products = new Set();
    state.processors.forEach(p=>p.outputs.forEach(o=>products.add(o.type)));
    pl.innerHTML = Array.from(products).map(p=>`<option value="${p}">`).join('');
  }
}

/* ---------------------------------------------------------
   多页模式下导航由 <a href> 直接完成，无需 switchView；
   表单提交后写入 localStorage，再就地重算并刷新当前页。
   --------------------------------------------------------- */

function bindForms(){
  // 供给方
  const fsSupply = $('#form-supply');
  if (fsSupply) fsSupply.addEventListener('submit', e=>{
    e.preventDefault();
    const f = new FormData(e.target);
    state.supplies.push({
      id:'S'+(++seq), company:f.get('company').trim(), type:f.get('type'),
      qty:+f.get('qty'), price:+(f.get('price')||0),
      province:f.get('province'), city:f.get('city').trim()
    });
    e.target.reset();
    saveState();
    buildStaticOptions();
    toast('供给登记成功，已加入全国撮合池');
    runMatch(true);
  });

  // 加工厂
  const fsProc = $('#form-proc');
  if (fsProc) fsProc.addEventListener('submit', e=>{
    e.preventDefault();
    const f = new FormData(e.target);
    const accepts = $$('#chk-accepts input:checked').map(i=>i.value);
    if (!accepts.length){ toast('请至少选择一种可接收废物类型','err'); return; }
    const outputs = $$('#outs-box .out-row').map(r=>({
      type: r.querySelector('.o-name').value.trim(),
      ratio: parseFloat(r.querySelector('.o-ratio').value)
    })).filter(o=>o.type && !isNaN(o.ratio) && o.ratio>0);
    if (!outputs.length){ toast('请至少填写一项产出物与收率','err'); return; }
    const cap = +f.get('cap'), load = +(f.get('load')||0);
    state.processors.push({
      id:'P'+(++seq), name:f.get('name').trim(),
      province:f.get('province'), city:f.get('city').trim(),
      rating:4.5, accepts, cap, load: Math.min(load,cap), outputs
    });
    e.target.reset();
    $$('#chk-accepts .chk').forEach(el=>{ el.classList.remove('on'); el.querySelector('input').checked=false; });
    $('#outs-box').innerHTML=''; addOutRow(); addOutRow();
    saveState();
    buildStaticOptions();
    toast('加工能力登记成功');
    runMatch(true);
  });

  // 需求方
  const fsDemand = $('#form-demand');
  if (fsDemand) fsDemand.addEventListener('submit', e=>{
    e.preventDefault();
    const f = new FormData(e.target);
    state.demands.push({
      id:'D'+(++seq), company:f.get('company').trim(), type:f.get('type').trim(),
      qty:+f.get('qty'), price:+(f.get('price')||0),
      province:f.get('province'), city:f.get('city').trim()
    });
    e.target.reset();
    saveState();
    buildStaticOptions();
    toast('产品需求登记成功');
    runMatch(true);
  });

  const addOut = $('#btn-add-out');
  if (addOut) addOut.addEventListener('click', ()=>addOutRow());
}

function bindActions(){
  // 顶栏「运行智能撮合」：在当前页立即求解；不在撮合页则跳转到撮合页
  const btnRun = $('#btn-run');
  if (btnRun) btnRun.addEventListener('click', ()=>{
    if (PAGE !== 'match'){ location.href = 'match.html'; return; }
    runMatch(false);
  });

  const btnReset = $('#btn-reset');
  if (btnReset) btnReset.addEventListener('click', ()=>{
    if (!confirm('将清空所有新增登记，恢复初始演示数据，确定吗？')) return;
    seedState();
    try{ localStorage.removeItem(LS_KEY); }catch(e){}
    saveState();
    const ob = $('#outs-box');
    if (ob){ ob.innerHTML=''; addOutRow(); addOutRow(); }
    $$('#chk-accepts .chk').forEach(el=>{ el.classList.remove('on'); el.querySelector('input').checked=false; });
    buildStaticOptions();
    runMatch(true);
    toast('已恢复初始演示数据');
  });

  const range = $('#score-range');
  if (range) range.addEventListener('input', e=>{
    state.threshold = +e.target.value;
    $('#score-val').textContent = state.threshold;
    renderMatchView();
  });

  const btnExport = $('#btn-export');
  if (btnExport) btnExport.addEventListener('click', exportPlan);

  $$('#seg-cross button').forEach(b=>{
    b.addEventListener('click', ()=>{
      $$('#seg-cross button').forEach(x=>x.classList.toggle('on', x===b));
      state.crossFilter = b.dataset.f;
      renderMatchView();
    });
  });
}

function runMatch(silent){
  const go = ()=>{
    computeMatches();
    renderAll();
    if (!silent) toast(`撮合完成：${state.matches.length} 条链路 · 跨省 ${state.stats.crossLegs} 条`);
  };
  if (silent) { go(); return; }
  $('#loading').classList.add('show');
  $('#loading-txt').textContent = '正在全国范围内求解最优撮合链路…';
  setTimeout(()=>{
    $('#loading').classList.remove('show');
    go();
  }, 620);
}

function delSupply(id){
  state.supplies = state.supplies.filter(s=>s.id!==id);
  saveState();
  runMatch(true); toast('已移除该供给记录');
}
function delProc(id){
  state.processors = state.processors.filter(p=>p.id!==id);
  saveState();
  runMatch(true); toast('已移除该加工厂');
  buildStaticOptions();
}
function delDemand(id){
  state.demands = state.demands.filter(d=>d.id!==id);
  saveState();
  runMatch(true); toast('已移除该需求记录');
}

function exportPlan(){
  if (!state.matches.length){ toast('请先运行撮合','err'); return; }
  const rows = [['供给方','供给省份','供给城市','废物类型','废物量(吨)','加工厂','加工省份','加工城市',
                 '承接量(吨)','废物是否跨省','收运距离(km)','收运单价(元/吨)','收运运费(元)',
                 '再生品','产出量(吨)','需求方','需求省份','需求城市','配送量(吨)',
                 '再生品是否跨省','配送距离(km)','配送单价(元/吨)','配送运费(元)','单价(元/吨)','匹配度']];
  state.matches.forEach(m=>{
    m.legs.forEach(l=>{
      const allocs = l.allocs.length ? l.allocs : [{demand:null, product:'—', qty:0, price:null,
        km2:0, cross2:false, unitFreight2:0, freight2:0}];
      allocs.forEach(a=>{
        rows.push([
          m.supply.company, m.supply.province, m.supply.city, m.supply.type, m.supply.qty,
          l.processor.name, l.processor.province, l.processor.city, l.take.toFixed(1),
          l.cross ? '是' : '否', l.km, l.unitFreight, l.freight1.toFixed(0),
          a.product, a.qty.toFixed(2),
          a.demand ? a.demand.company  : '未匹配',
          a.demand ? a.demand.province : '',
          a.demand ? a.demand.city     : '',
          a.demand ? a.qty.toFixed(2)  : '0',
          a.demand ? (a.cross2 ? '是' : '否') : '',
          a.demand ? a.km2 : '',
          a.demand ? a.unitFreight2 : '',
          a.demand ? a.freight2.toFixed(0) : '',
          a.price || '', l.score
        ]);
      });
    });
  });
  const csv = '\ufeff' + rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '循链全国撮合方案_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 3000);
  toast('撮合方案已导出 CSV');
}

/* =========================================================
   10. 启动
   ========================================================= */
function init(){
  buildShell();                       // 注入侧栏 / 顶栏 / 移动端导航

  if (!loadState()) seedState();      // 优先恢复本地数据，否则用种子数据

  buildStaticOptions();

  const ob = $('#outs-box');
  if (ob){ ob.innerHTML=''; addOutRow('再生纸浆', '0.82'); addOutRow('纸板', '0.10'); }

  bindForms();
  bindActions();

  // 每次进入页面都重新求解撮合，保证 6 个页面读到同一份结果
  computeMatches();
  renderAll();
}

init();
