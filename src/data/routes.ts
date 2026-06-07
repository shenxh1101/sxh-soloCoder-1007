import type { Route } from '@/types';

export const routes: Route[] = [
  {
    id: 'r1',
    name: '亲子探索之旅',
    type: 'family',
    description: '专为家庭设计的趣味路线，精选互动性强、造型生动的展品，配合讲解故事，让孩子们在玩乐中学习历史知识。',
    duration: '约1.5小时',
    distance: '1.2公里',
    exhibitCount: 8,
    exhibitIds: ['e1', 'e2', 'e4', 'e7', 'e10', 'e12', 'e6', 'e9'],
    icon: '👨‍👩‍👧‍👦',
    tags: ['亲子互动', '趣味讲解', '轻松行程']
  },
  {
    id: 'r2',
    name: '精品快速路线',
    type: 'fast',
    description: '时间有限？选择这条路线，直击馆内最具代表性的镇馆之宝，用最短时间领略博物馆精华。',
    duration: '约1小时',
    distance: '0.8公里',
    exhibitCount: 5,
    exhibitIds: ['e1', 'e4', 'e12', 'e3', 'e11'],
    icon: '⚡',
    tags: ['省时高效', '必看精品', '精华浓缩']
  },
  {
    id: 'r3',
    name: '深度文化之旅',
    type: 'deep',
    description: '为文化爱好者打造的深度参观路线，按历史时间轴顺序安排展品，配合详细讲解，全面感受中华文明的博大精深。',
    duration: '约3小时',
    distance: '2.5公里',
    exhibitCount: 15,
    exhibitIds: ['e12', 'e9', 'e1', 'e2', 'e4', 'e10', 'e6', 'e7', 'e8', 'e5', 'e3', 'e11', 'e6', 'e8', 'e2'],
    icon: '📚',
    tags: ['深度讲解', '时间轴序', '全面了解']
  }
];

export const getRouteById = (id: string): Route | undefined => {
  return routes.find(r => r.id === id);
};

export const getRouteByType = (type: 'family' | 'fast' | 'deep'): Route | undefined => {
  return routes.find(r => r.type === type);
};
