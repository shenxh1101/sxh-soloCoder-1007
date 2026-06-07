import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { routes } from '@/data/routes';
import { getExhibitById } from '@/data/exhibits';
import RouteCard from '@/components/RouteCard';
import { useAppStore } from '@/store/useAppStore';
import type { Route } from '@/types';

const RoutePage: React.FC = () => {
  const { unfinishedRoutes, saveUnfinishedRoute, removeUnfinishedRoute } = useAppStore();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasUnfinished = unfinishedRoutes.length > 0;
  const unfinishedRoute = hasUnfinished 
    ? routes.find(r => r.id === unfinishedRoutes[0].routeId)
    : null;

  const handleStartRoute = (route: Route) => {
    console.log('[RoutePage] 开始路线:', route.id);
    setSelectedRoute(route);
    setCurrentIndex(0);
    saveUnfinishedRoute(route.id, 0);
    Taro.showToast({ title: `开始「${route.name}」`, icon: 'success' });
  };

  const handleViewDetail = (route: Route) => {
    console.log('[RoutePage] 查看路线详情:', route.id);
    setSelectedRoute(route);
    const saved = unfinishedRoutes.find(r => r.routeId === route.id);
    if (saved) {
      setCurrentIndex(saved.currentExhibitIndex);
    }
  };

  const handleContinue = () => {
    if (unfinishedRoute) {
      setSelectedRoute(unfinishedRoute);
      const saved = unfinishedRoutes.find(r => r.routeId === unfinishedRoute.id);
      if (saved) {
        setCurrentIndex(saved.currentExhibitIndex);
      }
    }
  };

  const handleExhibitClick = (exhibitId: string, index: number) => {
    console.log('[RoutePage] 点击展品:', exhibitId);
    setCurrentIndex(index);
    saveUnfinishedRoute(selectedRoute!.id, index);
    Taro.navigateTo({
      url: `/pages/exhibit-detail/index?id=${exhibitId}`
    });
  };

  const handleCompleteRoute = () => {
    if (selectedRoute) {
      removeUnfinishedRoute(selectedRoute.id);
      setSelectedRoute(null);
      Taro.showToast({ title: '路线已完成！🎉', icon: 'success' });
    }
  };

  const handleBack = () => {
    setSelectedRoute(null);
  };

  if (selectedRoute) {
    const exhibitIds = selectedRoute.exhibitIds.slice(0, selectedRoute.exhibitCount);
    const progress = Math.round((currentIndex / exhibitIds.length) * 100);

    return (
      <ScrollView className={styles.page} scrollY>
        <View className={styles.timelineHeader}>
          <View>
            <Text className={styles.timelineTitle}>
              {selectedRoute.icon} {selectedRoute.name}
            </Text>
            <Text className={styles.timelineExhibitMeta}>
              {selectedRoute.duration} · {selectedRoute.distance}
            </Text>
          </View>
          <View className={styles.timelineProgress}>{progress}% 完成</View>
        </View>

        <Button
          className={styles.continueBtn}
          onClick={handleBack}
          style={{ width: 'auto', marginBottom: '24rpx' }}
        >
          ← 返回路线列表
        </Button>

        <View className={styles.timeline}>
          <View className={styles.timelineList}>
            {exhibitIds.map((exhibitId, index) => {
              const exhibit = getExhibitById(exhibitId);
              if (!exhibit) return null;
              
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <View 
                  key={exhibitId} 
                  className={styles.timelineItem}
                  onClick={() => handleExhibitClick(exhibitId, index)}
                >
                  <View className={classnames(
                    styles.timelineDot,
                    isCompleted && styles.timelineDotCompleted,
                    isCurrent && styles.timelineDotCurrent
                  )}>
                    {isCompleted ? '✓' : index + 1}
                  </View>
                  <View className={classnames(
                    styles.timelineContent,
                    isCompleted && styles.timelineContentCompleted
                  )}>
                    <Text className={styles.timelineExhibitName}>
                      {exhibit.name}
                      {isCurrent && ' 👈'}
                    </Text>
                    <Text className={styles.timelineExhibitMeta}>
                      {exhibit.category} · {exhibit.location} · {exhibit.audioDuration}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {currentIndex >= exhibitIds.length && (
            <Button
              className={styles.continueBtn}
              onClick={handleCompleteRoute}
              style={{ width: '100%', marginTop: '32rpx' }}
            >
              🎉 完成路线
            </Button>
          )}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.title}>🗺️ 路线规划</Text>
        <Text className={styles.subTitle}>选择适合您的参观模式</Text>
      </View>

      {hasUnfinished && unfinishedRoute && (
        <View className={styles.unfinishedBanner}>
          <View className={styles.unfinishedInfo}>
            <Text className={styles.unfinishedTitle}>
              {unfinishedRoute.icon} 继续「{unfinishedRoute.name}」
            </Text>
            <Text className={styles.unfinishedProgress}>
              已完成 {unfinishedRoutes[0].currentExhibitIndex}/{unfinishedRoute.exhibitCount} 件展品
            </Text>
          </View>
          <Button className={styles.continueBtn} onClick={handleContinue}>
            继续
          </Button>
        </View>
      )}

      <Text className={styles.sectionTitle}>选择参观模式</Text>

      {routes.map(route => (
        <RouteCard
          key={route.id}
          route={route}
          onStart={() => handleStartRoute(route)}
          onViewDetail={() => handleViewDetail(route)}
        />
      ))}

      {!hasUnfinished && routes.length === 0 && (
        <View className={styles.empty}>
          <Text className={styles.emptyIcon}>🗺️</Text>
          <Text className={styles.emptyText}>暂无路线信息</Text>
          <Text className={styles.emptyDesc}>请稍后再来查看</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default RoutePage;
