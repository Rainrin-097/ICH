import { withLoading } from "./loading.js";

const $ = (selector) => document.querySelector(selector);
const USERNAME_SUFFIX = "@example.com";
const supabasePromise = import("./supabaseClient.js").then(({ supabase }) => supabase);

let toastTimer;

export function showToast(message, kind = "") {
  let toast = $("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.className = `toast visible ${kind}`.trim();
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.className = "toast";
  }, 3200);
}

window.showToast = showToast;

function fakeEmail(username) {
  return `${username.trim()}${USERNAME_SUFFIX}`;
}

function setAuthMode(mode) {
  const isRegister = mode === "register";
  const form = $("#auth-form");
  if (!form) return;
  $("#auth-submit").textContent = isRegister ? "注册" : "登录";
  $("#auth-mode-label").textContent = isRegister ? "创建匠人档案" : "进入匠人工坊";
  $("#auth-switch").textContent = isRegister ? "已有账号？登录" : "没有账号？注册";
  form.dataset.mode = mode;
}

function getUsername(user) {
  return user?.user_metadata?.username || user?.email?.slice(0, -USERNAME_SUFFIX.length) || "匠人";
}

function renderUser(user) {
  const authForm = $("#auth-form");
  const authUser = $("#auth-user");
  const authOpen = $("#auth-open");
  const authPanel = $("#auth-panel");
  if (authOpen) {
    authOpen.textContent = user ? getUsername(user) : "用户中心";
    authOpen.href = user ? "profile.html" : (authForm ? "#auth-panel" : "index.html#auth-panel");
    authOpen.setAttribute("aria-label", user ? `打开${getUsername(user)}的个人档案` : "打开用户中心");
    authOpen.classList.remove("auth-state-pending");
  }
  if (!authForm || !authUser) return;
  if (user?.email?.endsWith(USERNAME_SUFFIX)) {
    const username = getUsername(user);
    $("#auth-username-display").textContent = username;
    authForm.hidden = true;
    authUser.hidden = false;
    authPanel?.classList.add("auth-closed");
    if (window.location.hash === "#auth-panel") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  } else {
    authForm.hidden = false;
    authUser.hidden = true;
    authPanel?.classList.remove("auth-closed");
  }
}

async function submitAuth(event) {
  event.preventDefault();
  const username = $("#auth-username").value.trim();
  const password = $("#auth-password").value;
  const mode = $("#auth-form").dataset.mode || "login";

  if (!username || !password) {
    showToast("请输入用户名和密码。", "warning");
    return;
  }
  if (!/^[\w.-]+$/.test(username)) {
    showToast("用户名只能包含字母、数字、下划线、点或短横线。", "warning");
    return;
  }

  const supabase = await getSupabase();
  if (!supabase) return;
  const email = fakeEmail(username);
  let result;
  try {
    result = await withLoading(
      () => (mode === "register"
        ? supabase.auth.signUp({ email, password })
        : supabase.auth.signInWithPassword({ email, password })),
      mode === "register" ? "正在注册" : "正在登录"
    );
  } catch (error) {
    console.error("Supabase 认证请求失败：", error);
    showToast("登录服务请求失败，请检查网络和 Supabase 配置。", "error");
    return;
  }

  if (result.error) {
    const duplicateUser = mode === "register"
      && /already registered|already exists|user already exists/i.test(result.error.message);
    showToast(duplicateUser ? "用户名已存在，请更换用户名或者直接登录。" : result.error.message, "error");
    return;
  }

  if (mode === "register") {
    if (result.data?.user && (!result.data.user.identities || result.data.user.identities.length === 0)) {
      showToast("用户名已存在，请直接登录。", "error");
      return;
    }
    setAuthMode("login");
    $("#auth-password").value = "";
    showToast("注册成功，请登录。", "success");
  } else {
    showToast("登录成功，欢迎回来。", "success");
  }
}

async function signOut() {
  const supabase = await getSupabase();
  if (!supabase) return;
  const { error } = await withLoading(() => supabase.auth.signOut(), "正在退出登录");
  if (error) {
    showToast(error.message, "error");
    return;
  }
  showToast("已退出登录。", "success");
}

async function getSupabase() {
  try {
    return await supabasePromise;
  } catch (error) {
    console.error("Supabase 初始化失败：", error);
    showToast(error.message === "Supabase anon key is not configured"
      ? "请先在 supabaseClient.js 配置 anon key。"
      : "登录服务暂时不可用，请稍后重试。", "error");
    return null;
  }
}

$("#auth-form")?.addEventListener("submit", submitAuth);
$("#auth-open")?.addEventListener("click", (event) => {
  if (!$("#auth-form")) return;
  if (event.currentTarget.getAttribute("href") === "profile.html") return;
  event.preventDefault();
  $("#auth-panel")?.classList.remove("auth-closed");
});
$("#auth-switch")?.addEventListener("click", () => {
  setAuthMode($("#auth-form").dataset.mode === "register" ? "login" : "register");
});
$("#auth-signout")?.addEventListener("click", signOut);

getSupabase().then(async (supabase) => {
  if (!supabase) return;
  supabase.auth.onAuthStateChange((_event, session) => {
    renderUser(session?.user || null);
  });
  const { data: { session } } = await supabase.auth.getSession();
  renderUser(session?.user || null);
});
