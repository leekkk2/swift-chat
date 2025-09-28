/**
 * 自定义存储工具覆写
 * 根据二次开发规范，此文件用于覆写原有的存储读取逻辑
 * 将模型配置指向硬编码配置
 */

import { Model, AllModel } from '../../types/Chat.ts';
import { getHardcodedOpenAIModels } from './hardcoded-config';

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