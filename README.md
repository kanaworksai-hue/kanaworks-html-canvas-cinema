# Outdoor Cinema

[日本語](#ja) | [English](#en) | [中文](#zh)

Live demo: [https://kanaworksai-hue.github.io/kanaworks-html-canvas-cinema/](https://kanaworksai-hue.github.io/kanaworks-html-canvas-cinema/)

Repository: [https://github.com/kanaworksai-hue/kanaworks-html-canvas-cinema](https://github.com/kanaworksai-hue/kanaworks-html-canvas-cinema)

---

<a id="ja"></a>

## 日本語

**屋外シネマ** は、Three.js で作られたインタラクティブな 3D デモです。画像、動画、PPT、または案内ページを布のスクリーンに投影し、扇風機の風でスクリーンが揺れる屋外映画館のようなシーンを体験できます。

### 使い方

1. [公開ページ](https://kanaworksai-hue.github.io/kanaworks-html-canvas-cinema/) を開きます。
2. `メディア追加` を押して、画像、動画、または PPT / PPTX ファイルをアップロードします。
3. `扇風機操作` で、風量、風向き、扇風機の X / Y / Z 座標を調整します。
4. 3D 軸ハンドルをドラッグすると、扇風機をシーン内で直接移動できます。
5. スクリーンをマウスまたはタッチでドラッグすると、布を手で引っ張るように変形できます。
6. `下端を固定` をオンにするとスクリーン下部が固定され、オフにすると風で大きく揺れます。
7. 動画をアップロードした場合は、`動画再生`、`最初から`、`ミュート` で再生を操作できます。
8. `空白モード / 星空シネマ` ボタンで、通常表示と星空の屋外シネマを切り替えます。
9. 月と星の設定で、月の色、明るさ、サイズ、光輪、星の色、動き、サイズ、明るさ、きらめきを調整できます。
10. `シーン小物` で、左右のカモメと木箱の表示、位置、回転、サイズを調整できます。

### ローカルで実行

```bash
bun install
bun run dev
```

起動後、ブラウザで [http://127.0.0.1:5173/](http://127.0.0.1:5173/) を開きます。

---

<a id="en"></a>

## English

**Outdoor Cinema** is an interactive Three.js demo that turns a flexible cloth screen into an open-air cinema. You can project guide content, images, videos, or PPT files onto the curtain, then use a movable fan to push and animate the fabric.

### How To Use

1. Open the [live demo](https://kanaworksai-hue.github.io/kanaworks-html-canvas-cinema/).
2. Click `Upload Media` to add an image, video, or PPT / PPTX file.
3. Use `Fan controls` to adjust wind strength, fan direction, and the fan's X / Y / Z position.
4. Drag the 3D axis handles to move the fan directly inside the scene.
5. Drag the screen with your mouse or finger to pull and bend the cloth.
6. Turn on `Pin bottom edge` to lock the lower edge of the curtain, or turn it off to let the fabric fly more freely.
7. When a video is uploaded, use `Play video`, `Restart`, and `Mute` to control playback.
8. Use the `Blank mode / Night cinema` button to switch between the blank scene and the starry outdoor cinema scene.
9. Use the moon and star controls to adjust moon color, brightness, size, halo, star color, movement, size, brightness, and twinkle.
10. Use `Scene objects` to show, hide, move, rotate, scale, or reset the left gull, right gull, and wooden crate.

### Run Locally

```bash
bun install
bun run dev
```

Then open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser.

---

<a id="zh"></a>

## 中文

**户外影院** 是一个使用 Three.js 制作的交互式 3D 项目。你可以把说明页面、图片、视频或 PPT 投影到一块布幕上，再通过可以移动的电风扇吹动幕布，做出星空下露天电影院的效果。

### 使用方法

1. 打开 [在线演示页面](https://kanaworksai-hue.github.io/kanaworks-html-canvas-cinema/)。
2. 点击 `上传媒体`，上传图片、视频，或 PPT / PPTX 文件。
3. 在 `风扇控制` 中调整风力、风向，以及风扇的 X / Y / Z 坐标。
4. 拖动风扇身上的 3D 坐标轴，可以在场景里直接移动风扇。
5. 用鼠标或手指拖动幕布，可以像拉布一样让幕布变形。
6. 打开 `固定幕布下方` 时，幕布底部会被固定；关闭后，幕布可以被风吹得更自由。
7. 上传视频后，可以使用 `继续播放 / 暂停视频`、`重新播放`、`静音 / 取消静音` 控制视频。
8. 点击 `空白模式 / 星空影院`，可以在普通模式和星空露天影院模式之间切换。
9. 在月亮和星星参数中，可以调整月亮颜色、亮度、大小、光晕，以及星星颜色、移动速度、大小、亮度和闪烁强度。
10. 在 `场景物体` 中，可以显示、隐藏、移动、旋转、缩放或重置左海鸥、右海鸥和木箱。

### 本地运行

```bash
bun install
bun run dev
```

启动后，在浏览器打开 [http://127.0.0.1:5173/](http://127.0.0.1:5173/)。
