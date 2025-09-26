# 二次开发规范指南 (Custom Development Guide)

## 1. 引言

本文档旨在为本项目提供一套标准的二次开发流程和架构原则。遵循本指南将帮助我们：

1.  **可持续地进行二次开发**：在项目原有功能基础上，安全地添加自定义功能或进行修改。
2.  **最小化代码冲突**：确保在与上游（原始）仓库同步时，代码合并的冲突风险降至最低。
3.  **保持代码清晰**：清晰地分离原始代码与二次开发代码，提高项目的可维护性。

所有在本项目的二次开发都**必须**遵循此指南。

## 2. 核心原则：优先扩展，而非修改 (Extend, Don't Modify)

这是我们所有开发工作的基石。我们应始终优先考虑通过**新增代码模块**来扩展功能，而不是直接修改已有的核心代码文件。

-   **这样做的好处**：上游仓库的更新绝大多数发生在核心文件中。只要我们不修改它们，就不会产生合并冲突。
-   **实践**：所有新功能、新页面、新组件都应在指定的 `custom` 目录中创建。

## 3. Git 工作流 (Git Workflow)

我们采用 `upstream -> main -> feature-branch` 的分支模型来管理代码。

### 3.1. 一次性设置：关联上游仓库

首先，需要将原始仓库添加为本地的一个远程，我们称之为 `upstream`。

```bash
# 1. 查看当前的远程仓库 (应已有 origin)
git remote -v

# 2. 添加原始仓库为 upstream (请将 URL 替换为真实地址)
git remote add upstream https://github.com/original-owner/original-repository.git

# 3. 再次查看，确认 upstream 已成功添加
git remote -v
```

### 3.2. 日常开发流程

#### 步骤 A：从上游同步更新

在开始任何新功能开发前，或当你希望获取上游更新时，执行以下操作：

```bash
# 1. 切换到主分支
git checkout main

# 2. 从 upstream 拉取最新代码并合并到本地 main 分支
git pull upstream main

# 3. 将更新后的 main 分支推送到你的 fork 仓库 (origin)
git push origin main
```

#### 步骤 B：创建特性分支进行二次开发

**严禁直接在 `main` 分支上进行任何开发。**

```bash
# 1. 从最新的 main 分支创建特性分支
#    分支名应清晰描述功能，例如: feature/add-user-profile
git checkout -b feature/your-feature-name

# 2. 在新分支上进行开发...
#    (git add, git commit)

# 3. 将特性分支推送到你的 fork 仓库
git push origin feature/your-feature-name
```

#### 步骤 C：合并你的功能

当特性分支开发完成并测试通过后，将其合并回 `main` 分支。

```bash
# 1. 切换回 main 分支
git checkout main

# 2. 再次同步上游，确保 main 是最新的 (重复步骤 A)
git pull upstream main

# 3. 合并你的特性分支
git merge feature/your-feature-name

# 4. 推送合并后的 main 到你的 fork 仓库
git push origin main
```

## 4. 架构策略 (Architectural Strategy)

为了实现“优先扩展，而非修改”的原则，我们采用以下架构策略：

### 4.1. 使用 `custom` 目录作为代码隔离区

-   **前端**: 所有新增的 React Native 组件、页面、Hooks、API 客户端等，都必须放在 `react-native/src/custom/` 目录下。
-   **后端**: 所有新增的 Python 路由、服务、工具函数等，都必须放在 `server/src/custom/` 目录下。

### 4.2. “覆写而非修改” (Override, Don't Edit)

当你**必须**修改一个现有组件或函数的行为时，遵循以下步骤：

1.  **不要**直接在原始文件上修改。
2.  将原始文件**复制**到对应的 `custom` 目录下。
3.  在复制的文件上进行修改。
4.  在代码的“集成点”（见 4.4）用你修改后的版本**替换**掉对原始版本的引用。

### 4.3. 使用中央配置文件进行微调

对于一些零散的、全局性的调整（如：API URL、主题颜色、应用名称、功能开关等），应在 `react-native/src/custom/` 目录下创建一个 `custom.config.ts` 文件进行统一管理。避免将这些值硬编码在核心代码中。

### 4.4. 管理“集成点” (Integration Points)

“集成点”是指我们为了加载自定义模块而必须修改的少数核心文件。例如：

-   React Navigation 的导航配置文件 (用于注册新页面)。
-   FastAPI/Flask 的主应用文件 (用于注册新路由)。
-   App 的主入口文件 (用于注入全局 Provider 或配置)。

**要求**：
-   对“集成点”的修改应尽可能少，通常只是几行导入和注册代码。
-   创建一个 `CHANGELOG.custom.md` 文件，清晰地记录下你修改了哪些核心文件作为“集成点”，以及修改的原因。这份文档在未来解决冲突时至关重要。

---
**遵循本指南是确保项目长期健康、可维护的关键。**
