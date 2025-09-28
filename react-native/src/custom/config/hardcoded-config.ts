/**
 * 硬编码的 OpenAI 配置
 * 根据二次开发规范，此文件用于替代原有的动态配置读取逻辑
 */

export const HARDCODED_OPENAI_CONFIG = {
  apiKey: 'sk-vqfjAcdmvJNXHmEY6c8cE5Ae165f4cCb984fAc5b816d92A7',
  apiUrl: 'https://oneapi.zweiteng.tk/v1',
  proxyEnabled: false,
  models: [
    // Gemini 2.5 系列（最新）
    {
      modelId: 'gemini-2.5-pro',
      modelName: 'Gemini 2.5 Pro',
      inputCost: 0.002,
      outputCost: 0.006,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    {
      modelId: 'gemini-2.5-flash',
      modelName: 'Gemini 2.5 Flash',
      inputCost: 0.0005,
      outputCost: 0.0015,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    {
      modelId: 'gemini-2.5-flash-lite',
      modelName: 'Gemini 2.5 Flash Lite',
      inputCost: 0.0001,
      outputCost: 0.0003,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    // Gemini 2.0 系列
    {
      modelId: 'gemini-2.0-flash',
      modelName: 'Gemini 2.0 Flash',
      inputCost: 0.0005,
      outputCost: 0.0015,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    {
      modelId: 'gemini-2.0-flash-thinking-exp-01-21',
      modelName: 'Gemini 2.0 Flash Thinking (实验)',
      inputCost: 0.0005,
      outputCost: 0.0015,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    {
      modelId: 'gemini-2.0-pro-exp-02-05',
      modelName: 'Gemini 2.0 Pro (实验)',
      inputCost: 0.002,
      outputCost: 0.006,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    // Gemini 1.5 系列
    {
      modelId: 'gemini-1.5-pro',
      modelName: 'Gemini 1.5 Pro',
      inputCost: 0.002,
      outputCost: 0.006,
      contextLength: 2000000,
      maxOutputTokens: 8192,
    },
    {
      modelId: 'gemini-1.5-flash',
      modelName: 'Gemini 1.5 Flash',
      inputCost: 0.0001,
      outputCost: 0.0003,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    {
      modelId: 'gemini-1.5-flash-8b',
      modelName: 'Gemini 1.5 Flash 8B',
      inputCost: 0.00005,
      outputCost: 0.00015,
      contextLength: 1000000,
      maxOutputTokens: 8192,
    },
    // 通义千问
    {
      modelId: 'qwen-plus',
      modelName: '通义千问 Plus',
      inputCost: 0.001,
      outputCost: 0.003,
      contextLength: 32000,
      maxOutputTokens: 4096,
    },
    // 特殊用途模型
    {
      modelId: 'gpt-5-codex',
      modelName: 'GPT-5 Codex (代码)',
      inputCost: 0.005,
      outputCost: 0.015,
      contextLength: 128000,
      maxOutputTokens: 8192,
    },
  ],
};

/**
 * 获取硬编码的 OpenAI API Key
 */
export const getHardcodedOpenAIApiKey = (): string => {
  return HARDCODED_OPENAI_CONFIG.apiKey;
};

/**
 * 获取硬编码的 OpenAI API URL
 */
export const getHardcodedOpenAIApiUrl = (): string => {
  return HARDCODED_OPENAI_CONFIG.apiUrl;
};

/**
 * 获取硬编码的 OpenAI 代理设置
 */
export const getHardcodedOpenAIProxyEnabled = (): boolean => {
  return HARDCODED_OPENAI_CONFIG.proxyEnabled;
};

/**
 * 获取硬编码的 OpenAI 模型列表
 */
export const getHardcodedOpenAIModels = () => {
  return HARDCODED_OPENAI_CONFIG.models;
};