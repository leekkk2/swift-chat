/**
 * 自定义存储工具覆写
 * 根据二次开发规范，此文件用于覆写原有的存储读取逻辑
 * 将模型配置指向硬编码配置
 */

import { Model, AllModel, SwiftChatMessage, Chat, ChatMode, Usage } from '../../types/Chat.ts';
import { MMKV } from 'react-native-mmkv';
import {
  getHardcodedOpenAIModels,
  getHardcodedOpenAIApiKey,
  getHardcodedOpenAIApiUrl,
  getHardcodedOpenAIProxyEnabled
} from './hardcoded-config';

// 自定义持久化存储
const customStorage = new MMKV();
const keyPrefix = 'custom/';
const messageListKey = keyPrefix + 'messageList';
const sessionIdPrefix = keyPrefix + 'sessionId/';
const currentSessionIdKey = keyPrefix + 'currentSessionId';

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
 * 根据会话ID获取消息 - 持久化实现
 */
export function getMessagesBySessionId(sessionId: number): SwiftChatMessage[] {
  const messageStr = customStorage.getString(sessionIdPrefix + sessionId);
  if (messageStr) {
    return JSON.parse(messageStr) as SwiftChatMessage[];
  }
  return [];
}

/**
 * 获取会话ID - 持久化实现
 */
export function getSessionId(): number {
  return customStorage.getNumber(currentSessionIdKey) ?? 0;
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
 * 保存消息列表 - 持久化实现
 */
export function saveMessageList(sessionId: number, firstMessage: SwiftChatMessage, chatMode: ChatMode): void {
  // 获取现有的消息列表字符串
  let allMessageStr = getMessageListStr();

  // 创建新的聊天记录项，包含当前使用的模型信息
  const currentMessageStr = JSON.stringify({
    id: sessionId,
    title: firstMessage.text.substring(0, 50).replaceAll('\n', ' '),
    mode: chatMode.toString(),
    timestamp: (firstMessage.createdAt as Date).getTime(),
    textModel: currentSelectedTextModel || getTextModel(),
    imageModel: currentSelectedImageModel || getImageModel(),
  });

  // 添加到消息列表（原始格式：无开头的 [）
  if (allMessageStr.length === 1) {
    allMessageStr = currentMessageStr + allMessageStr;
  } else {
    allMessageStr = currentMessageStr + ',' + allMessageStr;
  }

  // 持久化保存
  customStorage.set(messageListKey, allMessageStr);
  customStorage.set(currentSessionIdKey, sessionId);
  console.log('saveMessageList: 已保存聊天列表到持久化存储:', sessionId);
}

/**
 * 保存消息 - 持久化实现
 */
export function saveMessages(sessionId: number, messages: SwiftChatMessage[], usage?: Usage): void {
  // 为第一条消息添加usage信息
  if (messages.length > 0 && usage) {
    messages[0].usage = usage;
  }

  // 清理其他消息的usage信息（只有第一条消息保存usage）
  messages.forEach((message, index) => {
    if (index !== 0 && 'usage' in message) {
      delete message.usage;
    }
  });

  // 持久化保存到存储
  customStorage.set(sessionIdPrefix + sessionId, JSON.stringify(messages));
  console.log('saveMessages: 已保存会话消息到持久化存储:', sessionId);
}

/**
 * 更新总使用量 - 空实现
 */
export function updateTotalUsage(usage: any): void {
  console.log('updateTotalUsage called with hardcoded config - no action needed');
}

/**
 * 获取消息列表字符串 - 辅助函数
 */
function getMessageListStr(): string {
  return customStorage.getString(messageListKey) ?? ']';
}

/**
 * 获取消息列表 - 持久化实现
 */
export function getMessageList(): Chat[] {
  return JSON.parse('[' + getMessageListStr()) as Chat[];
}

/**
 * 删除指定会话的消息 - 持久化实现
 */
export function deleteMessagesBySessionId(sessionId: number): void {
  // 删除会话消息
  customStorage.delete(sessionIdPrefix + sessionId);

  // 从消息列表中移除该会话
  const chatList = getMessageList();
  const filteredList = chatList.filter(chat => chat.id !== sessionId);

  if (filteredList.length > 0) {
    customStorage.set(messageListKey, JSON.stringify(filteredList).substring(1));
  } else {
    customStorage.delete(messageListKey);
  }

  console.log('deleteMessagesBySessionId: 已删除会话:', sessionId);
}

/**
 * 更新消息列表 - 持久化实现（用于历史记录更新）
 */
export function updateMessageList(): void {
  // 这个函数在原始实现中可能用于刷新，这里不需要特殊操作
  console.log('updateMessageList: 消息列表已使用持久化存储');
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