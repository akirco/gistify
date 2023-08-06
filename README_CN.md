## 基于 Next.js 和 GitHub Gist 的博客

[English](./README.md)

### 项目简介

> 该项目是一个基于 Next.js 和 GitHub Gist 的博客系统。 TypeScript、JavaScript、TSX、JSON、JSON5、Python、Rust、Go、PHP、Lua、Shell、PowerShell、HTML、CSS 和 SCSS 代码段以代码块的形式展示。

对于 Markdown 和 MDX 文件，使用 next-mdx-remote 渲染成漂亮的网页。

> 此外，该博客系统还支持分类、标签和文章归档功能。评论功能目前正在测试中，并计划在后续版本中引入。同时，也计划同步 GitHub Gist 的收藏功能，实现博文收藏。

### 技术栈

Next.js
TypeScript
GitHub Gist

### 功能特点

支持多种语言的代码展示

使用 next-mdx-remote 渲染 Markdown 和 MDX 文件

支持分类、标签和文章归档

支持评论功能（正在测试中）

计划同步 GitHub Gist 的收藏功能

计划增强 mdx

### 安装和使用

- 克隆该项目
- vercel 创建 postgres 数据库
- 拉取环境变量

```shell
# 以下自定义
GITHUB_ID=
GITHUB_SECRET=
GITHUB_ACCESS_TOKEN=
GITHUB_API_BASEURL="https://api.github.com"、
# PIXABAY API KEY
PIXABAY_KEY=
# 封面图片直链
DEFAULT_COVER=
```

- 测试并部署

```shell
vercel --prod
```

- [博文书写规则，更多细节自己探索或联系我](https://gist.github.com/akirco/4543214ca7eeee637873f9cad20f545e)

### 贡献

欢迎对该项目进行贡献。如果您发现了问题或有改进的建议，请提交 issue 或者直接提供 Pull Request。

### 许可证

该项目基于 MIT 许可证 开源。
