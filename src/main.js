import * as THREE from "three";
import html2canvas from "html2canvas";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
const contentScrollInput = document.querySelector("#content-scroll");
const autoplayInput = document.querySelector("#autoplay");
const fanXInput = document.querySelector("#fan-x");
const fanYInput = document.querySelector("#fan-y");
const fanZInput = document.querySelector("#fan-z");
const fanDirectionInput = document.querySelector("#fan-direction");
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

const translations = {
  en: {
    "ui.title": "HTML in Canvas",
    "ui.hero": "Hero",
    "ui.performance": "Performance",
    "ui.docs": "Docs",
    "ui.upload": "Upload Media",
    "ui.reset": "HTML",
    "ui.wind": "Wind",
    "ui.foil": "Foil",
    "ui.pull": "Cursor pull",
    "ui.night": "Night cinema",
    "ui.contentControls": "Curtain content",
    "ui.contentScroll": "Content scroll",
    "ui.autoplay": "Auto text",
    "ui.fanControls": "Fan coordinates",
    "ui.fanDirection": "Direction",
    "ui.lightControls": "Cinema light",
    "ui.lightDirection": "Light dir",
    "ui.lightSize": "Light size",
    "ui.lightStrength": "Strength",
    "ui.lightRange": "Range",
    "ui.starGlow": "Star glow",
    "ui.controls": "Controls",
    "status.html": "Live HTML texture",
    "status.media": "Media texture",
    "status.video": "Video texture",
    "status.capture": "DOM recaptured",
    "status.scroll": "Scroll captured",
    "status.fallback": "Fallback texture",
    "status.loading": "Loading media",
    "source.brand": "HTML in Canvas",
    "source.nav.overview": "Overview",
    "source.nav.performance": "Performance",
    "source.nav.docs": "Documentation",
    "home.eyebrow": "WICG experiment",
    "home.title": "HTML in Canvas.",
    "home.lead": "Experience true, artifact-free DOM rendering directly inside your WebGL scenes. Zero hacks. Uncompromising performance.",
    "home.button": "View Proposal",
    "home.featureA.title": "Seamless Integration",
    "home.featureA.body": "Native layout, CSS painting, and browser accessibility become a texture you can bend, light, and compose in 3D.",
    "home.featureB.title": "Real-time Interaction",
    "home.featureB.body": "Pointer, wheel, and responsive layout state can be projected into your spatial interface without leaving the DOM model.",
    "performance.eyebrow": "Frame budget",
    "performance.title": "Designed for Performance.",
    "performance.lead": "Built to run at 60FPS. The layout pass only runs when browser state changes, keeping your shader work free for atmosphere.",
    "performance.metricA": "DOM paint capture",
    "performance.metricB": "cloth vertices",
    "performance.metricC": "constraint passes",
    "performance.featureA.title": "Native Quality",
    "performance.featureA.body": "Because the page is still HTML, typography remains crisp before it is sampled into a physical surface.",
    "performance.featureB.title": "GPU Friendly",
    "performance.featureB.body": "After capture, the page becomes an ordinary texture that can use reflections, normals, shadows, and post effects.",
    "docs.eyebrow": "Draft API",
    "docs.title": "DOM nodes as pixels.",
    "docs.lead": "A canvas texture can represent a living section of the document, carrying browser layout into physically based rendering.",
    "docs.linkA": "Paint lifecycle",
    "docs.linkB": "Pointer projection",
    "docs.linkC": "Accessibility",
    "docs.linkD": "GPU upload path",
  },
  zh: {
    "ui.title": "画布中的 HTML",
    "ui.hero": "主页",
    "ui.performance": "性能",
    "ui.docs": "文档",
    "ui.upload": "上传媒体",
    "ui.reset": "HTML",
    "ui.wind": "风力",
    "ui.foil": "镀膜",
    "ui.pull": "鼠标牵引",
    "ui.night": "星空影院",
    "ui.contentControls": "幕布内容",
    "ui.contentScroll": "内容滚动",
    "ui.autoplay": "自动播放",
    "ui.fanControls": "风扇坐标",
    "ui.fanDirection": "风向角度",
    "ui.lightControls": "影院灯光",
    "ui.lightDirection": "灯光方向",
    "ui.lightSize": "光束大小",
    "ui.lightStrength": "强弱",
    "ui.lightRange": "范围",
    "ui.starGlow": "星光浪漫度",
    "ui.controls": "控制",
    "status.html": "实时 HTML 纹理",
    "status.media": "媒体纹理",
    "status.video": "视频纹理",
    "status.capture": "DOM 已重新捕获",
    "status.scroll": "滚动已捕获",
    "status.fallback": "备用纹理",
    "status.loading": "正在载入媒体",
    "source.brand": "画布中的 HTML",
    "source.nav.overview": "概览",
    "source.nav.performance": "性能",
    "source.nav.docs": "文档",
    "home.eyebrow": "WICG 实验",
    "home.title": "画布中的 HTML。",
    "home.lead": "把真实 DOM 直接放进 WebGL 场景。少一点障眼法，多一点原生质感和稳定性能。",
    "home.button": "查看提案",
    "home.featureA.title": "无缝融合",
    "home.featureA.body": "原生布局、CSS 绘制和浏览器可访问性会变成一块可以弯曲、受光、组合的 3D 纹理。",
    "home.featureB.title": "实时交互",
    "home.featureB.body": "指针、滚轮和响应式状态会投射到空间界面里，同时保留 DOM 的工作方式。",
    "performance.eyebrow": "帧预算",
    "performance.title": "为性能而设计。",
    "performance.lead": "目标是 60FPS。只有浏览器状态变化时才更新布局，把更多时间留给光照和物理效果。",
    "performance.metricA": "DOM 绘制捕获",
    "performance.metricB": "布料顶点",
    "performance.metricC": "约束迭代",
    "performance.featureA.title": "原生质量",
    "performance.featureA.body": "页面仍然是 HTML，所以文字在被采样进物理表面之前保持清晰。",
    "performance.featureB.title": "GPU 友好",
    "performance.featureB.body": "捕获后，页面就是普通纹理，可以叠加反射、法线、阴影和后期效果。",
    "docs.eyebrow": "草案 API",
    "docs.title": "DOM 节点变成像素。",
    "docs.lead": "一块 canvas 纹理可以代表文档里正在变化的区域，把浏览器布局带进物理渲染。",
    "docs.linkA": "绘制生命周期",
    "docs.linkB": "指针投射",
    "docs.linkC": "可访问性",
    "docs.linkD": "GPU 上传路径",
  },
  ja: {
    "ui.title": "Canvas 内の HTML",
    "ui.hero": "ヒーロー",
    "ui.performance": "性能",
    "ui.docs": "ドキュメント",
    "ui.upload": "メディア追加",
    "ui.reset": "HTML",
    "ui.wind": "風量",
    "ui.foil": "箔感",
    "ui.pull": "カーソル牽引",
    "ui.night": "星空シネマ",
    "ui.contentControls": "スクリーン内容",
    "ui.contentScroll": "内容スクロール",
    "ui.autoplay": "自動再生",
    "ui.fanControls": "扇風機座標",
    "ui.fanDirection": "風向き",
    "ui.lightControls": "シネマ照明",
    "ui.lightDirection": "照明方向",
    "ui.lightSize": "光の大きさ",
    "ui.lightStrength": "強さ",
    "ui.lightRange": "範囲",
    "ui.starGlow": "星の輝き",
    "ui.controls": "操作",
    "status.html": "ライブ HTML テクスチャ",
    "status.media": "メディアテクスチャ",
    "status.video": "動画テクスチャ",
    "status.capture": "DOM を再キャプチャ",
    "status.scroll": "スクロールを反映",
    "status.fallback": "代替テクスチャ",
    "status.loading": "メディア読み込み中",
    "source.brand": "Canvas 内の HTML",
    "source.nav.overview": "概要",
    "source.nav.performance": "性能",
    "source.nav.docs": "資料",
    "home.eyebrow": "WICG 実験",
    "home.title": "Canvas 内の HTML。",
    "home.lead": "本物の DOM を WebGL シーンに直接描画。ごまかしを減らし、自然な質感と安定した性能へ。",
    "home.button": "提案を見る",
    "home.featureA.title": "自然な統合",
    "home.featureA.body": "ネイティブレイアウト、CSS ペイント、アクセシビリティが、曲げて照らせる 3D テクスチャになります。",
    "home.featureB.title": "リアルタイム操作",
    "home.featureB.body": "ポインター、ホイール、レスポンシブ状態を空間 UI に投影しながら、DOM の流れを保ちます。",
    "performance.eyebrow": "フレーム予算",
    "performance.title": "性能のための設計。",
    "performance.lead": "60FPS を目指します。レイアウト更新は状態変化時だけに絞り、光と物理に時間を残します。",
    "performance.metricA": "DOM ペイント取得",
    "performance.metricB": "布の頂点",
    "performance.metricC": "制約パス",
    "performance.featureA.title": "ネイティブ品質",
    "performance.featureA.body": "ページは HTML のままなので、物理表面へサンプリングされる前の文字は鮮明です。",
    "performance.featureB.title": "GPU にやさしい",
    "performance.featureB.body": "取得後のページは通常のテクスチャとして、反射、法線、影、ポスト効果を使えます。",
    "docs.eyebrow": "ドラフト API",
    "docs.title": "DOM ノードをピクセルへ。",
    "docs.lead": "canvas テクスチャが文書内の生きた領域を表し、ブラウザレイアウトを物理レンダリングへ運びます。",
    "docs.linkA": "描画ライフサイクル",
    "docs.linkB": "ポインター投影",
    "docs.linkC": "アクセシビリティ",
    "docs.linkD": "GPU アップロード",
  },
};

const params = {
  wind: Number(windInput.value),
  foil: Number(foilInput.value),
  pull: pullInput.checked,
  night: nightInput.checked,
  autoplay: autoplayInput.checked,
  lang: "en",
  scroll: Number(contentScrollInput.value),
  fanDirection: Number(fanDirectionInput.value),
  lightDirection: Number(lightDirectionInput.value),
  lightSize: Number(lightSizeInput.value),
  lightStrength: Number(lightStrengthInput.value),
  lightRange: Number(lightRangeInput.value),
  starGlow: Number(starGlowInput.value),
  page: "home",
  textureSource: "html",
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

const fan = createFan();
fan.group.position.set(4.95, -1.28, 1.62);
fan.group.rotation.y = -Math.PI * 0.5;
scene.add(fan.group);

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

contentScrollInput.addEventListener("input", () => {
  setContentScroll(Number(contentScrollInput.value), true);
});

autoplayInput.addEventListener("change", () => {
  params.autoplay = autoplayInput.checked;
});

[fanXInput, fanYInput, fanZInput].forEach((input) => {
  input.addEventListener("input", () => {
    fan.group.position.set(Number(fanXInput.value), Number(fanYInput.value), Number(fanZInput.value));
  });
});

fanDirectionInput.addEventListener("input", () => {
  params.fanDirection = Number(fanDirectionInput.value);
  applyFanDirection();
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

function syncFanInputs() {
  fanXInput.value = fan.group.position.x.toFixed(2);
  fanYInput.value = fan.group.position.y.toFixed(2);
  fanZInput.value = fan.group.position.z.toFixed(2);
}

function applyFanDirection() {
  fan.group.rotation.y = THREE.MathUtils.degToRad(params.fanDirection);
}

function handlePointerDown(event) {
  if (event.button !== 0) return;
  raycaster.setFromCamera(pointer, camera);

  const fanHit = raycaster.intersectObject(fan.group, true)[0];
  if (fanHit) {
    beginFanDrag(event, fanHit.point);
    return;
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

function createFan() {
  const group = new THREE.Group();
  const white = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.36,
    metalness: 0.04,
    clearcoat: 0.64,
    envMapIntensity: 1.2,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xf6fbff,
    roughness: 0.08,
    metalness: 0.02,
    transparent: true,
    opacity: 0.27,
    clearcoat: 1,
  });
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0xd8e2ec, transparent: true, opacity: 0.42 });

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
    color: 0xe9f5ff,
    roughness: 0.14,
    metalness: 0,
    transparent: true,
    opacity: 0.52,
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

  const benchMaterial = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.82, metalness: 0.05 });
  const projectorMaterial = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.46, metalness: 0.22 });
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0x9bc7ff,
    transparent: true,
    opacity: 0.08,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  for (let row = 0; row < 3; row += 1) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(7.6 - row * 0.48, 0.08, 0.16), benchMaterial);
    bench.position.set(0, -2.46 + row * 0.03, 4.8 + row * 0.56);
    bench.castShadow = true;
    group.add(bench);
  }

  const projector = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.26, 0.62), projectorMaterial);
  projector.position.set(-3.6, -2.34, 5.42);
  projector.castShadow = true;
  group.add(projector);

  const beam = new THREE.Mesh(new THREE.ConeGeometry(1.45, 4.6, 4, 1, true), beamMaterial);
  beam.position.set(-2.45, -1.35, 3.35);
  beam.rotation.x = Math.PI * 0.5;
  beam.rotation.z = Math.PI * 0.25;
  group.add(beam);
  group.userData.projector = projector;
  group.userData.beam = beam;

  return group;
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

  return { hemi, sun, rim, projectorSpot, projectorTarget };
}

function setPage(page) {
  params.page = page;
  params.textureSource = "html";
  stopMediaTexture();
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
  uploadInput.value = "";
  stopMediaTexture();
  refreshHtmlTexture();
}

function setMediaFile(file) {
  params.textureSource = "media";
  stopMediaTexture();
  setStatus("status.loading");

  const url = URL.createObjectURL(file);
  mediaUrl = url;

  if (file.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.addEventListener(
      "loadeddata",
      async () => {
        mediaElement = video;
        await video.play().catch(() => {});
        if ("requestVideoFrameCallback" in video) {
          await new Promise((resolve) => video.requestVideoFrameCallback(resolve));
        }
        const texture = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        videoTexture = texture;
        setClothTexture(texture);
        setStatus("status.video");
      },
      { once: true },
    );
    video.load();
    return;
  }

  const image = new Image();
  image.onload = () => {
    const texture = new THREE.Texture(image);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
    setClothTexture(texture);
    setStatus("status.media");
  };
  image.src = url;
  mediaElement = image;
}

function setClothTexture(texture) {
  const oldTexture = cloth.material.map;
  cloth.material.map = texture;
  cloth.material.needsUpdate = true;
  pageTexture = texture;
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
    cloth.material.needsUpdate = true;
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
  ctx.font = "800 92px Inter, sans-serif";
  ctx.fillText("HTML in Canvas.", 240, 365);
  ctx.fillStyle = "#3f4651";
  ctx.font = "500 28px Inter, sans-serif";
  ctx.fillText("DOM rendered to a physical WebGL cloth surface.", 260, 426);
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function refreshMaterial() {
  cloth.material.metalness = THREE.MathUtils.lerp(0.02, 0.28, params.foil);
  cloth.material.roughness = THREE.MathUtils.lerp(0.48, 0.16, params.foil);
  cloth.material.envMapIntensity = THREE.MathUtils.lerp(0.72, 1.55, params.foil);
  cloth.material.clearcoat = THREE.MathUtils.lerp(0.55, 1, params.foil);
  cloth.material.clearcoatRoughness = THREE.MathUtils.lerp(0.24, 0.08, params.foil);
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
      const fineRipple = Math.sin(elapsed * 4.8 + u * 12.5 + v * 6.1 + phase[i]) * 0.075;
      const broadRipple = Math.sin(elapsed * 2.0 + u * 4.8 - v * 3.8) * 0.12;
      const bottomCurl = lowerBand * lowerBand * Math.sin(elapsed * 3.4 + u * 10.0) * 0.26;
      const fanDistance = Math.hypot((original[p] - fanLocal.x) * 0.38, (original[p + 1] - fanLocal.y) * 0.72);
      const fanInfluence = smoothstep(5.8, 0.3, fanDistance);
      const wind = params.wind * pulse * (0.48 + fanInfluence * 0.92);

      const targetX =
        original[p] +
        windX * wind * verticalBand * (0.16 + rightBand * 0.5) -
        windX * wind * leftBand * lowerBand * 0.18 +
        broadRipple * wind * verticalBand * 0.18;
      const targetY =
        original[p + 1] -
        0.3 * v * v -
        lowerBand * wind * 0.22 +
        Math.sin(elapsed * 2.9 + u * 7.2) * verticalBand * wind * 0.035;
      const targetZ =
        original[p + 2] +
        wind * windDepth * verticalBand * (0.52 + rightBand * 0.78) +
        lowerBand * wind * 0.34 +
        fineRipple * wind +
        bottomCurl * wind;

      positions[p] = px + vx * 0.82 + (targetX - px) * 0.058;
      positions[p + 1] = py + vy * 0.82 + (targetY - py) * 0.058 + clothConfig.gravity * dt;
      positions[p + 2] = pz + vz * 0.82 + (targetZ - pz) * 0.065;

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
    if (positions[p + 1] < -2.5) {
      positions[p + 1] = -2.5;
      previous[p + 1] = -2.48;
    }
    positions[p] = THREE.MathUtils.clamp(positions[p], -5.0, 5.0);
    positions[p + 2] = THREE.MathUtils.clamp(positions[p + 2], -0.65, 3.0);
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
    clothRig.scale.setScalar(0.75);
    clothRig.position.set(0, -0.28, 0);
    camera.fov = 42;
    camera.position.set(0.1, 0.24, 18.5);
    controls.target.set(0, -0.06, 0.4);
    controls.minDistance = 11;
    controls.maxDistance = 24;
  } else {
    clothRig.scale.setScalar(1);
    clothRig.position.set(0, 0, 0);
    camera.fov = 38;
    camera.position.set(0, 1.2, 10.8);
    controls.target.set(0, 0.15, 0);
    controls.minDistance = 6.3;
    controls.maxDistance = 15.5;
  }
  camera.updateProjectionMatrix();
}

function applyNightMode() {
  document.body.classList.toggle("is-night", params.night);
  stars.points.visible = params.night;
  stars.moon.visible = params.night;
  cinemaSet.visible = params.night;
  scene.background = new THREE.Color(params.night ? 0x080d1a : 0xeef1f3);
  scene.fog = new THREE.Fog(params.night ? 0x080d1a : 0xeef1f3, params.night ? 7 : 13, params.night ? 24 : 27);
  renderer.toneMappingExposure = params.night ? 0.88 : 1.08;

  floor.material.color.set(params.night ? 0x101827 : 0xe9eef2);
  floor.material.roughness = params.night ? 1 : 0.92;
  softShadow.material.opacity = params.night ? 0.28 : 1;

  lights.hemi.intensity = params.night ? 0.32 : 1.9;
  lights.hemi.color.set(params.night ? 0x526b9f : 0xffffff);
  lights.hemi.groundColor.set(params.night ? 0x050712 : 0xd8e3ee);
  lights.sun.intensity = params.night ? 0.42 : 3.2;
  lights.sun.color.set(params.night ? 0x8bb8ff : 0xffffff);
  lights.rim.intensity = params.night ? 2.3 : 1.25;
  lights.rim.color.set(params.night ? 0x7fb2ff : 0x9ac8ff);
  applyCinemaLight();
}

function applyCinemaLight() {
  const angle = THREE.MathUtils.degToRad(params.lightDirection);
  const source = new THREE.Vector3(-3.6, -2.15, 5.1);
  const range = params.lightRange;
  const target = new THREE.Vector3(Math.sin(angle) * range * 0.42, -0.42, source.z - range * 0.78);
  const beam = cinemaSet.userData.beam;

  lights.projectorTarget.position.copy(target);
  lights.projectorSpot.position.copy(source);
  lights.projectorSpot.distance = range + 3;
  lights.projectorSpot.angle = THREE.MathUtils.clamp(0.18 + params.lightSize * 0.16, 0.18, 0.55);
  lights.projectorSpot.penumbra = 0.72;
  lights.projectorSpot.intensity = params.night ? params.lightStrength * 1.9 : 0;
  lights.projectorSpot.color.set(params.night ? 0xaed3ff : 0xffffff);

  const direction = target.clone().sub(source);
  beam.position.copy(source).addScaledVector(direction, 0.5);
  beam.scale.set(params.lightSize, direction.length() / 4.6, params.lightSize);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  beam.material.opacity = params.night ? THREE.MathUtils.clamp(params.lightStrength * 0.055, 0.02, 0.22) : 0;
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
  updateStars(delta, elapsed);
  fan.bladeGroup.rotation.z -= delta * (18 + params.wind * 44);
  fan.group.rotation.z = Math.sin(elapsed * 1.5) * 0.025;
  controls.update();
  renderer.render(scene, camera);
  updateFps();
  requestAnimationFrame(animate);
}

animate();
