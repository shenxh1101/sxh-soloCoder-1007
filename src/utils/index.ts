export const formatCrowdLevel = (level: 'comfortable' | 'moderate' | 'busy'): { text: string; color: string } => {
  const map = {
    comfortable: { text: '舒适', color: '#43A047' },
    moderate: { text: '适中', color: '#FB8C00' },
    busy: { text: '繁忙', color: '#E53935' }
  };
  return map[level];
};

export const formatRouteType = (type: 'family' | 'fast' | 'deep'): string => {
  const map = {
    family: '亲子模式',
    fast: '快速模式',
    deep: '深度模式'
  };
  return map[type];
};

export const getCrowdIcon = (level: 'comfortable' | 'moderate' | 'busy'): string => {
  const map = {
    comfortable: '😊',
    moderate: '🙂',
    busy: '😰'
  };
  return map[level];
};

export const generateSouvenirCard = (data: {
  visitDate: string;
  visitedCount: number;
  likedCount: number;
  quizPassedCount: number;
  stampsCount: number;
}): string => {
  const messages = [
    '历史长河中，你留下了探索的足迹。',
    '每一件文物，都是时光的信笺。',
    '今天的参观，是与千年文明的对话。',
    '带着知识的收获，继续前行吧！'
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const cx = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
