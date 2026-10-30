import { supabase } from "./supabaseClient.js";

const $ = (selector) => document.querySelector(selector);
const USERNAME_SUFFIX = "@example.com";

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

function renderUser(user) {
  const authForm = $("#auth-form");
  const authUser = $("#auth-user");
  if (!authForm || !authUser) return;
  if (user?.email?.endsWith(USERNAME_SUFFIX)) {
    const username = user.email.slice(0, -USERNAME_SUFFIX.length);
    $("#auth-username-display").textContent = username;
    authForm.hidden = true;
    authUser.hidden = false;
  } else {
    authForm.hidden = false;
    authUser.hidden = true;
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

  const email = fakeEmail(username);
  const result = mode === "register"
    ? await supabase.auth.signUp({ email, password })
    : await supabase.auth.signInWithPassword({ email, password });

  if (result.error) {
    showToast(result.error.message, "error");
    return;
  }

  if (mode === "register") {
    setAuthMode("login");
    $("#auth-password").value = "";
    showToast("注册成功，请登录。", "success");
  } else {
    showToast("登录成功，欢迎回来。", "success");
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    showToast(error.message, "error");
    return;
  }
  showToast("已退出登录。", "success");
}

$("#auth-form")?.addEventListener("submit", submitAuth);
$("#auth-switch")?.addEventListener("click", () => {
  setAuthMode($("#auth-form").dataset.mode === "register" ? "login" : "register");
});
$("#auth-signout")?.addEventListener("click", signOut);

supabase.auth.onAuthStateChange((_event, session) => {
  renderUser(session?.user || null);
});

const { data: { session } } = await supabase.auth.getSession();
renderUser(session?.user || null);
