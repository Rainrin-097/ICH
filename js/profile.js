import { artifacts } from "./artifacts-data.js";
import { attributes } from "./data.js";
import { easterEggs, getUnlockedEasterEggs } from "./easter-eggs.js";

const $ = (selector) => document.querySelector(selector);
const eraNames = { E01: "新石器时代", E02: "夏商周", E03: "春秋战国", E04: "汉代", E05: "唐代", E06: "宋代", E07: "元代", E08: "明代", E09: "清代", E10: "近现代" };
const techniqueNames = { T01: "素髹 / 髹涂", T02: "彩绘 / 描漆", T03: "雕漆 / 剔红", T04: "螺钿", T05: "戗金 / 填漆", T06: "金银平脱", T07: "描金 / 识文", T08: "百宝嵌", T09: "款彩", T10: "脱胎 / 薄料", T11: "犀皮漆", T12: "推光漆" };
const unlocked = new Set(JSON.parse(localStorage.getItem("unlockedArtifacts") || "[]"));
const unlockedEggs = getUnlockedEasterEggs();

function render() {
  const unlockedArtifacts = artifacts.filter((artifact) => unlocked.has(artifact.name));
  const progress = artifacts.length ? Math.round(unlockedArtifacts.length / artifacts.length * 100) : 0;
  const title = unlockedArtifacts.length >= 50 ? "髹饰传人" : unlockedArtifacts.length >= 10 ? "漆艺学徒" : "初入髹饰";
  $("#artisan-title").textContent = title;
  $("#artisan-caption").textContent = title === "初入髹饰" ? "正在认识漆、色与器物之间的关系" : "你的手中，漆色正在逐渐成形";
  $("#unlocked-count").textContent = unlockedArtifacts.length;
  $("#recipe-count").textContent = unlockedArtifacts.length;
  $("#progress-value").textContent = `${progress}%`;
  $("#progress-bar").style.width = `${progress}%`;
  $("#era-sections").innerHTML = Object.entries(eraNames).map(([code, name]) => {
    const eraArtifacts = artifacts.filter((artifact) => artifact.eraCode === code);
    return `<section class="era-section"><div class="era-label"><span>${code.replace("E", "")}</span><h2>${name}</h2><i>${eraArtifacts.filter((artifact) => unlocked.has(artifact.name)).length} / ${eraArtifacts.length} 已解锁</i></div><div class="artifact-rail">${eraArtifacts.map((artifact) => card(artifact)).join("")}</div></section>`;
  }).join("");
  renderEasterEggs();
}

function renderEasterEggs() {
  $("#easter-egg-count").textContent = `${[...unlockedEggs].filter((id) => easterEggs.some((egg) => egg.id === id)).length} / ${easterEggs.length} 已解锁`;
  $("#easter-egg-grid").innerHTML = easterEggs.map((egg) => unlockedEggs.has(egg.id)
    ? `<button class="collection-card unlocked easter-egg-card" type="button" data-egg-id="${egg.id}"><span class="collection-image"><strong>${egg.name}</strong></span></button>`
    : `<div class="collection-card locked easter-egg-card"><span class="collection-image"><span class="lock-shadow">未解锁</span></span><strong>尚未复原</strong></div>`).join("");
}

function openEasterEgg(egg) {
  const backdrop = $("#easter-egg-backdrop");
  if (!backdrop) return;
  backdrop.innerHTML = `<article class="easter-egg-modal" role="dialog" aria-modal="true"><button class="modal-close" id="easter-egg-close" type="button" aria-label="关闭详情">×</button><div class="easter-egg-name"><span class="eyebrow">隐藏成就 · EASTER EGG</span><h2>${egg.name}</h2></div><div class="easter-egg-content"><p class="easter-egg-recipe">${egg.recipe}</p><div class="modal-rule"></div><p>${egg.description}</p>${egg.link ? `<a class="combine-button small" href="${egg.link}" target="_blank" rel="noopener noreferrer">打开相关链接 <b>↗</b></a>` : ""}</div></article>`;
  backdrop.hidden = false;
  document.body.classList.add("modal-open");
}

function card(artifact) {
  const isUnlocked = unlocked.has(artifact.name);
  const sketch = artifact.image.replace(/\/01\.jpg$/, "/00.jpg");
  return isUnlocked
    ? `<a class="collection-card unlocked" href="artifact.html?name=${encodeURIComponent(artifact.name)}"><span class="collection-image"><img src="${sketch}" alt="${artifact.name}" loading="lazy"></span><strong>${artifact.name}</strong><small>${eraNames[artifact.eraCode]}</small></a>`
    : `<button class="collection-card locked" type="button" disabled><span class="collection-image"><span class="lock-shadow">未解锁</span></span><strong>尚未复原</strong></button>`;
}

function openDetail(name) {
  const artifact = artifacts.find((item) => item.name === name);
  if (!artifact) return;
  $("#profile-detail-image").src = artifact.image;
  $("#profile-detail-image").alt = artifact.name;
  $("#profile-detail-title").textContent = artifact.name;
  $("#profile-detail-meta").textContent = `${eraNames[artifact.eraCode]} · ${artifact.location}`;
  $("#profile-detail-description").textContent = artifact.description;
  $("#profile-detail-tags").innerHTML = [techniqueNames[artifact.techniqueCode], ...artifact.req_colors.map((id) => attributes.colors.find((color) => color.id === id)?.name)].map((tag) => `<span>${tag}</span>`).join("");
  $("#profile-modal-backdrop").hidden = false;
  document.body.classList.add("modal-open");
}

document.addEventListener("wheel", (event) => {
  const rail = event.target.closest(".artifact-rail");
  if (rail && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    rail.scrollLeft += event.deltaY;
    event.preventDefault();
  }
}, { passive: false });
document.addEventListener("click", (event) => {
  if (event.target.closest("#profile-modal-close") || event.target === $("#profile-modal-backdrop")) {
    $("#profile-modal-backdrop").hidden = true;
    document.body.classList.remove("modal-open");
  }
  const eggCard = event.target.closest("[data-egg-id]");
  if (eggCard) openEasterEgg(easterEggs.find((egg) => egg.id === eggCard.dataset.eggId));
  if (event.target.closest("#easter-egg-close") || event.target === $("#easter-egg-backdrop")) {
    $("#easter-egg-backdrop").hidden = true;
    document.body.classList.remove("modal-open");
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    $("#profile-modal-backdrop").hidden = true;
    document.body.classList.remove("modal-open");
  }
  if (event.key === "Escape" && !$("#easter-egg-backdrop").hidden) {
    $("#easter-egg-backdrop").hidden = true;
    document.body.classList.remove("modal-open");
  }
});
render();
