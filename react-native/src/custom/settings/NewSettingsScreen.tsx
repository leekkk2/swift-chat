import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteParamList } from '../../types/RouteTypes';
import { useTheme, ColorScheme } from '../../theme';
import { getHardcodedOpenAIApiKey, getHardcodedOpenAIApiUrl } from '../config/hardcoded-config';

/**
 * 新的设置页面组件
 * 根据二次开发规范创建，用于替代原有设置页面
 */
function NewSettingsScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RouteParamList>>();

  const hardcodedApiKey = getHardcodedOpenAIApiKey();
  const hardcodedApiUrl = getHardcodedOpenAIApiUrl();

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>新设置页面</Text>
          <Text style={styles.descriptionText}>
            这是未来即将开发的设置页面，目前显示硬编码的 OpenAI 配置
          </Text>
        </View>

        <View style={styles.configContainer}>
          <Text style={styles.sectionTitle}>当前配置（硬编码）</Text>

          <View style={styles.configItem}>
            <Text style={styles.configLabel}>API URL:</Text>
            <Text style={styles.configValue}>{hardcodedApiUrl}</Text>
          </View>

          <View style={styles.configItem}>
            <Text style={styles.configLabel}>API Key:</Text>
            <Text style={styles.configValue}>
              {hardcodedApiKey.substring(0, 10)}...
            </Text>
          </View>
        </View>

        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            📝 待开发功能：
          </Text>
          <Text style={styles.noticeItem}>• 动态配置管理</Text>
          <Text style={styles.noticeItem}>• 用户偏好设置</Text>
          <Text style={styles.noticeItem}>• 高级选项配置</Text>
          <Text style={styles.noticeItem}>• 导入/导出配置</Text>
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