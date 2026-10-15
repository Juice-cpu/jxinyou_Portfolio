# 江心悠的个人网站

此文件夹同时保存网站源码和 GitHub Pages 网页文件；以后直接在这个文件夹修改和上传，不需要另解压上传包。

## 修改内容

- `src/data/portfolio.ts`：个人信息、项目、奖项、专利。
- `src/components/Portfolio.tsx`：页面结构。
- `src/app/globals.css`：排版、字体、手机适配。
- `public/images/`：照片、GIF、证书。修改图片请修改此处，不要只改根目录的 `images/`。

排版参考 [何泰然的主页](https://tairanhe.com/)，保留个人内容；页脚保留参考链接。

## 本地预览

首次运行 `npm ci`，然后 `npm run dev -- --hostname 127.0.0.1 --port 3000`，打开 `http://127.0.0.1:3000/`。

## 更新 GitHub

每次修改源码后，在本文件夹执行：

```sh
npm run prepare:github
git status
git add src public scripts package.json README.md next.config.ts tsconfig.json index.html index.txt 404.html _next images videos resume.docx resume.pdf .nojekyll
git commit -m "Update personal website"
git -c http.proxy=http://127.0.0.1:7897 push origin main
```

最后一条沿用此前成功的 Clash 代理配置；不需要代理时可用 `git push origin main`。

`prepare:github` 会构建适配 `/jxinyou_Portfolio` 的网站，并更新仓库根目录网页文件，不删除旧文件、不改 `.git`，不自动提交或上传。

Pages 保持 `main` 分支、`/(root)`。部署地址：<https://juice-cpu.github.io/jxinyou_Portfolio/>。

若以后绑定自定义域名，需要改为根路径构建；当前没有配置域名或更改线上设置。
