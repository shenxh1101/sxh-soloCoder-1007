import React, { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';
import type { Quiz } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface QuizCardProps {
  quiz: Quiz;
  showResult?: boolean;
  onAnswer?: (isCorrect: boolean, isFirstTime: boolean) => void;
  onNext?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, showResult = false, onAnswer, onNext }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(showResult);
  const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);
  const { completeQuiz, completedQuizzes } = useAppStore();

  const isAlreadyCompleted = completedQuizzes.includes(quiz.id);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    
    const isCorrect = selectedIndex === quiz.correctIndex;
    setIsAnswered(true);
    setLocalCorrect(isCorrect);
    
    if (!isAlreadyCompleted) {
      completeQuiz(quiz.id, isCorrect);
    } else {
      console.log('[QuizCard] 题目已答过，不计入累计:', quiz.id);
    }
    
    if (onAnswer) {
      onAnswer(isCorrect, !isAlreadyCompleted);
    }
    console.log('[QuizCard] 提交答案:', quiz.id, '正确:', isCorrect, '是否首次:', !isAlreadyCompleted);
  };

  const handleNext = () => {
    setSelectedIndex(null);
    setIsAnswered(false);
    if (onNext) {
      onNext();
    }
  };

  const getOptionClass = (index: number) => {
    if (!isAnswered) {
      return classnames(
        styles.option,
        selectedIndex === index && styles.optionSelected
      );
    }
    if (index === quiz.correctIndex) {
      return classnames(styles.option, styles.optionCorrect);
    }
    if (index === selectedIndex && index !== quiz.correctIndex) {
      return classnames(styles.option, styles.optionWrong);
    }
    return styles.option;
  };

  const getOptionIndexClass = (index: number) => {
    if (!isAnswered) {
      return classnames(
        styles.optionIndex,
        selectedIndex === index && styles.optionIndexSelected
      );
    }
    if (index === quiz.correctIndex) {
      return classnames(styles.optionIndex, styles.optionIndexCorrect);
    }
    if (index === selectedIndex && index !== quiz.correctIndex) {
      return classnames(styles.optionIndex, styles.optionIndexWrong);
    }
    return styles.optionIndex;
  };

  const getOptionIndexText = (index: number) => {
    const labels = ['A', 'B', 'C', 'D'];
    if (!isAnswered) return labels[index];
    if (index === quiz.correctIndex) return '✓';
    if (index === selectedIndex && index !== quiz.correctIndex) return '✗';
    return labels[index];
  };

  return (
    <View className={styles.card}>
      <View className={styles.header}>
        <Text className={styles.chapter}>{quiz.chapter}</Text>
        <Text className={styles.questionNumber}>{quiz.title}</Text>
      </View>

      <Text className={styles.question}>{quiz.question}</Text>

      <View className={styles.options}>
        {quiz.options.map((option, index) => (
          <View
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleOptionClick(index)}
          >
            <Text className={getOptionIndexClass(index)}>
              {getOptionIndexText(index)}
            </Text>
            <Text className={styles.optionText}>{option}</Text>
          </View>
        ))}
      </View>

      {isAnswered && (
        <View className={styles.explanation}>
          <Text className={styles.explanationLabel}>答案解析</Text>
          <Text className={styles.explanationText}>{quiz.explanation}</Text>
        </View>
      )}

      <View className={styles.footer}>
        {!isAnswered ? (
          <Button
            className={classnames(
              styles.btn,
              selectedIndex === null ? styles.btnDisabled : styles.btnPrimary
            )}
            disabled={selectedIndex === null}
            onClick={handleSubmit}
          >
            提交答案
          </Button>
        ) : (
          <Button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleNext}
          >
            下一题
          </Button>
        )}
      </View>
    </View>
  );
};

export default QuizCard;
