import { attributes } from "./data.js";
import { artifacts as recipeArtifacts } from "./artifacts-data.js";
import { easterEggs, matchesEasterEgg, unlockEasterEggs } from "./easter-eggs.js";
import { playSuccessSound } from "./audio.js";

const currentSelection = { material: null, colors: [], pattern: null };
const artifactState = { matches: [], index: 0 };
const $ = (selector) => document.querySelector(selector);
const eraNames = { E01: "新石器时代", E02: "夏商周", E03: "春秋战国", E04: "汉代", E05: "唐代", E06: "宋代", E07: "元代", E08: "明代", E09: "清代", E10: "近现代" };
const techniqueNames = { T01: "素髹 / 髹涂", T02: "彩绘 / 描漆", T03: "雕漆 / 剔红", T04: "螺钿", T05: "戗金 / 填漆", T06: "金银平脱", T07: "描金 / 识文", T08: "百宝嵌", T09: "款彩", T10: "脱胎 / 薄料", T11: "犀皮漆", T12: "推光漆" };

function renderOptions() {
  const option = (item, type) => {
    const selected = type === "color" ? currentSelection.colors.includes(item.id) : currentSelection[type] === item.id;
    const visual = type === "color"
      ? `<span class="color-swatch" style="--swatch:${item.hex}"></span>`
      : `<img src="${item.image}" alt="" loading="lazy">`;
    return `<button type="button" class="attribute-button ${selected ? "selected" : ""}" data-type="${type}" data-id="${item.id}" title="${item.note}">${visual}<span>${item.name}</span>${type === "color" ? `<i>${item.id}</i>` : ""}</button>`;
  };
  $("#material-options").innerHTML = attributes.materials.map((item) => option(item, "material")).join("");
  $("#color-options").innerHTML = attributes.colors.map((item) => option(item, "color")).join("");
  $("#pattern-options").innerHTML = attributes.patterns.map((item) => option(item, "pattern")).join("");
}

function renderSelection() {
  const material = attributes.materials.find((item) => item.id === currentSelection.material);
  const colors = attributes.colors.filter((item) => currentSelection.colors.includes(item.id));
  const pattern = attributes.patterns.find((item) => item.id === currentSelection.pattern);
  $("#selected-material").textContent = material?.name || "未选择";
  $("#selected-colors").textContent = colors.length ? colors.map((item) => item.name).join(" · ") : "未选择";
  $("#selected-pattern").textContent = pattern?.name || "未选择";
  $("#selection-status").textContent = currentSelection.material && currentSelection.colors.length && currentSelection.pattern ? "已备齐 · 可合成" : "尚未起笔";
  $("#selection-status").classList.toggle("ready", Boolean(currentSelection.material && currentSelection.colors.length && currentSelection.pattern));
}

function showFeedback(message, kind = "") {
  const feedback = $("#feedback");
  feedback.textContent = message;
  feedback.className = `feedback ${kind}`;
  window.setTimeout(() => { feedback.textContent = ""; feedback.className = "feedback"; }, 3800);
}

function showInlineFeedback(message, kind = "warning") {
  showFeedback(message, kind);
  $("#feedback").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// 版本号，防止用户快速连续切换箭头时，前一次的 onload 误覆盖后一次结果
let artifactImageVersion = 0;

function openArtifact(artifacts, index = 0) {
  artifactState.matches = artifacts;
  artifactState.index = index;
  const artifact = artifactState.matches[artifactState.index];
  const img = $("#modal-image");
  const wrap = img.parentElement;

  // 先同步更新所有文字、数字、按钮状态，让用户立刻感知"已切换"
  $("#modal-title").textContent = artifact.name;
  $("#modal-meta").textContent = `${eraNames[artifact.eraCode] || artifact.eraCode}  ·  ${artifact.location}`;
  $("#artifact-counter").textContent = artifactState.matches.length > 1
    ? `${artifactState.index + 1} / ${artifactState.matches.length} · 同属性器物`
    : "";
  $("#artifact-previous").hidden = artifactState.matches.length < 2;
  $("#artifact-next").hidden = artifactState.matches.length < 2;
  $("#modal-description").textContent = artifact.description;
  $("#modal-tags").innerHTML = [techniqueNames[artifact.techniqueCode] || artifact.techniqueCode, ...artifact.req_colors.map((id) => attributes.colors.find((item) => item.id === id).name)].map((tag) => `<span>${tag}</span>`).join("");
  $("#detail-button").href = `artifact.html?name=${encodeURIComponent(artifact.name)}`;

  // 递增版本号：用户快速连点箭头时，只有最后一次的回调会生效
  const myVersion = ++artifactImageVersion;

  // 立刻进入 loading 态（不停留上一张图），同时用全新的 img 节点替换旧的
  // 避免旧节点上残留的 load/error 事件或缓存状态干扰本次切换
  img.classList.remove("loaded");
  wrap.classList.remove("error");
  wrap.classList.add("loading");
  const freshImg = img.cloneNode(false);
  freshImg.removeAttribute("src");
  freshImg.alt = artifact.name;
  img.replaceWith(freshImg);

  // 直接在新 img 上监听 load / error，不再创建 preload 对象
  freshImg.addEventListener("load", () => {
    if (myVersion !== artifactImageVersion) return; // 用户又切了，丢弃
    freshImg.classList.add("loaded");
    wrap.classList.remove("loading");
  });
  freshImg.addEventListener("error", () => {
    if (myVersion !== artifactImageVersion) return;
    wrap.classList.remove("loading");
    wrap.classList.add("error");
  });
  freshImg.src = artifact.image;

  // 弹窗打开
  $("#modal-backdrop").hidden = false;
  document.body.classList.add("modal-open");
}

function changeArtifact(direction) {
  if (artifactState.matches.length < 2) return;
  artifactState.index = (artifactState.index + direction + artifactState.matches.length) % artifactState.matches.length;
  openArtifact(artifactState.matches, artifactState.index);
}

function closeModal() {
  $("#modal-backdrop").hidden = true;
  document.body.classList.remove("modal-open");
}

function openEasterEgg(egg) {
  const backdrop = document.querySelector("#easter-egg-backdrop");
  if (!backdrop) return;
  backdrop.innerHTML = `
    <article class="easter-egg-modal" role="dialog" aria-modal="true" aria-labelledby="easter-egg-title">
      <button class="modal-close" id="easter-egg-close" type="button" aria-label="关闭详情">×</button>
      <div class="easter-egg-name"><span class="eyebrow">隐藏成就 · EASTER EGG</span><h2 id="easter-egg-title">${egg.name}</h2></div>
      <div class="easter-egg-content"><p class="easter-egg-message">你好像合成出了奇怪的东西……</p><p class="easter-egg-recipe">${egg.recipe}</p><div class="modal-rule"></div><p>${egg.description}</p>${egg.link ? `<a class="combine-button small" href="${egg.link}" target="_blank" rel="noopener noreferrer">打开相关链接 <b>↗</b></a>` : ""}</div>
    </article>`;
  backdrop.hidden = false;
  document.body.classList.add("modal-open");
}

function closeEasterEgg() {
  const backdrop = $("#easter-egg-backdrop");
  if (backdrop) backdrop.hidden = true;
  document.body.classList.remove("modal-open");
}

function navigateView(view) {
  if (view === "profile") showFeedback("个人档案功能正在整理中，先完成器物复原吧。", "warning");
}

function combine() {
  if (!currentSelection.material || !currentSelection.colors.length || !currentSelection.pattern) {
    showInlineFeedback("髹饰未完成，请选齐材质、颜色与纹样。");
    return;
  }
  const matchingArtifacts = recipeArtifacts.filter((recipe) => {
    const userColors = currentSelection.colors;
    const recipeColors = recipe.req_colors;
    return recipe.req_material === currentSelection.material
      && recipe.req_pattern === currentSelection.pattern
      && userColors.length === recipeColors.length
      && recipeColors.every((color) => userColors.includes(color));
  });
  const matchingEggs = easterEggs.filter((egg) => matchesEasterEgg(egg, currentSelection));
  if (matchingEggs.length) {
    unlockEasterEggs(matchingEggs);
    showFeedback("你好像合成出了奇怪的东西……", "success");
    window.setTimeout(() => {
      playSuccessSound();
      openEasterEgg(matchingEggs[0]);
    }, 450);
    return;
  }
  if (matchingArtifacts.length) {
    const unlocked = new Set(JSON.parse(localStorage.getItem("unlockedArtifacts") || "[]"));
    matchingArtifacts.forEach((artifact) => unlocked.add(artifact.name));
    localStorage.setItem("unlockedArtifacts", JSON.stringify([...unlocked]));
    const message = matchingArtifacts.length === 1
      ? "配方吻合，器物正在显影……"
      : `配方吻合，发现 ${matchingArtifacts.length} 件同属性器物，正在显影……`;
    showFeedback(message, "success");
    window.setTimeout(() => {
      playSuccessSound();
      openArtifact(matchingArtifacts);
    }, 450);
    import("./db.js")
      .then(({ saveUnlock }) => Promise.all(matchingArtifacts.map((artifact) => saveUnlock(artifact.name, { notify: false }))))
      .catch((error) => console.error("保存解锁记录失败：", error));
  } else {
    showInlineFeedback("未收录该配方，请调整材质、颜色或纹样后再试。");
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".attribute-button");
  if (button) {
    const { type, id } = button.dataset;
    if (type === "color") {
      if (currentSelection.colors.includes(id)) currentSelection.colors = currentSelection.colors.filter((color) => color !== id);
      else if (currentSelection.colors.length < 5) currentSelection.colors.push(id);
      else showFeedback("颜色最多可选 5 种。", "warning");
    } else currentSelection[type] = currentSelection[type] === id ? null : id;
    renderOptions();
    renderSelection();
  }
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) navigateView(viewButton.dataset.view);
  if (event.target.closest("#combine-button")) combine();
  if (event.target.closest("#artifact-previous")) changeArtifact(-1);
  if (event.target.closest("#artifact-next")) changeArtifact(1);
  if (event.target.closest("#modal-close") || event.target === $("#modal-backdrop")) closeModal();
  if (event.target.closest("#easter-egg-close") || event.target === $("#easter-egg-backdrop")) closeEasterEgg();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !$("#modal-backdrop").hidden) closeModal();
  if (event.key === "Escape" && !$("#easter-egg-backdrop").hidden) closeEasterEgg();
});
renderOptions();
renderSelection();
