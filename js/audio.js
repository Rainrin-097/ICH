const AUDIO_SETTINGS_KEY = "ich-audio-settings-v2";
const defaultSettings = {
    buttonSound: true,
    bgm: true,
    successSound: true,
    buttonVolume: 0.35,
    bgmVolume: 0.3,
    successVolume: 0.55,
};
let buttonAudio;
let bgmAudio;
let successAudio;
let splashBgmPaused = false; // 开屏页上的手动暂停（不写入持久设置）

function readSettings() {
    try {
        return { ...defaultSettings, ...JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY) || "{}") };
    } catch {
        return { ...defaultSettings };
    }
}

export function getAudioSettings() {
    return readSettings();
}

export function saveAudioSettings(settings) {
    const next = { ...defaultSettings, ...settings };
    localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(next));
    applyAudioSettings(next);
    return next;
}

function getButtonAudio() {
    if (!buttonAudio) {
        buttonAudio = new Audio("audio/click.mp3");
    }
    return buttonAudio;
}

function getBgmAudio() {
    if (!bgmAudio) {
        bgmAudio = new Audio("audio/bgm.mp3");
        bgmAudio.loop = true;
    }
    return bgmAudio;
}

function getSuccessAudio() {
    if (!successAudio) {
        successAudio = new Audio("audio/success.mp3");
    }
    return successAudio;
}

// 背景音是开屏专属：开屏 DOM 还在（含淡出阶段）才算活跃
function isSplashActive() {
    return !!document.getElementById("splash-screen");
}

export function playButtonSound() {
    const settings = readSettings();
    if (!settings.buttonSound) return;
    const audio = getButtonAudio();
    audio.volume = settings.buttonVolume;
    audio.currentTime = 0;
    audio.play().catch(() => { });
}

export function playSuccessSound() {
    const settings = readSettings();
    if (!settings.successSound) return;
    const audio = getSuccessAudio();
    audio.volume = settings.successVolume;
    audio.currentTime = 0;
    audio.play().catch(() => { });
}

export function pauseSplashBgm() {
    splashBgmPaused = true;
    if (bgmAudio) bgmAudio.pause();
}

export function resumeSplashBgm() {
    splashBgmPaused = false;
    const settings = readSettings();
    if (settings.bgm && isSplashActive()) {
        getBgmAudio().volume = settings.bgmVolume;
        getBgmAudio().play().catch(() => { });
    }
}

// 供开屏页声音按钮调用，返回暂停后的状态
export function toggleSplashBgm() {
    if (splashBgmPaused) resumeSplashBgm();
    else pauseSplashBgm();
    return splashBgmPaused;
}

// 离开开屏（点击入馆 / 自动关闭）时调用，彻底停止并复位
export function stopSplashBgm() {
    splashBgmPaused = false;
    if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
    }
}

export function applyAudioSettings(settings = readSettings()) {
    if (buttonAudio) buttonAudio.volume = settings.buttonVolume;
    if (successAudio) successAudio.volume = settings.successVolume;
    if (bgmAudio) bgmAudio.volume = settings.bgmVolume;
    if (settings.bgm && isSplashActive() && !splashBgmPaused) {
        getBgmAudio().play().catch(() => { });
    } else if (bgmAudio && !isSplashActive()) {
        bgmAudio.pause();
    }
}

// 音频文件加入 audio/ 后，首次用户交互会自动尝试播放开屏背景音。
document.addEventListener("click", () => applyAudioSettings(), { once: true });
document.addEventListener("click", (event) => {
    if (event.target.closest("button, .text-button, .combine-button")) playButtonSound();
});
// 开屏关闭后停止背景音（其他页面不会触发播放）
document.addEventListener("ich:splash-closed", () => stopSplashBgm());
