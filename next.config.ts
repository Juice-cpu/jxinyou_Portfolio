import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // export 构建内部仍使用 .next；开发缓存单独放在 .next-dev。
  // NEXT_BUILD_DIR 在 export 模式下指定最终静态导出目录。
  distDir: process.env.NEXT_BUILD_DIR || ".next-dev",
  // 自定义域名部署在根路径；GitHub Pages 项目站可设置 /Portfolio。
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
