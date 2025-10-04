<h1 align="center">
UniApp Vue3 TypeScript 模板
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/UniApp-3.0+-brightgreen" alt="UniApp">
  <img src="https://img.shields.io/badge/Vue-3.x-brightgreen" alt="Vue3">
  <img src="https://img.shields.io/badge/Vite-5.x-646cff.svg" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/UnoCSS-latest-8D66FE.svg" alt="UnoCss">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
</p>

## 简介

这是一个基于 UniApp + Vue 3 + TypeScript + Vite 的现代化跨平台应用开发模板，集成了多种实用工具和最佳实践，适用于快速开发iOS、Android、H5、小程序等多端应用。此模板在uniapp官方模板[vite-ts](https://github.com/dcloudio/uni-preset-vue/tree/vite-ts)上进行加强。

## 文档



## 技术栈

- [UniApp](https://uniapp.dcloud.io/) - 跨平台应用开发框架
- [Vue 3](https://v3.vuejs.org/) - 渐进式 JavaScript 框架，使用 Composition API
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，添加了静态类型
- [Vite](https://vitejs.dev/) - 快速的构建工具，提供极速的开发体验
- [EditorConfig](https://editorconfig.org/) - 跨编辑器和IDE的代码格式一致性工具
- [Prettier](https://prettier.io/) - 代码格式化工具
- [ESLint](https://eslint.org/) - JavaScript/TypeScript代码检查工具
- [Stylelint](https://stylelint.io/) - CSS/SCSS代码检查工具
- [Husky](https://typicode.github.io/husky/) - Git hooks工具
- [Lint-staged](https://github.com/okonet/lint-staged) - 对暂存的git文件运行linters的工具
- [Commitlint](https://commitlint.js.org/) - Git commit信息校验工具
- [UnoCSS](https://unocss.dev/) - 即时按需原子 CSS 引擎
- [Pinia](https://pinia.vuejs.org/) - Vue 的轻量级状态管理库
- [Day.js](https://day.js.org/) - 轻量级日期处理库
- [Lodash](https://lodash.com/) - JavaScript 工具库
- [z-paging](https://github.com/SmileZXLee/uniapp-z-paging) - UniApp 下拉刷新和上拉加载插件
- [Auto Import](https://github.com/antfu/unplugin-auto-import) - 自动按需导入 API
- [dcloudio/uni-preset-vue](https://github.com/dcloudio/uni-preset-vue/tree/vite-ts) - UniApp官方vue3-ts模板

## 功能演示页面

项目包含了多个功能演示页面：

- 首页 (index)
- 功能演示列表 (demo)
- Pinia 状态管理演示 (pinia)
- UnoCSS 样式演示 (unocss)
- Day.js 日期处理演示 (dayjs)
- z-paging 分页组件演示 (zpaging)
- Lodash 工具库演示 (lodash)
- 网络请求演示 (request)

## 演示效果

![](./demo.gif)

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm (推荐) / npm / yarn
- vcode

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
# 启动 H5 开发环境
pnpm run dev:h5

# 启动微信小程序开发环境
pnpm run dev:mp-weixin

# 启动其他平台（将PLATFORM替换为对应平台标识）
pnpm run dev:PLATFORM
```

### 构建项目

```bash
# 构建 H5
pnpm run build:h5

# 构建微信小程序
pnpm run build:mp-weixin

# 构建其他平台（将PLATFORM替换为对应平台标识）
pnpm run build:PLATFORM
```

### 其他命令

```bash
# TypeScript 类型检查
pnpm run type-check

# 清理 node_modules
pnpm run clean

# 清理缓存
pnpm run clean:cache

# ESLint 代码检查并自动修复
pnpm run lint:eslint

# Prettier 代码格式化
pnpm run lint:prettier

# Stylelint 样式检查并自动修复
pnpm run lint:stylelint
```

## 项目结构

```
src/
├── pages/           # 页面组件
│   ├── index/       # 首页
│   ├── demo/        # 功能演示列表
│   ├── pinia/       # Pinia 状态管理演示
│   ├── unocss/      # UnoCSS 样式演示
│   ├── dayjs/       # Day.js 日期处理演示
│   ├── zpaging/     # z-paging 分页组件演示
│   ├── lodash/      # Lodash 工具库演示
│   └── request/     # 网络请求演示
├── stores/          # Pinia 状态管理
│   ├── modules/     # 状态模块
│   └── index.ts     # 状态管理入口
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
├── App.vue          # 根组件
├── main.ts          # 入口文件
├── pages.json       # 页面路由配置
├── manifest.json    # 应用配置
└── uni.scss         # 全局样式
```

## 开发规范

### 代码规范

1. 使用TypeScript进行开发，充分利用类型系统提高代码质量
2. 遵循ESLint和Prettier规则，保持代码风格统一
3. 使用Composition API编写Vue组件
4. 组件命名遵循PascalCase规范
5. 变量命名遵循camelCase规范

### Git提交规范

项目使用Commitlint校验提交信息，提交信息需遵循[Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)规范：

```bash
# 提交格式
<type>[optional scope]: <description>

# 示例
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 目录规范

1. 页面组件统一放在`src/pages`目录下，每个页面一个独立文件夹
2. 工具函数放在`src/utils`目录下
3. 全局状态管理放在`src/stores`目录下
4. 类型定义放在`src/types`目录下

### 样式规范

1. 使用UnoCSS原子化CSS框架，提高开发效率
2. 样式命名遵循BEM规范
3. 全局样式变量定义在`src/uni.scss`中

## 许可证

[MIT](./LICENSE)