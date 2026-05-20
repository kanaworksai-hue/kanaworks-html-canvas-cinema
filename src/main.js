import * as THREE from "three";
import html2canvas from "html2canvas";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const canvas = document.querySelector("#scene");
const htmlSource = document.querySelector("#html-source");
const siteContent = document.querySelector("#site-content");
const mobileControlsToggle = document.querySelector("#mobile-controls-toggle");
const mobileControlsClose = document.querySelector("#mobile-controls-close");
const mobileUploadButton = document.querySelector("#mobile-upload-button");
const fpsLabel = document.querySelector("#fps");
const statusText = document.querySelector("#status-text");
const languageCycleButton = document.querySelector("#language-cycle");
const pageCycleButton = document.querySelector("#page-cycle");
const nightToggleButton = document.querySelector("#night-toggle");
const windInput = document.querySelector("#wind");
const foilInput = document.querySelector("#foil");
const pullInput = document.querySelector("#pull");
const nightInput = document.querySelector("#night");
const fanEnabledInput = document.querySelector("#fan-enabled");
const contentScrollInput = document.querySelector("#content-scroll");
const autoplayInput = document.querySelector("#autoplay");
const fanXInput = document.querySelector("#fan-x");
const fanYInput = document.querySelector("#fan-y");
const fanZInput = document.querySelector("#fan-z");
const fanDirectionInput = document.querySelector("#fan-direction");
const resetFanButton = document.querySelector("#reset-fan");
const fanVisibilityButton = document.querySelector("#fan-visibility-toggle");
const moonColorInput = document.querySelector("#moon-color");
const moonHaloColorInput = document.querySelector("#moon-halo-color");
const moonBrightnessInput = document.querySelector("#moon-brightness");
const moonSizeInput = document.querySelector("#moon-size");
const moonHaloRangeInput = document.querySelector("#moon-halo-range");
const uploadInput = document.querySelector("#media-upload");
const uploadButton = document.querySelector("#upload-button");
const fanPositionInputs = [fanXInput, fanYInput, fanZInput];

const languageOrder = ["en", "zh", "ja"];
const languageLabels = {
  en: "EN",
  zh: "中文",
  ja: "日本語",
};
const pageOrder = ["home", "performance", "docs"];
const pageLabelKeys = {
  home: "ui.hero",
  performance: "ui.performance",
  docs: "ui.docs",
};

const fanDefaults = {
  x: 2,
  y: -0.56,
  z: 1.62,
  direction: -128,
};

const fanScale = 4 / 3;

const translations = {
  en: {
    "ui.title": "Outdoor Cinema",
    "ui.hero": "Start",
    "ui.performance": "Fan",
    "ui.docs": "Night",
    "ui.upload": "Upload Media",
    "ui.reset": "Guide",
    "ui.fanEnabled": "Fan",
    "ui.resetFan": "Reset fan",
    "ui.wind": "Wind",
    "ui.foil": "Foil",
    "ui.pull": "Cursor pull",
    "ui.night": "Night cinema",
    "ui.contentControls": "Curtain content",
    "ui.contentScroll": "Content scroll",
    "ui.autoplay": "Auto text",
    "ui.fanControls": "Fan coordinates",
    "ui.fanDirection": "Direction",
    "ui.hideFan": "Hide fan",
    "ui.showFan": "Show fan",
    "ui.moonControls": "Moon",
    "ui.moonColor": "Moon color",
    "ui.moonHaloColor": "Halo color",
    "ui.moonBrightness": "Brightness",
    "ui.moonSize": "Size",
    "ui.moonHaloRange": "Halo range",
    "ui.controls": "Controls",
    "status.html": "Live cinema guide",
    "status.media": "Media texture",
    "status.video": "Video texture",
    "status.capture": "DOM recaptured",
    "status.scroll": "Scroll captured",
    "status.fallback": "Fallback texture",
    "status.loading": "Loading media",
    "status.videoSound": "Video with sound",
    "status.tapSound": "Tap once to start video sound",
    "status.fanReset": "Fan reset",
    "status.fanOn": "Fan on",
    "status.fanOff": "Fan off",
    "status.fanHidden": "Fan hidden, wind still on",
    "status.fanShown": "Fan visible",
    "source.brand": "Outdoor Cinema",
    "source.nav.overview": "Start",
    "source.nav.performance": "Fan",
    "source.nav.docs": "Night",
    "home.eyebrow": "Start here",
    "home.title": "How to use",
    "home.lead": "Upload an image or video, place the fan, then drag the curtain to watch the screen become a physical cinema surface.",
    "home.stepA": "Tap Upload Media to place your own image or video on the curtain.",
    "home.stepB": "Use the 3D axis arrows to move the fan, then adjust wind and direction in the panel.",
    "home.stepC": "Drag the curtain with the mouse or touch to bend the screen by hand.",
    "performance.eyebrow": "Fan control",
    "performance.title": "Move the wind",
    "performance.lead": "The fan can move left and right, up and down, or forward and backward. Reset brings it back to the default cinema position.",
    "performance.metricA": "Move across the curtain",
    "performance.metricB": "Raise or lower the fan",
    "performance.metricC": "Push it back or forward",
    "performance.featureA.title": "3D axis handles",
    "performance.featureA.body": "Drag the red, green, and blue 3D arrows attached to the fan to move it on one axis at a time.",
    "performance.featureB.title": "Reset position",
    "performance.featureB.body": "Use Reset fan if the fan moves out of view or you want to return to the balanced starting point.",
    "docs.eyebrow": "Night cinema",
    "docs.title": "Open-air screen",
    "docs.lead": "Turn on Night cinema for a brighter moon, rolling ocean waves, a floating wooden crate, and two seagulls holding the curtain.",
    "docs.cardA": "Wheel zooms only the camera view.",
    "docs.cardB": "Content scroll moves only the instruction page.",
    "docs.cardC": "Upload again any time to replace the curtain texture.",
    "docs.linkA": "Upload media",
    "docs.linkB": "Move the fan",
    "docs.linkC": "Drag curtain",
    "docs.linkD": "Moon and sea",
  },
  zh: {
    "ui.title": "户外影院",
    "ui.hero": "开始",
    "ui.performance": "风扇",
    "ui.docs": "星空",
    "ui.upload": "上传媒体",
    "ui.reset": "说明页",
    "ui.fanEnabled": "风扇",
    "ui.resetFan": "重置风扇",
    "ui.wind": "风力",
    "ui.foil": "镀膜",
    "ui.pull": "鼠标牵引",
    "ui.night": "星空影院",
    "ui.contentControls": "幕布内容",
    "ui.contentScroll": "内容滚动",
    "ui.autoplay": "自动播放",
    "ui.fanControls": "风扇坐标",
    "ui.fanDirection": "风向角度",
    "ui.hideFan": "隐藏风扇",
    "ui.showFan": "显示风扇",
    "ui.moonControls": "月亮",
    "ui.moonColor": "月亮颜色",
    "ui.moonHaloColor": "光晕颜色",
    "ui.moonBrightness": "亮度",
    "ui.moonSize": "大小",
    "ui.moonHaloRange": "光晕范围",
    "ui.controls": "控制",
    "status.html": "实时影院说明",
    "status.media": "媒体纹理",
    "status.video": "视频纹理",
    "status.capture": "DOM 已重新捕获",
    "status.scroll": "滚动已捕获",
    "status.fallback": "备用纹理",
    "status.loading": "正在载入媒体",
    "status.videoSound": "视频有声播放",
    "status.tapSound": "轻点一次开启视频声音",
    "status.fanReset": "风扇已重置",
    "status.fanOn": "风扇已开启",
    "status.fanOff": "风扇已关闭",
    "status.fanHidden": "风扇已隐藏，风继续吹",
    "status.fanShown": "风扇已显示",
    "source.brand": "户外影院",
    "source.nav.overview": "开始",
    "source.nav.performance": "风扇",
    "source.nav.docs": "星空",
    "home.eyebrow": "从这里开始",
    "home.title": "使用说明",
    "home.lead": "上传图片或视频，摆放风扇，再拖动幕布，就能看到画面变成一块真实的露天电影屏幕。",
    "home.stepA": "点击上传媒体，把自己的图片或视频放到幕布上。",
    "home.stepB": "拖动 3D 坐标轴箭头移动风扇，再在面板里调整风力和方向。",
    "home.stepC": "用鼠标或手指拖动幕布，手动弯曲这块屏幕。",
    "performance.eyebrow": "风扇控制",
    "performance.title": "移动风的位置",
    "performance.lead": "风扇可以左右、上下、前后移动。重置会把它送回默认的影院位置。",
    "performance.metricA": "沿幕布左右移动",
    "performance.metricB": "抬高或降低风扇",
    "performance.metricC": "向后或向前推进",
    "performance.featureA.title": "3D 坐标轴手柄",
    "performance.featureA.body": "拖动风扇身上的红、绿、蓝 3D 箭头，就能一次沿一个轴移动风扇。",
    "performance.featureB.title": "重置位置",
    "performance.featureB.body": "风扇移出视野或想回到平衡起点时，点击重置风扇。",
    "docs.eyebrow": "户外影院",
    "docs.title": "露天电影屏幕",
    "docs.lead": "开启星空影院后，月亮更明亮，海浪重新起伏，一个木箱在海面漂浮，两只海鸥衔着幕布。",
    "docs.cardA": "滚轮只负责缩放视角。",
    "docs.cardB": "内容滚动只移动幕布说明页。",
    "docs.cardC": "随时再次上传，替换幕布画面。",
    "docs.linkA": "上传媒体",
    "docs.linkB": "移动风扇",
    "docs.linkC": "拖动幕布",
    "docs.linkD": "月亮海面",
  },
  ja: {
    "ui.title": "屋外シネマ",
    "ui.hero": "開始",
    "ui.performance": "扇風機",
    "ui.docs": "星空",
    "ui.upload": "メディア追加",
    "ui.reset": "案内",
    "ui.fanEnabled": "扇風機",
    "ui.resetFan": "扇風機リセット",
    "ui.wind": "風量",
    "ui.foil": "箔感",
    "ui.pull": "カーソル牽引",
    "ui.night": "星空シネマ",
    "ui.contentControls": "スクリーン内容",
    "ui.contentScroll": "内容スクロール",
    "ui.autoplay": "自動再生",
    "ui.fanControls": "扇風機座標",
    "ui.fanDirection": "風向き",
    "ui.hideFan": "扇風機を隠す",
    "ui.showFan": "扇風機を表示",
    "ui.moonControls": "月",
    "ui.moonColor": "月の色",
    "ui.moonHaloColor": "光輪の色",
    "ui.moonBrightness": "明るさ",
    "ui.moonSize": "大きさ",
    "ui.moonHaloRange": "光輪範囲",
    "ui.controls": "操作",
    "status.html": "ライブシネマ案内",
    "status.media": "メディアテクスチャ",
    "status.video": "動画テクスチャ",
    "status.capture": "DOM を再キャプチャ",
    "status.scroll": "スクロールを反映",
    "status.fallback": "代替テクスチャ",
    "status.loading": "メディア読み込み中",
    "status.videoSound": "音声付き動画",
    "status.tapSound": "一度タップして動画音声を開始",
    "status.fanReset": "扇風機をリセット",
    "status.fanOn": "扇風機オン",
    "status.fanOff": "扇風機オフ",
    "status.fanHidden": "扇風機を隠しました。風は継続中",
    "status.fanShown": "扇風機を表示",
    "source.brand": "屋外シネマ",
    "source.nav.overview": "開始",
    "source.nav.performance": "扇風機",
    "source.nav.docs": "星空",
    "home.eyebrow": "ここから開始",
    "home.title": "使い方",
    "home.lead": "画像や動画をアップロードし、扇風機を配置して、スクリーンをドラッグすると屋外映画の布スクリーンになります。",
    "home.stepA": "メディア追加で画像や動画をスクリーンに置きます。",
    "home.stepB": "3D 軸矢印で扇風機を動かし、パネルで風量と向きを調整します。",
    "home.stepC": "マウスやタッチでスクリーンをドラッグし、手で曲げます。",
    "performance.eyebrow": "扇風機操作",
    "performance.title": "風を動かす",
    "performance.lead": "扇風機は左右、上下、前後に動かせます。リセットで標準のシネマ位置に戻ります。",
    "performance.metricA": "スクリーンを横切って移動",
    "performance.metricB": "扇風機を上下に移動",
    "performance.metricC": "奥または手前に移動",
    "performance.featureA.title": "3D 軸ハンドル",
    "performance.featureA.body": "扇風機に付いた赤、緑、青の 3D 矢印をドラッグして、1 軸ずつ動かせます。",
    "performance.featureB.title": "位置リセット",
    "performance.featureB.body": "見失った時や初期位置に戻したい時は、扇風機リセットを使います。",
    "docs.eyebrow": "星空シネマ",
    "docs.title": "屋外映画スクリーン",
    "docs.lead": "星空シネマをオンにすると、明るい月、揺れる波、海に浮かぶ木箱、スクリーンをくわえる二羽のカモメが現れます。",
    "docs.cardA": "ホイールは視点ズームだけを操作します。",
    "docs.cardB": "内容スクロールは説明ページだけを動かします。",
    "docs.cardC": "いつでも再アップロードして映像を差し替えられます。",
    "docs.linkA": "メディア追加",
    "docs.linkB": "扇風機移動",
    "docs.linkC": "スクリーン操作",
    "docs.linkD": "月と海",
  },
};

const params = {
  wind: Number(windInput.value),
  foil: Number(foilInput.value),
  pull: pullInput.checked,
  night: nightInput.checked,
  fanEnabled: fanEnabledInput.checked,
  fanVisible: true,
  autoplay: autoplayInput.checked,
  lang: "en",
  scroll: Number(contentScrollInput.value),
  fanDirection: Number(fanDirectionInput.value),
  starGlow: 1.35,
  moonColor: moonColorInput.value,
  moonHaloColor: moonHaloColorInput.value,
  moonBrightness: Number(moonBrightnessInput.value),
  moonSize: Number(moonSizeInput.value),
  moonHaloRange: Number(moonHaloRangeInput.value),
  page: "home",
  textureSource: "html",
  mediaClarity: 0,
};

let statusKey = "status.html";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeef1f3);
scene.fog = new THREE.Fog(0xeef1f3, 13, 27);

const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 80);
camera.position.set(0.0, 1.2, 10.8);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.minDistance = 6.3;
controls.maxDistance = 15.5;
controls.minPolarAngle = Math.PI * 0.22;
controls.maxPolarAngle = Math.PI * 0.48;
controls.target.set(0, 0.15, 0);

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(12, 12);
const pointerWorld = new THREE.Vector3();
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const dragPoint = new THREE.Vector3();
const fanDragOffset = new THREE.Vector3();
const localDragTarget = new THREE.Vector3();
const fanWindSource = new THREE.Vector3();
const fanWindTarget = new THREE.Vector3();
const fanWindDirection = new THREE.Vector3();

const dragState = {
  mode: "none",
  vertex: -1,
  pointerId: null,
};

const clothConfig = {
  cols: 66,
  rows: 42,
  width: 8.2,
  height: 5.1,
  stiffness: 0.9,
  damping: 0.996,
  gravity: -0.0028,
  passes: 5,
};

const clothRig = new THREE.Group();
scene.add(clothRig);

const cloth = createCloth(clothConfig);
clothRig.add(cloth.mesh);

const cable = createCable(clothConfig.width + 2.8);
clothRig.add(cable);

const clips = [
  createClip(-clothConfig.width / 2, clothConfig.height / 2 + 0.03, 0.02),
  createClip(clothConfig.width / 2, clothConfig.height / 2 + 0.03, 0.02),
  createClip(0, clothConfig.height / 2 + 0.03, 0.02, 0.88),
];
clips.forEach((clip) => clothRig.add(clip));

const gulls = createGulls(clothConfig);
gulls.forEach((gull) => clothRig.add(gull));

const fan = createFan();
fan.group.position.set(fanDefaults.x, fanDefaults.y, fanDefaults.z);
fan.group.rotation.y = THREE.MathUtils.degToRad(fanDefaults.direction);
fan.group.scale.setScalar(fanScale);
scene.add(fan.group);

const fanTransformControls = new TransformControls(camera, renderer.domElement);
fanTransformControls.attach(fan.group);
fanTransformControls.setMode("translate");
fanTransformControls.setSpace("world");
fanTransformControls.showX = true;
fanTransformControls.showY = true;
fanTransformControls.showZ = true;
scene.add(fanTransformControls.getHelper());

const floor = createFloor();
scene.add(floor);

const softShadow = createSoftShadow();
scene.add(softShadow);

const stars = createStars();
scene.add(stars.points);
scene.add(stars.moon);
scene.add(stars.moonHalo);

const cinemaSet = createCinemaSet();
scene.add(cinemaSet);

const lights = addLights();
applyFanDirection();
applyFanEnabled(false);
applyMoonSettings(0);
applyResponsiveLayout();
applyNightMode();

let refreshTimer = 0;
let frameCount = 0;
let lastFpsTime = performance.now();
let textureBusy = false;
let lastAutoScrollRefresh = 0;
let mediaUrl = "";
let mediaElement = null;
let videoTexture = null;

let pageTexture = createFallbackTexture();
cloth.material.map = pageTexture;
cloth.material.needsUpdate = true;
refreshMaterial();
applyLanguage(params.lang);
refreshHtmlTexture();

windInput.addEventListener("input", () => {
  params.wind = Number(windInput.value);
});

foilInput.addEventListener("input", () => {
  params.foil = Number(foilInput.value);
  refreshMaterial();
});

pullInput.addEventListener("change", () => {
  params.pull = pullInput.checked;
});

nightInput.addEventListener("change", () => {
  params.night = nightInput.checked;
  applyNightMode();
});

nightToggleButton.addEventListener("click", () => {
  params.night = !params.night;
  nightInput.checked = params.night;
  applyNightMode();
});

fanEnabledInput.addEventListener("change", () => {
  params.fanEnabled = fanEnabledInput.checked;
  applyFanEnabled(true);
});

fanVisibilityButton.addEventListener("click", () => {
  params.fanVisible = !params.fanVisible;
  applyFanEnabled(true);
});

contentScrollInput.addEventListener("input", () => {
  setContentScroll(Number(contentScrollInput.value), true);
});

autoplayInput.addEventListener("change", () => {
  params.autoplay = autoplayInput.checked;
});

fanPositionInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input === fanXInput) {
      setFanAxis("x", Number(input.value));
    }
    if (input === fanYInput) {
      setFanAxis("y", Number(input.value));
    }
    if (input === fanZInput) {
      setFanAxis("z", Number(input.value));
    }
  });
});

fanTransformControls.addEventListener("dragging-changed", (event) => {
  controls.enabled = !event.value;
  canvas.classList.toggle("is-dragging", event.value);
});

fanTransformControls.addEventListener("objectChange", () => {
  clampFanPosition();
  syncFanInputs();
});

fanDirectionInput.addEventListener("input", () => {
  params.fanDirection = Number(fanDirectionInput.value);
  applyFanDirection();
});

[moonColorInput, moonHaloColorInput, moonBrightnessInput, moonSizeInput, moonHaloRangeInput].forEach((input) => {
  input.addEventListener("input", () => {
    params.moonColor = moonColorInput.value;
    params.moonHaloColor = moonHaloColorInput.value;
    params.moonBrightness = Number(moonBrightnessInput.value);
    params.moonSize = Number(moonSizeInput.value);
    params.moonHaloRange = Number(moonHaloRangeInput.value);
    applyMoonSettings(clock.elapsedTime);
  });
});

languageCycleButton.addEventListener("click", () => {
  const nextIndex = (languageOrder.indexOf(params.lang) + 1) % languageOrder.length;
  applyLanguage(languageOrder[nextIndex]);
});

uploadButton.addEventListener("click", () => {
  uploadInput.click();
});

mobileUploadButton.addEventListener("click", () => {
  uploadInput.click();
});

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files?.[0];
  if (file) setMediaFile(file);
});

window.addEventListener("dragover", (event) => {
  if (!Array.from(event.dataTransfer?.types || []).includes("Files")) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});

window.addEventListener("drop", (event) => {
  const file = [...(event.dataTransfer?.files || [])].find((item) => item.type.startsWith("image/") || item.type.startsWith("video/"));
  if (!file) return;
  event.preventDefault();
  setMediaFile(file);
});

resetFanButton.addEventListener("click", () => {
  resetFanPosition();
});

mobileControlsToggle.addEventListener("click", () => {
  setMobileControlsOpen(!document.body.classList.contains("mobile-controls-open"));
});

mobileControlsClose.addEventListener("click", () => {
  setMobileControlsOpen(false);
});

pageCycleButton.addEventListener("click", () => {
  const nextIndex = (pageOrder.indexOf(params.page) + 1) % pageOrder.length;
  setPage(pageOrder[nextIndex]);
});

canvas.addEventListener("pointerdown", (event) => {
  updatePointerFromEvent(event);
  handlePointerDown(event);
});

canvas.addEventListener("pointermove", (event) => {
  updatePointerFromEvent(event);
  handlePointerMove(event);
});

canvas.addEventListener("pointerup", endDrag);
canvas.addEventListener("pointercancel", endDrag);
canvas.addEventListener("lostpointercapture", endDrag);

canvas.addEventListener("click", (event) => {
  if (event.target === canvas) canvas.focus?.();
});

canvas.addEventListener("pointerleave", () => {
  if (dragState.mode !== "none") return;
  pointer.set(12, 12);
});

window.addEventListener("resize", onResize);

function t(key) {
  return translations[params.lang]?.[key] || translations.en[key] || key;
}

function setStatus(key) {
  statusKey = key;
  statusText.textContent = t(key);
}

function setMobileControlsOpen(open) {
  document.body.classList.toggle("mobile-controls-open", open);
  mobileControlsToggle.setAttribute("aria-expanded", String(open));
}

function syncTopButtons() {
  languageCycleButton.textContent = languageLabels[params.lang];
  pageCycleButton.textContent = t(pageLabelKeys[params.page]);
  nightToggleButton.classList.toggle("is-active", params.night);
  nightToggleButton.setAttribute("aria-pressed", String(params.night));
  syncFanVisibilityButton();
}

function syncFanVisibilityButton() {
  fanVisibilityButton.textContent = t(params.fanVisible ? "ui.hideFan" : "ui.showFan");
  fanVisibilityButton.classList.toggle("is-active", !params.fanVisible);
}

function applyLanguage(lang) {
  params.lang = lang;
  document.documentElement.lang = lang;
  document.title = t("ui.title");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  statusText.textContent = t(statusKey);
  syncTopButtons();
  if (params.textureSource === "html") {
    scheduleTextureRefresh("status.capture");
  }
}

function updatePointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function setContentScroll(value, refresh) {
  params.scroll = THREE.MathUtils.clamp(value, Number(contentScrollInput.min), Number(contentScrollInput.max));
  contentScrollInput.value = String(Math.round(params.scroll));
  siteContent.style.setProperty("--texture-scroll", `${params.scroll}px`);

  if (refresh && params.textureSource === "html") {
    scheduleTextureRefresh("status.scroll");
  }
}

function setFanAxis(axis, value) {
  const controlsByAxis = {
    x: fanXInput,
    y: fanYInput,
    z: fanZInput,
  };
  const input = controlsByAxis[axis];
  const min = Number(input.min);
  const max = Number(input.max);
  fan.group.position[axis] = THREE.MathUtils.clamp(value, min, max);
  syncFanInputs();
}

function clampFanPosition() {
  fan.group.position.x = THREE.MathUtils.clamp(fan.group.position.x, Number(fanXInput.min), Number(fanXInput.max));
  fan.group.position.y = THREE.MathUtils.clamp(fan.group.position.y, Number(fanYInput.min), Number(fanYInput.max));
  fan.group.position.z = THREE.MathUtils.clamp(fan.group.position.z, Number(fanZInput.min), Number(fanZInput.max));
}

function syncFanInputs() {
  const x = fan.group.position.x.toFixed(2);
  const y = fan.group.position.y.toFixed(2);
  const z = fan.group.position.z.toFixed(2);
  fanXInput.value = x;
  fanYInput.value = y;
  fanZInput.value = z;
}

function applyFanDirection() {
  fan.group.rotation.y = THREE.MathUtils.degToRad(params.fanDirection);
}

function applyFanEnabled(updateStatus) {
  const visible = params.fanEnabled && params.fanVisible;
  fan.group.visible = visible;
  fanTransformControls.enabled = visible;
  fanTransformControls.getHelper().visible = visible;
  syncFanVisibilityButton();
  if (!visible && dragState.mode === "fan") endDrag({ pointerId: dragState.pointerId });
  if (updateStatus) {
    if (!params.fanEnabled) setStatus("status.fanOff");
    else setStatus(params.fanVisible ? "status.fanShown" : "status.fanHidden");
  }
}

function resetFanPosition() {
  fan.group.position.set(fanDefaults.x, fanDefaults.y, fanDefaults.z);
  params.fanDirection = fanDefaults.direction;
  fanDirectionInput.value = String(fanDefaults.direction);
  applyFanDirection();
  syncFanInputs();
  setStatus("status.fanReset");
}

function handlePointerDown(event) {
  if (event.button !== 0) return;
  raycaster.setFromCamera(pointer, camera);

  if (params.fanEnabled && params.fanVisible) {
    if (fanTransformControls.axis || fanTransformControls.dragging) return;
    const fanHit = raycaster.intersectObject(fan.group, true)[0];
    if (fanHit) {
      beginFanDrag(event, fanHit.point);
      return;
    }
  }

  const clothHit = raycaster.intersectObject(cloth.mesh, false)[0];
  if (clothHit) {
    beginClothDrag(event, clothHit.point);
  }
}

function beginFanDrag(event, hitPoint) {
  dragState.mode = "fan";
  dragState.pointerId = event.pointerId;
  dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), fan.group.position);
  fanDragOffset.copy(fan.group.position).sub(hitPoint);
  controls.enabled = false;
  canvas.classList.add("is-dragging");
  canvas.setPointerCapture?.(event.pointerId);
}

function beginClothDrag(event, hitPoint) {
  pointerWorld.copy(hitPoint);
  cloth.mesh.worldToLocal(pointerWorld);
  dragState.mode = "cloth";
  dragState.pointerId = event.pointerId;
  dragState.vertex = nearestVertex(pointerWorld);
  localDragTarget.copy(pointerWorld);
  dragPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()).normalize(), hitPoint);
  controls.enabled = false;
  canvas.classList.add("is-dragging");
  canvas.setPointerCapture?.(event.pointerId);
}

function handlePointerMove() {
  if (dragState.mode === "none") return;
  raycaster.setFromCamera(pointer, camera);

  if (dragState.mode === "fan" && raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    fan.group.position.copy(dragPoint.add(fanDragOffset));
    fan.group.position.x = THREE.MathUtils.clamp(fan.group.position.x, -5.6, 5.8);
    fan.group.position.y = THREE.MathUtils.clamp(fan.group.position.y, -2.15, 2.4);
    fan.group.position.z = THREE.MathUtils.clamp(fan.group.position.z, 0.2, 3.4);
    syncFanInputs();
  }

  if (dragState.mode === "cloth" && raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    localDragTarget.copy(dragPoint);
    cloth.mesh.worldToLocal(localDragTarget);
  }
}

function endDrag(event) {
  if (dragState.pointerId !== null && event.pointerId !== undefined && event.pointerId !== dragState.pointerId) return;
  if (dragState.mode === "none") return;
  dragState.mode = "none";
  dragState.vertex = -1;
  dragState.pointerId = null;
  controls.enabled = true;
  canvas.classList.remove("is-dragging");
  if (event.pointerId !== undefined) canvas.releasePointerCapture?.(event.pointerId);
}

function createCloth({ cols, rows, width, height }) {
  const count = (cols + 1) * (rows + 1);
  const positions = new Float32Array(count * 3);
  const previous = new Float32Array(count * 3);
  const original = new Float32Array(count * 3);
  const uvs = new Float32Array(count * 2);
  const indices = [];
  const invMass = new Float32Array(count);
  const phase = new Float32Array(count);

  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      const i = y * (cols + 1) + x;
      const u = x / cols;
      const v = y / rows;
      const px = (u - 0.5) * width;
      const py = (0.5 - v) * height;
      const pz = Math.sin(u * Math.PI * 2.0) * 0.018 + Math.sin(v * Math.PI * 5.0) * 0.012;

      writeVec(positions, i, px, py, pz);
      writeVec(previous, i, px, py, pz);
      writeVec(original, i, px, py, pz);
      uvs[i * 2] = u;
      uvs[i * 2 + 1] = 1 - v;
      invMass[i] = y === 0 ? 0 : 1;
      phase[i] = Math.random() * Math.PI * 2;
    }
  }

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const a = y * (cols + 1) + x;
      const b = a + 1;
      const c = a + cols + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const constraints = [];
  const addConstraint = (a, b, rest) => constraints.push({ a, b, rest });

  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      const i = y * (cols + 1) + x;
      if (x < cols) addConstraint(i, i + 1, width / cols);
      if (y < rows) addConstraint(i, i + cols + 1, height / rows);
      if (x < cols && y < rows) addConstraint(i, i + cols + 2, Math.hypot(width / cols, height / rows));
      if (x > 0 && y < rows) addConstraint(i, i + cols, Math.hypot(width / cols, height / rows));
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    metalness: 0.08,
    roughness: 0.32,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.15,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.type = "cloth";

  return {
    cols,
    rows,
    width,
    height,
    positions,
    previous,
    original,
    invMass,
    phase,
    constraints,
    geometry,
    material,
    mesh,
    hovered: -1,
  };
}

function createCable(width) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: 0x7d828b, metalness: 0.85, roughness: 0.28 });
  const geometry = new THREE.CylinderGeometry(0.012, 0.012, width, 16, 1);
  const cableMesh = new THREE.Mesh(geometry, material);
  cableMesh.rotation.z = Math.PI / 2;
  cableMesh.position.y = clothConfig.height / 2 + 0.1;
  cableMesh.castShadow = true;
  group.add(cableMesh);
  return group;
}

function createClip(x, y, z, scale = 1) {
  const group = new THREE.Group();
  const jawsMaterial = new THREE.MeshStandardMaterial({ color: 0x6b6062, metalness: 0.48, roughness: 0.31 });
  const capMaterial = new THREE.MeshStandardMaterial({ color: 0xa06d55, metalness: 0.12, roughness: 0.44 });

  const back = new THREE.Mesh(new THREE.BoxGeometry(0.09 * scale, 0.32 * scale, 0.08 * scale), jawsMaterial);
  back.position.set(0, 0.02 * scale, 0);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.13 * scale, 0.08 * scale, 0.13 * scale), capMaterial);
  cap.position.set(0, 0.18 * scale, 0.02 * scale);
  const pinch = new THREE.Mesh(new THREE.BoxGeometry(0.14 * scale, 0.08 * scale, 0.11 * scale), jawsMaterial);
  pinch.position.set(0, -0.13 * scale, 0.02 * scale);

  [back, cap, pinch].forEach((part) => {
    part.castShadow = true;
    group.add(part);
  });

  group.position.set(x, y, z + 0.02);
  return group;
}

function createGulls({ width, height }) {
  const topEdge = height / 2 - 0.015;
  return [
    createGull(1, -width / 2 + 0.75, topEdge),
    createGull(-1, width / 2 - 0.75, topEdge),
  ];
}

function createGull(side, x, y) {
  const group = new THREE.Group();
  const inward = -side;
  const beakTipX = side > 0 ? 0.075 : -0.075;
  const beakTipY = 0.14;
  group.position.set(x, y, 0.2);
  group.scale.setScalar(0.98);
  group.visible = false;
  group.userData.baseY = y;
  group.userData.side = side;
  group.userData.wingSide = inward;
  group.userData.phase = Math.random() * Math.PI * 2;

  const featherMaterial = new THREE.MeshStandardMaterial({ color: 0xf8fbff, roughness: 0.58, metalness: 0.02 });
  const wingMaterial = new THREE.MeshStandardMaterial({ color: 0xeaf2ff, roughness: 0.62, metalness: 0.02, side: THREE.DoubleSide });
  const beakMaterial = new THREE.MeshStandardMaterial({ color: 0xf3a642, roughness: 0.48, metalness: 0 });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x111827 });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), featherMaterial);
  body.position.set(inward * 0.26 - beakTipX, 0.16 - beakTipY, 0.04);
  body.scale.set(1.38, 0.72, 0.58);
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 12), featherMaterial);
  head.position.set(inward * 0.1 - beakTipX, 0.15 - beakTipY, 0.06);
  head.castShadow = true;
  group.add(head);

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.18, 16), beakMaterial);
  beak.position.set(inward * 0.015 - beakTipX, 0.14 - beakTipY, 0.06);
  beak.rotation.z = side < 0 ? Math.PI / 2 : -Math.PI / 2;
  beak.castShadow = true;
  group.add(beak);

  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), eyeMaterial);
  eye.position.set(inward * 0.065 - beakTipX, 0.18 - beakTipY, 0.13);
  group.add(eye);

  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.quadraticCurveTo(inward * 0.18, 0.26, inward * 0.62, 0.34);
  wingShape.quadraticCurveTo(inward * 0.46, 0.06, 0, 0);
  const wingGeometry = new THREE.ShapeGeometry(wingShape);
  const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
  const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
  leftWing.position.set(inward * 0.22 - beakTipX, 0.15 - beakTipY, 0.02);
  rightWing.position.set(inward * 0.22 - beakTipX, 0.15 - beakTipY, -0.02);
  leftWing.castShadow = true;
  rightWing.castShadow = true;
  group.add(leftWing, rightWing);

  group.userData.leftWing = leftWing;
  group.userData.rightWing = rightWing;
  return group;
}

function createFan() {
  const group = new THREE.Group();
  const bodyBlue = new THREE.MeshPhysicalMaterial({
    color: 0x2f80ff,
    roughness: 0.36,
    metalness: 0.08,
    clearcoat: 0.82,
    envMapIntensity: 1.35,
  });
  const frontBlue = new THREE.MeshPhysicalMaterial({
    color: 0xb9e7ff,
    roughness: 0.08,
    metalness: 0.02,
    transparent: true,
    opacity: 0.46,
    clearcoat: 1,
    envMapIntensity: 1.45,
  });
  const backBlue = new THREE.MeshPhysicalMaterial({
    color: 0x0a3a73,
    roughness: 0.42,
    metalness: 0.04,
    clearcoat: 0.48,
    envMapIntensity: 0.85,
  });
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x7cc7ff, transparent: true, opacity: 0.38 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.68, 0.14, 64), bodyBlue);
  base.position.y = -1.02;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.52, 32), bodyBlue);
  pole.position.y = -0.26;
  pole.castShadow = true;
  group.add(pole);

  const head = new THREE.Group();
  head.position.y = 0.55;
  const backShell = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.43, 0.18, 64, 1, true), backBlue);
  backShell.rotation.x = Math.PI / 2;
  backShell.position.z = -0.14;
  backShell.castShadow = true;
  head.add(backShell);

  const backCap = new THREE.Mesh(new THREE.CircleGeometry(0.42, 64), backBlue);
  backCap.position.z = -0.24;
  backCap.rotation.y = Math.PI;
  backCap.castShadow = true;
  head.add(backCap);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.025, 18, 96), frontBlue);
  ring.position.z = 0.2;
  ring.castShadow = true;
  head.add(ring);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.34, 32), bodyBlue);
  hub.rotation.x = Math.PI / 2;
  hub.castShadow = true;
  head.add(hub);

  const bladeGroup = new THREE.Group();
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, 0);
  bladeShape.bezierCurveTo(0.32, 0.06, 0.44, 0.16, 0.5, 0.29);
  bladeShape.bezierCurveTo(0.28, 0.34, 0.08, 0.27, 0, 0);
  const bladeGeometry = new THREE.ShapeGeometry(bladeShape, 24);
  const bladeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x5eb2ff,
    roughness: 0.14,
    metalness: 0,
    transparent: true,
    opacity: 0.62,
    clearcoat: 1,
  });

  for (let i = 0; i < 3; i += 1) {
    const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade.rotation.z = (i / 3) * Math.PI * 2;
    blade.position.z = 0.22;
    blade.castShadow = true;
    bladeGroup.add(blade);
  }
  head.add(bladeGroup);
  group.add(head);

  const windDisc = new THREE.Mesh(new THREE.CircleGeometry(0.54, 64), shadowMat);
  windDisc.position.set(0, 0.55, 0.36);
  group.add(windDisc);

  return { group, bladeGroup };
}

function createFloor() {
  const material = new THREE.MeshStandardMaterial({ color: 0xe9eef2, roughness: 0.92, metalness: 0 });
  const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(36, 26), material);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -2.74;
  floorMesh.receiveShadow = true;
  return floorMesh;
}

function createSoftShadow() {
  const texture = new THREE.CanvasTexture(makeRadialShadowCanvas());
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 4.5), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(-0.4, -2.735, 0.72);
  return mesh;
}

function makeRadialShadowCanvas() {
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 512;
  shadowCanvas.height = 256;
  const ctx = shadowCanvas.getContext("2d");
  const gradient = ctx.createRadialGradient(256, 130, 14, 256, 130, 260);
  gradient.addColorStop(0, "rgba(79, 101, 128, 0.35)");
  gradient.addColorStop(0.58, "rgba(79, 101, 128, 0.14)");
  gradient.addColorStop(1, "rgba(79, 101, 128, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);
  return shadowCanvas;
}

function createStars() {
  const count = 1300;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const p = i * 3;
    positions[p] = THREE.MathUtils.randFloatSpread(24);
    positions[p + 1] = THREE.MathUtils.randFloat(2.2, 10.2);
    positions[p + 2] = THREE.MathUtils.randFloat(-12, 4.2);
    phases[i] = Math.random() * Math.PI * 2;
    colors[p] = 1;
    colors[p + 1] = 0.92;
    colors[p + 2] = 0.78;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.044,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.visible = false;

  const moonMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff8df,
    transparent: true,
    opacity: 0.98,
    depthWrite: false,
    fog: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const moon = new THREE.Mesh(new THREE.CircleGeometry(0.88, 72), moonMaterial);
  moon.position.set(5.7, 5.25, -6.8);
  moon.visible = false;

  const moonHaloMaterial = new THREE.MeshBasicMaterial({
    color: 0xffedbd,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    fog: false,
    side: THREE.DoubleSide,
    toneMapped: false,
    blending: THREE.AdditiveBlending,
  });
  const moonHalo = new THREE.Mesh(new THREE.CircleGeometry(1.48, 72), moonHaloMaterial);
  moonHalo.position.copy(moon.position);
  moonHalo.position.z -= 0.01;
  moonHalo.visible = false;

  return { points, moon, moonHalo, positions, colors, phases };
}

function createCinemaSet() {
  const group = new THREE.Group();
  group.visible = false;

  const oceanGeometry = new THREE.PlaneGeometry(46, 28, 96, 48);
  const oceanBase = new Float32Array(oceanGeometry.attributes.position.array);
  const oceanMaterial = createOceanMaterial();
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, -2.84, 5.2);
  ocean.receiveShadow = true;
  group.add(ocean);

  const crate = createWoodenCrate();
  crate.position.set(-2.15, -2.32, 1.38);
  crate.rotation.y = -0.34;
  crate.userData.baseY = crate.position.y;
  crate.userData.floatX = crate.position.x - ocean.position.x;
  crate.userData.floatZ = ocean.position.z - crate.position.z;
  group.add(crate);

  group.userData = { ocean, oceanBase, crate };

  return group;
}

function createOceanMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color(0x043556) },
      uMid: { value: new THREE.Color(0x147196) },
      uShallow: { value: new THREE.Color(0x47d5d0) },
      uFoam: { value: new THREE.Color(0xf1fbff) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vWave;
      varying vec3 vWorldPosition;

      void main() {
        vUv = uv;
        vWave = position.z;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uMid;
      uniform vec3 uShallow;
      uniform vec3 uFoam;
      varying vec2 vUv;
      varying float vWave;
      varying vec3 vWorldPosition;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float waveBand(vec2 uv, float scale, float speed, float bend) {
        float drift = sin(uv.x * bend + uTime * speed) * 0.028;
        float line = sin((uv.y + drift) * scale + sin(uv.x * 17.0) * 1.1 - uTime * speed);
        return smoothstep(0.82, 1.0, line * 0.5 + 0.5);
      }

      float brokenGlint(vec2 uv, float angle, float scale, float speed) {
        vec2 dir = vec2(cos(angle), sin(angle));
        vec2 normal = vec2(-dir.y, dir.x);
        float along = dot(uv, dir);
        float across = dot(uv, normal);
        float flow = sin(across * scale + sin(along * 15.0 + uTime * speed) * 1.7 + uTime * speed);
        float streak = smoothstep(0.88, 1.0, flow * 0.5 + 0.5);
        float breakMask = smoothstep(0.34, 0.86, noise(vec2(along * 22.0 + uTime * 0.42, across * 4.0)));
        float shimmer = smoothstep(0.45, 1.0, noise(uv * 34.0 + vec2(uTime * 0.7, -uTime * 0.38)));
        return streak * breakMask * shimmer;
      }

      void main() {
        float depth = smoothstep(0.12, 0.88, vUv.y);
        vec3 color = mix(uShallow, uMid, depth);
        color = mix(color, uDeep, smoothstep(0.58, 1.0, depth) * 0.55);

        float largeFoam = waveBand(vUv, 36.0, 1.18, 8.0);
        float fineFoam = waveBand(vUv + vec2(0.13, 0.08), 88.0, 1.85, 16.0) * 0.28;
        float crest = smoothstep(0.035, 0.19, vWave);
        float trough = smoothstep(0.08, -0.16, vWave) * 0.18;
        float foam = clamp((largeFoam * 0.32 + fineFoam) * (0.22 + crest * 1.18) + trough, 0.0, 0.66);

        vec2 worldUv = vWorldPosition.xz * 0.055;
        float glintA = brokenGlint(worldUv + vec2(0.0, uTime * 0.025), 0.34, 74.0, 1.75);
        float glintB = brokenGlint(worldUv * 1.26 + vec2(0.21, -0.08), -0.18, 112.0, 2.2) * 0.58;
        float glintC = brokenGlint(worldUv * 0.82 + vec2(-0.1, 0.18), 0.62, 48.0, 1.25) * 0.42;
        float glint = clamp((glintA + glintB + glintC) * (0.25 + crest * 1.25), 0.0, 1.0);

        color += glint * vec3(0.32, 0.75, 0.9) * (0.46 + (1.0 - depth) * 0.55);
        color = mix(color, uFoam, foam * 0.82);
        color += crest * vec3(0.1, 0.22, 0.24) + glint * vec3(0.35, 0.52, 0.46);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.FrontSide,
  });
}

function createWoodenCrate() {
  const crate = new THREE.Group();
  const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8a5734, roughness: 0.76, metalness: 0.02 });
  const sideMaterial = new THREE.MeshStandardMaterial({ color: 0x6a3d24, roughness: 0.82, metalness: 0.02 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x2c1a12, roughness: 0.88, metalness: 0.01 });

  const core = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.58, 0.78), woodMaterial);
  core.castShadow = true;
  core.receiveShadow = true;
  crate.add(core);

  const plankGeometry = new THREE.BoxGeometry(0.1, 0.065, 0.86);
  [-0.42, 0, 0.42].forEach((x) => {
    const plank = new THREE.Mesh(plankGeometry, sideMaterial);
    plank.position.set(x, 0.34, 0);
    plank.castShadow = true;
    crate.add(plank);
  });

  [-0.48, 0.48].forEach((x) => {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.68, 0.86), darkMaterial);
    strap.position.set(x, 0.02, 0);
    strap.castShadow = true;
    crate.add(strap);
  });

  [-0.35, 0.35].forEach((z) => {
    const rim = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.07, 0.08), darkMaterial);
    rim.position.set(0, 0.35, z);
    rim.castShadow = true;
    crate.add(rim);
  });

  const cornerGeometry = new THREE.BoxGeometry(0.09, 0.66, 0.09);
  [-0.56, 0.56].forEach((x) => {
    [-0.4, 0.4].forEach((z) => {
      const corner = new THREE.Mesh(cornerGeometry, darkMaterial);
      corner.position.set(x, 0.02, z);
      corner.castShadow = true;
      crate.add(corner);
    });
  });

  crate.scale.set(0.9, 0.9, 0.9);
  crate.rotation.x = -0.06;
  return crate;
}

function getOceanWaveHeight(x, y, elapsed) {
  return (
    Math.sin(elapsed * 0.62 + x * 0.42 + y * 0.2) * 0.23 +
    Math.sin(elapsed * 0.86 - x * 0.24 + y * 0.5) * 0.13 +
    Math.sin(elapsed * 1.18 + x * 0.82 + y * 0.12) * 0.052
  );
}

function addLights() {
  const hemi = new THREE.HemisphereLight(0xffffff, 0xd8e3ee, 1.9);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffffff, 3.2);
  sun.position.set(-3.6, 8.4, 7.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 6;
  sun.shadow.camera.bottom = -6;
  scene.add(sun);

  const rim = new THREE.DirectionalLight(0x9ac8ff, 1.25);
  rim.position.set(5, 1.6, 5);
  scene.add(rim);

  return { hemi, sun, rim };
}

function setPage(page) {
  params.page = page;
  params.textureSource = "html";
  params.mediaClarity = 0;
  stopMediaTexture();
  refreshMaterial();
  applyResponsiveLayout();
  applyNightMode();
  setContentScroll(0, false);
  document.querySelectorAll(".page-view").forEach((view) => view.classList.remove("is-visible"));
  document.querySelector(`.view-${page}`).classList.add("is-visible");
  syncTopButtons();
  scheduleTextureRefresh("status.capture");
}

function scheduleTextureRefresh(key) {
  setStatus(key);
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(refreshHtmlTexture, 110);
}

function resetToHtmlTexture() {
  params.textureSource = "html";
  params.mediaClarity = 0;
  uploadInput.value = "";
  stopMediaTexture();
  refreshMaterial();
  applyResponsiveLayout();
  applyNightMode();
  refreshHtmlTexture();
}

function setMediaFile(file) {
  params.textureSource = "media";
  params.mediaClarity = 1;
  stopMediaTexture();
  refreshMaterial();
  applyResponsiveLayout();
  applyNightMode();
  setStatus("status.loading");

  const url = URL.createObjectURL(file);
  mediaUrl = url;

  if (file.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = url;
    video.muted = false;
    video.volume = 1;
    video.loop = true;
    video.autoplay = true;
    video.preload = "auto";
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    let playingWithSound = false;
    let resumeArmed = false;
    const armResumePlayback = () => {
      if (resumeArmed) return;
      resumeArmed = true;
      const resumeVideoSound = async () => {
        await video
          .play()
          .then(() => {
            playingWithSound = !video.muted;
            setStatus("status.videoSound");
          })
          .catch(() => {
            setStatus("status.tapSound");
          });
      };
      window.addEventListener("pointerdown", resumeVideoSound, { once: true });
      window.addEventListener("keydown", resumeVideoSound, { once: true });
    };
    const firstPlayAttempt = video
      .play()
      .then(() => {
        playingWithSound = !video.muted;
        return true;
      })
      .catch(() => {
        armResumePlayback();
        return false;
      });
    video.addEventListener(
      "loadeddata",
      async () => {
        mediaElement = video;
        const didPlay = await firstPlayAttempt;
        if (!didPlay) armResumePlayback();
        if (didPlay && "requestVideoFrameCallback" in video) {
          await new Promise((resolve) => video.requestVideoFrameCallback(resolve));
        }
        const texture = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        videoTexture = texture;
        setClothTexture(texture);
        setStatus(playingWithSound ? "status.videoSound" : "status.tapSound");
      },
      { once: true },
    );
    video.load();
    return;
  }

  const image = new Image();
  image.onload = () => {
    const texture = createContainedImageTexture(image);
    setClothTexture(texture);
    setStatus("status.media");
  };
  image.src = url;
  mediaElement = image;
}

function createContainedImageTexture(image) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1200;
  textureCanvas.height = 780;
  const ctx = textureCanvas.getContext("2d");
  const canvasAspect = textureCanvas.width / textureCanvas.height;
  const imageAspect = image.naturalWidth / image.naturalHeight;

  ctx.fillStyle = "#0e1624";
  ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

  const cover = imageAspect > canvasAspect
    ? { width: textureCanvas.height * imageAspect, height: textureCanvas.height }
    : { width: textureCanvas.width, height: textureCanvas.width / imageAspect };
  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.filter = "blur(26px) saturate(1.2) brightness(0.72)";
  ctx.drawImage(image, (textureCanvas.width - cover.width) / 2, (textureCanvas.height - cover.height) / 2, cover.width, cover.height);
  ctx.restore();

  const contain = imageAspect > canvasAspect
    ? { width: textureCanvas.width, height: textureCanvas.width / imageAspect }
    : { width: textureCanvas.height * imageAspect, height: textureCanvas.height };
  const x = (textureCanvas.width - contain.width) / 2;
  const y = (textureCanvas.height - contain.height) / 2;
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(x - 12, y - 12, contain.width + 24, contain.height + 24);
  ctx.drawImage(image, x, y, contain.width, contain.height);

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function setClothTexture(texture) {
  const oldTexture = cloth.material.map;
  cloth.material.map = texture;
  pageTexture = texture;
  refreshMaterial();
  if (oldTexture && oldTexture !== texture) oldTexture.dispose();
}

function stopMediaTexture() {
  if (mediaElement instanceof HTMLVideoElement) {
    mediaElement.pause();
    mediaElement.removeAttribute("src");
    mediaElement.load();
  }
  if (videoTexture) {
    videoTexture.dispose();
    videoTexture = null;
  }
  mediaElement = null;
  if (mediaUrl) {
    URL.revokeObjectURL(mediaUrl);
    mediaUrl = "";
  }
}

async function refreshHtmlTexture() {
  if (params.textureSource !== "html") return;
  if (textureBusy) return;
  textureBusy = true;
  try {
    const rendered = await html2canvas(htmlSource, {
      backgroundColor: null,
      scale: 1,
      width: 1200,
      height: 780,
      logging: false,
      useCORS: true,
    });
    const nextTexture = new THREE.CanvasTexture(rendered);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    nextTexture.needsUpdate = true;

    const oldTexture = cloth.material.map;
    pageTexture = nextTexture;
    cloth.material.map = pageTexture;
    refreshMaterial();
    if (oldTexture) oldTexture.dispose();
    setStatus("status.html");
  } catch (error) {
    console.warn(error);
    setStatus("status.fallback");
  } finally {
    textureBusy = false;
  }
}

function createFallbackTexture() {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1200;
  textureCanvas.height = 780;
  const ctx = textureCanvas.getContext("2d");
  ctx.fillStyle = "#f8fbff";
  ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
  ctx.fillStyle = "#121418";
  ctx.font = "800 82px Inter, sans-serif";
  ctx.fillText(t("home.title"), 170, 285);
  ctx.fillStyle = "#3f4651";
  ctx.font = "700 32px Inter, sans-serif";
  ctx.fillText(t("home.stepA"), 172, 390);
  ctx.fillText(t("home.stepB"), 172, 455);
  ctx.fillText(t("home.stepC"), 172, 520);
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function refreshMaterial() {
  const clarity = params.mediaClarity;
  cloth.material.color.setScalar(THREE.MathUtils.lerp(1, 1.03, clarity));
  cloth.material.metalness = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.02, 0.28, params.foil), 0, clarity);
  cloth.material.roughness = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.48, 0.16, params.foil), 0.86, clarity);
  cloth.material.envMapIntensity = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.72, 1.55, params.foil), 0.06, clarity);
  cloth.material.clearcoat = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.55, 1, params.foil), 0, clarity);
  cloth.material.clearcoatRoughness = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.24, 0.08, params.foil), 1, clarity);
  cloth.material.emissive.set(0xffffff);
  cloth.material.emissiveMap = clarity ? cloth.material.map : null;
  cloth.material.emissiveIntensity = clarity ? (params.night ? 1.45 : 0.16) : 0;
  cloth.material.needsUpdate = true;
}

function updateCloth(delta, elapsed) {
  const dt = Math.min(delta, 0.025) * 60;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObject(cloth.mesh, false);
  cloth.hovered = -1;

  if (intersects.length > 0) {
    pointerWorld.copy(intersects[0].point);
    cloth.mesh.worldToLocal(pointerWorld);
    cloth.hovered = nearestVertex(pointerWorld);
  }

  const { positions, previous, original, invMass, phase, cols, rows } = cloth;
  const clarity = params.mediaClarity;
  const fanLocal = fan.group.localToWorld(fanWindSource.set(0, 0.58, 0.34));
  const fanAhead = fan.group.localToWorld(fanWindTarget.set(0, 0.58, 1.34));
  cloth.mesh.worldToLocal(fanLocal);
  cloth.mesh.worldToLocal(fanAhead);
  fanWindDirection.copy(fanAhead).sub(fanLocal).normalize();
  const fanPower = params.fanEnabled ? params.wind : 0;
  const pulse = 0.86 + Math.sin(elapsed * 4.2) * 0.12 + Math.sin(elapsed * 8.1) * 0.035;

  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      const i = y * (cols + 1) + x;
      const p = i * 3;
      const u = x / cols;
      const v = y / rows;

      if (invMass[i] === 0) {
        const ox = original[p];
        const oy = original[p + 1];
        positions[p] = ox;
        positions[p + 1] = oy;
        positions[p + 2] = original[p + 2] + Math.sin(elapsed * 1.6 + x * 0.12) * 0.018;
        previous[p] = positions[p];
        previous[p + 1] = positions[p + 1];
        previous[p + 2] = positions[p + 2];
        continue;
      }

      const px = positions[p];
      const py = positions[p + 1];
      const pz = positions[p + 2];
      const vx = (px - previous[p]) * clothConfig.damping;
      const vy = (py - previous[p + 1]) * clothConfig.damping;
      const vz = (pz - previous[p + 2]) * clothConfig.damping;

      previous[p] = px;
      previous[p + 1] = py;
      previous[p + 2] = pz;

      const freeBand = smoothstep(0.02, 0.22, v);
      const lowerBand = Math.max(0, (v - 0.56) / 0.44);
      const sailBand = freeBand * (0.55 + lowerBand * 0.95);
      const rippleScale = THREE.MathUtils.lerp(1, 0.22, clarity);
      const fineRipple = Math.sin(elapsed * 4.8 + u * 12.5 + v * 6.1 + phase[i]) * 0.075 * rippleScale;
      const broadRipple = Math.sin(elapsed * 2.0 + u * 4.8 - v * 3.8) * 0.12 * rippleScale;
      const bottomCurl = lowerBand * lowerBand * Math.sin(elapsed * 3.4 + u * 10.0) * 0.26 * rippleScale;
      const fromFanX = original[p] - fanLocal.x;
      const fromFanY = original[p + 1] - fanLocal.y;
      const fromFanZ = original[p + 2] - fanLocal.z;
      const forwardDistance =
        fromFanX * fanWindDirection.x + fromFanY * fanWindDirection.y + fromFanZ * fanWindDirection.z;
      const radialX = fromFanX - fanWindDirection.x * forwardDistance;
      const radialY = fromFanY - fanWindDirection.y * forwardDistance;
      const radialZ = fromFanZ - fanWindDirection.z * forwardDistance;
      const radialDistance = Math.hypot(radialX * 0.62, radialY * 0.92, radialZ * 0.62);
      const radialLength = Math.max(0.001, Math.hypot(radialX, radialY, radialZ));
      const coneRadius = Math.max(0.45, 0.82 + Math.max(0, forwardDistance) * 0.78);
      const frontBand = smoothstep(0.08, 0.65, forwardDistance);
      const coneBand = smoothstep(coneRadius, coneRadius * 0.18, radialDistance);
      const distanceBand = smoothstep(8.8, 0.35, forwardDistance);
      const fanInfluence = frontBand * coneBand * distanceBand;
      const wind = fanPower * pulse * fanInfluence * THREE.MathUtils.lerp(1.9, 0.88, clarity);
      const spreadX = radialX / radialLength;
      const spreadY = radialY / radialLength;
      const spreadZ = radialZ / radialLength;
      const axisStrength = wind * sailBand * (1.1 + lowerBand * 0.95);
      const spreadStrength = wind * sailBand * (0.16 + lowerBand * 0.32);

      const targetX =
        original[p] +
        fanWindDirection.x * axisStrength +
        spreadX * spreadStrength +
        broadRipple * wind * sailBand * 0.28;
      const targetY =
        original[p + 1] -
        THREE.MathUtils.lerp(0.06, 0.02, clarity) * v * v +
        sailBand * wind * (0.22 + lowerBand * 0.82) +
        fanWindDirection.y * axisStrength * 0.45 +
        spreadY * spreadStrength * 0.22 +
        Math.sin(elapsed * 2.9 + u * 7.2) * sailBand * wind * 0.16;
      const targetZ =
        original[p + 2] +
        fanWindDirection.z * axisStrength * 1.38 +
        spreadZ * spreadStrength * 0.56 +
        fineRipple * wind * 1.8 +
        bottomCurl * wind * 1.8;

      positions[p] = px + vx * 0.88 + (targetX - px) * 0.072;
      positions[p + 1] = py + vy * 0.88 + (targetY - py) * 0.076 + clothConfig.gravity * dt;
      positions[p + 2] = pz + vz * 0.88 + (targetZ - pz) * THREE.MathUtils.lerp(0.12, 0.076, clarity);

      if (params.pull && cloth.hovered > -1) {
        const hi = cloth.hovered * 3;
        const hx = original[hi];
        const hy = original[hi + 1];
        const vx2 = original[p] - hx;
        const vy2 = original[p + 1] - hy;
        const radius = 1.05;
        const influence = Math.max(0, 1 - Math.hypot(vx2, vy2) / radius);
        if (influence > 0) {
          const eased = influence * influence;
          positions[p] += (pointerWorld.x - positions[p]) * 0.08 * eased;
          positions[p + 1] += (pointerWorld.y - positions[p + 1]) * 0.08 * eased;
          positions[p + 2] += (pointerWorld.z + 0.45 - positions[p + 2]) * 0.15 * eased;
        }
      }

      if (dragState.mode === "cloth" && dragState.vertex > -1) {
        const di = dragState.vertex * 3;
        const dx = original[p] - original[di];
        const dy = original[p + 1] - original[di + 1];
        const influence = Math.max(0, 1 - Math.hypot(dx, dy) / 1.35);
        if (influence > 0) {
          const eased = influence * influence;
          positions[p] += (localDragTarget.x - positions[p]) * 0.28 * eased;
          positions[p + 1] += (localDragTarget.y - positions[p + 1]) * 0.28 * eased;
          positions[p + 2] += (localDragTarget.z + 0.36 - positions[p + 2]) * 0.34 * eased;
          previous[p] = positions[p];
          previous[p + 1] = positions[p + 1];
          previous[p + 2] = positions[p + 2];
        }
      }
    }
  }

  for (let pass = 0; pass < clothConfig.passes; pass += 1) {
    satisfyConstraints(pass);
  }

  for (let i = 0; i < positions.length / 3; i += 1) {
    const p = i * 3;
    if (positions[p + 1] < -4.4) {
      positions[p + 1] = -4.4;
      previous[p + 1] = -4.35;
    }
    positions[p] = THREE.MathUtils.clamp(positions[p], -5.0, 5.0);
    positions[p + 2] = THREE.MathUtils.clamp(positions[p + 2], -3.6, 6.8);
  }

  cloth.geometry.attributes.position.needsUpdate = true;
  cloth.geometry.computeVertexNormals();
}

function smoothstep(min, max, value) {
  const x = THREE.MathUtils.clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

function satisfyConstraints(pass) {
  const { positions, invMass, constraints } = cloth;
  const stiffness = clothConfig.stiffness * (pass === 0 ? 1 : 0.78);

  for (let c = 0; c < constraints.length; c += 1) {
    const { a, b, rest } = constraints[c];
    const ai = a * 3;
    const bi = b * 3;

    const dx = positions[bi] - positions[ai];
    const dy = positions[bi + 1] - positions[ai + 1];
    const dz = positions[bi + 2] - positions[ai + 2];
    const len = Math.hypot(dx, dy, dz);
    if (len === 0) continue;

    const diff = (len - rest) / len;
    const w1 = invMass[a];
    const w2 = invMass[b];
    const sum = w1 + w2;
    if (sum === 0) continue;

    const factor = diff * stiffness;
    const ax = dx * factor * (w1 / sum);
    const ay = dy * factor * (w1 / sum);
    const az = dz * factor * (w1 / sum);
    const bx = dx * factor * (w2 / sum);
    const by = dy * factor * (w2 / sum);
    const bz = dz * factor * (w2 / sum);

    if (w1 > 0) {
      positions[ai] += ax;
      positions[ai + 1] += ay;
      positions[ai + 2] += az;
    }
    if (w2 > 0) {
      positions[bi] -= bx;
      positions[bi + 1] -= by;
      positions[bi + 2] -= bz;
    }
  }
}

function nearestVertex(point) {
  const positions = cloth.positions;
  let best = -1;
  let bestDistance = Infinity;

  for (let i = 0; i < positions.length / 3; i += 1) {
    const p = i * 3;
    const distance = point.distanceToSquared(new THREE.Vector3(positions[p], positions[p + 1], positions[p + 2]));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  }

  return bestDistance < 0.55 ? best : -1;
}

function writeVec(array, index, x, y, z) {
  const p = index * 3;
  array[p] = x;
  array[p + 1] = y;
  array[p + 2] = z;
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  applyResponsiveLayout();
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function applyResponsiveLayout() {
  const aspect = window.innerWidth / window.innerHeight;
  if (aspect < 0.72) {
    const media = params.mediaClarity;
    clothRig.scale.setScalar(THREE.MathUtils.lerp(0.75, 0.86, media));
    clothRig.position.set(0, THREE.MathUtils.lerp(-0.28, 0.5, media), 0);
    camera.fov = THREE.MathUtils.lerp(42, 46, media);
    camera.position.set(0.1, THREE.MathUtils.lerp(0.24, 0.42, media), THREE.MathUtils.lerp(18.5, 18.2, media));
    controls.target.set(0, THREE.MathUtils.lerp(-0.06, 0.08, media), 0.4);
    controls.minDistance = THREE.MathUtils.lerp(11, 12, media);
    controls.maxDistance = 24;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxPolarAngle = Math.PI * 0.46;
    fanTransformControls.setSize(0.34);
  } else {
    clothRig.scale.setScalar(1);
    clothRig.position.set(0, 0, 0);
    camera.fov = 38;
    camera.position.set(0, 1.2, 10.8);
    controls.target.set(0, 0.15, 0);
    controls.minDistance = 6.3;
    controls.maxDistance = 15.5;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxPolarAngle = Math.PI * 0.48;
    fanTransformControls.setSize(0.7);
  }
  camera.updateProjectionMatrix();
}

function applyNightMode() {
  nightInput.checked = params.night;
  syncTopButtons();
  document.body.classList.toggle("is-night", params.night);
  stars.points.visible = params.night;
  stars.moon.visible = params.night;
  stars.moonHalo.visible = params.night;
  applyMoonSettings(clock.elapsedTime);
  cinemaSet.visible = params.night;
  cable.visible = !params.night;
  clips.forEach((clip) => {
    clip.visible = !params.night;
  });
  gulls.forEach((gull) => {
    gull.visible = params.night;
  });
  scene.background = new THREE.Color(params.night ? 0x080d1a : 0xeef1f3);
  scene.fog = new THREE.Fog(
    params.night ? 0x080d1a : 0xeef1f3,
    params.night ? (params.mediaClarity ? 20 : 7) : 13,
    params.night ? (params.mediaClarity ? 44 : 24) : 27,
  );
  renderer.toneMappingExposure = params.mediaClarity ? (params.night ? 1.18 : 0.96) : (params.night ? 0.88 : 1.08);

  floor.material.color.set(params.night ? 0x101827 : 0xe9eef2);
  floor.material.roughness = params.night ? 1 : 0.92;
  floor.visible = !params.night;
  softShadow.material.opacity = params.night ? 0 : 1;

  lights.hemi.intensity = params.night ? 0.32 : 1.9;
  lights.hemi.color.set(params.night ? 0x526b9f : 0xffffff);
  lights.hemi.groundColor.set(params.night ? 0x050712 : 0xd8e3ee);
  lights.sun.intensity = params.night ? 0.42 : 3.2;
  lights.sun.color.set(params.night ? 0x8bb8ff : 0xffffff);
  lights.rim.intensity = params.night ? 2.3 : 1.25;
  lights.rim.color.set(params.night ? 0x7fb2ff : 0x9ac8ff);
  refreshMaterial();
}

function applyMoonSettings(elapsed = 0) {
  const brightness = params.moonBrightness;
  stars.moon.material.color.set(params.moonColor);
  stars.moonHalo.material.color.set(params.moonHaloColor);
  stars.moon.scale.setScalar(params.moonSize);
  stars.moonHalo.scale.setScalar(params.moonSize * params.moonHaloRange);
  stars.moon.material.opacity = THREE.MathUtils.clamp(0.48 + brightness * 0.34, 0.55, 1);
  stars.moonHalo.material.opacity = THREE.MathUtils.clamp(0.09 + brightness * 0.13 + Math.sin(elapsed * 0.38) * 0.025, 0.08, 0.46);
}

function updateCinemaSet(delta, elapsed) {
  if (!params.night) return;

  const { ocean, oceanBase, crate } = cinemaSet.userData;
  ocean.material.uniforms.uTime.value = elapsed;
  const positionAttribute = ocean.geometry.attributes.position;
  const positions = positionAttribute.array;
  for (let i = 0; i < positionAttribute.count; i += 1) {
    const p = i * 3;
    const x = oceanBase[p];
    const y = oceanBase[p + 1];
    positions[p + 2] = getOceanWaveHeight(x, y, elapsed);
  }
  positionAttribute.needsUpdate = true;
  ocean.geometry.computeVertexNormals();

  const tide = Math.sin(elapsed * 0.82) * 0.08 + Math.sin(elapsed * 1.7 + 0.6) * 0.025;
  const crateWave = getOceanWaveHeight(crate.userData.floatX, crate.userData.floatZ, elapsed);
  crate.position.y = crate.userData.baseY + crateWave + tide * 0.36;
  crate.rotation.x = -0.06 + Math.sin(elapsed * 0.76 + 0.5) * 0.09;
  crate.rotation.z = Math.sin(elapsed * 1.05) * 0.11;
  crate.rotation.y = -0.34 + Math.sin(elapsed * 0.34) * 0.08;

  updateGulls(delta, elapsed);
}

function updateGulls(delta, elapsed) {
  gulls.forEach((gull, index) => {
    const side = gull.userData.wingSide;
    const wingFlap = Math.sin(elapsed * 5.4 + gull.userData.phase) * 0.46;
    gull.position.y = gull.userData.baseY;
    gull.rotation.z = Math.sin(elapsed * 1.1 + index * 0.7) * 0.035;
    gull.userData.leftWing.rotation.z = side * (0.1 + wingFlap);
    gull.userData.rightWing.rotation.z = side * (0.1 - wingFlap * 0.72);
    gull.userData.leftWing.rotation.x = 0.18 + Math.abs(wingFlap) * 0.18;
    gull.userData.rightWing.rotation.x = -0.16 - Math.abs(wingFlap) * 0.12;
  });
}

function updateStars(delta, elapsed) {
  if (!params.night) return;

  const positionAttribute = stars.points.geometry.attributes.position;
  const colorAttribute = stars.points.geometry.attributes.color;
  stars.points.material.size = 0.028 + params.starGlow * 0.026;
  stars.points.material.opacity = 0.52 + params.starGlow * 0.28;
  applyMoonSettings(elapsed);

  for (let i = 0; i < stars.phases.length; i += 1) {
    const p = i * 3;
    stars.positions[p] += delta * params.starGlow * (0.011 + (stars.phases[i] % 0.026));
    stars.positions[p + 2] += delta * params.starGlow * 0.004;
    if (stars.positions[p] > 12) stars.positions[p] = -12;
    if (stars.positions[p + 2] > 4.2) stars.positions[p + 2] = -12;

    const twinkle = 0.54 + Math.sin(elapsed * 1.15 + stars.phases[i]) * 0.34 + Math.sin(elapsed * 2.4 + stars.phases[i] * 0.7) * 0.12;
    const intensity = THREE.MathUtils.clamp(twinkle * params.starGlow, 0.18, 1.45);
    stars.colors[p] = 0.92 * intensity;
    stars.colors[p + 1] = 0.76 * intensity;
    stars.colors[p + 2] = intensity;
  }

  positionAttribute.needsUpdate = true;
  colorAttribute.needsUpdate = true;
}

function updateFps() {
  frameCount += 1;
  const now = performance.now();
  if (now - lastFpsTime > 600) {
    const fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
    fpsLabel.textContent = `${fps} FPS`;
    lastFpsTime = now;
    frameCount = 0;
  }
}

function updateContentAutoplay(delta, elapsed) {
  if (!params.autoplay || params.textureSource !== "html") return;

  const min = Number(contentScrollInput.min);
  const max = Number(contentScrollInput.max);
  let next = params.scroll - delta * 18;
  if (next < min) next = max;
  setContentScroll(next, false);

  if (elapsed - lastAutoScrollRefresh > 0.22) {
    lastAutoScrollRefresh = elapsed;
    scheduleTextureRefresh("status.scroll");
  }
}

function animate() {
  const delta = clock.getDelta();
  const elapsed = clock.elapsedTime;

  updateContentAutoplay(delta, elapsed);
  updateCloth(delta, elapsed);
  updateCinemaSet(delta, elapsed);
  updateStars(delta, elapsed);
  if (params.fanEnabled) {
    fan.bladeGroup.rotation.z -= delta * (18 + params.wind * 44);
    fan.group.rotation.z = Math.sin(elapsed * 1.5) * 0.025;
  }
  controls.update();
  renderer.render(scene, camera);
  updateFps();
  requestAnimationFrame(animate);
}

animate();
