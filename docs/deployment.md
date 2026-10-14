# 长期在线与自定义域名

网站已配置为静态导出，默认部署在根路径。`npm run build` 生成 `.next-build/`，可交给 Cloudflare Pages、Netlify、GitHub Pages 等静态托管平台。托管后不需要个人电脑开机，也不依赖本地开发服务器持续运行。

## 推荐：Cloudflare Pages

1. 登录 Cloudflare，在 Workers & Pages 创建 Pages 项目，选择直接上传静态文件。
2. 上传 `.next-build/` 中的内容，或本次交付的 `website-static.zip`（压缩包根目录包含 `index.html`）。旧 `out/` 是之前的产物，不能用来发布本次更新。
3. 发布后先使用平台提供的 `*.pages.dev` 地址访问。
4. 如已拥有 `jiangxinyou.com`，在该项目的自定义域中添加它，按平台提示配置域名 DNS 并等待 HTTPS 证书生效。根域接入 Cloudflare Pages 通常需要把域名的名称服务器切换到 Cloudflare；已有邮箱等 DNS 记录应完整保留。

平台入口与定价可能变化，以实际控制台为准。后续修改网站后重新构建并上传，或接入 Git 仓库自动部署。

## 域名

`jiangxinyou.com` 可以作为个人网站域名，但必须由本人拥有并维护。本次公开 RDAP 查询返回 404，暂未找到注册记录；能否购买以注册商结算时为准。用户尚未购买，本次未购买、绑定或发布该域名。注册商会显示能否注册及首年、续费价格；域名需要定期续费，免费托管不等于免费域名。若使用中国大陆服务器，通常需要按服务商要求完成 ICP 备案；实际要求取决于部署地区和服务商。

不要只在注册商中填写域名：先部署网站，再在托管项目中添加自定义域，最后按平台要求配置 DNS 和 HTTPS。不要在尚未获得域名时添加 GitHub Pages 的 CNAME 文件。

## 本地查看

```sh
npm run dev -- --hostname 127.0.0.1 --port 3003
```

地址为 `http://127.0.0.1:3003/`。本地地址只在电脑开机且服务运行时可用，不是长期公网网址。

## 构建

```sh
npm ci
npm run build
```

开发缓存使用 `.next-dev`。Next.js export 构建内部使用 `.next`，最终静态文件位于 `.next-build/`。构建和本地预览应使用相同的 `NEXT_PUBLIC_BASE_PATH`；自定义域名保持默认空值，GitHub Pages 项目站可设置 `/Portfolio`。
