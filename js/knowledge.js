import { knowledgeNodes } from "./knowledge-data.js";

const categoryMeta = {
  color: { eyebrow: "THE COLORS", title: "颜色" },
  material: { eyebrow: "THE MATERIALS", title: "材质" },
  pattern: { eyebrow: "THE PATTERNS", title: "纹样" },
  technique: { eyebrow: "THE TECHNIQUES", title: "技艺" },
  era: { eyebrow: "THE ERAS", title: "年代" }
};

const $ = (selector) => document.querySelector(selector);
const nodesById = new Map(knowledgeNodes.map((node) => [node.id, node]));
const categoryNodes = (category) => knowledgeNodes.filter((node) => node.category === category);
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
  const items = categoryNodes(category);
  const meta = categoryMeta[category];
  $("#category-eyebrow").textContent = meta.eyebrow;
  $("#category-title").textContent = meta.title;
  $("#result-count").textContent = `${items.length} 个节点`;
  document.querySelector(".category-button.active")?.classList.remove("active");
  document.querySelector(`[data-category="${category}"]`).classList.add("active");
  $("#knowledge-grid").innerHTML = items.map((item, index) => `
    <article class="knowledge-node ${item.hex ? "color-node" : ""}" style="--delay:${index * 70}ms">
      <button class="node-toggle" type="button" aria-expanded="false">
        <span class="node-visual">${item.hexCode ? `<i style="--swatch:${item.hexCode}"></i>` : imageById[item.id] ? `<img src="${imageById[item.id]}" alt="" loading="lazy">` : `<i class="node-glyph">${categoryNames[item.category].slice(0, 1)}</i>`}</span>
        <span class="node-name"><strong>${item.name}</strong><small>${item.parentId ? nodesById.get(item.parentId)?.name || "知识节点" : categoryNames[item.category]}</small></span>
        <span class="node-plus">＋</span>
      </button>
      <div class="node-description"><p>${item.description}</p></div>
    </article>`).join("");
}

document.addEventListener("click", (event) => {
  const category = event.target.closest(".category-button");
  if (category) {
    render(category.dataset.category);
    return;
  }
  const toggle = event.target.closest(".node-toggle");
  if (toggle) {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.closest(".knowledge-node").classList.toggle("expanded", !expanded);
  }
});

render("color");
