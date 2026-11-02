import { knowledgeNodes } from "./knowledge-data.js";
import { patternCollection } from "./pattern-collection.js";

const categoryMeta = {
  color: { eyebrow: "THE COLORS", title: "颜色" },
  material: { eyebrow: "THE MATERIALS", title: "材质" },
  pattern: { eyebrow: "THE PATTERNS", title: "纹样" },
  technique: { eyebrow: "THE TECHNIQUES", title: "技艺" }
};

const $ = (selector) => document.querySelector(selector);
const nodesById = new Map(knowledgeNodes.map((node) => [node.id, node]));
const extraNodes = [
  ["K_COL_CYAN", "color", "青色系", null, "#9CC7C9", "青色介于蓝绿之间，清润而含蓄。"],
  ["K_COL_OTHER", "color", "其他", null, "#9A8175", "灰、棕、橙、粉作为独立的补充色系。"],
  ["K_COL_GRAY_GROUP", "color", "灰", "K_COL_OTHER", "#808080", "水墨交融之色，多用于素髹与淡雅器型。"],
  ["K_COL_BROWN_GROUP", "color", "棕", "K_COL_OTHER", "#955539", "来自赭石等矿物的大地色系。"],
  ["K_COL_ORANGE_GROUP", "color", "橙", "K_COL_OTHER", "#D35400", "偏橙的亮朱红色系。"],
  ["K_COL_PINK_GROUP", "color", "粉", "K_COL_OTHER", "#FFC0CB", "胭脂、藕荷等柔和色系。"],
  ["K_COL_CYAN_TIAN", "color", "天青", "K_COL_CYAN", "#D3E0E7", "雨后天空之色，极淡的蓝灰绿。"],
  ["K_COL_CYAN_YUE", "color", "月白", "K_COL_CYAN", "#E8F0F2", "月光之色，极淡的蓝，近白。"],
  ["K_COL_CYAN_CANG", "color", "苍色", "K_COL_CYAN", "#77969A", "青灰沉静的传统色。"],
  ["K_COL_BLUE_HUA", "color", "花青", "K_COL_BLUE", "#34526F", "蓝黑相间的深沉色，常用于设色。"],
  ["K_COL_YEL_XIANG", "color", "缃色", "K_COL_YELLOW", "#C9A861", "浅黄色，温润雅致的传统色。"],
  ["K_COL_RED_JIANGZI", "color", "绛紫", "K_COL_RED", "#6D273A", "红中带紫的深沉色。"],
  ["K_COL_WHITE_QIANBAI", "color", "铅白", "K_COL_WHITE", "#F5F5F5", "铅制颜料形成的粉白色。"],
  ["K_MAT_LACQUER", "material", "漆料", null, null, "用于髹饰表面的漆液与色漆。"],
  ["K_MAT_GQ", "material", "改青漆", "K_MAT_LACQUER", null, "调制后的青色漆料。"],
  ["K_MAT_SYN", "material", "现代合成漆", "K_MAT_LACQUER", null, "现代工业合成的漆料。"],
  ["K_MAT_BODY", "material", "胎体", null, null, "承托漆层的器物胎骨。"],
  ["K_PAT_BING", "pattern", "冰裂纹", "K_PAT_JH", null, "如冰面开裂般的自然几何纹理。"],
  ["K_PAT_MUDAN_WRAP", "pattern", "缠枝牡丹", "K_PAT_ZW", null, "枝蔓连绵、寓意富贵的牡丹纹。"],
  ["K_PAT_MEI", "pattern", "梅花", "K_PAT_ZW", null, "以梅花入饰，象征高洁坚贞。"],
  ["K_MAT_MU_XUAN", "material", "旋挖胎", "K_MAT_MU", null, "旋削挖制成形的木胎。"],
  ["K_TEC_BASE", "technique", "基础与描绘", null, null, "素髹、彩绘及描金等基础髹饰工法。"],
  ["K_TEC_CARVE", "technique", "雕刻类", null, null, "在层漆或漆面上雕刻成纹。"],
  ["K_TEC_LOCAL", "technique", "地方特色类", null, null, "具有地域传统的漆艺工法。"],
  ["K_TEC_INLAY", "technique", "镶嵌类", null, null, "将贝壳、金银或珍宝嵌入漆面。"],
  ["K_TEC_PAINT", "technique", "彩绘/描漆", "K_TEC_BASE", null, "以色漆描绘纹样。"],
  ["K_TEC_GOLD", "technique", "描金/识文", "K_TEC_BASE", null, "以泥金、三色金等装饰漆面。"],
  ["K_TEC_FILL", "technique", "戗金/填漆", "K_TEC_BASE", null, "刻槽后填金或填漆成纹。"],
  ["K_TEC_NIJIN", "technique", "泥金", "K_TEC_GOLD", null, "将金箔研粉调入胶漆。"],
  ["K_TEC_SANJIN", "technique", "三色金", "K_TEC_GOLD", null, "以三种金色层次装饰纹样。"],
  ["K_TEC_SHIWEN", "technique", "识文", "K_TEC_GOLD", null, "在漆面起线显出金色纹样。"],
  ["K_TEC_CARVE_DETAIL", "technique", "雕漆/剔红等", "K_TEC_CARVE", null, "层层积漆后雕刻成纹。"],
  ["K_TEC_THIN", "technique", "薄螺钿", "K_TEC_LUODIAN", null, "以极薄贝壳片镶嵌成纹。"]
].map(([id, category, name, parentId, hexCode, description]) => ({
  id, category, name, parentId, hexCode, description
}));
extraNodes.forEach((node) => nodesById.set(node.id, node));

const root = (id, name, description = "") => ({ id, name, description });
const treeSpec = {
  color: [
    root("K_COL_RED", "红色系"), root("K_COL_YELLOW", "黄色系"), root("K_COL_GREEN", "绿色系"),
    root("K_COL_CYAN", "青色系"), root("K_COL_BLUE", "蓝色系"), root("K_COL_PURPLE", "紫色系"),
    root("K_COL_BLACK", "黑色系"), root("K_COL_WHITE", "白色系"), root("K_COL_OTHER", "其他")
  ],
  material: [root("K_MAT_LACQUER", "漆料"), root("K_MAT_BODY", "胎体")],
  pattern: [
    root("K_PAT_SU", "无/素面"), root("K_PAT_JH", "几何/气象纹"), root("K_PAT_ZW", "花草植物纹"),
    root("K_PAT_SS", "兽纹/神兽纹"), root("K_PAT_NS", "鸟兽虫鱼纹"), root("K_PAT_RW", "人物叙事纹"),
    root("K_PAT_SL", "山水楼阁纹"), root("K_PAT_TW", "天文星象纹")
  ],
  technique: [
    root("K_TEC_BASE", "基础与描绘"), root("K_TEC_CARVE", "雕刻类"),
    root("K_TEC_INLAY", "镶嵌类"), root("K_TEC_LOCAL", "地方特色类")
  ]
};
const childGroups = {
  color: {
    K_COL_RED: ["朱（朱砂）", "银朱", "胭脂", "绛紫"], K_COL_YELLOW: ["藤黄", "秋香色", "缃色"],
    K_COL_GREEN: ["石绿", "铜绿", "葱倩"], K_COL_CYAN: ["天青", "月白", "苍色"],
    K_COL_BLUE: ["石青", "群青", "花青"], K_COL_PURPLE: ["青莲", "藕荷"],
    K_COL_BLACK: ["玄", "墨色", "皂"], K_COL_WHITE: ["蛤粉", "铅白"],
    K_COL_OTHER: ["灰", "棕", "橙", "粉"]
  },
  material: { K_MAT_LACQUER: ["生漆", "色漆", "改青漆", "现代合成漆"], K_MAT_BODY: ["木胎", "脱胎/夹纻胎", "陶胎", "皮胎", "竹胎", "瓷胎", "金属胎", "漆砂胎", "纸胎", "骨角胎"] },
  pattern: { K_PAT_JH: ["云雷纹", "回纹", "海水江崖", "冰裂纹"], K_PAT_ZW: ["莲瓣纹", "缠枝牡丹", "梅花", "菊花", "栀子花"], K_PAT_SS: ["龙纹", "麒麟纹", "饕餮纹", "蟠螭纹"], K_PAT_NS: ["凤鸟纹", "仙鹤纹", "鱼藻纹", "草虫纹"], K_PAT_RW: ["车马出行图", "高士宴乐图", "婴戏图", "戏曲故事图"], K_PAT_SL: ["山水图", "楼阁图", "庭园图"], K_PAT_TW: ["四神纹", "二十八宿", "北斗星象纹"] },
  technique: { K_TEC_BASE: ["素髹", "彩绘/描漆", "描金/识文", "戗金/填漆"], K_TEC_CARVE: ["雕漆/剔红等", "款彩"], K_TEC_INLAY: ["螺钿", "金银平脱", "百宝嵌"], K_TEC_LOCAL: ["脱胎/薄料", "犀皮漆", "推光漆"] }
};

function categoryTree(category) {
  const all = knowledgeNodes.concat(extraNodes);
  const byName = new Map(all.filter((node) => node.category === category).map((node) => [node.name, node]));
  const roots = treeSpec[category].map((item) => ({
    ...(nodesById.get(item.id) || {}),
    ...item,
    category
  }));
  const configuredNames = new Set(Object.values(childGroups[category]).flat());
  const childrenByParent = new Map();
  Object.entries(childGroups[category]).forEach(([parentId, names]) => {
    childrenByParent.set(parentId, names.map((name) => {
      const existing = byName.get(name);
      return existing || extraNodes.find((node) => node.name === name) || {
        id: `${parentId}_${name}`, category, name, parentId, description: "传统漆器知识节点。"
      };
    }));
  });
  if (category === "material" || category === "technique") {
    all.filter((node) => node.category === category && node.parentId && !configuredNames.has(node.name))
      .forEach((node) => {
        if (!childrenByParent.has(node.parentId)) childrenByParent.set(node.parentId, []);
        childrenByParent.get(node.parentId).push(node);
      });
  }
  const attach = (node) => ({ ...node, children: (childrenByParent.get(node.id) || []).map(attach) });
  return roots.map(attach);
}
const imageById = {
  K_MAT_QI_SHENG: "images/materials/K_MAT_QI_SHENG.png",
  K_MAT_QI_SE: "images/materials/K_MAT_QI_SE.png",
  K_MAT_MU: "images/materials/K_MAT_MU.png",
  K_MAT_TUO: "images/materials/K_MAT_TUO.png",
  K_MAT_ZHU: "images/materials/K_MAT_ZHU.png",
  K_MAT_PI: "images/materials/K_MAT_PI.png",
  K_MAT_TAO: "images/materials/K_MAT_TAO.png",
  K_MAT_CI: "images/materials/K_MAT_CI.png",
  K_MAT_JIN: "images/materials/K_MAT_JIN.png",
  K_MAT_SHA: "images/materials/K_MAT_SHA.png",
  K_MAT_MU_ZHUO: "images/materials/K_MAT_MU_ZHUO.png",
  K_MAT_MU_JUAN: "images/materials/K_MAT_MU_JUAN.png",
  K_MAT_ZHU_JI: "images/materials/K_MAT_ZHU_JI.png",
  K_MAT_ZHI: "images/materials/K_MAT_ZHI.png",
  K_MAT_GU: "images/materials/K_MAT_GU.png",
  K_PAT_JH_YUNLEI: "images/patterns/knowledge/K_PAT_JH_YUNLEI.png",
  K_PAT_JH_HUI: "images/patterns/knowledge/K_PAT_JH_HUI.png",
  K_PAT_JH_JIANG: "images/patterns/knowledge/K_PAT_JH_JIANG.png",
  K_PAT_ZW_LIAN: "images/patterns/knowledge/K_PAT_ZW_LIAN.png",
  K_PAT_ZW_MUDAN: "images/patterns/knowledge/K_PAT_ZW_MUDAN.png",
  K_PAT_ZW_ZHIZI: "images/patterns/knowledge/K_PAT_ZW_ZHIZI.png",
  K_PAT_SS_LONG: "images/patterns/knowledge/K_PAT_SS_LONG.png",
  K_PAT_SS_QILIN: "images/patterns/knowledge/K_PAT_SS_QILIN.png",
  K_PAT_SS_TAOTIE: "images/patterns/knowledge/K_PAT_SS_TAOTIE.png",
  K_PAT_NS_FENG: "images/patterns/knowledge/K_PAT_NS_FENG.png",
  K_PAT_NS_HE: "images/patterns/knowledge/K_PAT_NS_HE.png",
  K_PAT_NS_YU: "images/patterns/knowledge/K_PAT_NS_YU.png",
  K_PAT_NS_CHONG: "images/patterns/knowledge/K_PAT_NS_CHONG.png",
  K_PAT_RW_YINGXI: "images/patterns/knowledge/K_PAT_RW_YINGXI.png",
  K_PAT_RW_GAOSHI: "images/patterns/knowledge/K_PAT_RW_GAOSHI.png",
  K_PAT_SL_SHAN: "images/patterns/knowledge/K_PAT_SL_SHAN.png",
  K_PAT_SL_LOU: "images/patterns/knowledge/K_PAT_SL_LOU.png",
  K_PAT_TW_SISHEN: "images/patterns/knowledge/K_PAT_TW_SISHEN.png",
  K_PAT_TW_28XIU: "images/patterns/knowledge/K_PAT_TW_28XIU.png",
  K_PAT_JX_BABAO: "images/patterns/knowledge/K_PAT_JX_BABAO.png",
  K_TEC_SUXIU: "images/techniques/K_TEC_SUXIU.png",
  K_TEC_CAIHUI: "images/techniques/K_TEC_CAIHUI.png",
  K_TEC_MIAOJIN: "images/techniques/K_TEC_MIAOJIN.png",
  K_TEC_QJ: "images/techniques/K_TEC_QJ.png",
  K_TEC_DIAOQI: "images/techniques/K_TEC_DIAOQI.png",
  K_TEC_KUANCAI: "images/techniques/K_TEC_KUANCAI.png",
  K_TEC_LUODIAN: "images/techniques/K_TEC_LUODIAN.png",
  K_TEC_PINGTUO: "images/techniques/K_TEC_PINGTUO.png",
  K_TEC_BAOBAO: "images/techniques/K_TEC_BAOBAO.png",
  K_TEC_XIPI: "images/techniques/K_TEC_XIPI.png",
  K_TEC_TUOTAI: "images/techniques/K_TEC_TUOTAI.png",
  K_TEC_TUIGUANG: "images/techniques/K_TEC_TUIGUANG.png",
  K_TEC_TIHONG: "images/techniques/K_TEC_TIHONG.png",
  K_TEC_TIHEI: "images/techniques/K_TEC_TIHEI.png",
  K_TEC_TIXI: "images/techniques/K_TEC_TIXI.png",
  K_TEC_TICAI: "images/techniques/K_TEC_TICAI.png",
  K_TEC_BOLUO: "images/techniques/K_TEC_BOLUO.png"
};
const categoryNames = { color: "颜色", material: "材质", pattern: "纹样", technique: "技艺", era: "年代" };

function render(category) {
  const tree = categoryTree(category);
  const meta = categoryMeta[category];
  $("#category-eyebrow").textContent = meta.eyebrow;
  $("#category-title").textContent = meta.title;
  const count = category === "pattern"
    ? patternCount()
    : tree.reduce((total, node) => total + countNodes(node), 0);
  $("#result-count").textContent = `${count} 个节点 · 点击逐级展开`;
  document.querySelector(".category-button.active")?.classList.remove("active");
  document.querySelector(`[data-category="${category}"]`).classList.add("active");
  $("#knowledge-grid").innerHTML = category === "pattern"
    ? renderPatternTree()
    : `<div class="tree-root">${tree.map((node, index) => renderNode(node, index)).join("")}</div>`;
}

// ---------- 纹样图典树状图（黑白线稿 + 实物详情） ----------
function patternCount() {
  return patternCollection.reduce(
    (total, group) => total + 1 + group.children.length, 0);
}

function patternVisual(node, isGroup) {
  const src = isGroup ? node.icon : node.line;
  return src
    ? `<img src="${src}" alt="${node.name}" loading="lazy">`
    : `<i class="node-glyph">${node.name.slice(0, 1)}</i>`;
}

function renderPatternTree() {
  let delay = 0;
  return `<div class="tree-root">${patternCollection.map((group) => {
    const hasChildren = group.children.length > 0;
    const html = `<article class="knowledge-node tree-node has-children pattern-group" style="--delay:${(delay++) * 40}ms">
      <button class="node-toggle" type="button" aria-expanded="false">
        <span class="node-visual">${patternVisual(group, true)}</span>
        <span class="node-name"><strong>${group.name}</strong><small>${hasChildren ? `${group.children.length} 种纹样` : "知识节点"}</small></span>
        <span class="node-plus">＋</span>
      </button>
      <div class="node-description"><p>${group.desc}</p></div>
      ${hasChildren ? `<div class="tree-children">${group.children.map((leaf) => `
        <article class="knowledge-node tree-node leaf pattern-leaf" data-leaf="${patternCollection.indexOf(group)}_${group.children.indexOf(leaf)}" style="--delay:${(delay++) * 30}ms">
          <button class="node-toggle" type="button" aria-expanded="false">
            <span class="node-visual">${patternVisual(leaf, false)}</span>
            <span class="node-name"><strong>${leaf.name}</strong><small>${leaf.examples.length ? `${leaf.examples.length} 件实物` : "纹样线稿"}</small></span>
            <span class="node-plus">›</span>
          </button>
        </article>`).join("")}</div>` : ""}
    </article>`;
    return html;
  }).join("")}</div>`;
}

function openPatternDetail(group, leaf) {
  document.querySelector(".pattern-backdrop")?.remove();
  const examples = leaf.examples.length ? `
    <div class="pattern-real">
      <h3>实物展示</h3>
      <div class="pattern-real-grid">${leaf.examples.map((item) => `
        <figure class="pattern-real-item">
          <img src="${item.img}" alt="${item.title}" loading="lazy">
          <figcaption><strong>${item.title}</strong><em>${item.meta}</em><p>${item.desc}</p></figcaption>
        </figure>`).join("")}</div>
    </div>` : `
    <p class="pattern-empty">此纹样暂无实物图，以上方线稿为参考。</p>`;
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop pattern-backdrop";
  backdrop.innerHTML = `<div class="pattern-modal" role="dialog" aria-modal="true" aria-label="${leaf.name}">
    <button class="modal-close" type="button" aria-label="关闭">×</button>
    <div class="pattern-modal-line">
      ${leaf.line ? `<img src="${leaf.line}" alt="${leaf.name} 线稿">` : `<span class="pattern-modal-glyph">${leaf.name.slice(0, 1)}</span>`}
    </div>
    <div class="pattern-modal-body">
      <span class="modal-meta">${group.name} · 纹样图典</span>
      <h2>${leaf.name}</h2>
      <div class="modal-rule"></div>
      <p>${leaf.desc}</p>
      ${examples}
    </div>
  </div>`;
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop || event.target.closest(".modal-close")) closePatternDetail();
  });
  document.body.appendChild(backdrop);
}

function closePatternDetail() {
  document.querySelector(".pattern-backdrop")?.remove();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePatternDetail();
});

function countNodes(node) {
  return 1 + node.children.reduce((total, child) => total + countNodes(child), 0);
}

function renderNode(node, index) {
  const hasChildren = node.children.length > 0;
  const visual = node.hexCode
    ? `<i style="--swatch:${node.hexCode}"></i>`
    : imageById[node.id]
      ? `<img src="${imageById[node.id]}" alt="" loading="lazy">`
      : `<i class="node-glyph">${node.name.slice(0, 1)}</i>`;
  return `<article class="knowledge-node tree-node ${hasChildren ? "has-children" : "leaf"}" style="--delay:${index * 50}ms">
    <button class="node-toggle" type="button" aria-expanded="false">
      <span class="node-visual">${visual}</span>
      <span class="node-name"><strong>${node.name}</strong><small>${hasChildren ? `${node.children.length} 个下级节点` : "知识节点"}</small></span>
      <span class="node-plus">${hasChildren ? "＋" : "·"}</span>
    </button>
    <div class="node-description"><p>${node.description || "传统漆器知识节点。"}</p></div>
    ${hasChildren ? `<div class="tree-children">${node.children.map((child, childIndex) => renderNode(child, childIndex)).join("")}</div>` : ""}
  </article>`;
}

document.addEventListener("click", (event) => {
  const category = event.target.closest(".category-button");
  if (category) {
    render(category.dataset.category);
    return;
  }
  const leaf = event.target.closest(".pattern-leaf");
  if (leaf) {
    const [groupIndex, leafIndex] = leaf.dataset.leaf.split("_").map(Number);
    openPatternDetail(patternCollection[groupIndex], patternCollection[groupIndex].children[leafIndex]);
    return;
  }
  const toggle = event.target.closest(".node-toggle");
  if (toggle) {
    if (!toggle.closest(".knowledge-node").classList.contains("has-children")) return;
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.closest(".knowledge-node").classList.toggle("expanded", !expanded);
  }
});

render("color");
