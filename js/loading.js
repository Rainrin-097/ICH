/**
 * 统一的加载状态管理。
 * 规则：异步操作开始后延迟 250ms 才显示动画，操作在这之前结束则不显示，避免闪烁。
 */

const DEFAULT_DELAY = 250;

/**
 * 延迟 + 引用计数的控制器：
 * - start() 多次调用会累加计数，只有第一个开始计时；
 * - stop() 递减计数，只有减到 0 时才真正隐藏，多个并发请求互不干扰。
 */
export function createDelayController({ onShow, onHide, delay = DEFAULT_DELAY }) {
  let count = 0;
  let timer = 0;
  let visible = false;

  const show = () => {
    visible = true;
    onShow();
  };

  const hide = () => {
    visible = false;
    onHide();
  };

  return {
    start() {
      count += 1;
      if (count > 1) return;
      timer = window.setTimeout(() => {
        timer = 0;
        if (count > 0) show();
      }, delay);
    },
    stop() {
      if (count === 0) return;
      count -= 1;
      if (count > 0) return;
      if (timer) {
        window.clearTimeout(timer);
        timer = 0;
      }
      if (visible) hide();
    },
    reset() {
      count = 0;
      if (timer) {
        window.clearTimeout(timer);
        timer = 0;
      }
      if (visible) hide();
    }
  };
}

/**
 * 按钮内的小型加载动画。
 * 按钮立即禁用（防止重复提交），动画则在 250ms 后才插入，原文字保持不变，不会跳动。
 */
export function buttonLoading(button, { delay = DEFAULT_DELAY } = {}) {
  if (!(button instanceof HTMLElement)) {
    return { start() {}, stop() {}, reset() {} };
  }

  const controller = createDelayController({
    delay,
    onShow() {
      if (!button.isConnected) return;
      button.classList.add("is-loading");
      button.setAttribute("aria-busy", "true");
      if (!button.querySelector(".loading-spinner")) {
        const spinner = document.createElement("span");
        spinner.className = "loading-spinner";
        spinner.setAttribute("aria-hidden", "true");
        button.append(spinner);
      }
    },
    onHide() {
      if (!button.isConnected) return;
      button.classList.remove("is-loading");
      button.removeAttribute("aria-busy");
      button.querySelector(".loading-spinner")?.remove();
    }
  });

  return {
    start() {
      button.disabled = true;
      controller.start();
    },
    stop() {
      controller.stop();
      if (button.isConnected) button.disabled = false;
    },
    reset() {
      controller.reset();
      if (button.isConnected) button.disabled = false;
    }
  };
}

/**
 * 内容区域的加载遮罩：在区域中央显示旋转线稿，并对内容做轻微模糊。
 * 遮罩不拦截指针事件，不影响页面其他区域。
 */
export function regionLoading(region, { delay = DEFAULT_DELAY, label = "加载中" } = {}) {
  if (!(region instanceof HTMLElement)) {
    return { start() {}, stop() {}, reset() {} };
  }

  let overlay = null;
  let addedEmptyClass = false;

  const controller = createDelayController({
    delay,
    onShow() {
      if (!region.isConnected) return;
      region.classList.add("loading-region");
      region.setAttribute("aria-busy", "true");
      // 区域为空时给一点高度，否则遮罩无法显示
      if (!region.childElementCount) {
        region.classList.add("loading-region-empty");
        addedEmptyClass = true;
      }
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "loading-overlay";
        overlay.setAttribute("role", "status");
        overlay.setAttribute("aria-label", label);
        overlay.innerHTML = `<span class="loading-spinner" aria-hidden="true"></span><span class="loading-label">${label}</span>`;
      }
      if (!overlay.isConnected) region.append(overlay);
    },
    onHide() {
      overlay?.remove();
      region.removeAttribute("aria-busy");
      region.classList.remove("loading-region");
      if (addedEmptyClass) {
        region.classList.remove("loading-region-empty");
        addedEmptyClass = false;
      }
    }
  });

  return {
    start() {
      controller.start();
    },
    stop() {
      controller.stop();
    },
    reset() {
      controller.reset();
    }
  };
}
