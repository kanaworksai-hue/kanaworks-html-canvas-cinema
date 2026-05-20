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
const boatLightInput = document.querySelector("#boat-light");
const lightDirectionInput = document.querySelector("#light-direction");
const lightSizeInput = document.querySelector("#light-size");
const lightStrengthInput = document.querySelector("#light-strength");
const lightRangeInput = document.querySelector("#light-range");
const starGlowInput = document.querySelector("#star-glow");
const uploadInput = document.querySelector("#media-upload");
const uploadButton = document.querySelector("#upload-button");
const resetTextureButton = document.querySelector("#reset-texture");
const modeButtons = [...document.querySelectorAll(".mode-button")];
const langButtons = [...document.querySelectorAll(".lang-button")];
const fanPositionInputs = [fanXInput, fanYInput, fanZInput];

const fanDefaults = {
  x: 2,
  y: -0.56,
  z: 1.62,
};

const translations = {
  en: {
    "ui.title": "KANA星空影院",
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
    "ui.lightControls": "Boat light",
    "ui.boatLight": "Boat light",
    "ui.lightDirection": "Light dir",
    "ui.lightSize": "Light size",
    "ui.lightStrength": "Strength",
    "ui.lightRange": "Range",
    "ui.starGlow": "Star glow",
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
    "source.brand": "KANA星空影院",
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
    "docs.lead": "Turn on Night cinema for a sea, a wooden boat, two seagulls holding the curtain, and a soft round boat light on the screen.",
    "docs.cardA": "Wheel zooms only the camera view.",
    "docs.cardB": "Content scroll moves only the instruction page.",
    "docs.cardC": "Upload again any time to replace the curtain texture.",
    "docs.linkA": "Upload media",
    "docs.linkB": "Move the fan",
    "docs.linkC": "Drag curtain",
    "docs.linkD": "Boat light",
  },
  zh: {
    "ui.title": "KANA星空影院",
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
    "ui.lightControls": "小船灯光",
    "ui.boatLight": "船灯",
    "ui.lightDirection": "灯光方向",
    "ui.lightSize": "光束大小",
    "ui.lightStrength": "强弱",
    "ui.lightRange": "范围",
    "ui.starGlow": "星光浪漫度",
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
    "source.brand": "KANA星空影院",
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
    "docs.eyebrow": "星空影院",
    "docs.title": "露天电影屏幕",
    "docs.lead": "开启星空影院后，下方会变成海洋，小木船随潮汐摇摆，两只海鸥衔着幕布，船灯在屏幕上投下柔和圆光。",
    "docs.cardA": "滚轮只负责缩放视角。",
    "docs.cardB": "内容滚动只移动幕布说明页。",
    "docs.cardC": "随时再次上传，替换幕布画面。",
    "docs.linkA": "上传媒体",
    "docs.linkB": "移动风扇",
    "docs.linkC": "拖动幕布",
    "docs.linkD": "船灯开关",
  },
  ja: {
    "ui.title": "KANA星空影院",
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
    "ui.lightControls": "船の灯り",
    "ui.boatLight": "船の灯り",
    "ui.lightDirection": "照明方向",
    "ui.lightSize": "光の大きさ",
    "ui.lightStrength": "強さ",
    "ui.lightRange": "範囲",
    "ui.starGlow": "星の輝き",
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
    "source.brand": "KANA星空影院",
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
    "docs.lead": "星空シネマをオンにすると、海、小さな木の船、スクリーンをくわえる二羽のカモメ、柔らかな丸い船灯が現れます。",
    "docs.cardA": "ホイールは視点ズームだけを操作します。",
    "docs.cardB": "内容スクロールは説明ページだけを動かします。",
    "docs.cardC": "いつでも再アップロードして映像を差し替えられます。",
    "docs.linkA": "メディア追加",
    "docs.linkB": "扇風機移動",
    "docs.linkC": "スクリーン操作",
    "docs.linkD": "船の灯り",
  },
};

const params = {
  wind: Number(windInput.value),
  foil: Number(foilInput.value),
  pull: pullInput.checked,
  night: nightInput.checked,
  fanEnabled: fanEnabledInput.checked,
  autoplay: autoplayInput.checked,
  lang: "en",
  scroll: Number(contentScrollInput.value),
  fanDirection: Number(fanDirectionInput.value),
  boatLight: boatLightInput.checked,
  lightDirection: Number(lightDirectionInput.value),
  lightSize: Number(lightSizeInput.value),
  lightStrength: Number(lightStrengthInput.value),
  lightRange: Number(lightRangeInput.value),
  starGlow: Number(starGlowInput.value),
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
controls.minDistance = 6.3;
controls.maxDistance = 15.5;
controls.maxPolarAngle = Math.PI * 0.58;
controls.target.set(0, 0.15, 0);

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(12, 12);
const pointerWorld = new THREE.Vector3();
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const dragPoint = new THREE.Vector3();
const fanDragOffset = new THREE.Vector3();
const localDragTarget = new THREE.Vector3();
const boatLightSource = new THREE.Vector3();
const boatLightTarget = new THREE.Vector3();
const boatLightDirection = new THREE.Vector3();
const boatLightAxis = new THREE.Vector3(0, 1, 0);

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
  stiffness: 0.94,
  damping: 0.992,
  gravity: -0.0042,
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

const screenGlow = createScreenGlow();
clothRig.add(screenGlow);

const fan = createFan();
fan.group.position.set(fanDefaults.x, fanDefaults.y, fanDefaults.z);
fan.group.rotation.y = -Math.PI * 0.5;
fan.group.scale.setScalar(2);
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

const cinemaSet = createCinemaSet();
scene.add(cinemaSet);

const lights = addLights();
applyFanDirection();
applyFanEnabled(false);
applyResponsiveLayout();
applyNightMode();
applyCinemaLight();

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

fanEnabledInput.addEventListener("change", () => {
  params.fanEnabled = fanEnabledInput.checked;
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

boatLightInput.addEventListener("change", () => {
  params.boatLight = boatLightInput.checked;
  applyCinemaLight();
});

[lightDirectionInput, lightSizeInput, lightStrengthInput, lightRangeInput, starGlowInput].forEach((input) => {
  input.addEventListener("input", () => {
    params.lightDirection = Number(lightDirectionInput.value);
    params.lightSize = Number(lightSizeInput.value);
    params.lightStrength = Number(lightStrengthInput.value);
    params.lightRange = Number(lightRangeInput.value);
    params.starGlow = Number(starGlowInput.value);
    applyCinemaLight();
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
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

resetTextureButton.addEventListener("click", () => {
  resetToHtmlTexture();
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

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPage(button.dataset.page);
  });
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

function applyLanguage(lang) {
  params.lang = lang;
  document.documentElement.lang = lang;
  langButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.lang === lang));
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  statusText.textContent = t(statusKey);
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
  fan.group.visible = params.fanEnabled;
  fanTransformControls.enabled = params.fanEnabled;
  fanTransformControls.getHelper().visible = params.fanEnabled;
  if (!params.fanEnabled && dragState.mode === "fan") endDrag({ pointerId: dragState.pointerId });
  if (updateStatus) setStatus(params.fanEnabled ? "status.fanOn" : "status.fanOff");
}

function resetFanPosition() {
  fan.group.position.set(fanDefaults.x, fanDefaults.y, fanDefaults.z);
  syncFanInputs();
  setStatus("status.fanReset");
}

function handlePointerDown(event) {
  if (event.button !== 0) return;
  raycaster.setFromCamera(pointer, camera);

  if (params.fanEnabled) {
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
  return [
    createGull(-1, -width / 2 + 0.3, height / 2 - 0.04),
    createGull(1, width / 2 - 0.3, height / 2 - 0.04),
  ];
}

function createGull(side, x, y) {
  const group = new THREE.Group();
  const inward = -side;
  group.position.set(x, y, 0.28);
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
  body.position.set(inward * 0.26, 0.16, 0.04);
  body.scale.set(1.38, 0.72, 0.58);
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 12), featherMaterial);
  head.position.set(inward * 0.1, 0.15, 0.06);
  head.castShadow = true;
  group.add(head);

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.18, 16), beakMaterial);
  beak.position.set(inward * 0.015, 0.14, 0.06);
  beak.rotation.z = side < 0 ? Math.PI / 2 : -Math.PI / 2;
  beak.castShadow = true;
  group.add(beak);

  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), eyeMaterial);
  eye.position.set(inward * 0.065, 0.18, 0.13);
  group.add(eye);

  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.quadraticCurveTo(inward * 0.18, 0.26, inward * 0.62, 0.34);
  wingShape.quadraticCurveTo(inward * 0.46, 0.06, 0, 0);
  const wingGeometry = new THREE.ShapeGeometry(wingShape);
  const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
  const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
  leftWing.position.set(inward * 0.22, 0.15, 0.02);
  rightWing.position.set(inward * 0.22, 0.15, -0.02);
  leftWing.castShadow = true;
  rightWing.castShadow = true;
  group.add(leftWing, rightWing);

  group.userData.leftWing = leftWing;
  group.userData.rightWing = rightWing;
  return group;
}

function createScreenGlow() {
  const material = new THREE.MeshBasicMaterial({
    color: 0xffdfad,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const glow = new THREE.Mesh(new THREE.CircleGeometry(1, 64), material);
  glow.position.set(0, -0.38, 0.13);
  glow.visible = false;
  glow.renderOrder = 4;
  return glow;
}

function createFan() {
  const group = new THREE.Group();
  const white = new THREE.MeshPhysicalMaterial({
    color: 0x2f80ff,
    roughness: 0.36,
    metalness: 0.08,
    clearcoat: 0.82,
    envMapIntensity: 1.35,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x8dccff,
    roughness: 0.08,
    metalness: 0.02,
    transparent: true,
    opacity: 0.34,
    clearcoat: 1,
  });
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x7cc7ff, transparent: true, opacity: 0.38 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.68, 0.14, 64), white);
  base.position.y = -1.02;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.52, 32), white);
  pole.position.y = -0.26;
  pole.castShadow = true;
  group.add(pole);

  const head = new THREE.Group();
  head.position.y = 0.55;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.025, 18, 96), glass);
  ring.castShadow = true;
  head.add(ring);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.34, 32), white);
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
    blade.position.z = 0.19;
    blade.castShadow = true;
    bladeGroup.add(blade);
  }
  head.add(bladeGroup);
  group.add(head);

  const windDisc = new THREE.Mesh(new THREE.CircleGeometry(0.54, 64), shadowMat);
  windDisc.position.set(-0.12, 0.55, -0.03);
  windDisc.rotation.y = Math.PI;
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
    color: 0xfff1c7,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
  });
  const moon = new THREE.Mesh(new THREE.CircleGeometry(0.55, 48), moonMaterial);
  moon.position.set(5.7, 5.25, -6.8);
  moon.visible = false;

  return { points, moon, positions, colors, phases };
}

function createCinemaSet() {
  const group = new THREE.Group();
  group.visible = false;

  const oceanGeometry = new THREE.PlaneGeometry(34, 18, 56, 24);
  const oceanBase = new Float32Array(oceanGeometry.attributes.position.array);
  const oceanPhases = new Float32Array(oceanGeometry.attributes.position.count);
  for (let i = 0; i < oceanPhases.length; i += 1) {
    oceanPhases[i] = Math.random() * Math.PI * 2;
  }
  const oceanMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0c4261,
    emissive: 0x031726,
    emissiveIntensity: 0.26,
    roughness: 0.34,
    metalness: 0.06,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, -2.64, 3.0);
  ocean.receiveShadow = true;
  group.add(ocean);

  const boat = createBoat();
  boat.position.set(-2.18, -1.98, 2.8);
  boat.scale.setScalar(1.08);
  boat.rotation.y = -0.18;
  boat.userData.baseY = boat.position.y;
  group.add(boat);

  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd99a,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 48, 1, true), beamMaterial);
  beam.visible = false;
  group.add(beam);
  group.userData = { ocean, oceanBase, oceanPhases, boat, beam };

  return group;
}

function createBoat() {
  const boat = new THREE.Group();
  boat.userData.baseY = -2.28;

  const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x7a4a2a, roughness: 0.68, metalness: 0.02 });
  const darkWoodMaterial = new THREE.MeshStandardMaterial({ color: 0x3f2518, roughness: 0.78, metalness: 0.02 });
  const lanternMaterial = new THREE.MeshBasicMaterial({ color: 0xffd47d });
  const lanternGlass = new THREE.MeshBasicMaterial({
    color: 0xffe5a8,
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending,
  });

  const hullShape = new THREE.Shape();
  hullShape.moveTo(-0.74, 0);
  hullShape.quadraticCurveTo(0, -0.34, 0.74, 0);
  hullShape.lineTo(0.54, 0.28);
  hullShape.quadraticCurveTo(0, 0.36, -0.54, 0.28);
  hullShape.lineTo(-0.74, 0);
  const hullGeometry = new THREE.ExtrudeGeometry(hullShape, {
    depth: 0.5,
    bevelEnabled: true,
    bevelSize: 0.035,
    bevelThickness: 0.025,
    bevelSegments: 2,
  });
  hullGeometry.center();
  const hull = new THREE.Mesh(hullGeometry, woodMaterial);
  hull.castShadow = true;
  hull.receiveShadow = true;
  boat.add(hull);

  const rim = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.055, 0.58), darkWoodMaterial);
  rim.position.y = 0.18;
  rim.castShadow = true;
  boat.add(rim);

  [-0.32, 0.32].forEach((x) => {
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.48), darkWoodMaterial);
    seat.position.set(x, 0.27, 0);
    seat.castShadow = true;
    boat.add(seat);
  });

  const lanternPost = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.45, 14), darkWoodMaterial);
  lanternPost.position.set(-0.18, 0.48, -0.08);
  lanternPost.castShadow = true;
  boat.add(lanternPost);

  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 12), lanternGlass);
  lantern.position.set(-0.18, 0.74, -0.08);
  boat.add(lantern);

  const lanternCore = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), lanternMaterial);
  lanternCore.position.copy(lantern.position);
  boat.add(lanternCore);

  const lightAnchor = new THREE.Object3D();
  lightAnchor.position.copy(lantern.position);
  boat.add(lightAnchor);
  boat.userData.lightAnchor = lightAnchor;

  return boat;
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

  const projectorTarget = new THREE.Object3D();
  projectorTarget.position.set(0, -0.55, -0.8);
  scene.add(projectorTarget);

  const projectorSpot = new THREE.SpotLight(0x9fc8ff, 0, 10, 0.38, 0.58, 1.2);
  projectorSpot.position.set(-3.6, -2.15, 5.1);
  projectorSpot.target = projectorTarget;
  projectorSpot.castShadow = true;
  projectorSpot.shadow.mapSize.set(1024, 1024);
  scene.add(projectorSpot);

  const boatPoint = new THREE.PointLight(0xffd08a, 0, 4.2, 1.8);
  scene.add(boatPoint);

  return { hemi, sun, rim, projectorSpot, projectorTarget, boatPoint };
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
  modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.page === page));
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
  const fanLocal = fan.group.localToWorld(new THREE.Vector3(0, 0.58, 0.14));
  cloth.mesh.worldToLocal(fanLocal);
  const windAngle = THREE.MathUtils.degToRad(params.fanDirection);
  const windX = Math.sin(windAngle);
  const windDepth = 0.45 + Math.max(0, -Math.cos(windAngle)) * 0.72 - Math.max(0, Math.cos(windAngle)) * 0.18;
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

      const verticalBand = Math.sin(v * Math.PI);
      const lowerBand = Math.max(0, (v - 0.56) / 0.44);
      const rightBand = smoothstep(0.38, 1, u);
      const leftBand = 1 - smoothstep(0, 0.35, u);
      const rippleScale = THREE.MathUtils.lerp(1, 0.22, clarity);
      const fineRipple = Math.sin(elapsed * 4.8 + u * 12.5 + v * 6.1 + phase[i]) * 0.075 * rippleScale;
      const broadRipple = Math.sin(elapsed * 2.0 + u * 4.8 - v * 3.8) * 0.12 * rippleScale;
      const bottomCurl = lowerBand * lowerBand * Math.sin(elapsed * 3.4 + u * 10.0) * 0.26 * rippleScale;
      const fanDistance = Math.hypot((original[p] - fanLocal.x) * 0.38, (original[p + 1] - fanLocal.y) * 0.72);
      const fanInfluence = smoothstep(5.8, 0.3, fanDistance);
      const fanPower = params.fanEnabled ? params.wind : 0;
      const wind = fanPower * pulse * (0.48 + fanInfluence * 0.92) * THREE.MathUtils.lerp(1, 0.36, clarity);

      const targetX =
        original[p] +
        windX * wind * verticalBand * (0.16 + rightBand * 0.5) -
        windX * wind * leftBand * lowerBand * 0.18 +
        broadRipple * wind * verticalBand * 0.18;
      const targetY =
        original[p + 1] -
        THREE.MathUtils.lerp(0.14, 0.06, clarity) * v * v +
        lowerBand * wind * 0.28 +
        Math.sin(elapsed * 2.9 + u * 7.2) * verticalBand * wind * 0.06;
      const targetZ =
        original[p + 2] +
        wind * windDepth * verticalBand * (0.52 + rightBand * 0.78) +
        lowerBand * wind * 0.34 +
        fineRipple * wind +
        bottomCurl * wind;

      positions[p] = px + vx * 0.82 + (targetX - px) * 0.058;
      positions[p + 1] = py + vy * 0.82 + (targetY - py) * 0.058 + clothConfig.gravity * dt;
      positions[p + 2] = pz + vz * 0.82 + (targetZ - pz) * THREE.MathUtils.lerp(0.065, 0.038, clarity);

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
    positions[p + 2] = THREE.MathUtils.clamp(positions[p + 2], -1.1, 5.2);
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
    fanTransformControls.setSize(0.34);
  } else {
    clothRig.scale.setScalar(1);
    clothRig.position.set(0, 0, 0);
    camera.fov = 38;
    camera.position.set(0, 1.2, 10.8);
    controls.target.set(0, 0.15, 0);
    controls.minDistance = 6.3;
    controls.maxDistance = 15.5;
    fanTransformControls.setSize(0.7);
  }
  camera.updateProjectionMatrix();
}

function applyNightMode() {
  document.body.classList.toggle("is-night", params.night);
  stars.points.visible = params.night;
  stars.moon.visible = params.night;
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
  softShadow.material.opacity = params.night ? 0 : 1;

  lights.hemi.intensity = params.night ? 0.32 : 1.9;
  lights.hemi.color.set(params.night ? 0x526b9f : 0xffffff);
  lights.hemi.groundColor.set(params.night ? 0x050712 : 0xd8e3ee);
  lights.sun.intensity = params.night ? 0.42 : 3.2;
  lights.sun.color.set(params.night ? 0x8bb8ff : 0xffffff);
  lights.rim.intensity = params.night ? 2.3 : 1.25;
  lights.rim.color.set(params.night ? 0x7fb2ff : 0x9ac8ff);
  refreshMaterial();
  applyCinemaLight();
}

function applyCinemaLight() {
  const angle = THREE.MathUtils.degToRad(params.lightDirection);
  const range = params.lightRange;
  const boat = cinemaSet.userData.boat;
  const beam = cinemaSet.userData.beam;
  const enabled = params.night && params.boatLight;

  boat.userData.lightAnchor.getWorldPosition(boatLightSource);
  boatLightTarget.set(Math.sin(angle) * 1.65, -0.42, 0.1);

  lights.projectorTarget.position.copy(boatLightTarget);
  lights.projectorSpot.position.copy(boatLightSource);
  lights.projectorSpot.distance = range + 1.8;
  lights.projectorSpot.angle = THREE.MathUtils.clamp(0.14 + params.lightSize * 0.09, 0.18, 0.34);
  lights.projectorSpot.penumbra = 0.92;
  lights.projectorSpot.intensity = enabled ? params.lightStrength * 0.34 : 0;
  lights.projectorSpot.color.set(0xffd9a4);
  lights.boatPoint.position.copy(boatLightSource);
  lights.boatPoint.intensity = enabled ? 0.55 + params.lightStrength * 0.28 : 0;

  boatLightDirection.copy(boatLightTarget).sub(boatLightSource);
  beam.visible = enabled;
  beam.position.copy(boatLightSource).addScaledVector(boatLightDirection, 0.5);
  beam.scale.set(params.lightSize * 0.42, boatLightDirection.length(), params.lightSize * 0.42);
  beam.quaternion.setFromUnitVectors(boatLightAxis, boatLightDirection.normalize());
  beam.material.opacity = enabled ? THREE.MathUtils.clamp(params.lightStrength * 0.036, 0.018, 0.12) : 0;

  screenGlow.visible = enabled;
  screenGlow.position.set(boatLightTarget.x, boatLightTarget.y, 0.13);
  screenGlow.scale.setScalar(THREE.MathUtils.clamp(0.72 + params.lightSize * 0.58, 0.72, 1.95));
  screenGlow.material.opacity = enabled ? THREE.MathUtils.clamp(params.lightStrength * 0.045, 0.025, 0.12) : 0;
}

function updateCinemaSet(delta, elapsed) {
  if (!params.night) return;

  const { ocean, oceanBase, oceanPhases, boat } = cinemaSet.userData;
  const positionAttribute = ocean.geometry.attributes.position;
  const positions = positionAttribute.array;
  for (let i = 0; i < positionAttribute.count; i += 1) {
    const p = i * 3;
    const x = oceanBase[p];
    const y = oceanBase[p + 1];
    positions[p + 2] =
      Math.sin(elapsed * 0.72 + x * 0.42 + oceanPhases[i]) * 0.08 +
      Math.sin(elapsed * 1.08 + y * 0.5 + oceanPhases[i] * 0.7) * 0.035;
  }
  positionAttribute.needsUpdate = true;

  const tide = Math.sin(elapsed * 0.82) * 0.08 + Math.sin(elapsed * 1.7 + 0.6) * 0.025;
  boat.position.y = boat.userData.baseY + tide;
  boat.rotation.x = Math.sin(elapsed * 0.76 + 0.5) * 0.06;
  boat.rotation.z = Math.sin(elapsed * 1.05) * 0.075;

  updateGulls(delta, elapsed);
  applyCinemaLight();
}

function updateGulls(delta, elapsed) {
  gulls.forEach((gull, index) => {
    const side = gull.userData.wingSide;
    const wingFlap = Math.sin(elapsed * 5.4 + gull.userData.phase) * 0.46;
    gull.position.y = gull.userData.baseY + Math.sin(elapsed * 1.25 + index) * 0.025;
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
  stars.moon.material.opacity = 0.55 + params.starGlow * 0.18;

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
