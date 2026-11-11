import { supabase } from "./supabaseClient.js";
import { withLoading } from "./loading.js";

const $ = (selector) => document.querySelector(selector);
let toastTimer;
const categoryNames = { discussion: "交流讨论", recipe: "配方分享", egg: "彩蛋分享" };
let posts = [];
let currentCategory = "all";
let detailPostId = null;
let revealPostId = null;
let deletePostId = null;
let currentUser = null;
let likedPostIds = new Set();
const pendingLikes = new Set();
let commentSubmitting = false;

function getUsername(user) {
  return user?.user_metadata?.username || user?.email?.replace(/@example\.com$/, "") || "访客匠人";
}

function redirectToLogin() {
  window.setTimeout(() => { window.location.href = "index.html#auth-panel"; }, 500);
}

async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      showSquareToast("无法获取登录状态，请前往用户中心登录或稍后重试", "error");
      return null;
    }
    if (!user) {
      showSquareToast("请先登录后再进行操作。", "warning");
      redirectToLogin();
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

async function loadMyLikes() {
  likedPostIds = new Set();
  if (!currentUser) return;
  try {
    const { data, error } = await supabase
      .from("community_post_likes")
      .select("post_id")
      .eq("user_id", currentUser.id);
    if (error) {
      console.warn("读取点赞状态失败：", error.message);
      return;
    }
    likedPostIds = new Set((data || []).map((row) => String(row.post_id)));
  } catch (error) {
    console.warn("读取点赞状态异常：", error);
  }
}

function normalizePost(post) {
  const comments = post.community_comments || [];
  return {
    ...post,
    author: post.author_name || "访客匠人",
    time: post.created_at ? new Date(post.created_at).getTime() : Date.now(),
    likes: post.likes_count ?? 0,
    comments: comments.map((comment) => ({
      author: comment.author_name || "访客匠人",
      content: comment.content || "",
      time: comment.created_at ? new Date(comment.created_at).getTime() : 0
    })),
    liked: likedPostIds.has(String(post.id))
  };
}

async function loadPosts() {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*, community_comments(id, author_name, content, created_at)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("广场数据加载失败：", error.message);
    posts = [];
    renderPosts();
    showSquareToast(`广场数据加载失败：${error.message}`, "error");
    return;
  }
  posts = (data || []).map(normalizePost);
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
  return minutes < 60 ? `${minutes} 分钟前` : minutes < 1440 ? `${Math.floor(minutes / 60)} 小时前` : `${Math.floor(minutes / 1440)} 天前`;
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
  $("#square-list").innerHTML = list.length ? list.map(cardTemplate).join("") : `<div class="square-empty panel"><span class="seal-outline">空</span><h2>暂无相关内容</h2><p>试试其他分类，或发布第一条动态。</p></div>`;
}

function cardTemplate(post) {
  const isRecipe = post.type === "recipe" || post.type === "egg";
  const status = post.status === "verified" ? `<span class="post-status verified">已验证</span>` : isRecipe ? `<span class="post-status">待验证</span>` : "";
  const artifact = post.revealed
    ? `<span class="artifact-name">${escapeHTML(post.artifact || "未关联漆器")}</span>`
    : `<button class="artifact-reveal" data-reveal="${post.id}" type="button">关联漆器 · 点击查看</button>`;
  const body = isRecipe
    ? `<div class="recipe-box"><small>${post.type === "egg" ? "彩蛋组合" : "配方组合"}</small><strong>${escapeHTML(post.recipe)}</strong>${artifact}</div><p class="post-content">${escapeHTML(post.explanation)}</p>`
    : `<p class="post-content">${escapeHTML(post.content)}</p>`;
  const canDelete = Boolean(currentUser && post.user_id && post.user_id === currentUser.id);
  const likePending = pendingLikes.has(String(post.id));
  return `<article class="square-card panel ${post.type}" data-id="${post.id}">
    <div class="post-head"><span class="avatar">${escapeHTML(post.author.slice(0, 1))}</span><div><strong>${escapeHTML(post.author)}</strong><small>${relativeTime(post.time)}</small></div><span class="post-tag">${categoryNames[post.type]}</span>${canDelete ? `<button class="post-delete" data-delete="${post.id}" type="button" aria-label="删除这条动态" title="删除动态">×</button>` : ""}</div>
    ${body}
    <div class="post-foot"><button class="post-action ${post.liked ? "is-liked" : ""}" data-like="${post.id}" type="button" ${likePending ? "disabled" : ""}>♡ ${post.likes}</button><button class="post-action" data-detail="${post.id}" type="button">评论 ${post.comments.length}</button><span class="post-state">${status}</span></div>
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
    const { error } = await withLoading(
      () => supabase
        .from("community_posts")
        .delete()
        .eq("id", deletePostId)
        .eq("user_id", user.id),
      "正在删除动态"
    );
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

// 重新读取单条动态的真实点赞数，以数据库为准更新本地显示
async function refreshLikesCount(post) {
  const { data, error } = await supabase
    .from("community_posts")
    .select("likes_count")
    .eq("id", post.id)
    .single();
  if (!error && data) {
    post.likes = data.likes_count ?? 0;
  } else if (error) {
    console.warn("读取点赞数失败：", error.message);
  }
}

async function toggleLike(postId) {
  const id = String(postId);
  // 在任何异步操作之前立即锁定，防止快速连续点击产生并发请求
  if (pendingLikes.has(id)) return;
  pendingLikes.add(id);
  // 锁定期间通过 cardTemplate 中的 likePending 禁用对应点赞按钮
  renderPosts();

  try {
    const user = await getCurrentUser();
    if (!user) return;
    const post = posts.find((item) => String(item.id) === id);
    if (!post) return;

    if (post.liked) {
      // 取消点赞：删除记录并返回实际删除的行，确认确实删掉了才更新本地状态
      const { data: deleted, error } = await withLoading(
        () => supabase
          .from("community_post_likes")
          .delete()
          .eq("post_id", post.id)
          .eq("user_id", user.id)
          .select("id"),
        "正在取消点赞",
        { delay: 400 }
      );
      if (error) throw error;
      if (!deleted || deleted.length === 0) {
        // 数据库中没有对应记录（本地状态过期），仅纠正本地状态，不改动显示数字
        console.warn("取消点赞：数据库无对应点赞记录，已纠正本地状态。");
      }
      likedPostIds.delete(id);
      post.liked = false;
    } else {
      // 点赞：插入记录；唯一约束冲突说明已点赞，按已点赞处理
      const { error } = await withLoading(
        () => supabase
          .from("community_post_likes")
          .insert({ post_id: post.id, user_id: user.id }),
        "正在点赞",
        { delay: 400 }
      );
      if (error && error.code !== "23505") throw error;
      likedPostIds.add(id);
      post.liked = true;
    }
    // 操作成功后以数据库真实 likes_count 更新界面，不在本地自行加减
    await refreshLikesCount(post);
  } catch (error) {
    // 失败时不修改本地点赞状态
    console.error("点赞操作失败：", error);
    showSquareToast(`点赞失败：${error.message}`, "error");
  } finally {
    // 无论未登录、成功或失败，都解除锁定并恢复按钮
    pendingLikes.delete(id);
    renderPosts();
  }
}

const deletingComments = new Set();

// 删除评论：数据库 RLS 仅允许删除自己的评论，前端只对本人评论展示入口
async function deleteComment(commentId, button) {
  const id = String(commentId);
  if (deletingComments.has(id)) return;
  deletingComments.add(id);
  if (button) button.disabled = true;
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const { data, error } = await withLoading(
      () => supabase
        .from("community_comments")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)
        .select("id"),
      "正在删除评论"
    );
    if (error) throw error;
    if (!data || data.length === 0) {
      showSquareToast("删除失败：未找到可删除的评论。", "error");
      return;
    }
    await loadPosts();
    if (detailPostId) await showDetail(detailPostId);
    showSquareToast("评论已删除。", "success");
  } catch (error) {
    console.error("删除评论失败：", error);
    showSquareToast(`删除评论失败：${error.message}`, "error");
  } finally {
    deletingComments.delete(id);
    // showDetail 重新渲染后旧按钮已脱离 DOM，仅在仍挂载时恢复
    if (button && button.isConnected) button.disabled = false;
  }
}

async function showDetail(id) {
  const post = posts.find((item) => String(item.id) === String(id));
  if (!post) return;
  detailPostId = post.id;

  // 每次打开详情时重新拉取该动态的最新评论，保证数量与内容真实
  let commentNotice = "";
  const { data: comments, error } = await withLoading(
    () => supabase
      .from("community_comments")
      .select("id, user_id, author_name, content, created_at")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true }),
    "正在加载评论"
  );

  if (error) {
    // 读取失败：保留已有评论显示，但明确提示当前内容可能不是最新
    console.error("评论加载失败：", error.message);
    showSquareToast(`评论加载失败：${error.message}`, "error");
    commentNotice = `<small class="comment-notice">评论加载失败，以下显示的可能不是最新评论。</small>`;
  } else {
    post.comments = (comments || []).map((comment) => ({
      id: comment.id,
      userId: comment.user_id,
      author: comment.author_name || "访客匠人",
      content: comment.content || "",
      time: comment.created_at ? new Date(comment.created_at).getTime() : 0
    }));
    renderPosts();
  }

  // 作者名与发布时间同行显示；仅本人评论显示删除按钮
  const commentList = post.comments.length
    ? post.comments.map((comment) => {
      const canDeleteComment = Boolean(currentUser && comment.userId && comment.userId === currentUser.id);
      return `<p class="comment-content"><span class="comment-meta"><strong>${escapeHTML(comment.author)}</strong>${comment.time ? `<small>${relativeTime(comment.time)}</small>` : ""}${canDeleteComment ? `<button class="comment-delete" data-delete-comment="${comment.id}" type="button" title="删除这条评论" aria-label="删除这条评论">×</button>` : ""}</span><span class="comment-text">${escapeHTML(comment.content)}</span></p>`;
    }).join("")
    : "<small>还没有评论，留下第一句吧。</small>";

  $("#detail-content").innerHTML = `<span class="eyebrow">${categoryNames[post.type]} · CONTENT DETAIL</span><h2 id="detail-title">${escapeHTML(post.type === "discussion" ? "交流讨论" : post.recipe)}</h2><div class="detail-author">${escapeHTML(post.author)} · ${relativeTime(post.time)}</div><div class="modal-rule"></div><p class="post-content">${escapeHTML(post.content || post.explanation)}</p>${post.artifact ? `<p class="detail-artifact">关联漆器：${post.revealed ? escapeHTML(post.artifact) : "暂未显示"}</p>` : ""}<div class="comment-list">${commentNotice}${commentList}</div><form class="comment-form" id="comment-form"><textarea id="comment-input" maxlength="200" required rows="3" placeholder="写下你的评论"></textarea><button class="combine-button small" type="submit">发送</button></form>`;
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
  submitButton.innerHTML = "发布中…";
  const user = await getCurrentUser();
  if (!user) {
    submitButton.disabled = false;
    submitButton.innerHTML = submitButton.dataset.originalText;
    return;
  }
  try {
    const form = new FormData(publishForm);
    const type = form.get("type");
    const post = { type, author: getUsername(user) };
    if (type === "discussion") {
      post.content = String(form.get("content") || "").trim();
      if (!post.content) {
        showSquareToast("正文不能为空。", "warning");
        return;
      }
    } else {
      post.recipe = String(form.get("recipe") || "").trim();
      post.artifact = String(form.get("artifact") || "").trim();
      post.explanation = String(form.get("explanation") || "").trim();
      post.status = "pending";
      if (!post.recipe) {
        showSquareToast("配方不能为空。", "warning");
        return;
      }
    }
    const { error } = await withLoading(
      () => supabase.from("community_posts").insert({
        user_id: user.id,
        author_name: post.author,
        type: post.type,
        content: post.content || null,
        recipe: post.recipe || null,
        artifact: post.artifact || null,
        explanation: post.explanation || null,
        status: post.status || null
      }),
      "正在发布动态"
    );
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
    showSquareToast("发布失败，请稍后重试。", "error");
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
  if (like && !like.disabled) toggleLike(like.dataset.like);
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
  const removeComment = event.target.closest("[data-delete-comment]");
  if (removeComment) deleteComment(removeComment.dataset.deleteComment, removeComment);
  if (event.target.closest("#open-publish")) { renderPublishFields(); openModal("#publish-backdrop"); }
  if (event.target.closest("[data-close-modal]") || event.target.classList.contains("square-modal-backdrop")) closeModals();
});

document.addEventListener("submit", async (event) => {
  if (event.target.id !== "comment-form") return;
  // 阻止浏览器默认表单提交和页面刷新，且必须放在任何异步操作之前
  event.preventDefault();
  if (commentSubmitting) return;

  const form = event.target;
  const input = form.querySelector("#comment-input");
  const submitButton = form.querySelector("button[type=submit]");
  const value = input.value.trim();
  if (!value) {
    showSquareToast("评论内容不能为空。", "warning");
    return;
  }

  // 验证通过后立即锁定并禁用按钮，再执行获取用户、写入数据库等异步操作
  commentSubmitting = true;
  submitButton.disabled = true;
  submitButton.dataset.originalText = submitButton.innerHTML;
  submitButton.innerHTML = "发送中…";

  try {
    const user = await getCurrentUser();
    if (!user) return;
    const post = posts.find((item) => String(item.id) === String(detailPostId));
    if (!post) return;

    const { error } = await withLoading(
      () => supabase.from("community_comments").insert({
        post_id: post.id,
        user_id: user.id,
        author_name: getUsername(user),
        content: value
      }),
      "正在发表评论"
    );
    if (error) {
      // 失败时保留输入框内容
      showSquareToast(`评论失败：${error.message}`, "error");
      return;
    }
    input.value = "";
    await loadPosts();
    await showDetail(post.id);
  } catch (error) {
    console.error("发表评论失败：", error);
    showSquareToast("评论失败，请稍后重试。", "error");
  } finally {
    commentSubmitting = false;
    // 成功后 showDetail 会重新渲染表单，旧按钮已脱离 DOM；
    // 仅当按钮仍在文档中时才恢复它，避免操作游离节点
    if (submitButton.isConnected) {
      submitButton.disabled = false;
      submitButton.innerHTML = submitButton.dataset.originalText || "发送";
    }
  }
});

document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModals(); });
$("#sort-select").addEventListener("change", renderPosts);
$("#verification-select").addEventListener("change", renderPosts);
$("#confirm-reveal").addEventListener("click", confirmReveal);
$("#confirm-delete").addEventListener("click", confirmDelete);
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));

renderPublishFields();
// 首屏需要读取登录态、点赞状态与动态列表，属于真实的数据加载
withLoading(
  () => loadCurrentUser().then(loadMyLikes).then(loadPosts),
  "正在加载广场动态"
);
