import { create } from 'zustand';
import type { AppState, Stamp } from '@/types';

const initialStamps: Stamp[] = [
  { id: 's1', name: '常设展览', icon: '🏛️', earned: false },
  { id: 's2', name: '特展达人', icon: '⭐', earned: false },
  { id: 's3', name: '青铜专家', icon: '🏺', earned: false },
  { id: 's4', name: '书画鉴赏', icon: '🖼️', earned: false },
  { id: 's5', name: '陶瓷大师', icon: '🍶', earned: false },
  { id: 's6', name: '全馆通览', icon: '🎖️', earned: false },
];

export const useAppStore = create<AppState>((set, get) => ({
  favorites: [],
  listenedAudios: [],
  unfinishedRoutes: [],
  completedQuizzes: [],
  stamps: initialStamps,
  currentPlayingExhibitId: null,
  isPlaying: false,

  addFavorite: (exhibitId: string) => {
    const { favorites } = get();
    if (!favorites.find(f => f.exhibitId === exhibitId)) {
      set({
        favorites: [...favorites, { exhibitId, addedAt: new Date().toISOString() }]
      });
      console.log('[Store] 添加收藏:', exhibitId);
    }
  },

  removeFavorite: (exhibitId: string) => {
    const { favorites } = get();
    set({
      favorites: favorites.filter(f => f.exhibitId !== exhibitId)
    });
    console.log('[Store] 移除收藏:', exhibitId);
  },

  isFavorite: (exhibitId: string) => {
    return get().favorites.some(f => f.exhibitId === exhibitId);
  },

  addListenedAudio: (exhibitId: string, progress: number) => {
    const { listenedAudios } = get();
    const existing = listenedAudios.find(l => l.exhibitId === exhibitId);
    if (existing) {
      set({
        listenedAudios: listenedAudios.map(l =>
          l.exhibitId === exhibitId
            ? { ...l, progress: Math.max(l.progress, progress), listenedAt: new Date().toISOString() }
            : l
        )
      });
    } else {
      set({
        listenedAudios: [...listenedAudios, {
          exhibitId,
          listenedAt: new Date().toISOString(),
          progress
        }]
      });
    }
    console.log('[Store] 更新收听记录:', exhibitId, progress);
  },

  saveUnfinishedRoute: (routeId: string, currentIndex: number) => {
    const { unfinishedRoutes } = get();
    const existing = unfinishedRoutes.find(r => r.routeId === routeId);
    if (existing) {
      set({
        unfinishedRoutes: unfinishedRoutes.map(r =>
          r.routeId === routeId
            ? { ...r, currentExhibitIndex: currentIndex }
            : r
        )
      });
    } else {
      set({
        unfinishedRoutes: [...unfinishedRoutes, {
          routeId,
          currentExhibitIndex: currentIndex,
          startedAt: new Date().toISOString()
        }]
      });
    }
    console.log('[Store] 保存未完成路线:', routeId, currentIndex);
  },

  removeUnfinishedRoute: (routeId: string) => {
    const { unfinishedRoutes } = get();
    set({
      unfinishedRoutes: unfinishedRoutes.filter(r => r.routeId !== routeId)
    });
    console.log('[Store] 移除未完成路线:', routeId);
  },

  completeQuiz: (quizId: string) => {
    const { completedQuizzes } = get();
    if (!completedQuizzes.includes(quizId)) {
      set({
        completedQuizzes: [...completedQuizzes, quizId]
      });
      console.log('[Store] 完成答题:', quizId);
    }
  },

  earnStamp: (stampId: string) => {
    const { stamps } = get();
    set({
      stamps: stamps.map(s =>
        s.id === stampId
          ? { ...s, earned: true, earnedDate: new Date().toISOString() }
          : s
      )
    });
    console.log('[Store] 获得印章:', stampId);
  },

  setCurrentPlaying: (exhibitId: string | null) => {
    set({ currentPlayingExhibitId: exhibitId, isPlaying: exhibitId !== null });
    console.log('[Store] 设置当前播放:', exhibitId);
  },

  togglePlay: () => {
    set(state => ({ isPlaying: !state.isPlaying }));
    console.log('[Store] 切换播放状态:', !get().isPlaying);
  }
}));
