const $ = (selector) => document.querySelector(selector);
let toastTimer;
const now = Date.now();
const categoryNames = { discussion: "交流讨论", recipe: "配方分享", egg: "彩蛋分享" };
const seedPosts = [
  { id: 1, type: "discussion", author: "朱砂研习者", time: now - 1000 * 60 * 18, content: "第一次在知识图谱里看到推光漆，原来漆面的光泽也有这么多讲究。大家在辨认髹饰技法时，会先看颜色还是纹样？", likes: 18, comments: ["我会先看漆面，再结合器物年代判断。"], liked: false },
  { id: 2, type: "recipe", author: "木胎小匠", time: now - 1000 * 60 * 55, recipe: "木胎 + 朱红 + 云雷纹", artifact: "云纹漆鼎", status: "verified", explanation: "这是我根据属性组合尝试出的配方，欢迎大家一起复原看看。", likes: 26, comments: ["已在工坊中复原成功，很有意思！"], liked: false },
  { id: 3, type: "egg", author: "漆语听风", time: now - 1000 * 60 * 105, recipe: "脱胎 + 金色 + 莲纹", artifact: "双层九子漆奁", status: "pending", explanation: "偶然发现的组合，暂时还没有验证，先记录在这里。", likes: 12, comments: [], liked: false },
  { id: 4, type: "discussion", author: "案上清供", time: now - 1000 * 60 * 180, content: "漆器不只是器物，也是时间留下的层次。你最喜欢哪一种传统纹样？", likes: 9, comments: ["云雷纹和莲纹都很耐看。", "我喜欢带有动物意象的纹样。"], liked: false }
];
let posts = seedPosts.map((post) => ({ ...post, comments: [...post.comments] }));
let currentCategory = "all";
let detailPostId = null;
let revealPostId = null;
let nextId = 5;

function showSquareToast(message, kind = "") {
  if (window.showToast) {
    window.showToast(message, kind);
    return;
  }
  let toast = $("#square-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "square-toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.className = `toast visible ${kind}`.trim();
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toast.className = "toast"; }, 3200);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function relativeTime(timestamp) {
  const minutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60000));
  return minutes < 60 ? `${minutes} 分钟前` : minutes < 1440 ? `${Math.floor(minutes / 60)} 小时前` : `${Math.floor(minutes / 1440)} 天前`;
}

function visiblePosts() {
  const verification = $("#verification-select").value;
  return posts.filter((post) => (currentCategory === "all" || post.type === currentCategory)
    && (currentCategory !== "recipe" || verification === "all" || post.status === verification))
    .sort((a, b) => $("#sort-select").value === "likes" ? b.likes - a.likes : b.time - a.time);
}

function renderPosts() {
  $("#verification-filter-wrap").hidden = currentCategory !== "recipe";
  const list = visiblePosts();
  $("#square-list").innerHTML = list.length ? list.map(cardTemplate).join("") : `<div class="square-empty panel"><span class="seal-outline">空</span><h2>暂无相关内容</h2><p>试试其他分类，或发布第一条动态。</p></div>`;
}

function cardTemplate(post) {
  const isRecipe = post.type === "recipe" || post.type === "egg";
  const status = post.status === "verified" ? `<span class="post-status verified">已验证</span>` : isRecipe ? `<span class="post-status">待验证</span>` : "";
  const artifact = post.revealed
    ? `<span class="artifact-name">${escapeHTML(post.artifact || "未关联漆器")}</span>`
    : `<button class="artifact-reveal" data-reveal="${post.id}" type="button">关联漆器 · 点击查看</button>`;
  const body = isRecipe
    ? `<div class="recipe-box"><small>${post.type === "egg" ? "彩蛋组合" : "配方组合"}</small><strong>${escapeHTML(post.recipe)}</strong>${artifact}</div><p>${escapeHTML(post.explanation)}</p>`
    : `<p>${escapeHTML(post.content)}</p>`;
  return `<article class="square-card panel ${post.type}" data-id="${post.id}">
    <div class="post-head"><span class="avatar">${escapeHTML(post.author.slice(0, 1))}</span><div><strong>${escapeHTML(post.author)}</strong><small>${relativeTime(post.time)}</small></div><span class="post-tag">${categoryNames[post.type]}</span></div>
    ${body}
    <div class="post-foot"><button class="post-action ${post.liked ? "is-liked" : ""}" data-like="${post.id}" type="button">♡ ${post.likes}</button><button class="post-action" data-detail="${post.id}" type="button">评论 ${post.comments.length}</button><span class="post-state">${status}</span></div>
  </article>`;
}

function renderPublishFields() {
  const type = $("#publish-type").value;
  $("#publish-fields").innerHTML = type === "discussion"
    ? `<label for="publish-content">正文 <em>必填 · 最多 500 字</em></label><textarea id="publish-content" name="content" maxlength="500" required placeholder="写下你对漆器的发现或想和大家讨论的话题"></textarea><label for="publish-artifact">关联漆器 <em>可选</em></label><input id="publish-artifact" name="artifact" maxlength="40" placeholder="例如：云纹漆鼎">`
    : `<label for="publish-recipe">配方 <em>必填 · 最多 120 字</em></label><input id="publish-recipe" name="recipe" maxlength="120" required placeholder="例如：木胎 + 朱红 + 云雷纹"><label for="publish-artifact">关联漆器名称 <em>可选</em></label><input id="publish-artifact" name="artifact" maxlength="40" placeholder="暂不填写也可以"><label for="publish-explanation">说明 <em>可选 · 最多 300 字</em></label><textarea id="publish-explanation" name="explanation" maxlength="300" placeholder="分享你的尝试过程（新配方将标记为待验证）"></textarea>`;
}

function openModal(id) { $(id).hidden = false; document.body.classList.add("modal-open"); }
function closeModals() {
  $("#publish-backdrop").hidden = true;
  $("#detail-backdrop").hidden = true;
  $("#reveal-backdrop").hidden = true;
  document.body.classList.remove("modal-open");
}
function confirmReveal() {
  const post = posts.find((item) => item.id === revealPostId);
  if (post) {
    post.revealed = true;
    renderPosts();
  }
  closeModals();
}
function showDetail(id) {
  const post = posts.find((item) => item.id === Number(id));
  if (!post) return;
  detailPostId = post.id;
  $("#detail-content").innerHTML = `<span class="eyebrow">${categoryNames[post.type]} · CONTENT DETAIL</span><h2 id="detail-title">${escapeHTML(post.type === "discussion" ? "交流讨论" : post.recipe)}</h2><div class="detail-author">${escapeHTML(post.author)} · ${relativeTime(post.time)}</div><div class="modal-rule"></div><p>${escapeHTML(post.content || post.explanation)}</p>${post.artifact ? `<p class="detail-artifact">关联漆器：${post.revealed ? escapeHTML(post.artifact) : "暂未显示"}</p>` : ""}<div class="comment-list">${post.comments.length ? post.comments.map((comment) => `<p><strong>访客匠人</strong>${escapeHTML(comment)}</p>`).join("") : "<small>还没有评论，留下第一句吧。</small>"}</div><form class="comment-form" id="comment-form"><input id="comment-input" maxlength="200" required placeholder="写下你的评论"><button class="combine-button small" type="submit">发送</button></form>`;
  openModal("#detail-backdrop");
}

$("#publish-type").addEventListener("change", renderPublishFields);
$("#publish-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const type = form.get("type");
  const post = { id: nextId++, type, author: "访客匠人", time: Date.now(), likes: 0, comments: [], liked: false };
  if (type === "discussion") {
    post.content = String(form.get("content") || "").trim();
    if (!post.content) return;
  } else {
    post.recipe = String(form.get("recipe") || "").trim();
    post.artifact = String(form.get("artifact") || "").trim();
    post.explanation = String(form.get("explanation") || "").trim() || "这是一条前端模拟分享，欢迎大家一起尝试。";
    post.status = "pending";
    if (!post.recipe) return;
  }
  posts.unshift(post);
  closeModals();
  event.currentTarget.reset();
  renderPublishFields();
  renderPosts();
  showSquareToast("发布成功，仅在本次页面会话中展示。", "success");
});
document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-category]");
  if (tab) {
    currentCategory = tab.dataset.category;
    if (currentCategory === "recipe") $("#verification-select").value = "all";
    document.querySelectorAll(".square-tab").forEach((item) => item.classList.toggle("active", item === tab));
    renderPosts();
  }
  const like = event.target.closest("[data-like]");
  if (like) {
    const post = posts.find((item) => item.id === Number(like.dataset.like));
    if (post) { post.liked = !post.liked; post.likes += post.liked ? 1 : -1; renderPosts(); }
  }
  const detail = event.target.closest("[data-detail]");
  if (detail) showDetail(detail.dataset.detail);
  const card = event.target.closest(".square-card");
  if (card && !event.target.closest("button")) showDetail(card.dataset.id);
  const reveal = event.target.closest("[data-reveal]");
  if (reveal) {
    revealPostId = Number(reveal.dataset.reveal);
    openModal("#reveal-backdrop");
  }
  if (event.target.closest("#open-publish")) { renderPublishFields(); openModal("#publish-backdrop"); }
  if (event.target.closest("[data-close-modal]") || event.target.classList.contains("square-modal-backdrop")) closeModals();
});
document.addEventListener("submit", (event) => {
  if (event.target.id !== "comment-form") return;
  const input = $("#comment-input");
  const value = input.value.trim();
  if (!value) return;
  const post = posts.find((item) => item.id === detailPostId);
  if (post) { post.comments.push(value); renderPosts(); window.setTimeout(() => showDetail(post.id), 0); }
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModals(); });
$("#sort-select").addEventListener("change", renderPosts);
$("#verification-select").addEventListener("change", renderPosts);
$("#confirm-reveal").addEventListener("click", confirmReveal);
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));
renderPublishFields();
renderPosts();
