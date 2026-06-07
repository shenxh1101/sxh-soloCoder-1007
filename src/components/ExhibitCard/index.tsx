import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Exhibit } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface ExhibitCardProps {
  exhibit: Exhibit;
  showFavorite?: boolean;
  onClick?: () => void;
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({ exhibit, showFavorite = true, onClick }) => {
  const isFavorite = useAppStore(state => state.isFavorite(exhibit.id));
  const addFavorite = useAppStore(state => state.addFavorite);
  const removeFavorite = useAppStore(state => state.removeFavorite);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/exhibit-detail/index?id=${exhibit.id}`
      });
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(exhibit.id);
    } else {
      addFavorite(exhibit.id);
    }
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <Image
        className={styles.image}
        src={exhibit.image}
        mode="aspectFill"
        onError={(e) => console.error('[ExhibitCard] 图片加载失败:', e)}
      />
      <View className={styles.content}>
        <View>
          <View className={styles.header}>
            <Text className={styles.name}>{exhibit.name}</Text>
            {showFavorite && (
              <Text
                className={styles.favoriteIcon}
                onClick={handleFavoriteClick}
              >
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            )}
          </View>
          <View className={styles.meta}>
            <Text className={styles.tag}>{exhibit.category}</Text>
            <Text className={styles.era}>{exhibit.era}</Text>
          </View>
          <Text className={styles.description}>{exhibit.description}</Text>
        </View>
        <View className={styles.footer}>
          <Text className={styles.location}>📍 {exhibit.location}</Text>
          <View className={styles.audioBadge}>
            <Text>🎧</Text>
            <Text>{exhibit.audioDuration}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExhibitCard;
