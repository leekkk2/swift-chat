/**
 * 硬编码的 OpenAI 配置
 * 根据二次开发规范，此文件用于替代原有的动态配置读取逻辑
 */

export const HARDCODED_OPENAI_CONFIG = {
  apiKey: 'your-openai-api-key-here',
  apiUrl: 'https://api.openai.com/v1',
  proxyEnabled: false,
  models: [
    {
      modelId: 'gpt-4o',
      modelName: 'GPT-4o',
      inputCost: 0.005,
      outputCost: 0.015,
      contextLength: 128000,
      maxOutputTokens: 4096,
    },
    {
      modelId: 'gpt-4o-mini',
      modelName: 'GPT-4o Mini',
      inputCost: 0.00015,
      outputCost: 0.0006,
      contextLength: 128000,
      maxOutputTokens: 16384,
    },
    {
      modelId: 'gpt-3.5-turbo',
      modelName: 'GPT-3.5 Turbo',
      inputCost: 0.0015,
      outputCost: 0.002,
      contextLength: 16385,
      maxOutputTokens: 4096,
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