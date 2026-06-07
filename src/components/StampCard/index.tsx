import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';
import type { Stamp } from '@/types';

interface StampCardProps {
  stamp: Stamp;
  onClick?: () => void;
}

const StampCard: React.FC<StampCardProps> = ({ stamp, onClick }) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}.${date.getDate()}`;
  };

  return (
    <View 
      className={classnames(styles.card, !stamp.earned && styles.stampLocked)}
      onClick={onClick}
    >
      <View className={classnames(
        styles.stampIcon,
        stamp.earned && styles.stampIconEarned
      )}>
        <Text>{stamp.icon}</Text>
      </View>
      <Text className={styles.stampName}>{stamp.name}</Text>
      {stamp.earned && stamp.earnedDate && (
        <Text className={styles.stampDate}>{formatDate(stamp.earnedDate)}</Text>
      )}
    </View>
  );
};

export default StampCard;
