import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Button } from '@tarojs/components';
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { exhibits, getExhibitById } from '@/data/exhibits';
import { routes } from '@/data/routes';
import ExhibitCard from '@/components/ExhibitCard';
import { useAppStore } from '@/store/useAppStore';
import { generateSouvenirCard } from '@/utils';
import dayjs from 'dayjs';

type TabType = 'favorites' | 'listened' | 'routes';

const FavoritePage: React.FC = () => {
  const { 
    favorites, 
    listenedAudios, 
    unfinishedRoutes,
    stamps,
    completedQuizzes,
    totalCorrectCount
  } = useAppStore();
  const [activeTab, setActiveTab] = useState<TabType>('favorites');
  const [showSouvenir, setShowSouvenir] = useState(false);

  const totalStamps = stamps.filter(s => s.earned).length;
  const today = dayjs().format('YYYY年M月D日');

  const souvenirMessage = generateSouvenirCard({
    visitDate: today,
    visitedCount: listenedAudios.length,
    likedCount: favorites.length,
    quizPassedCount: totalCorrectCount,
    stampsCount: totalStamps
  });

  React.useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  }, []);

  const getShareContent = () => {
    const todayStr = dayjs().format('M月D日');
    const shareTitle = `${todayStr} · 我的博物馆参观纪念卡`;
    const shareDesc = `我聆听了${listenedAudios.length}件讲解，收藏了${favorites.length}件展品，获得${totalStamps}枚印章！${souvenirMessage}`;
    
    return {
      title: shareTitle,
      desc: shareDesc
    };
  };

  useShareAppMessage(() => {
    const content = getShareContent();
    return {
      title: content.title,
      desc: content.desc,
      path: '/pages/home/index'
    };
  });

  useShareTimeline(() => {
    const content = getShareContent();
    return {
      title: content.title,
      query: ''
    };
  });

  const favoriteExhibits = favorites
    .map(f => getExhibitById(f.exhibitId))
    .filter(Boolean);

  const listenedExhibits = listenedAudios
    .map(l => ({
      exhibit: getExhibitById(l.exhibitId),
      progress: l.progress,
      listenedAt: l.listenedAt
    }))
    .filter(item => item.exhibit);

  const routeItems = unfinishedRoutes
    .map(r => ({
      route: routes.find(rt => rt.id === r.routeId),
      currentIndex: r.currentExhibitIndex,
      startedAt: r.startedAt
    }))
    .filter(item => item.route);

  const handleContinueRoute = (routeId: string) => {
    console.log('[FavoritePage] 继续路线:', routeId);
    Taro.switchTab({ url: '/pages/route/index' });
  };

  const handleGenerateSouvenir = () => {
    console.log('[FavoritePage] 生成纪念卡');
    setShowSouvenir(true);
  };

  const handleShare = () => {
    console.log('[FavoritePage] 分享纪念卡');
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  };

  const handleCloseSouvenir = () => {
    setShowSouvenir(false);
  };

  const handleExhibitClick = (exhibitId: string) => {
    Taro.navigateTo({
      url: `/pages/exhibit-detail/index?id=${exhibitId}`
    });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      {/* Header */}
      <View className={styles.header}>
        <Text className={styles.title}>❤️ 我的收藏</Text>
        <View className={styles.stats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{favorites.length}</Text>
            <Text className={styles.statLabel}>收藏展品</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{listenedAudios.length}</Text>
            <Text className={styles.statLabel}>已听讲解</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{unfinishedRoutes.length}</Text>
            <Text className={styles.statLabel}>进行中</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{totalStamps}</Text>
            <Text className={styles.statLabel}>集章</Text>
          </View>
        </View>
      </View>

      {/* Tab Bar */}
      <View className={styles.tabBar}>
        <View
          className={classnames(styles.tabItem, activeTab === 'favorites' && styles.tabItemActive)}
          onClick={() => setActiveTab('favorites')}
        >
          ❤️ 收藏
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'listened' && styles.tabItemActive)}
          onClick={() => setActiveTab('listened')}
        >
          🎧 已听
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'routes' && styles.tabItemActive)}
          onClick={() => setActiveTab('routes')}
        >
          🗺️ 路线
        </View>
      </View>

      {/* Content */}
      <View className={styles.content}>
        {activeTab === 'favorites' && (
          favoriteExhibits.length > 0 ? (
            favoriteExhibits.map(exhibit => (
              exhibit && (
                <ExhibitCard
                key={exhibit.id}
                exhibit={exhibit}
                onClick={() => handleExhibitClick(exhibit.id)}
              />
              )
            ))
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyIcon}>❤️</Text>
              <Text className={styles.emptyText}>还没有收藏展品</Text>
              <Text className={styles.emptyDesc}>浏览展品时点击❤️即可收藏</Text>
            </View>
          )
        )}

        {activeTab === 'listened' && (
          listenedExhibits.length > 0 ? (
            listenedExhibits.map(({ exhibit, progress, listenedAt }) => (
              exhibit && (
                <View
                  key={exhibit.id}
                  className={styles.listenedItem}
                  onClick={() => handleExhibitClick(exhibit.id)}
                >
                  <Image
                    className={styles.listenedImage}
                    src={exhibit.image}
                    mode="aspectFill"
                    onError={(e) => console.error('[FavoritePage] 图片加载失败:', e)}
                  />
                  <View className={styles.listenedContent}>
                    <Text className={styles.listenedName}>{exhibit.name}</Text>
                    <Text className={styles.listenedMeta}>
                      {exhibit.category} · {exhibit.location}
                    </Text>
                    <Text className={styles.listenedMeta}>
                      {dayjs(listenedAt).format('M月D日 H:mm')} · {exhibit.audioDuration}
                    </Text>
                    <View className={styles.progressBar}>
                      <View
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                      />
                    </View>
                  </View>
                </View>
              )
            ))
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyIcon}>🎧</Text>
              <Text className={styles.emptyText}>还没有收听记录</Text>
              <Text className={styles.emptyDesc}>点击展品详情页即可收听语音讲解</Text>
            </View>
          )
        )}

        {activeTab === 'routes' && (
          routeItems.length > 0 ? (
            routeItems.map(({ route, currentIndex, startedAt }) => (
              route && (
                <View key={route.id} className={styles.routeItem}>
                  <View className={styles.routeIcon}>{route.icon}</View>
                  <View className={styles.routeContent}>
                    <Text className={styles.routeName}>{route.name}</Text>
                    <Text className={styles.routeMeta}>
                      进度: {currentIndex}/{route.exhibitCount} 件展品 · 开始于 {dayjs(startedAt).format('M月D日')}
                    </Text>
                  </View>
                  <Button
                    className={styles.continueBtn}
                    onClick={() => handleContinueRoute(route.id)}
                  >
                    继续
                  </Button>
                </View>
              )
            ))
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyIcon}>🗺️</Text>
              <Text className={styles.emptyText}>暂无进行中的路线</Text>
              <Text className={styles.emptyDesc}>去路线规划页选择参观模式</Text>
            </View>
          )
        )}
      </View>

      {/* Generate Souvenir Button */}
      <Button className={styles.souvenirBtn} onClick={handleGenerateSouvenir}>
        🎴 生成参观纪念卡
      </Button>

      {/* Souvenir Card Modal */}
      {showSouvenir && (
        <View className={styles.souvenirModal} onClick={handleCloseSouvenir}>
          <View className={styles.souvenirCard} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.souvenirDecoration}>🏛️</Text>
            <Text className={styles.souvenirTitle}>参观纪念卡</Text>
            <Text className={styles.souvenirSubtitle}>{today}</Text>

            <View className={styles.souvenirData}>
              <View className={styles.souvenirDataItem}>
                <Text className={styles.souvenirDataValue}>{listenedAudios.length}</Text>
                <Text className={styles.souvenirDataLabel}>聆听讲解</Text>
              </View>
              <View className={styles.souvenirDataItem}>
                <Text className={styles.souvenirDataValue}>{favorites.length}</Text>
                <Text className={styles.souvenirDataLabel}>收藏展品</Text>
              </View>
              <View className={styles.souvenirDataItem}>
                <Text className={styles.souvenirDataValue}>{totalStamps}</Text>
                <Text className={styles.souvenirDataLabel}>获得印章</Text>
              </View>
            </View>

            <Text className={styles.souvenirMessage}>"{souvenirMessage}"</Text>

            <Text className={styles.souvenirFooter}>
              🏛️ 某某博物馆 · 感谢您的参观
            </Text>

            <View className={styles.souvenirActions}>
              <Button
                className={`${styles.souvenirActionBtn} ${styles.souvenirCloseBtn}`}
                onClick={handleCloseSouvenir}
              >
                关闭
              </Button>
              <Button
                className={`${styles.souvenirActionBtn} ${styles.souvenirShareBtn}`}
                open-type="share"
              >
                📤 分享给同伴
              </Button>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default FavoritePage;
