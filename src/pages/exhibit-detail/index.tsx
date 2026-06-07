import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { getExhibitById } from '@/data/exhibits';
import AudioPlayer from '@/components/AudioPlayer';
import { useAppStore } from '@/store/useAppStore';
import type { Exhibit } from '@/types';

const ExhibitDetailPage: React.FC = () => {
  const router = useRouter();
  const exhibitId = router.params.id as string;
  const scrollRef = useRef<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [exhibit, setExhibit] = useState<Exhibit | null>(null);
  const [loading, setLoading] = useState(true);

  const { isFavorite, addFavorite, removeFavorite } = useAppStore();

  useEffect(() => {
    console.log('[ExhibitDetail] 展品ID:', exhibitId);
    if (exhibitId) {
      const data = getExhibitById(exhibitId);
      if (data) {
        setExhibit(data);
        console.log('[ExhibitDetail] 加载展品:', data.name);
      } else {
        console.error('[ExhibitDetail] 展品不存在:', exhibitId);
        Taro.showToast({ title: '展品不存在', icon: 'error' });
      }
    }
    setLoading(false);
  }, [exhibitId]);

  const handleFavoriteToggle = () => {
    if (!exhibit) return;
    
    if (isFavorite(exhibit.id)) {
      removeFavorite(exhibit.id);
      Taro.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      addFavorite(exhibit.id);
      Taro.showToast({ title: '已加入收藏', icon: 'success' });
    }
  };

  const handleImageChange = (e: any) => {
    setCurrentImageIndex(e.detail.current);
  };

  const handleBackToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleShare = () => {
    console.log('[ExhibitDetail] 分享展品:', exhibit?.name);
    Taro.showToast({ title: '分享功能开发中...', icon: 'none' });
  };

  if (loading) {
    return (
      <View className={styles.page}>
        <View className={styles.empty}>
          <Text className={styles.emptyIcon}>⏳</Text>
          <Text className={styles.emptyText}>加载中...</Text>
        </View>
      </View>
    );
  }

  if (!exhibit) {
    return (
      <View className={styles.page}>
        <View className={styles.empty}>
          <Text className={styles.emptyIcon}>📭</Text>
          <Text className={styles.emptyText}>展品不存在</Text>
        </View>
      </View>
    );
  }

  const allImages = [exhibit.image, ...exhibit.detailImages];
  const favorited = isFavorite(exhibit.id);

  return (
    <ScrollView className={styles.page} scrollY ref={scrollRef}>
      {/* Image Swiper */}
      <Swiper
        className={styles.swiper}
        autoplay={false}
        indicatorDots={false}
        current={currentImageIndex}
        onChange={handleImageChange}
      >
        {allImages.map((img, index) => (
          <SwiperItem key={index}>
            <Image
              className={styles.swiperImage}
              src={img}
              mode="aspectFill"
              onError={(e) => console.error('[ExhibitDetail] 图片加载失败:', e)}
            />
          </SwiperItem>
        ))}
      </Swiper>
      <Text className={styles.swiperIndicator}>
        {currentImageIndex + 1} / {allImages.length}
      </Text>

      {/* Content */}
      <View className={styles.content}>
        {/* Info Card */}
        <View className={styles.infoCard}>
          <View className={styles.header}>
            <View className={styles.titleSection}>
              <Text className={styles.name}>{exhibit.name}</Text>
              <View>
                <Text className={styles.category}>{exhibit.category}</Text>
                <Text className={styles.era}>{exhibit.era}</Text>
              </View>
            </View>
            <View
              className={classnames(
                styles.favoriteBtn,
                favorited && styles.favoriteBtnActive
              )}
              onClick={handleFavoriteToggle}
            >
              <Text>{favorited ? '❤️' : '🤍'}</Text>
            </View>
          </View>

          <View className={styles.metaGrid}>
            <View className={styles.metaItem}>
              <Text className={styles.metaLabel}>年代</Text>
              <Text className={styles.metaValue}>{exhibit.era}</Text>
            </View>
            <View className={styles.metaItem}>
              <Text className={styles.metaLabel}>年份</Text>
              <Text className={styles.metaValue}>{exhibit.year}</Text>
            </View>
            <View className={styles.metaItem}>
              <Text className={styles.metaLabel}>类别</Text>
              <Text className={styles.metaValue}>{exhibit.category}</Text>
            </View>
            <View className={styles.metaItem}>
              <Text className={styles.metaLabel}>位置</Text>
              <Text className={styles.metaValue}>{exhibit.location}</Text>
            </View>
          </View>
        </View>

        {/* Audio Player */}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text>🎧</Text> 语音讲解
          </Text>
          <AudioPlayer exhibit={exhibit} />
        </View>

        {/* Description */}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text>📜</Text> 展品介绍
          </Text>
          <Text className={styles.description}>{exhibit.description}</Text>
        </View>

        {/* Related People */}
        {exhibit.relatedPeople.length > 0 && (
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text>👤</Text> 相关人物
            </Text>
            <View className={styles.peopleList}>
              {exhibit.relatedPeople.map((person, index) => (
                <View key={index} className={styles.personCard}>
                  <Image
                    className={styles.personAvatar}
                    src={person.avatar}
                    mode="aspectFill"
                    onError={(e) => console.error('[ExhibitDetail] 头像加载失败:', e)}
                  />
                  <View className={styles.personInfo}>
                    <Text className={styles.personName}>{person.name}</Text>
                    <Text className={styles.personDesc}>{person.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Detail Images */}
        {exhibit.detailImages.length > 0 && (
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text>🖼️</Text> 细节图
            </Text>
            <View className={styles.detailImages}>
              {exhibit.detailImages.map((img, index) => (
                <Image
                  key={index}
                  className={styles.detailImage}
                  src={img}
                  mode="aspectFill"
                  onError={(e) => console.error('[ExhibitDetail] 细节图加载失败:', e)}
                />
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Back to Top */}
      <View className={styles.backTop} onClick={handleBackToTop}>
        <Text>↑</Text>
      </View>

      {/* Bottom Bar */}
      <View className={styles.bottomBar}>
        <Button
          className={`${styles.bottomBtn} ${styles.bottomBtnSecondary}`}
          onClick={handleShare}
        >
          📤 分享
        </Button>
        <Button
          className={`${styles.bottomBtn} ${styles.bottomBtnPrimary}`}
          onClick={handleFavoriteToggle}
        >
          {favorited ? '❤️ 已收藏' : '🤍 加入收藏'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default ExhibitDetailPage;
