# 更新项目媒体

所有项目内容集中在 `src/data/portfolio.ts`。媒体文件存放在 `public/images/projects/`。

轮足机器人项目 `object-nav` 使用本地录屏生成的 GIF。更新时可替换文件，也可以更改 `media.src`。

```ts
media: {
  src: "/images/projects/object-navigation.gif",
  type: "gif",
  alt: "TITA 轮足机器人零样本物体导航仿真演示",
  poster: "/images/projects/object-navigation-poster.jpg",
}
```

GIF 在列表中循环播放，点击可放大。选择系统“减少动态效果”时，列表显示静态封面。

视频媒体使用 `type: "video"`；可选 `poster` 指定封面。现有代码使用原生播放控件，不自动播放带声音的视频。

卧安 onero A1 项目左侧使用用户提供的 28.4 秒 MP4 转成的本地 GIF，完整保留演示，以 480 像素宽、10 fps、128 色循环播放，点击可放大。静态封面为 `onero-arm-poster.jpg`，同时保留小红书演示链接。

# 本地启动与构建

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3002
```

浏览地址为 `http://127.0.0.1:3002/`。默认使用根路径，适合自定义域名和静态托管。若需要 GitHub Pages 项目子路径，启动与构建时统一设置 `NEXT_PUBLIC_BASE_PATH=/Portfolio`。

`npm run build` 的静态导出产物位于 `.next-build/`。Next.js export 模式内部构建仍使用 `.next`，开发缓存已单独放在 `.next-dev`，避免构建覆盖正在运行的开发模块。旧 `out/` 不是本次更新后的产物，请勿上传它。
