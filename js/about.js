const sections = {
  features: {
    eyebrow: "FEATURES · 功能介绍",
    title: "让一件器物重新显影",
    body: `
      <p>「髹饰录」以中国传统漆器文化为主题，将器物档案、传统工艺知识与互动探索相结合，打造一座可以亲自体验的数字漆器工坊。在这里，你可以尝试复原古代漆器、探索传统纹样与髹饰技艺，也可以与其他用户分享自己的发现。我们希望能在一次次的组合中让大家感受漆器的魅力，了解到这项非遗背后庞大的知识体系。</p>
      <p><strong>请先注册登录以获取完整功能。</strong></p>
      <h3>01 · 髹饰工坊｜以属性组合复原器物</h3>
      <ul>
        <li><strong>属性自由组合：</strong>从材质、颜色和纹样三类属性中进行选择，尝试搭配不同的漆器复原配方。（注意：颜色可多选，数量并不固定）</li>
        <li><strong>器物合成体验：</strong>当所选属性与器物配方相匹配时，即可成功复原对应器物。</li>
        <li><strong>多件器物探索：</strong>部分属性组合对应多件器物，可以在复原结果中切换浏览。</li>
        <li><strong>隐藏配方探索：</strong>尝试特殊属性组合，寻找隐藏彩蛋，解锁意想不到的内容。</li>
      </ul>
      <h3>02 · 器物档案｜走近一件真实的漆器</h3>
      <ul>
        <li><strong>器物信息展示：</strong>查看漆器图片、名称、年代、收藏地点及相关介绍。</li>
        <li><strong>工艺与属性解析：</strong>了解器物采用的髹饰技法，以及复原所需的材质、色彩和纹样。</li>
        <li><strong>档案切换浏览：</strong>在同一配方对应的多件器物之间切换浏览。</li>
      </ul>
      <h3>03 · 知识图谱｜探索漆器背后的文化知识</h3>
      <ul>
        <li><strong>分类知识索引：</strong>按照颜色、材质、纹样和技艺四个类别整理漆器知识。</li>
        <li><strong>层级关系探索：</strong>通过可展开的知识节点，逐层了解细分内容。</li>
        <li><strong>知识节点详情：</strong>查看知识点的文字介绍、视觉资料和传统色彩信息。</li>
        <li><strong>知识与实物关联：</strong>结合漆器档案，理解工艺与装饰元素在具体作品中的运用。</li>
      </ul>
      <h3>04 · 交流广场｜分享你的发现与灵感</h3>
      <ul>
        <li><strong>动态发布：</strong>发布漆器文化讨论、配方尝试和彩蛋发现。</li>
        <li><strong>分类浏览：</strong>按讨论、配方分享和彩蛋分享等类别筛选内容。</li>
        <li><strong>评论互动：</strong>阅读动态留言并发表自己的评论。</li>
        <li><strong>内容管理：</strong>查看详情、删除自己的动态，并查看关联器物。</li>
        <li><strong>动态排序：</strong>按发布时间或点赞数量浏览社区内容。</li>
      </ul>
      <h3>05 · 个人档案｜记录你的探索历程</h3>
      <ul>
        <li><strong>器物收藏：</strong>汇总已经成功复原的器物，按历史年代分类展示。</li>
        <li><strong>探索进度：</strong>通过已解锁器物数量和进度统计了解探索成果。</li>
        <li><strong>匠人称号：</strong>根据已解锁器物数量获得不同阶段的身份称号。</li>
        <li><strong>隐藏成就：</strong>集中展示已经发现的隐藏彩蛋。</li>
      </ul>
      <h3>06 · 个性化设置｜打造自己的工坊体验</h3>
      <ul>
        <li><strong>背景音乐控制：</strong>根据个人喜好开启或关闭背景音乐。</li>
        <li><strong>交互音效控制：</strong>开启或关闭按键音效，调整交互反馈。</li>
        <li><strong>音量调节：</strong>分别调整背景音乐和按键音效的音量。</li>
        <li><strong>账户管理：</strong>查看当前账户、退出登录及注销账号。</li>
      </ul>
      <h3>07 · 关于与反馈｜了解这个数字工坊</h3>
      <ul>
        <li><strong>更新日志：</strong>查看网站版本更新记录。</li>
        <li><strong>作者的话：</strong>了解网站的创作初衷与设计理念。</li>
        <li><strong>意见反馈：</strong>提交建议、问题或希望了解的漆器知识。</li>
      </ul>
      <p><strong>从认识一件器物开始，在一次次尝试中走近传统工艺。</strong></p>
      <p>希望「髹饰录」不仅是一座可以探索和体验的数字工坊，也能成为你了解中国传统漆器文化的一扇小小窗口。</p>
    `
  },
  changelog: {
    eyebrow: "CHANGELOG · 更新日志",
    title: ""
  },
  author: {
    eyebrow: "A NOTE FROM THE AUTHOR · 作者的话",
    title: "愿传统工艺在新的地方被看见",
    body: `
      <p>在最初选题时我们团队很快就确定了非遗这个主题，但对于具体做什么一直拿不准。转折点在一次谈话中，我们的一位成员提到了她家乡的“螺钿漆器”，于是我们就说，要不我们就做漆器吧。</p>
      <p>在网页的形式上我们画了很长时间来构思。我们都不想让它成为一个简单的“博物馆”，不想让它只展示信息，我们想让它有趣一点，能让大家都参与进来。于是，在一个下午，我们有了对于这个网站的初步构想，之后的一切都是从这一点向外的延展。</p>
      <h3>致每一位来到这里的人</h3>
      <p>卢梭曾写道：“我们不知道大自然允许我们成为什么样子。”</p>
      <p>一个刚刚来到世界的孩子，未来有着无数种可能。我们不知道他将走向哪里，会经历什么，又会成长为怎样的人。又或许，正是这种未知，让生命拥有了不断向前的意义。</p>
      <p>我们想，我们的网站或许也是如此。</p>
      <p>「髹饰录」现在还不够完善。它还有尚待补充的内容，还有可以继续打磨的细节，也还有许多还没有来得及实现的想法。但我们始终相信，将传统漆器文化转化为一种可以亲自探索、尝试和交流的数字体验，是一件值得去做的事，让那些原本隔着时间与距离的器物，重新与今天的人发生联系。</p>
      <p>在创作之初，我们并没有把它仅仅看作一件为了参赛而完成的作品。我们更希望它是一个开始，虽然，我们不知道未来会怎样。也许之后我们不会再有时间来完善它，但我们依旧想在现在说：“我们希望它是有生命的，是可以生长下去的。”</p>
      <p>因为也许真的有一天，我们会有新的想法和时间，继续完善它；又或许，会有后来的人偶然发现这个小小的工坊，被它吸引，愿意加入进来，接过这根接力棒，让它继续走向更远的地方。</p>
      <p>我们不知道它最终会变成什么样子，就像我们无法预先知道一个孩子会成长为什么样的人。但我们愿意相信，它有继续成长的可能。</p>
      <p>所以，我们想把这句话留在这里：</p>
      <p><strong>我们希望「髹饰录」是有生命的。</strong> 它可以不完美，可以被修改，可以不断加入新的内容与想法；它可以在不同的人手中获得新的模样，也可以在一次次探索与交流中，慢慢成为最初的我们未曾设想过的样子。</p>
      <p>我们认为它是有意义的。因为它让一些关于漆器、关于传统工艺、关于文化的兴趣有了新的表达方式，也让我们有机会把自己的想法真正做出来。它的生命是所有玩家共同赋予的。</p>
      <p>而我们也希望，来到这里的你，能够感受到这份意义。</p>
      <p>感谢每一位曾经参与、使用、关注或即将发现这个工坊的人。无论你只是短暂停留，还是愿意在这里留下自己的发现，都希望这段相遇能成为它继续生长的一部分。</p>
      <p><strong>它的故事还没有被写完。</strong></p>
    `
  },
  feedback: {
    eyebrow: "FEEDBACK · 反馈",
    title: "把你的想法留在这里",
    body: "<p>如果你发现了错误，或者有想了解和补充的器物与工艺，欢迎告诉我们。</p><p>每一条建议都会帮助这个工坊变得更好。</p><button class=\"about-feedback-link\" id=\"feedback-open\" type=\"button\">发送邮件反馈 <b>→</b></button>"
  }
};

const releases = [
  {
    version: "v1.0",
    date: "2026 年 11 月 8 日",
    title: "髹饰录内测版本开放",
    details: ["正式部署到网页端，仅对团队内部开放，确认整体架构与核心功能。", "现阶段进入文字处理与网页信息补充阶段。"]
  },
  {
    version: "v1.1",
    date: "2026 年 11 月 10 日",
    title: "小范围测试",
    details: ["进行最后一次系统性材料补充。", "在身边亲友中进行测试，收集反馈。"]
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
    status.textContent = "请先填写反馈内容。";
    status.className = "feedback-form-status error";
    return;
  }
  submit.disabled = true;
  status.textContent = "正在寄出……";
  status.className = "feedback-form-status";
  try {
    const { supabase } = await import("./supabaseClient.js");
    const { error } = await supabase.functions.invoke("send-email", {
      body: { message }
    });
    if (error) throw error;
    form.reset();
    status.textContent = "反馈已寄出，谢谢你的来信。";
    status.className = "feedback-form-status success";
  } catch (error) {
    console.error("发送反馈失败：", error);
    status.textContent = "暂时无法寄出，请稍后再试。";
    status.className = "feedback-form-status error";
  } finally {
    loader.stop();
  }
}

function renderRelease(index) {
  const release = releases[index];
  if (!release) return;
  body.innerHTML = `<div class="changelog-detail-view"><button class="changelog-back" type="button">← 返回版本栏目</button><div class="changelog-detail"><div class="changelog-meta"><span class="changelog-version">${release.version}</span><time>${release.date}</time></div><h3>${release.title}</h3><ul>${release.details.map((item) => `<li>${item}</li>`).join("")}</ul></div></div>`;
  body.querySelector(".changelog-back").addEventListener("click", renderChangelog);
}

function renderChangelog() {
  body.innerHTML = `<div class="changelog-list" role="list">${releases.map((release, index) => `<button class="changelog-release" type="button" role="listitem" data-release-index="${index}"><span class="changelog-release-meta"><strong>${release.version}</strong><time>${release.date}</time></span><span>${release.title}</span></button>`).join("")}</div>`;
  body.querySelectorAll(".changelog-release").forEach((item) => {
    item.addEventListener("click", () => renderRelease(Number(item.dataset.releaseIndex)));
  });
}

function renderSection(key) {
  const section = sections[key];
  if (!section) return;
  eyebrow.textContent = section.eyebrow;
  title.textContent = section.title;
  if (key === "changelog") renderChangelog();
  else body.innerHTML = section.body;
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

renderSection("features");
