import { knowledgeNodes } from "./knowledge-data.js";
import { knowledgeImagePath } from "./knowledge-images.js";

const params = new URLSearchParams(window.location.search);
const node = knowledgeNodes.find((item) => item.id === params.get("id"));
const name = node?.name || params.get("name") || "知识节点";
const categoryNames = { color: "颜色知识", material: "材质知识", pattern: "纹样知识", technique: "技艺知识" };
const nodesById = new Map(knowledgeNodes.map((item) => [item.id, item]));
const $ = (selector) => document.querySelector(selector);

$("#detail-category").textContent = categoryNames[node?.category] || "漆器知识";
$("#detail-title").textContent = name;
$("#detail-parent").textContent = node?.parentId ? `所属：${nodesById.get(node.parentId)?.name || "上级知识节点"}` : "漆器知识图谱节点";
$("#detail-description").textContent = node?.description || "该节点属于漆器知识图谱，详细文化资料将在后续档案完善。";
$("#detail-meta").textContent = node?.gameColor ? `游戏映射色：${node.gameColor}` : node?.id || "";
document.title = `髹饰录 · ${name}`;
if (node?.hexCode) {
  $("#detail-visual").innerHTML = `<span class="detail-color-swatch" style="--swatch:${node.hexCode}"></span><small>${node.hexCode}</small>`;
} else if (node && knowledgeImagePath(node)) {
  $("#detail-visual").innerHTML = `<img class="detail-node-image" src="${knowledgeImagePath(node)}" alt="${name}"><small>节点图片</small>`;
} else {
  $("#detail-visual").innerHTML = `<span class="detail-node-glyph">${name.slice(0, 1)}</span>`;
}
