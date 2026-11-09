import { T } from "./i18n.js";

const sections = {
  features: {
    eyebrow: "FEATURES · 功能介绍",
    title: "让一件器物重新显影",
    body: "<p>从材料、色彩与纹样中选择你心仪的组合，尝试复原一件来自不同年代的漆器。</p><p>你还可以在知识图谱中了解漆器工艺，在个人档案中查看已经解锁的器物。</p>"
  },
  changelog: {
    eyebrow: "CHANGELOG · 更新日志",
    title: ""
  },
  author: {
    eyebrow: "A NOTE FROM THE AUTHOR · 作者的话",
    title: "愿传统工艺在新的地方被看见",
    body: "<p>做这个小网站，是因为我总觉得漆器的美值得被更多人慢慢发现。</p><p>希望这里不只是一个小游戏，也是一间可以随时走进来的小小工坊。谢谢你的到访。</p>"
  },
  feedback: {
    eyebrow: "FEEDBACK · 反馈",
    title: "把你的想法留在这里",
    body: "<p>如果你发现了错误，或者有想了解的器物与工艺，欢迎告诉我们。</p><p>每一条建议都会帮助这个工坊变得更好。</p><button class=\"about-feedback-link\" id=\"feedback-open\" type=\"button\">发送邮件反馈 <b>→</b></button>"
  }
};

const releases = [
  {
    version: "v1.1",
    date: "2026 年 11 月 5 日",
    title: "关于网站正式上线",
    details: ["新增关于网站栏目，集中介绍工坊的功能、理念与反馈方式。", "优化栏目切换动效，让浏览体验更加清晰。"]
  },
  {
    version: "v1.0",
    date: "2026 年 10 月 18 日",
    title: "髹饰录初次开放",
    details: ["完成漆器复原工坊、知识图谱、器物档案与数字匠人功能。", "收录多件不同年代的漆器资料，支持按属性进行复原探索。"]
  }
];

const eyebrow = document.querySelector("#about-eyebrow");
const title = document.querySelector("#about-title");
const body = document.querySelector("#about-body");

function createFeedbackModal() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="feedback-modal-backdrop" id="feedback-modal-backdrop" hidden>
      <section class="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-modal-title">
        <button class="modal-close" id="feedback-close" type="button" aria-label="关闭反馈窗口">×</button>
        <span class="eyebrow">SEND FEEDBACK · 反馈</span>
        <h2 id="feedback-modal-title">把想法寄到工坊</h2>
        <form id="feedback-form">
          <label for="feedback-message">反馈内容</label>
          <textarea id="feedback-message" maxlength="2000" required placeholder="请输入你想告诉我们的内容"></textarea>
          <p class="feedback-form-status" id="feedback-form-status" role="status"></p>
          <button class="combine-button small" id="feedback-submit" type="submit">寄出 <b>→</b></button>
        </form>
      </section>
    </div>
  `);
}

function closeFeedbackModal() {
  const modal = document.querySelector("#feedback-modal-backdrop");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openFeedbackModal() {
  const modal = document.querySelector("#feedback-modal-backdrop");
  const message = document.querySelector("#feedback-message");
  if (!modal || !message) return;
  document.querySelector("#feedback-form-status").textContent = "";
  modal.hidden = false;
  document.body.classList.add("modal-open");
  message.focus();
}

async function submitFeedback(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector("#feedback-message").value.trim();
  const status = document.querySelector("#feedback-form-status");
  const submit = document.querySelector("#feedback-submit");
  if (!message) {
    status.textContent = T("请先填写反馈内容。");
    status.className = "feedback-form-status error";
    return;
  }
  submit.disabled = true;
  status.textContent = T("正在寄出……");
  status.className = "feedback-form-status";
  try {
    const { supabase } = await import("./supabaseClient.js");
    const { error } = await supabase.functions.invoke("send-email", {
      body: { message }
    });
    if (error) throw error;
    form.reset();
    status.textContent = T("反馈已寄出，谢谢你的来信。");
    status.className = "feedback-form-status success";
  } catch (error) {
    console.error("发送反馈失败：", error);
    status.textContent = T("暂时无法寄出，请稍后再试。");
    status.className = "feedback-form-status error";
  } finally {
    submit.disabled = false;
  }
}

function renderRelease(index) {
  const release = releases[index];
  if (!release) return;
  body.innerHTML = `<div class="changelog-detail-view"><button class="changelog-back" type="button">← ${T("返回版本栏目")}</button><div class="changelog-detail"><div class="changelog-meta"><span class="changelog-version">${release.version}</span><time>${T(release.date)}</time></div><h3>${T(release.title)}</h3><ul>${release.details.map((item) => `<li>${T(item)}</li>`).join("")}</ul></div></div>`;
  body.querySelector(".changelog-back").addEventListener("click", renderChangelog);
}

function renderChangelog() {
  body.innerHTML = `<div class="changelog-list" role="list">${releases.map((release, index) => `<button class="changelog-release" type="button" role="listitem" data-release-index="${index}"><span class="changelog-release-meta"><strong>${release.version}</strong><time>${T(release.date)}</time></span><span>${T(release.title)}</span></button>`).join("")}</div>`;
  body.querySelectorAll(".changelog-release").forEach((item) => {
    item.addEventListener("click", () => renderRelease(Number(item.dataset.releaseIndex)));
  });
}

let activeSection = "features";

function renderSection(key) {
  const section = sections[key];
  if (!section) return;
  activeSection = key;
  eyebrow.textContent = T(section.eyebrow);
  title.textContent = T(section.title);
  if (key === "changelog") renderChangelog();
  else body.innerHTML = T(section.body);
  document.querySelectorAll(".about-nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.aboutSection === key);
  });
}

document.querySelectorAll(".about-nav-item").forEach((item) => {
  item.addEventListener("click", () => renderSection(item.dataset.aboutSection));
});

createFeedbackModal();
document.addEventListener("click", (event) => {
  if (event.target.closest("#feedback-open")) openFeedbackModal();
  if (event.target.closest("#feedback-close") || event.target.id === "feedback-modal-backdrop") closeFeedbackModal();
});
document.querySelector("#feedback-form").addEventListener("submit", submitFeedback);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !document.querySelector("#feedback-modal-backdrop").hidden) closeFeedbackModal();
});

document.addEventListener("ich:lang", () => renderSection(activeSection));
renderSection("features");
