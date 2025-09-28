# 工程架构说明文档

本文档旨在详细阐述 SwiftChat 项目的工程架构，帮助开发人员快速理解项目结构、核心模块及其交互方式。

## 1. 项目概述

SwiftChat 是一个基于 React Native 的跨平台聊天应用，具备实时语音、文本消息、文件共享等功能。项目采用了前后端分离的架构，客户端负责用户交互与视图展示，服务端提供业务逻辑处理与数据存储。

## 2. 顶层目录结构

项目根目录包含以下几个核心部分：

```
.
├── assets/          # 存放应用的静态资源，如图片、动画等
├── react-native/    # React Native 客户端的核心代码
├── server/          # 后端服务的代码（具体结构待补充）
├── docs/            # 项目文档目录
├── ...              # 其他配置文件，如 README, LICENSE 等
```

-   **`assets/`**: 存储所有静态资源，按类型分组。
-   **`react-native/`**: 客户端的主体，包含了跨平台的 JavaScript/TypeScript 代码以及 iOS 和 Android 的原生代码。
-   **`server/`**: 后端服务的实现。

## 3. `react-native` 客户端架构

客户端是项目的核心，采用了 React Native 技术栈，实现了 iOS 和 Android 平台的代码复用。

### 3.1. 核心目录与文件

```
react-native/
├── src/                 # JS/TS 源码目录
├── ios/                 # iOS 原生项目代码
├── android/             # Android 原生项目代码
├── package.json         # 项目依赖与脚本配置
├── metro.config.js      # Metro Bundler 配置文件
├── babel.config.js      # Babel 编译配置文件
└── ...
```

### 3.2. JavaScript/TypeScript 源码 (`src/`)

`src/` 目录是应用逻辑的主要实现部分，其内部结构通常遵循功能或类型进行划分（具体结构需进一步分析 `src` 目录下的文件来确定，但典型的结构可能如下）：

-   **`components/`**: 可复用的 UI 组件。
-   **`screens/`**: 应用的各个页面或屏幕。
-   **`services/`**: 应用的服务层，处理 API 请求、数据管理等。
-   **`hooks/`**: 自定义的 React Hooks。
-   **`store/`**: 状态管理（如 Redux, MobX）的配置与实现。
-   **`navigation/`**: 页面导航的配置。
-   **`utils/`**: 工具函数。
-   **`types/`**: TypeScript 类型定义。

### 3.3. 原生平台代码 (`ios/` 和 `android/`)

为了实现一些 React Native 无法直接提供的功能（如特定的硬件访问、性能优化），项目包含了一些原生代码。

#### iOS (`ios/`)

-   **`SwiftChat.xcworkspace`**: iOS 项目的工作区文件，使用 Xcode 打开。
-   **`SwiftChat/`**: 主要的 Swift/Objective-C 源码目录。
-   **`Modules/`**: 存放原生模块，例如：
    -   **`VoiceChat/`**: 实现了语音聊天功能的原生模块。
    -   **`FilePaste/`**: 实现了文件粘贴功能的原生模块。
-   **`Services/`**: 存放原生服务，与原生模块进行交互。
-   **`Podfile`**: iOS 项目的依赖管理文件（CocoaPods）。

#### Android (`android/`)

-   **`app/`**: Android 应用模块。
-   **`app/src/main/java/com/aws/swiftchat/`**: 主要的 Java/Kotlin 源码目录。
-   **`build.gradle`**: Android 项目的构建配置文件（Gradle）。

## 4. `server` 服务端架构

服务端负责处理业务逻辑、数据持久化和 API 接口。

*（由于 `server/` 目录下的具体内容未知，此处暂时无法提供详细的架构说明。一旦 `server/` 目录的结构明确，将补充其微服务架构、数据库设计、API 路由等信息。）*

## 5. `assets` 静态资源

`assets/` 目录包含了应用中使用的所有静态文件，按用途分类：

-   **`animations/`**: Lottie 或其他动画文件。
-   **`images/`**: 图片资源。
-   **`fonts/`**: 自定义字体文件。

## 6. 热更新策略

项目采用 `react-native-ota-hot-update` 进行热更新。该方案允许通过服务端动态向客户端推送 JavaScript 包和资源文件的更新，从而实现不经过应用商店审核的快速迭代。

---
*该文档由 AI 根据项目结构自动生成。*
