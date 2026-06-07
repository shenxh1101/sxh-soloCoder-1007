import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { chapters, getQuizzesByChapter } from '@/data/quizzes';
import QuizCard from '@/components/QuizCard';
import StampCard from '@/components/StampCard';
import { useAppStore } from '@/store/useAppStore';
import type { Chapter, Quiz } from '@/types';

type TabType = 'quiz' | 'stamp';

const QuizPage: React.FC = () => {
  const { completedQuizzes, stamps, earnStamp, completeQuiz, totalCorrectCount } = useAppStore();
  const [activeTab, setActiveTab] = useState<TabType>('quiz');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [chapterQuizzes, setChapterQuizzes] = useState<Quiz[]>([]);
  const [chapterCorrectCount, setChapterCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalAnswered = completedQuizzes.length;
  const totalStamps = stamps.filter(s => s.earned).length;
  const accuracy = totalAnswered > 0 
    ? Math.min(100, Math.round((totalCorrectCount / totalAnswered) * 100)) 
    : 0;

  const isChapterCompleted = (chapter: Chapter): boolean => {
    const quizzes = getQuizzesByChapter(chapter.title);
    return quizzes.every(q => completedQuizzes.includes(q.id));
  };

  const handleStartChapter = (chapter: Chapter) => {
    console.log('[QuizPage] 开始章节:', chapter.id);
    const quizzes = getQuizzesByChapter(chapter.title);
    setSelectedChapter(chapter);
    setChapterQuizzes(quizzes);
    setCurrentQuizIndex(0);
    setChapterCorrectCount(0);
    setShowResult(false);
  };

  const handleAnswer = (isCorrect: boolean, isFirstTime: boolean) => {
    const currentQuiz = chapterQuizzes[currentQuizIndex];
    console.log('[QuizPage] 答题结果:', isCorrect, '题目:', currentQuiz?.id, '首次:', isFirstTime);
    
    if (isCorrect) {
      setChapterCorrectCount(prev => prev + 1);
    }
    
    if (!isFirstTime) {
      console.log('[QuizPage] 非首次答题，不计入累计统计');
    }
  };

  const handleNext = () => {
    if (currentQuizIndex < chapterQuizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setShowResult(true);
      if (selectedChapter) {
        const chapterIndex = chapters.findIndex(c => c.id === selectedChapter.id);
        if (chapterIndex >= 0) {
          const stampId = `s${chapterIndex + 1}`;
          const existingStamp = stamps.find(s => s.id === stampId);
          
          const isChapterAlreadyCompleted = isChapterCompleted(selectedChapter);
          
          if (existingStamp && !existingStamp.earned && isChapterAlreadyCompleted) {
            earnStamp(stampId);
            Taro.showToast({ title: `获得「${existingStamp.name}」印章！🎉`, icon: 'none' });
          } else if (existingStamp && existingStamp.earned) {
            console.log('[QuizPage] 印章已获得，不重复发放:', existingStamp.name);
          }
        }
      }
    }
  };

  const handleBack = () => {
    setSelectedChapter(null);
    setChapterQuizzes([]);
    setCurrentQuizIndex(0);
    setShowResult(false);
  };

  const handleRestart = () => {
    if (selectedChapter) {
      handleStartChapter(selectedChapter);
    }
  };

  // 答题页面
  if (selectedChapter && chapterQuizzes.length > 0) {
    if (showResult) {
      const isPassed = chapterCorrectCount >= Math.ceil(chapterQuizzes.length * 0.6);
      const chapterAccuracy = Math.min(100, Math.round((chapterCorrectCount / chapterQuizzes.length) * 100));
      
      return (
        <ScrollView className={styles.page} scrollY>
          <View className={styles.content} style={{ paddingTop: '32rpx' }}>
            <View className={styles.quizHeader}>
              <Button className={styles.backBtn} onClick={handleBack}>
                ← 返回
              </Button>
              <Text className={styles.quizProgress}>
                {selectedChapter.title} · 完成
              </Text>
              <View style={{ width: '100rpx' }} />
            </View>

            <View className={styles.scoreCard}>
              <Text className={styles.scoreIcon}>{isPassed ? '🎉' : '📚'}</Text>
              <Text className={styles.scoreText}>
                {isPassed ? '恭喜通过！' : '继续加油！'}
              </Text>
              <Text className={styles.scoreDesc}>
                本次答对 {chapterCorrectCount} / {chapterQuizzes.length} 题
              </Text>
              
              <View className={styles.scoreDetail}>
                <View className={styles.scoreDetailItem}>
                  <Text className={styles.scoreDetailValue}>{chapterCorrectCount}</Text>
                  <Text className={styles.scoreDetailLabel}>正确</Text>
                </View>
                <View className={styles.scoreDetailItem}>
                  <Text className={styles.scoreDetailValue}>{chapterQuizzes.length - chapterCorrectCount}</Text>
                  <Text className={styles.scoreDetailLabel}>错误</Text>
                </View>
                <View className={styles.scoreDetailItem}>
                  <Text className={styles.scoreDetailValue}>{chapterAccuracy}%</Text>
                  <Text className={styles.scoreDetailLabel}>正确率</Text>
                </View>
              </View>

              <View style={{ display: 'flex', gap: '16rpx' }}>
                <Button
                  className={styles.startBtn}
                  style={{ flex: 1, background: '#F5F1E8', color: '#8B6914' }}
                  onClick={handleRestart}
                >
                  再测一次
                </Button>
                <Button
                  className={styles.startBtn}
                  style={{ flex: 1 }}
                  onClick={handleBack}
                >
                  返回列表
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView className={styles.page} scrollY>
        <View className={styles.content} style={{ paddingTop: '32rpx' }}>
          <View className={styles.quizHeader}>
            <Button className={styles.backBtn} onClick={handleBack}>
              ← 返回
            </Button>
            <Text className={styles.quizProgress}>
              {currentQuizIndex + 1} / {chapterQuizzes.length}
            </Text>
            <View style={{ width: '100rpx' }} />
          </View>

          <Text className={styles.quizTitle}>{selectedChapter.title}</Text>

          <QuizCard
            key={chapterQuizzes[currentQuizIndex].id}
            quiz={chapterQuizzes[currentQuizIndex]}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className={styles.page} scrollY>
      {/* Header */}
      <View className={styles.header}>
        <Text className={styles.title}>📝 答题互动</Text>
        <View className={styles.stats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{totalAnswered}</Text>
            <Text className={styles.statLabel}>已答题</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{accuracy}%</Text>
            <Text className={styles.statLabel}>正确率</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{totalStamps}/{stamps.length}</Text>
            <Text className={styles.statLabel}>已集章</Text>
          </View>
        </View>
      </View>

      {/* Tab Bar */}
      <View className={styles.tabBar}>
        <View
          className={classnames(styles.tabItem, activeTab === 'quiz' && styles.tabItemActive)}
          onClick={() => setActiveTab('quiz')}
        >
          📋 章节小测
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'stamp' && styles.tabItemActive)}
          onClick={() => setActiveTab('stamp')}
        >
          🏅 集章任务
        </View>
      </View>

      {/* Content */}
      <View className={styles.content}>
        {activeTab === 'quiz' ? (
          chapters.length > 0 ? (
            chapters.map(chapter => {
              const completed = isChapterCompleted(chapter);
              return (
                <View key={chapter.id} className={styles.chapterCard}>
                  <View className={styles.chapterHeader}>
                    <Text className={styles.chapterTitle}>{chapter.title}</Text>
                    <Text className={classnames(
                      styles.chapterBadge,
                      completed ? styles.badgeCompleted : styles.badgeUncompleted
                    )}>
                      {completed ? '✓ 已完成' : '未完成'}
                    </Text>
                  </View>
                  <Text className={styles.chapterMeta}>
                    {chapter.quizCount} 道题目 · 答对 {Math.ceil(chapter.quizCount * 0.6)} 题即可获得印章
                  </Text>
                  <Button
                    className={styles.startBtn}
                    onClick={() => handleStartChapter(chapter)}
                  >
                    {completed ? '🔄 再测一次' : '▶️ 开始答题'}
                  </Button>
                </View>
              );
            })
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyIcon}>📋</Text>
              <Text className={styles.emptyText}>暂无答题内容</Text>
              <Text className={styles.emptyDesc}>请稍后再来查看</Text>
            </View>
          )
        ) : (
          <View>
            <View className={styles.stampSection}>
              <Text className={styles.stampSectionTitle}>
                已获得 {totalStamps} / {stamps.length} 枚印章
              </Text>
              <View className={styles.stampGrid}>
                {stamps.map(stamp => (
                  <StampCard key={stamp.id} stamp={stamp} />
                ))}
              </View>
            </View>
            
            {totalStamps === stamps.length && (
              <View className={styles.scoreCard} style={{ textAlign: 'center', padding: '48rpx' }}>
                <Text style={{ fontSize: '80rpx' }}>🎊</Text>
                <Text style={{ fontSize: '32rpx', fontWeight: 'bold', display: 'block', margin: '16rpx 0' }}>
                  恭喜集齐全部印章！
                </Text>
                <Text style={{ fontSize: '24rpx', color: '#8D6E63' }}>
                  您已成为博物馆荣誉馆员
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default QuizPage;
