import { ChatMode, SystemPrompt } from './Chat.ts';

export type RouteParamList = {
  Bedrock: {
    sessionId?: number;
    tapIndex?: number;
    mode?: ChatMode;
  };
  Settings: NonNullable<unknown>;
  NewSettings: NonNullable<unknown>; // 添加新的设置页面路由
  TokenUsage: NonNullable<unknown>;
  Prompt: {
    prompt?: SystemPrompt;
    promptType?: string | undefined;
  };
};
