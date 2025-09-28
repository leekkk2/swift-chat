import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteParamList } from '../../types/RouteTypes';
import { useTheme, ColorScheme } from '../../theme';
import {
  getHardcodedOpenAIApiKey,
  getHardcodedOpenAIApiUrl,
  getHardcodedOpenAIModels,
  HARDCODED_OPENAI_CONFIG
} from '../config/hardcoded-config';

/**
 * 新的设置页面组件
 * 根据二次开发规范创建，用于替代原有设置页面
 */
function NewSettingsScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RouteParamList>>();

  const hardcodedApiKey = getHardcodedOpenAIApiKey();
  const hardcodedApiUrl = getHardcodedOpenAIApiUrl();
  const hardcodedModels = getHardcodedOpenAIModels();

  const styles = createStyles(colors);

  const renderModelItem = ({ item }: { item: any }) => (
    <View style={styles.modelItem}>
      <View style={styles.modelHeader}>
        <Text style={styles.modelName}>{item.modelName}</Text>
        <Text style={styles.modelId}>{item.modelId}</Text>
      </View>
      <View style={styles.modelDetails}>
        <Text style={styles.modelDetail}>
          输入: ${item.inputCost}/1K tokens
        </Text>
        <Text style={styles.modelDetail}>
          输出: ${item.outputCost}/1K tokens
        </Text>
        <Text style={styles.modelDetail}>
          上下文: {item.contextLength.toLocaleString()} tokens
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>新设置页面</Text>
          <Text style={styles.descriptionText}>
            已配置硬编码的 OneAPI 配置，支持多种 AI 模型
          </Text>
        </View>

        <View style={styles.configContainer}>
          <Text style={styles.sectionTitle}>当前配置</Text>

          <View style={styles.configItem}>
            <Text style={styles.configLabel}>API URL:</Text>
            <Text style={styles.configValue}>{hardcodedApiUrl}</Text>
          </View>

          <View style={styles.configItem}>
            <Text style={styles.configLabel}>API Key:</Text>
            <Text style={styles.configValue}>
              {hardcodedApiKey.substring(0, 20)}...
            </Text>
          </View>

          <View style={styles.configItem}>
            <Text style={styles.configLabel}>支持模型:</Text>
            <Text style={styles.configValue}>{hardcodedModels.length} 个</Text>
          </View>
        </View>

        <View style={styles.modelsContainer}>
          <Text style={styles.sectionTitle}>支持的模型列表</Text>
          <FlatList
            data={hardcodedModels}
            renderItem={renderModelItem}
            keyExtractor={(item) => item.modelId}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            📝 功能说明：
          </Text>
          <Text style={styles.noticeItem}>• 使用硬编码配置，无需手动设置</Text>
          <Text style={styles.noticeItem}>• 支持 Gemini 2.5/2.0/1.5 全系列模型</Text>
          <Text style={styles.noticeItem}>• 包含通义千问和 GPT-5 Codex</Text>
          <Text style={styles.noticeItem}>• 自动优化的成本和性能配置</Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    headerContainer: {
      marginBottom: 24,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    descriptionText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    configContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    configItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    configLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      flex: 1,
    },
    configValue: {
      fontSize: 14,
      color: colors.textSecondary,
      flex: 2,
      textAlign: 'right',
    },
    modelsContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    modelItem: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border + '50',
    },
    modelHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    modelName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    modelId: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'monospace',
    },
    modelDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    modelDetail: {
      fontSize: 11,
      color: colors.textSecondary,
      marginRight: 8,
    },
    noticeContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    noticeText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    noticeItem: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 8,
      marginVertical: 2,
    },
    backButton: {
      backgroundColor: colors.text + '20',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      marginTop: 20,
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
  });

export default NewSettingsScreen;