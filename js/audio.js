const AUDIO_SETTINGS_KEY = "ich-audio-settings";
const defaultSettings = { buttonSound: true, bgm: false, buttonVolume: 0.35, bgmVolume: 0.5 };
let buttonAudio;
let successAudio;
let bgmAudio;

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

export function playButtonSound() {
    const settings = readSettings();
    if (!settings.buttonSound) return;
    const audio = getButtonAudio();
    audio.volume = settings.buttonVolume;
    audio.currentTime = 0;
    audio.play().catch((error) => console.warn("按键音效播放失败：", error));
}

export function playSuccessSound() {
    const settings = readSettings();
    if (!settings.buttonSound) return;
    const audio = getSuccessAudio();
    audio.volume = settings.buttonVolume;
    audio.currentTime = 0;
    audio.play().catch((error) => console.warn("成功反馈音效播放失败：", error));
}

export function applyAudioSettings(settings = readSettings()) {
    if (buttonAudio) buttonAudio.volume = settings.buttonVolume;
    if (bgmAudio) bgmAudio.volume = settings.bgmVolume;
    if (settings.bgm) {
        getBgmAudio().play().catch(() => { });
    } else if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
    }
}

// 音频文件加入 audio/ 后，首次用户交互会自动尝试播放背景音乐。
document.addEventListener("click", () => applyAudioSettings(), { once: true });
document.addEventListener("click", (event) => {
    if (event.target.closest("button")) playButtonSound();
});
