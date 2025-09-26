# 自定义开发变更日志

本文档记录所有自定义开发的修改，特别是对核心文件的"集成点"修改，以便在与上游仓库同步时进行冲突解决。

## [2025-09-26] 设置页面跳转逻辑调整

### 需求描述
调整设置页跳转的逻辑，将业务逻辑从原本的设置页读取配置改为硬编码读取 OpenAI 的配置，旧的设置页面不再使用，改为跳转新的未来即将开发的设置页。

### 新增文件 (Custom 目录)
- `react-native/src/custom/config/hardcoded-config.ts` - 硬编码的 OpenAI 配置
- `react-native/src/custom/settings/NewSettingsScreen.tsx` - 新的设置页面组件

### 核心文件修改 (集成点)

#### 1. react-native/src/types/RouteTypes.ts
**修改原因**: 添加新设置页面的路由类型定义
**修改内容**:
- 在 `RouteParamList` 中添加 `NewSettings: NonNullable<unknown>;`

**具体变更**:
```typescript
// 原有代码
export type RouteParamList = {
  Bedrock: { sessionId?: number; tapIndex?: number; mode?: ChatMode; };
  Settings: NonNullable<unknown>;
  TokenUsage: NonNullable<unknown>;
  Prompt: { prompt?: SystemPrompt; promptType?: string | undefined; };
};

// 修改后代码
export type RouteParamList = {
  Bedrock: { sessionId?: number; tapIndex?: number; mode?: ChatMode; };
  Settings: NonNullable<unknown>;
  NewSettings: NonNullable<unknown>; // 添加新的设置页面路由
  TokenUsage: NonNullable<unknown>;
  Prompt: { prompt?: SystemPrompt; promptType?: string | undefined; };
};
```

#### 2. react-native/src/App.tsx
**修改原因**: 更新导航配置，使 Settings 路由指向新的设置页面组件
**修改内容**:
- 导入新设置页面组件: `import NewSettingsScreen from './custom/settings/NewSettingsScreen.tsx';`
- 将 Drawer Settings 路由指向 `NewSettingsScreen`
- 在 Stack Navigator 中添加独立的 `NewSettings` 路由

**具体变更**:
```typescript
// 导入部分新增
import NewSettingsScreen from './custom/settings/NewSettingsScreen.tsx'; // 导入新设置页面

// DrawerNavigator 中修改
<Drawer.Screen name="Settings" component={NewSettingsScreen} />

// Stack Navigator 中新增
<Stack.Screen
  name="NewSettings"
  component={NewSettingsScreen}
  options={{
    title: '新设置',
    contentStyle: { height: isMac ? 66 : undefined, backgroundColor: colors.background, },
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
  }}
/>
```

### 技术实现说明

1. **硬编码配置**: 通过 `hardcoded-config.ts` 提供固定的 OpenAI 配置，替代原有的动态配置读取
2. **页面替换**: 原有的 `SettingsScreen` 组件保持不变，通过路由配置让用户访问新的设置页面
3. **兼容性**: 保留了原有的路由结构，仅替换了组件引用

### 风险评估与缓解

**潜在冲突风险**:
1. `App.tsx` 导航配置部分可能与上游更新冲突
2. `RouteTypes.ts` 类型定义可能与上游新增路由冲突

**缓解措施**:
1. 所有自定义组件都放在 `custom/` 目录下，避免直接修改原有组件
2. 核心文件修改尽量最小化，只涉及集成所必需的引用和配置
3. 详细记录所有修改，便于合并时处理冲突

### 下一步规划

1. 在新设置页面中实现完整的配置管理功能
2. 添加配置导入/导出功能
3. 根据用户反馈持续优化界面和功能

---

## 变更追踪

| 日期 | 文件 | 修改类型 | 修改原因 |
|------|------|----------|----------|
| 2025-09-26 | `react-native/src/types/RouteTypes.ts` | 修改 | 添加新设置页面路由类型 |
| 2025-09-26 | `react-native/src/App.tsx` | 修改 | 更新导航配置指向新设置页面 |
| 2025-09-26 | `react-native/src/custom/config/hardcoded-config.ts` | 新增 | 硬编码 OpenAI 配置 |
| 2025-09-26 | `react-native/src/custom/settings/NewSettingsScreen.tsx` | 新增 | 新的设置页面组件 |