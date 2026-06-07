import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Route } from '@/types';
import { formatRouteType } from '@/utils';

interface RouteCardProps {
  route: Route;
  showStartButton?: boolean;
  onStart?: () => void;
  onViewDetail?: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, showStartButton = true, onStart, onViewDetail }) => {
  const handleStart = () => {
    if (onStart) {
      onStart();
    } else {
      console.log('[RouteCard] 开始路线:', route.id);
      Taro.showToast({ title: '路线已开始', icon: 'success' });
    }
  };

  const handleViewDetail = () => {
    if (onViewDetail) {
      onViewDetail();
    }
  };

  return (
    <View className={styles.card}>
      <View className={styles.header}>
        <View className={styles.icon}>{route.icon}</View>
        <View className={styles.titleSection}>
          <Text className={styles.name}>{route.name}</Text>
          <View className={styles.tags}>
            <Text className={styles.tag}>{formatRouteType(route.type)}</Text>
            {route.tags.map((tag, index) => (
              <Text key={index} className={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      </View>

      <Text className={styles.description}>{route.description}</Text>

      <View className={styles.stats}>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{route.duration}</Text>
          <Text className={styles.statLabel}>预计时长</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{route.distance}</Text>
          <Text className={styles.statLabel}>步行距离</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{route.exhibitCount}件</Text>
          <Text className={styles.statLabel}>展品数量</Text>
        </View>
      </View>

      {showStartButton && (
        <View className={styles.footer}>
          <Button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleViewDetail}>
            查看详情
          </Button>
          <Button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleStart}>
            开始路线
          </Button>
        </View>
      )}
    </View>
  );
};

export default RouteCard;
