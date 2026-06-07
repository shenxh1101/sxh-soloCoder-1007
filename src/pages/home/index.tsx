import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { exhibitions, getPermanentExhibitions, getTemporaryExhibitions } from '@/data/exhibitions';
import { exhibits } from '@/data/exhibits';
import ExhibitCard from '@/components/ExhibitCard';
import { formatCrowdLevel, getCrowdIcon } from '@/utils';
import type { Exhibition } from '@/types';

type TabType = 'permanent' | 'temporary';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('permanent');
  const [refreshing, setRefreshing] = useState(false);

  const displayExhibitions = activeTab === 'permanent' 
    ? getPermanentExhibitions() 
    : getTemporaryExhibitions();

  const handleScan = () => {
    console.log('[HomePage] 点击扫码');
    Taro.showToast({ title: '扫码功能', icon: 'none' });
    // 模拟扫码成功后跳转
    setTimeout(() => {
      const randomExhibit = exhibits[Math.floor(Math.random() * exhibits.length)];
      Taro.navigateTo({
        url: `/pages/exhibit-detail/index?id=${randomExhibit.id}`
      });
    }, 500);
  };

  const handleNavClick = (tab: string) => {
    console.log('[HomePage] 快捷导航:', tab);
    Taro.switchTab({ url: `/pages/${tab}/index` });
  };

  const handleExhibitionClick = (exhibition: Exhibition) => {
    console.log('[HomePage] 点击展览:', exhibition.id);
    Taro.showToast({ title: `查看「${exhibition.name}」`, icon: 'none' });
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('[HomePage] 下拉刷新');
    setTimeout(() => {
      setRefreshing(false);
      Taro.stopPullDownRefresh();
      Taro.showToast({ title: '刷新成功', icon: 'success' });
    }, 1000);
  }, []);

  React.useEffect(() => {
    Taro.onPullDownRefresh(handleRefresh);
    return () => {
      Taro.offPullDownRefresh(handleRefresh);
    };
  }, [handleRefresh]);

  const getCrowdClass = (level: string) => {
    const map: Record<string, string> = {
      comfortable: styles.crowdComfortable,
      moderate: styles.crowdModerate,
      busy: styles.crowdBusy
    };
    return map[level] || styles.crowdModerate;
  };

  const hotExhibits = exhibits.slice(0, 4);

  return (
    <ScrollView className={styles.page} scrollY>
      {/* Header */}
      <View className={styles.header}>
        <Text className={styles.welcome}>欢迎参观 🏛️</Text>
        <Text className={styles.subTitle}>开启您的博物馆探索之旅</Text>
        <View className={styles.actionBar}>
          <Button className={styles.scanBtn} onClick={handleScan}>
            📷 扫描展品二维码
          </Button>
        </View>
      </View>

      {/* 快捷导航 */}
      <View className={styles.quickNav}>
        <View className={styles.navItem} onClick={() => handleNavClick('route')}>
          <View className={styles.navIcon}>🗺️</View>
          <View className={styles.navText}>
            <Text className={styles.navTitle}>路线规划</Text>
            <Text className={styles.navDesc}>定制参观路线</Text>
          </View>
        </View>
        <View className={styles.navItem} onClick={() => handleNavClick('quiz')}>
          <View className={styles.navIcon}>📝</View>
          <View className={styles.navText}>
            <Text className={styles.navTitle}>答题互动</Text>
            <Text className={styles.navDesc}>边看边学边玩</Text>
          </View>
        </View>
        <View className={styles.navItem} onClick={() => handleNavClick('favorite')}>
          <View className={styles.navIcon}>❤️</View>
          <View className={styles.navText}>
            <Text className={styles.navTitle}>我的收藏</Text>
            <Text className={styles.navDesc}>珍藏喜欢的展品</Text>
          </View>
        </View>
        <View className={styles.navItem} onClick={handleScan}>
          <View className={styles.navIcon}>🎧</View>
          <View className={styles.navText}>
            <Text className={styles.navTitle}>语音导览</Text>
            <Text className={styles.navDesc}>随身讲解器</Text>
          </View>
        </View>
      </View>

      {/* 展览切换 Tab */}
      <View className={styles.section}>
        <View className={styles.tabBar}>
          <View
            className={classnames(styles.tabItem, activeTab === 'permanent' && styles.tabItemActive)}
            onClick={() => setActiveTab('permanent')}
          >
            常设展览
          </View>
          <View
            className={classnames(styles.tabItem, activeTab === 'temporary' && styles.tabItemActive)}
            onClick={() => setActiveTab('temporary')}
          >
            特别展览
          </View>
        </View>

        {/* 展览列表 */}
        {displayExhibitions.length > 0 ? (
          displayExhibitions.map(exhibition => {
            const crowdInfo = formatCrowdLevel(exhibition.crowdLevel);
            return (
              <View 
                key={exhibition.id} 
                className={styles.exhibitionCard}
                onClick={() => handleExhibitionClick(exhibition)}
              >
                <Image
                  className={styles.exhibitionCover}
                  src={exhibition.coverImage}
                  mode="aspectFill"
                  onError={(e) => console.error('[HomePage] 展览封面加载失败:', e)}
                />
                <View className={styles.exhibitionContent}>
                  <View className={styles.exhibitionHeader}>
                    <Text className={styles.exhibitionName}>
                      <Text className={classnames(
                        styles.exhibitionType,
                        exhibition.type === 'temporary' && styles.exhibitionTypeTemp
                      )}>
                        {exhibition.type === 'permanent' ? '常设' : '临展'}
                      </Text>
                      {exhibition.name}
                    </Text>
                    <View className={classnames(styles.crowdBadge, getCrowdClass(exhibition.crowdLevel))}>
                      <Text>{getCrowdIcon(exhibition.crowdLevel)}</Text>
                      <Text>{crowdInfo.text}</Text>
                    </View>
                  </View>

                  <Text className={styles.exhibitionDesc}>{exhibition.description}</Text>

                  <View className={styles.exhibitionMeta}>
                    <Text className={styles.metaItem}>⏱️ {exhibition.duration}</Text>
                    <Text className={styles.metaItem}>📦 {exhibition.exhibitCount}件展品</Text>
                    {exhibition.startDate && (
                      <Text className={styles.metaItem}>📅 {exhibition.startDate} ~ {exhibition.endDate}</Text>
                    )}
                  </View>

                  <Text className={styles.metaItem} style={{ marginBottom: '16rpx' }}>📍 开放区域：</Text>
                  <View className={styles.areas}>
                    {exhibition.openAreas.map((area, idx) => (
                      <Text key={idx} className={styles.areaTag}>{area}</Text>
                    ))}
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyIcon}>📭</Text>
            <Text className={styles.emptyText}>暂无展览信息</Text>
          </View>
        )}
      </View>

      {/* 热门展品 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>🔥 热门展品</Text>
          <Text className={styles.metaItem} style={{ color: '$color-primary' }}>查看全部 ›</Text>
        </View>
        {hotExhibits.map(exhibit => (
          <ExhibitCard key={exhibit.id} exhibit={exhibit} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;
