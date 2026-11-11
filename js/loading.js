/**
 * 全局加载动画（水滴涟漪云纹）。
 * 仅用于真正需要等待的异步操作：网络请求、数据库读写、远程数据加载。
 * 快速完成的操作不会闪现动画（默认延迟 200ms 后才显示）。
 */

const DEFAULT_DELAY = 200;

let pendingCount = 0;
let showTimer = null;
let overlay = null;

function ensureOverlay() {
  if (overlay && overlay.isConnected) return overlay;
  overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `<div class="loading-box"><img class="loading-ripple" src="images/loading-ripple.gif" alt=""><p class="loading-label">加载中</p></div>`;
  document.body.append(overlay);
  return overlay;
}

function setVisible(node, visible) {
  node.classList.toggle("visible", visible);
  node.setAttribute("aria-hidden", visible ? "false" : "true");
}

/**
 * 开始一次等待。支持并发：多个操作同时进行时只显示一个动画，全部结束后才隐藏。
 * @param {string} label 提示文案
 * @param {{delay?: number}} options delay 为显示前的等待时间，快速操作可据此避免闪烁
 */
export function showLoading(label = "加载中", { delay = DEFAULT_DELAY } = {}) {
  pendingCount += 1;
  const node = ensureOverlay();
  node.querySelector(".loading-label").textContent = label;

  if (node.classList.contains("visible")) return;

  window.clearTimeout(showTimer);
  showTimer = window.setTimeout(() => {
    showTimer = null;
    if (pendingCount > 0) setVisible(node, true);
  }, delay);
}

/** 结束一次等待 */
export function hideLoading() {
  pendingCount = Math.max(0, pendingCount - 1);
  if (pendingCount > 0) return;

  window.clearTimeout(showTimer);
  showTimer = null;
  if (overlay) setVisible(overlay, false);
}

/**
 * 包裹需要等待的异步任务，任务结束（成功或失败）后自动收起动画。
 * @param {() => Promise<any>} task
 * @param {string} label
 * @param {{delay?: number}} options
 */
export async function withLoading(task, label = "加载中", options) {
  showLoading(label, options);
  try {
    return await task();
  } finally {
    hideLoading();
  }
}
