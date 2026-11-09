import { supabase } from "./supabaseClient.js";
import { T } from "./i18n.js";

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
let deletePostId = null;
let currentUser = null;

function getUsername(user) {
  return user?.user_metadata?.username || user?.email?.replace(/@example\.com$/, "") || "访客匠人";
}

async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      showSquareToast("无法获取登录状态，请稍后重试。", "error");
      return null;
    }
    if (!user) {
      showSquareToast("请先登录后再进行留言。", "warning");
      window.setTimeout(() => { window.location.href = "index.html#auth-panel"; }, 500);
      return null;
    }
    currentUser = user;
    return user;
  } catch (error) {
    console.error("获取登录状态失败：", error);
    showSquareToast("登录服务暂时不可用，请检查 Supabase 配置。", "error");
    return null;
  }
}

async function loadCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    currentUser = user || null;
  } catch (error) {
    console.warn("获取当前用户失败：", error);
    currentUser = null;
  }
}

function normalizePost(post) {
  const comments = post.community_comments || post.comments || [];
  return {
    ...post,
    author: post.author_name || post.author || "访客匠人",
    time: post.created_at ? new Date(post.created_at).getTime() : post.time,
    likes: post.likes_count ?? post.likes ?? 0,
    comments: comments.map((comment) => typeof comment === "string" ? comment : {
      author: comment.author_name || "访客匠人",
      content: comment.content || ""
    }),
    liked: false
  };
}

async function loadPosts() {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*, community_comments(id, author_name, content, created_at)")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("广场云端数据暂不可用，继续显示演示数据：", error.message);
    posts = seedPosts.map(normalizePost);
  } else {
    posts = (data || []).map(normalizePost);
  }
  renderPosts();
}

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
  return minutes < 60 ? `${minutes} ${T("分钟前")}` : minutes < 1440 ? `${Math.floor(minutes / 60)} ${T("小时前")}` : `${Math.floor(minutes / 1440)} ${T("天前")}`;
}

function visiblePosts() {
  const verification = $("#verification-select").value;
  return posts.filter((post) => (currentCategory === "mine"
    ? Boolean(currentUser && post.user_id === currentUser.id)
    : currentCategory === "all" || post.type === currentCategory)
    && (currentCategory !== "recipe" || verification === "all" || post.status === verification))
    .sort((a, b) => $("#sort-select").value === "likes" ? b.likes - a.likes : b.time - a.time);
}

function renderPosts() {
  $("#verification-filter-wrap").hidden = currentCategory !== "recipe";
  const list = visiblePosts();
  $("#square-list").innerHTML = list.length ? list.map(cardTemplate).join("") : `<div class="square-empty panel"><span class="seal-outline">空</span><h2>${T("暂无相关内容")}</h2><p>${T("试试其他分类，或发布第一条动态。")}</p></div>`;
}

function cardTemplate(post) {
  const isRecipe = post.type === "recipe" || post.type === "egg";
  const status = post.status === "verified" ? `<span class="post-status verified">${T("已验证")}</span>` : isRecipe ? `<span class="post-status">${T("待验证")}</span>` : "";
  const artifact = post.revealed
    ? `<span class="artifact-name">${escapeHTML(T(post.artifact || "未关联漆器"))}</span>`
    : `<button class="artifact-reveal" data-reveal="${post.id}" type="button">${T("关联漆器 · 点击查看")}</button>`;
  const body = isRecipe
    ? `<div class="recipe-box"><small>${post.type === "egg" ? T("彩蛋组合") : T("配方组合")}</small><strong>${escapeHTML(T(post.recipe))}</strong>${artifact}</div><p class="post-content">${escapeHTML(T(post.explanation))}</p>`
    : `<p class="post-content">${escapeHTML(T(post.content))}</p>`;
  const canDelete = Boolean(currentUser && post.user_id && post.user_id === currentUser.id);
  return `<article class="square-card panel ${post.type}" data-id="${post.id}">
    <div class="post-head"><span class="avatar">${escapeHTML(post.author.slice(0, 1))}</span><div><strong>${escapeHTML(T(post.author))}</strong><small>${relativeTime(post.time)}</small></div><span class="post-tag">${T(categoryNames[post.type])}</span>${canDelete ? `<button class="post-delete" data-delete="${post.id}" type="button" aria-label="${T("删除这条动态")}" title="${T("删除动态")}">×</button>` : ""}</div>
    ${body}
    <div class="post-foot"><button class="post-action ${post.liked ? "is-liked" : ""}" data-like="${post.id}" type="button">♡ ${post.likes}</button><button class="post-action" data-detail="${post.id}" type="button">${T("评论")} ${post.comments.length}</button><span class="post-state">${status}</span></div>
  </article>`;
}

function renderPublishFields() {
  const type = $("#publish-type").value;
  $("#publish-fields").innerHTML = type === "discussion"
    ? `<label for="publish-content">${T("正文")} <em>${T("必填 · 最多 500 字")}</em></label><textarea id="publish-content" name="content" maxlength="500" required placeholder="${T("写下你对漆器的发现或想和大家讨论的话题")}"></textarea><label for="publish-artifact">${T("关联漆器")} <em>${T("可选")}</em></label><input id="publish-artifact" name="artifact" maxlength="40" placeholder="${T("例如：云纹漆鼎")}">`
    : `<label for="publish-recipe">${T("配方")} <em>${T("必填 · 最多 120 字")}</em></label><input id="publish-recipe" name="recipe" maxlength="120" required placeholder="${T("例如：木胎 + 朱红 + 云雷纹")}"><label for="publish-artifact">${T("关联漆器名称")} <em>${T("可选")}</em></label><input id="publish-artifact" name="artifact" maxlength="40" placeholder="${T("暂不填写也可以")}"><label for="publish-explanation">${T("说明")} <em>${T("可选 · 最多 300 字")}</em></label><textarea id="publish-explanation" name="explanation" maxlength="300" placeholder="${T("分享你的尝试过程（新配方将标记为待验证）")}"></textarea>`;
}

function openModal(id) { $(id).hidden = false; document.body.classList.add("modal-open"); }
function closeModals() {
  $("#publish-backdrop").hidden = true;
  $("#detail-backdrop").hidden = true;
  $("#reveal-backdrop").hidden = true;
  $("#delete-backdrop").hidden = true;
  document.body.classList.remove("modal-open");
}

function openDeleteConfirm(id) {
  deletePostId = id;
  openModal("#delete-backdrop");
}

async function confirmDelete() {
  const user = await getCurrentUser();
  if (!user || !deletePostId) return;
  const button = $("#confirm-delete");
  button.disabled = true;
  try {
    const { error } = await supabase
      .from("community_posts")
      .delete()
      .eq("id", deletePostId)
      .eq("user_id", user.id);
    if (error) {
      showSquareToast(`删除失败：${error.message}`, "error");
      return;
    }
    closeModals();
    deletePostId = null;
    await loadPosts();
    showSquareToast("动态已删除。", "success");
  } catch (error) {
    console.error("删除动态失败：", error);
    showSquareToast("删除失败，请稍后重试。", "error");
  } finally {
    button.disabled = false;
  }
}
function confirmReveal() {
  const post = posts.find((item) => String(item.id) === String(revealPostId));
  if (post) {
    post.revealed = true;
    renderPosts();
  }
  closeModals();
}
function showDetail(id) {
  const post = posts.find((item) => String(item.id) === String(id));
  if (!post) return;
  detailPostId = post.id;
  $("#detail-content").innerHTML = `<span class="eyebrow">${T(categoryNames[post.type])} · CONTENT DETAIL</span><h2 id="detail-title">${escapeHTML(post.type === "discussion" ? T("交流讨论") : T(post.recipe))}</h2><div class="detail-author">${escapeHTML(T(post.author))} · ${relativeTime(post.time)}</div><div class="modal-rule"></div><p class="post-content">${escapeHTML(T(post.content || post.explanation))}</p>${post.artifact ? `<p class="detail-artifact">${T("关联漆器：")}${post.revealed ? escapeHTML(T(post.artifact)) : T("暂未显示")}</p>` : ""}<div class="comment-list">${post.comments.length ? post.comments.map((comment) => { const author = typeof comment === "string" ? T("访客匠人") : T(comment.author); const content = typeof comment === "string" ? comment : comment.content; return `<p class="comment-content"><strong>${escapeHTML(author)}</strong>${escapeHTML(T(content))}</p>`; }).join("") : `<small>${T("还没有评论，留下第一句吧。")}</small>`}</div><form class="comment-form" id="comment-form"><textarea id="comment-input" maxlength="200" required rows="3" placeholder="${T("写下你的评论")}"></textarea><button class="combine-button small" type="submit">${T("发送")}</button></form>`;
  openModal("#detail-backdrop");
}

$("#publish-type").addEventListener("change", renderPublishFields);
$("#publish-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const publishForm = event.currentTarget;
  if (!(publishForm instanceof HTMLFormElement)) {
    showSquareToast("发布表单加载异常，请刷新页面后重试。", "error");
    return;
  }
  const submitButton = publishForm.querySelector("button[type=submit]");
  submitButton.disabled = true;
  submitButton.dataset.originalText = submitButton.innerHTML;
  submitButton.innerHTML = T("发布中…");
  const user = await getCurrentUser();
  if (!user) {
    submitButton.disabled = false;
    submitButton.innerHTML = submitButton.dataset.originalText;
    return;
  }
  try {
    const form = new FormData(publishForm);
    const type = form.get("type");
    const post = { type, author: getUsername(user), likes: 0, comments: [], liked: false };
    if (type === "discussion") {
      post.content = String(form.get("content") || "").trim();
      if (!post.content) return;
    } else {
      post.recipe = String(form.get("recipe") || "").trim();
      post.artifact = String(form.get("artifact") || "").trim();
      post.explanation = String(form.get("explanation") || "").trim() || T("这是一条前端模拟分享，欢迎大家一起尝试。");
      post.status = "pending";
      if (!post.recipe) return;
    }
    const { error } = await supabase.from("community_posts").insert({
      user_id: user.id,
      author_name: post.author,
      type: post.type,
      content: post.content || null,
      recipe: post.recipe || null,
      artifact: post.artifact || null,
      explanation: post.explanation || null,
      status: post.status || null
    });
    if (error) {
      showSquareToast(`发布失败：${error.message}`, "error");
      return;
    }
    closeModals();
    publishForm.reset();
    renderPublishFields();
    await loadPosts();
    showSquareToast("发布成功，已保存到广场。", "success");
  } catch (error) {
    console.error("发布动态失败：", error);
    showSquareToast("发布失败，请确认已执行 data/community.sql。", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = submitButton.dataset.originalText;
  }
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
    const post = posts.find((item) => String(item.id) === String(like.dataset.like));
    if (post) { post.liked = !post.liked; post.likes += post.liked ? 1 : -1; renderPosts(); }
  }
  const detail = event.target.closest("[data-detail]");
  if (detail) showDetail(detail.dataset.detail);
  const card = event.target.closest(".square-card");
  if (card && !event.target.closest("button")) showDetail(card.dataset.id);
  const reveal = event.target.closest("[data-reveal]");
  if (reveal) {
    revealPostId = reveal.dataset.reveal;
    openModal("#reveal-backdrop");
  }
  const remove = event.target.closest("[data-delete]");
  if (remove) openDeleteConfirm(remove.dataset.delete);
  if (event.target.closest("#open-publish")) { renderPublishFields(); openModal("#publish-backdrop"); }
  if (event.target.closest("[data-close-modal]") || event.target.classList.contains("square-modal-backdrop")) closeModals();
});
document.addEventListener("submit", async (event) => {
  if (event.target.id !== "comment-form") return;
  const input = $("#comment-input");
  const value = input.value.trim();
  if (!value) return;
  const user = await getCurrentUser();
  if (!user) return;
  const post = posts.find((item) => item.id === detailPostId);
  if (!post) return;
  const { error } = await supabase.from("community_comments").insert({
    post_id: post.id,
    user_id: user.id,
    author_name: getUsername(user),
    content: value
  });
  if (error) {
    window.showToast?.(`评论失败：${error.message}`, "error");
    return;
  }
  await loadPosts();
  window.setTimeout(() => showDetail(post.id), 0);
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModals(); });
$("#sort-select").addEventListener("change", renderPosts);
$("#verification-select").addEventListener("change", renderPosts);
$("#confirm-reveal").addEventListener("click", confirmReveal);
$("#confirm-delete").addEventListener("click", confirmDelete);
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));
document.addEventListener("ich:lang", () => {
  renderPosts();
  renderPublishFields();
});
renderPublishFields();
loadCurrentUser().then(loadPosts);
