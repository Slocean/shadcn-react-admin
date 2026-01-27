# Slash Admin

基于 React 19、Vite 6 和 shadcn/ui 构建的现代化后台管理系统模板。本项目专注于提供高效、类型安全且易于维护的代码架构，适合作为企业级中后台应用的基础框架。

## 🛠 技术栈

本项目采用目前前端生态中前沿且稳定的技术组合：

- **核心框架**: [React 19](https://react.dev/) - 利用最新的 Hooks 和并发特性。
- **构建工具**: [Vite 6](https://vitejs.dev/) - 极速的冷启动和热模块替换 (HMR)。
- **开发语言**: [TypeScript](https://www.typescriptlang.org/) - 全面的类型定义，提供优秀的开发体验和代码健壮性。
- **UI 框架**: [shadcn/ui](https://ui.shadcn.com/) - 基于 Radix UI 的无头组件库，配合 [Tailwind CSS v4](https://tailwindcss.com/) 实现高度可定制的样式。
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand) - 轻量级、无模板代码的全局状态管理方案。
- **路由管理**: [React Router v7](https://reactrouter.com/) - 标准的 React 路由解决方案。
- **数据请求**: [TanStack Query (React Query)](https://tanstack.com/query/latest) - 强大的异步状态管理，处理数据获取、缓存和同步。
- **网络请求**: [Axios](https://axios-http.com/) - 经典的 HTTP 客户端，封装了拦截器和错误处理。
- **数据模拟**: [MSW (Mock Service Worker)](https://mswjs.io/) & [Faker.js](https://fakerjs.dev/) - 拦截请求层级的 Mock 方案，无需侵入业务代码。
- **国际化**: [i18next](https://www.i18next.com/) - 成熟的国际化解决方案。
- **代码规范**: [Biome](https://biomejs.dev/) - 集格式化和 Lint 于一体的高性能工具链。

## ✨ 功能特性

### 1. 路由与权限

- **双模路由支持**：
  - **前端静态路由**：路由配置在本地，适合简单项目。
  - **后端动态路由**：路由结构由后端 API 返回，支持基于角色的动态菜单生成。
- **细粒度权限控制**：
  - **页面级**：路由守卫 (AuthGuard) 自动拦截无权访问的路由。
  - **组件级**：提供 Permission 组件或 Hooks，控制按钮/元素的显示与禁用。

### 2. 主题与布局

- **多布局模式**：内置垂直 (Vertical)、水平 (Horizontal)、迷你 (Mini) 等多种侧边栏布局。
- **外观定制**：支持深色模式 (Dark Mode) 与浅色模式切换，可动态调整主题色、字体大小和圆角风格。
- **持久化配置**：用户的主题偏好自动保存至本地存储。

### 3. 工程化与开发体验

- **完整 Mock 体系**：基于 MSW 实现拦截式 Mock，开发阶段完全解耦后端接口。
- **类型安全**：全量 TypeScript 编写，核心模块均有严格的类型定义。
- **组件封装**：二次封装了常用的业务组件（如 Upload, Chart, Editor 等），简化调用。

## � 目录结构

```text
src/
├── _mock/           # Mock 数据定义与 MSW 处理程序
├── api/             # API 接口服务定义
├── assets/          # 静态资源 (图片、图标、字体)
├── components/      # 公共通用组件 (非业务相关)
├── hooks/           # 全局自定义 Hooks
├── layouts/         # 布局组件 (Dashboard, Simple 等)
├── locales/         # 国际化语言包
├── pages/           # 页面视图组件 (按路由结构组织)
├── router/          # 路由配置与守卫
├── store/           # Zustand 状态管理 Store
├── theme/           # 主题配置与样式 Token
├── utils/           # 工具函数库
├── App.tsx          # 应用根组件
├── global-config.ts # 全局配置文件
└── main.tsx         # 应用入口
```

## 🚀 快速开始

### 环境准备

- Node.js >= 20
- pnpm >= 9 (推荐)

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

服务默认运行在 `http://localhost:3001`。

### 构建生产版本

```bash
pnpm build
```

## 📝 Git 提交规范

本项目遵循 Conventional Commits 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式调整 (不影响逻辑)
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动
- `types`: 类型定义修改
