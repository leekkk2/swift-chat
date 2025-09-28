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

/**
 * 获取文本模型 - 覆写原有逻辑
 * 返回硬编码配置中的第一个模型作为默认模型
 */
export function getTextModel(): Model {
  const hardcodedModels = getHardcodedOpenAIModels();

  // 转换为项目期望的 Model 格式
  const firstModel = hardcodedModels[0];
  return {
    modelId: firstModel.modelId,
    modelName: firstModel.modelName,
    inputCost: firstModel.inputCost,
    outputCost: firstModel.outputCost,
    contextLength: firstModel.contextLength,
    maxOutputTokens: firstModel.maxOutputTokens,
  };
}

/**
 * 获取图像模型 - 覆写原有逻辑
 * 暂时返回默认的图像模型配置
 */
export function getImageModel(): Model {
  // 由于当前硬编码配置主要针对文本模型，这里返回一个默认的图像模型
  return {
    modelId: 'gemini-1.5-flash',
    modelName: 'Gemini 1.5 Flash (图像)',
    inputCost: 0.0001,
    outputCost: 0.0003,
    contextLength: 1000000,
    maxOutputTokens: 8192,
  };
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
 * 保存文本模型 - 空实现（硬编码配置不需要保存）
 */
export function saveTextModel(model: Model): void {
  // 硬编码配置不需要保存操作
  console.log('saveTextModel called with hardcoded config - no action needed:', model.modelName);
}

/**
 * 保存图像模型 - 空实现（硬编码配置不需要保存）
 */
export function saveImageModel(model: Model): void {
  // 硬编码配置不需要保存操作
  console.log('saveImageModel called with hardcoded config - no action needed:', model.modelName);
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