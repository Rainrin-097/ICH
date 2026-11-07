import { supabase } from "./supabaseClient.js";
import { getAudioSettings, saveAudioSettings } from "./audio.js";

const SETTINGS_KEY = "ich-settings";
const $ = (selector) => document.querySelector(selector);

function showToast(message, kind = "") {
    if (window.showToast) {
        window.showToast(message, kind);
        return;
    }
    let toast = $("#settings-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "settings-toast";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        document.body.append(toast);
    }
    toast.textContent = message;
    toast.className = `toast visible ${kind}`.trim();
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.className = "toast"; }, 3200);
}

function readSettings() {
    try {
        return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") || {};
    } catch {
        return {};
    }
}

function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function username(user) {
    return user?.user_metadata?.username || user?.email?.replace(/@example\.com$/, "") || "匠人";
}

function createPanel() {
    if ($("#settings-panel")) return;
    document.body.insertAdjacentHTML("beforeend", `
    <div class="settings-backdrop" id="settings-backdrop" hidden>
      <section class="settings-panel panel" id="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <button class="modal-close" id="settings-close" type="button" aria-label="关闭设置">×</button>
        <span class="eyebrow">WORKSHOP SETTINGS · 设置</span>
        <h2 id="settings-title">设置</h2>
        <div class="settings-group">
          <label for="language-select">语言</label>
          <select id="language-select">
            <option value="zh-CN">简体中文</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="settings-group">
          <span class="settings-label">声音</span>
          <label class="settings-toggle"><input id="button-sound-toggle" type="checkbox"><span>按键声音</span></label>
          <label class="settings-volume" for="button-volume"><span>按键音量 <output id="button-volume-value">35%</output></span><input id="button-volume" type="range" min="0" max="1" step="0.01"></label>
          <label class="settings-toggle"><input id="bgm-toggle" type="checkbox"><span>BGM</span></label>
          <label class="settings-volume" for="bgm-volume"><span>BGM 音量 <output id="bgm-volume-value">22%</output></span><input id="bgm-volume" type="range" min="0" max="1" step="0.01"></label>
        </div>
        <div class="settings-account">
          <span class="settings-label">账户</span>
          <strong id="settings-user-name">未登录</strong>
          <button class="text-button" id="settings-signout" type="button">退出登录</button>
          <button class="text-button danger-button" id="settings-delete-account" type="button">注销账号</button>
        </div>
      </section>
    </div>
  `);
}

function renderSettings(user) {
    const settings = readSettings();
    const audioSettings = getAudioSettings();
    $("#language-select").value = settings.language || document.documentElement.lang || "zh-CN";
    $("#button-sound-toggle").checked = audioSettings.buttonSound;
    $("#bgm-toggle").checked = audioSettings.bgm;
    $("#button-volume").value = audioSettings.buttonVolume;
    $("#bgm-volume").value = audioSettings.bgmVolume;
    $("#button-volume-value").value = `${Math.round(audioSettings.buttonVolume * 100)}%`;
    $("#bgm-volume-value").value = `${Math.round(audioSettings.bgmVolume * 100)}%`;
    $("#settings-user-name").textContent = user ? username(user) : "未登录";
    $("#settings-signout").disabled = !user;
    $("#settings-delete-account").disabled = !user;
    const profileLink = $("#profile-link");
    if (profileLink) {
        profileLink.textContent = user ? username(user) : "个人档案";
        profileLink.setAttribute("aria-label", user ? `打开${username(user)}的个人档案` : "打开个人档案");
    }
    const authLink = $("#auth-open");
    if (authLink) {
        authLink.textContent = user ? username(user) : "用户中心";
        authLink.href = user ? "profile.html" : "index.html#auth-panel";
        authLink.setAttribute("aria-label", user ? `打开${username(user)}的个人档案` : "打开用户中心");
        authLink.classList.remove("auth-state-pending");
    }
}

function openSettings() {
    const backdrop = $("#settings-backdrop");
    if (!backdrop) return;
    renderSettings(currentUser);
    backdrop.hidden = false;
    document.body.classList.add("modal-open");
}

function closeSettings() {
    $("#settings-backdrop").hidden = true;
    document.body.classList.remove("modal-open");
}

let currentUser = null;

async function refreshUser() {
    const { data: { user } } = await supabase.auth.getUser();
    currentUser = user || null;
    renderSettings(currentUser);
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        showToast(`退出登录失败：${error.message}`, "error");
        return;
    }
    closeSettings();
    showToast("已退出登录。", "success");
    window.setTimeout(() => window.location.reload(), 400);
}

async function deleteAccount() {
    if (!currentUser) {
        showToast("请先登录。", "warning");
        return;
    }
    const confirmed = window.confirm("注销账号后，账号和相关数据将无法恢复。确定继续吗？");
    if (!confirmed) return;
    const { error } = await supabase.rpc("delete_current_account");
    if (error) {
        showToast("注销失败，请先在 Supabase 执行 delete_current_account 函数。", "error");
        console.error("注销账号失败：", error);
        return;
    }
    await supabase.auth.signOut();
    closeSettings();
    showToast("账号已注销。", "success");
    window.setTimeout(() => { window.location.href = "index.html"; }, 500);
}

createPanel();

$("#settings-open")?.addEventListener("click", (event) => {
    event.preventDefault();
    openSettings();
});
$("#workshop-home")?.addEventListener("click", (event) => {
    event.preventDefault();
});
$("#auth-open")?.addEventListener("click", (event) => {
    if (currentUser) return;
    event.preventDefault();
    if ($("#auth-panel")) {
        $("#auth-panel").classList.remove("auth-closed");
        window.location.hash = "auth-panel";
        return;
    }
    showToast("请先注册/登录。", "warning");
});
$("#settings-close")?.addEventListener("click", closeSettings);
$("#settings-backdrop")?.addEventListener("click", (event) => {
    if (event.target.id === "settings-backdrop") closeSettings();
});
$("#language-select")?.addEventListener("change", (event) => {
    const settings = { ...readSettings(), language: event.target.value };
    document.documentElement.lang = event.target.value;
    saveSettings(settings);
    showToast(event.target.value === "en" ? "Language preference saved." : "语言偏好已保存。", "success");
});
$("#button-sound-toggle")?.addEventListener("change", (event) => {
    saveAudioSettings({ ...getAudioSettings(), buttonSound: event.target.checked });
});
$("#bgm-toggle")?.addEventListener("change", (event) => {
    saveAudioSettings({ ...getAudioSettings(), bgm: event.target.checked });
});
$("#button-volume")?.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    $("#button-volume-value").value = `${Math.round(value * 100)}%`;
    saveAudioSettings({ ...getAudioSettings(), buttonVolume: value });
});
$("#bgm-volume")?.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    $("#bgm-volume-value").value = `${Math.round(value * 100)}%`;
    saveAudioSettings({ ...getAudioSettings(), bgmVolume: value });
});
$("#settings-signout")?.addEventListener("click", signOut);
$("#settings-delete-account")?.addEventListener("click", deleteAccount);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && $("#settings-backdrop") && !$("#settings-backdrop").hidden) closeSettings();
});

refreshUser().catch((error) => {
    console.error("读取账户状态失败：", error);
    renderSettings(null);
});
supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    renderSettings(currentUser);
});

const settings = readSettings();
if (settings.language) document.documentElement.lang = settings.language;
