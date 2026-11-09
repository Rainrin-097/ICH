import { artifacts } from "./artifacts-data.js";
import { attributes } from "./data.js";
import { T, getLang } from "./i18n.js";

const $ = (selector) => document.querySelector(selector);
const eraNames = { E01: "新石器时代", E02: "夏商周", E03: "春秋战国", E04: "汉代", E05: "唐代", E06: "宋代", E07: "元代", E08: "明代", E09: "清代", E10: "近现代" };
const techniqueNames = { T01: "素髹 / 髹涂", T02: "彩绘 / 描漆", T03: "雕漆 / 剔红", T04: "螺钿", T05: "戗金 / 填漆", T06: "金银平脱", T07: "描金 / 识文", T08: "百宝嵌", T09: "款彩", T10: "脱胎 / 薄料", T11: "犀皮漆", T12: "推光漆" };
const materialNames = new Map(attributes.materials.map((item) => [item.id, item.name]));
const patternNames = new Map(attributes.patterns.map((item) => [item.id, item.name]));
const params = new URLSearchParams(window.location.search);
const artifact = artifacts.find((item) => item.name === params.get("name"));

function renderDetail() {
  if (artifact) {
    $("#detail-image").alt = T(artifact.name);
    $("#detail-title").textContent = T(artifact.name);
    $("#detail-meta").textContent = `${T(eraNames[artifact.eraCode])} · ${T(artifact.location)}${artifact.region ? ` · ${T(artifact.region)}` : ""}`;
    $("#detail-description").textContent = T(artifact.description);
    $("#detail-technique").textContent = T(techniqueNames[artifact.techniqueCode] || artifact.techniqueCode);
    $("#detail-material").textContent = T(materialNames.get(artifact.req_material) || artifact.req_material);
    $("#detail-colors").textContent = artifact.req_colors.map((id) => T(attributes.colors.find((item) => item.id === id)?.name || id)).join(" · ");
    $("#detail-pattern").textContent = T(patternNames.get(artifact.req_pattern) || artifact.req_pattern);
  } else {
    $("#detail-title").textContent = T("未找到器物档案");
    $("#detail-description").textContent = T("该器物尚未载入档案，请返回工坊重新选择。");
  }
}

function applyPageTitle() {
  document.title = getLang() === "en"
    ? `Xiu Shi Lu · ${T(artifact.name)}`
    : `髹饰录 · ${artifact.name}`;
}

renderDetail();
applyPageTitle();
document.addEventListener("ich:lang", () => {
  applyPageTitle();
  renderDetail();
});
