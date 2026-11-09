// ============================================================
// 全站中英切换引擎 · 与 js/i18n-data.js 配合使用
// 设计原则：
//   1. 数据层（data.js / artifacts-data.js / knowledge-data.js 等）
//      内部逻辑一律保持中文，翻译只发生在显示层。
//   2. T(中文) —— JS 渲染层的查词典函数，用于拼接模板字符串。
//   3. applyStatic —— 遍历文本节点与属性做整段翻译；node.__zh /
//      el.__zhAttrs 保存中文原文，切回中文时完全可逆。
//   4. MutationObserver —— 动态插入的 DOM 自动补翻译，
//      因此大多数模块的 textContent 渲染无需手动包 T()。
//   5. setLanguage —— 切换语言、写入 ich-settings、广播 ich:lang
//      事件（渲染模块可监听后重渲染含计数/拼接的模板）。
// ============================================================
import { EN_DATA } from "./i18n-data.js";

const TRANSLATED_ATTRS = ["aria-label", "title", "placeholder", "alt"];
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "CANVAS", "SVG", "CODE"]);

let currentLang = "zh-CN";
let applying = false;
let rafId = 0;

// ---------- 查词典 ----------
export function getLang() {
  return currentLang;
}

export function T(text) {
  if (typeof text !== "string" || currentLang !== "en") return text;
  return EN_DATA[text] ?? text;
}

// ---------- document.title ----------
function applyTitle() {
  if (document.__zhTitle === undefined) document.__zhTitle = document.title;
  const zh = document.__zhTitle;
  if (currentLang !== "en") {
    document.title = zh;
    return;
  }
  if (EN_DATA[zh]) {
    document.title = EN_DATA[zh];
    return;
  }
  const match = zh.match(/^髹饰录 · (.+)$/);
  if (match) {
    const suffix = EN_DATA[match[1]];
    document.title = `Xiu Shi Lu · ${suffix || match[1]}`;
  }
}

// ---------- 文本节点 ----------
function translateTextNode(node) {
  if (node.__zh === undefined) node.__zh = node.nodeValue;
  const original = node.__zh;
  const key = original.trim();
  // 不含中文的节点无需处理（数字、符号、英文）
  if (!key || !/[\u4e00-\u9fff]/.test(key)) {
    if (currentLang !== "en" && node.nodeValue !== original) node.nodeValue = original;
    return;
  }
  if (currentLang === "en") {
    const en = EN_DATA[key];
    if (en) {
      const next = original.replace(key, en);
      if (node.nodeValue !== next) node.nodeValue = next;
    }
  } else if (node.nodeValue !== original) {
    node.nodeValue = original;
  }
}

// ---------- 属性 ----------
function translateElement(el) {
  if (el.__zhAttrs === undefined) el.__zhAttrs = {};
  TRANSLATED_ATTRS.forEach((name) => {
    if (!el.hasAttribute(name)) return;
    if (el.__zhAttrs[name] === undefined) el.__zhAttrs[name] = el.getAttribute(name);
    const original = el.__zhAttrs[name];
    if (typeof original !== "string" || !original.trim()) return;
    if (currentLang === "en") {
      const en = EN_DATA[original.trim()];
      if (en) {
        const next = original.replace(original.trim(), en);
        if (el.getAttribute(name) !== next) el.setAttribute(name, next);
      }
    } else if (el.getAttribute(name) !== original) {
      el.setAttribute(name, original);
    }
  });
}

// ---------- 全页扫描 ----------
function applyStatic() {
  if (!document.body) return;
  applying = true;
  try {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          if (node.nodeType === Node.TEXT_NODE) return NodeFilter.FILTER_ACCEPT;
          if (SKIP_TAGS.has(node.tagName)) return NodeFilter.FILTER_REJECT;
          if (node.closest && node.closest("[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    // current node 已经是 body 下的第一个节点
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      else translateElement(node);
    }
    // 根元素自身的属性（body / html 上的 aria-label 等）
    translateElement(document.body);
  } finally {
    applying = false;
  }
}

// ---------- 动态 DOM 观察 ----------
const observer = new MutationObserver(() => {
  if (applying) return;
  window.cancelAnimationFrame(rafId);
  rafId = window.requestAnimationFrame(() => applyStatic());
});

// ---------- 切换语言 ----------
export function setLanguage(lang) {
  const next = lang === "en" ? "en" : "zh-CN";
  currentLang = next;
  document.documentElement.lang = next;
  try {
    const settings = JSON.parse(localStorage.getItem("ich-settings") || "{}") || {};
    settings.language = next;
    localStorage.setItem("ich-settings", JSON.stringify(settings));
  } catch {
    /* 忽略存储异常 */
  }
  applyTitle();
  applyStatic();
  document.dispatchEvent(new CustomEvent("ich:lang", { detail: { lang: next } }));
}

// ---------- 初始化 ----------
(function init() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem("ich-settings") || "{}")?.language;
  } catch {
    saved = null;
  }
  currentLang = saved === "en" ? "en" : "zh-CN";
  document.documentElement.lang = currentLang;
  applyTitle();
  applyStatic();
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  // 暴露给非模块脚本（如 index.html 的开屏 inline script）
  window.I18N = { t: T, getLang, setLanguage };
})();
