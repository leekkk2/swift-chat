/**
 * 自定义存储工具覆写
 * 根据二次开发规范，此文件用于覆写原有的存储读取逻辑
 * 将模型配置指向硬编码配置
 */

import { Model, AllModel } from '../../types/Chat.ts';
import {
  getHardcodedOpenAIModels,
  getHardcodedOpenAIApiKey,
  getHardcodedOpenAIApiUrl,
  getHardcodedOpenAIProxyEnabled
} from './hardcoded-config';

// 全局状态管理：当前选中的模型
let currentSelectedTextModel: Model | null = null;
let currentSelectedImageModel: Model | null = null;

/**
 * 获取文本模型 - 覆写原有逻辑
 * 返回当前选中的模型，如果没有选中则返回第一个模型
 */
export function getTextModel(): Model {
  if (currentSelectedTextModel) {
    return currentSelectedTextModel;
  }

  const hardcodedModels = getHardcodedOpenAIModels();
  // 转换为项目期望的 Model 格式
  const firstModel = hardcodedModels[0];
  const model = {
    modelId: firstModel.modelId,
    modelName: firstModel.modelName,
    inputCost: firstModel.inputCost,
    outputCost: firstModel.outputCost,
    contextLength: firstModel.contextLength,
    maxOutputTokens: firstModel.maxOutputTokens,
    modelTag: 'OpenAICompatible', // 使用 OpenAICompatible 以支持自定义API URL
    apiUrl: getHardcodedOpenAIApiUrl(), // 添加 API URL
    apiKey: getHardcodedOpenAIApiKey(), // 添加 API Key
  };

  currentSelectedTextModel = model;
  return model;
}

/**
 * 获取图像模型 - 覆写原有逻辑
 * 返回当前选中的图像模型，如果没有选中则返回默认模型
 */
export function getImageModel(): Model {
  if (currentSelectedImageModel && currentSelectedImageModel.modelId) {
    return currentSelectedImageModel;
  }

  // 使用 gemini-2.5-pro 作为图像模型
  const model: Model = {
    modelId: 'gemini-2.5-pro',
    modelName: 'Gemini 2.5 Pro',
    modelTag: 'OpenAICompatible', // 使用 OpenAICompatible 以支持自定义API URL
    apiUrl: getHardcodedOpenAIApiUrl(), // 添加 API URL
    apiKey: getHardcodedOpenAIApiKey(), // 添加 API Key
  };

  // 验证模型对象完整性
  if (!model.modelId || !model.modelName || !model.modelTag) {
    console.error('getImageModel: 模型对象缺少必需属性');
  }

  currentSelectedImageModel = model;
  return model;
}

/**
 * 获取所有模型 - 覆写原有逻辑
 * 返回硬编码配置中的所有模型
 */
export function getAllModels(): AllModel {
  const hardcodedModels = getHardcodedOpenAIModels();

  // 将硬编码模型转换为项目期望的格式
  const textModels: Model[] = hardcodedModels.map(model => ({
    modelId: model.modelId,
    modelName: model.modelName,
    inputCost: model.inputCost,
    outputCost: model.outputCost,
    contextLength: model.contextLength,
    maxOutputTokens: model.maxOutputTokens,
    modelTag: 'OpenAICompatible', // 使用 OpenAICompatible 以支持自定义API URL
    apiUrl: getHardcodedOpenAIApiUrl(), // 添加 API URL
    apiKey: getHardcodedOpenAIApiKey(), // 添加 API Key
  }));

  // 图像模型暂时使用单个默认模型
  const imageModels: Model[] = [getImageModel()];

  return {
    textModel: textModels,
    imageModel: imageModels,
  };
}

/**
 * API 配置相关函数覆写
 */

/**
 * 获取 API URL - 覆写原有逻辑
 */
export function getApiUrl(): string {
  return getHardcodedOpenAIApiUrl();
}

/**
 * 获取 API Key - 覆写原有逻辑
 */
export function getApiKey(): string {
  return getHardcodedOpenAIApiKey();
}

/**
 * 获取 OpenAI API Key - 覆写原有逻辑
 */
export function getOpenAIApiKey(): string {
  return getHardcodedOpenAIApiKey();
}

/**
 * 获取 DeepSeek API Key - 覆写原有逻辑
 * 返回空字符串，因为我们使用 OpenAI 配置
 */
export function getDeepSeekApiKey(): string {
  return '';
}

/**
 * 获取 OpenAI 代理设置 - 覆写原有逻辑
 */
export function getOpenAIProxyEnabled(): boolean {
  return getHardcodedOpenAIProxyEnabled();
}

/**
 * 获取 Ollama API URL - 覆写原有逻辑
 */
export function getOllamaApiUrl(): string {
  return '';
}

/**
 * 获取 Ollama API Key - 覆写原有逻辑
 */
export function getOllamaApiKey(): string {
  return '';
}

/**
 * 获取 Bedrock 配置模式 - 覆写原有逻辑
 */
export function getBedrockConfigMode(): string {
  return 'swiftchat'; // 使用 swiftchat 模式
}

/**
 * 获取 Bedrock API Key - 覆写原有逻辑
 */
export function getBedrockApiKey(): string {
  return '';
}

/**
 * 获取区域设置 - 覆写原有逻辑
 */
export function getRegion(): string {
  return 'us-east-1'; // 默认区域
}

/**
 * 获取图像尺寸 - 覆写原有逻辑
 */
export function getImageSize(): string {
  return '1024 x 1024';
}

/**
 * 获取思考模式是否启用 - 覆写原有逻辑
 */
export function getThinkingEnabled(): boolean {
  return false;
}

/**
 * 保存 Token 信息 - 空实现
 */
export function saveTokenInfo(info: any): void {
  console.log('saveTokenInfo called with hardcoded config - no action needed');
}

/**
 * 获取最后的虚拟试衣图片文件 - 空实现
 */
export function getLastVirtualTryOnImgFile(): any {
  return null;
}

/**
 * 根据会话ID获取消息 - 空实现
 */
export function getMessagesBySessionId(sessionId: number): any[] {
  return [];
}

/**
 * 获取会话ID - 空实现
 */
export function getSessionId(): number {
  return 1;
}

/**
 * 保存当前图像系统提示 - 空实现
 */
export function saveCurrentImageSystemPrompt(prompt: any): void {
  console.log('saveCurrentImageSystemPrompt called with hardcoded config - no action needed');
}

/**
 * 保存当前系统提示 - 空实现
 */
export function saveCurrentSystemPrompt(prompt: any): void {
  console.log('saveCurrentSystemPrompt called with hardcoded config - no action needed');
}

/**
 * 保存当前语音系统提示 - 空实现
 */
export function saveCurrentVoiceSystemPrompt(prompt: any): void {
  console.log('saveCurrentVoiceSystemPrompt called with hardcoded config - no action needed');
}

/**
 * 保存最后的虚拟试衣图片文件 - 空实现
 */
export function saveLastVirtualTryOnImgFile(file: any): void {
  console.log('saveLastVirtualTryOnImgFile called with hardcoded config - no action needed');
}

/**
 * 保存消息列表 - 空实现
 */
export function saveMessageList(messages: any[]): void {
  console.log('saveMessageList called with hardcoded config - no action needed');
}

/**
 * 保存消息 - 空实现
 */
export function saveMessages(sessionId: number, messages: any[]): void {
  console.log('saveMessages called with hardcoded config - no action needed');
}

/**
 * 更新总使用量 - 空实现
 */
export function updateTotalUsage(usage: any): void {
  console.log('updateTotalUsage called with hardcoded config - no action needed');
}

/**
 * 获取提示ID - 覆写原有逻辑
 * 返回默认提示ID
 */
export function getPromptId(): string {
  return 'default-hardcoded-prompt-id';
}

/**
 * 获取合并后的模型顺序 - 覆写原有逻辑
 * 返回硬编码配置中的模型顺序
 */
export function getMergedModelOrder(): Model[] {
  return getAllModels().textModel;
}

/**
 * 获取系统提示列表 - 空实现
 */
export function getSystemPrompts(): any[] {
  return [];
}

/**
 * 获取当前系统提示 - 空实现
 */
export function getCurrentSystemPrompt(): any {
  return null;
}

/**
 * 获取当前图像系统提示 - 空实现
 */
export function getCurrentImageSystemPrompt(): any {
  return null;
}

/**
 * 获取当前语音系统提示 - 空实现
 */
export function getCurrentVoiceSystemPrompt(): any {
  return null;
}

/**
 * 验证 Token 是否有效 - 默认返回 true
 */
export function isTokenValid(): boolean {
  return true;
}

/**
 * 保存提示ID - 空实现
 */
export function savePromptId(id: string): void {
  console.log('savePromptId called with hardcoded config - no action needed:', id);
}

/**
 * 保存系统提示 - 空实现
 */
export function saveSystemPrompts(prompts: any[]): void {
  console.log('saveSystemPrompts called with hardcoded config - no action needed');
}

/**
 * 保存文本模型 - 更新当前选中的模型
 */
export function saveTextModel(model: Model): void {
  currentSelectedTextModel = model;
  console.log('saveTextModel: 已更新当前选中的文本模型:', model.modelName);
}

/**
 * 保存图像模型 - 更新当前选中的模型
 */
export function saveImageModel(model: Model): void {
  currentSelectedImageModel = model;
  console.log('saveImageModel: 已更新当前选中的图像模型:', model.modelName);
}

/**
 * 保存所有模型 - 空实现（硬编码配置不需要保存）
 */
export function saveAllModels(allModels: AllModel): void {
  // 硬编码配置不需要保存操作
  console.log('saveAllModels called with hardcoded config - no action needed');
}

/**
 * 更新文本模型使用顺序 - 空实现（硬编码配置不需要保存）
 */
export function updateTextModelUsageOrder(model: Model): void {
  // 硬编码配置不需要保存操作
  console.log('updateTextModelUsageOrder called with hardcoded config - no action needed:', model.modelName);
}