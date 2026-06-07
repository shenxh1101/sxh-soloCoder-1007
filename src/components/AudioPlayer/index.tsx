import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { useAppStore } from '@/store/useAppStore';
import type { Exhibit } from '@/types';

interface AudioPlayerProps {
  exhibit: Exhibit;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ exhibit, autoPlay = false }) => {
  const { currentPlayingExhibitId, isPlaying, setCurrentPlaying, togglePlay, addListenedAudio } = useAppStore();
  const [progress, setProgress] = useState(0);
  
  const isCurrentPlaying = currentPlayingExhibitId === exhibit.id;

  useEffect(() => {
    if (autoPlay && !isPlaying) {
      setCurrentPlaying(exhibit.id);
    }
  }, [autoPlay, exhibit.id, isPlaying, setCurrentPlaying]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isCurrentPlaying && isPlaying) {
      timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 0.5, 100);
          if (newProgress >= 100) {
            addListenedAudio(exhibit.id, 100);
            clearInterval(timer);
          }
          return newProgress;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isCurrentPlaying, isPlaying, exhibit.id, addListenedAudio]);

  const handlePlayToggle = () => {
    if (isCurrentPlaying) {
      togglePlay();
      if (!isPlaying) {
        addListenedAudio(exhibit.id, progress);
      }
    } else {
      setCurrentPlaying(exhibit.id);
    }
    console.log('[AudioPlayer] 播放控制:', exhibit.id, isCurrentPlaying ? !isPlaying : true);
  };

  const formatDuration = (audioDuration: string) => {
    return audioDuration;
  };

  return (
    <View className={styles.player}>
      <View className={styles.playBtn} onClick={handlePlayToggle}>
        <Text>{isCurrentPlaying && isPlaying ? '⏸️' : '▶️'}</Text>
      </View>
      <View className={styles.info}>
        <Text className={styles.title}>语音讲解 · {exhibit.name}</Text>
        <View className={styles.progressBar}>
          <View 
            className={styles.progressFill} 
            style={{ width: `${isCurrentPlaying ? progress : 0}%` }}
          />
        </View>
      </View>
      <Text className={styles.time}>
        {isCurrentPlaying ? `${Math.floor(progress * 0.02)}:${Math.floor((progress * 1.2) % 60).toString().padStart(2, '0')}` : formatDuration(exhibit.audioDuration)}
      </Text>
    </View>
  );
};

export default AudioPlayer;
