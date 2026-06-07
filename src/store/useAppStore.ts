import { create } from 'zustand';
import Taro from '@tarojs/taro';
import type { AppState, Stamp, FavoriteItem, ListenedAudio, UnfinishedRoute } from '@/types';

const STORAGE_KEY = 'museum_app_state';

const initialStamps: Stamp[] = [
  { id: 's1', name: '常设展览', icon: '🏛️', earned: false },
  { id: 's2', name: '特展达人', icon: '⭐', earned: false },
  { id: 's3', name: '青铜专家', icon: '🏺', earned: false },
  { id: 's4', name: '书画鉴赏', icon: '🖼️', earned: false },
  { id: 's5', name: '陶瓷大师', icon: '🍶', earned: false },
  { id: 's6', name: '全馆通览', icon: '🎖️', earned: false },
];

interface PersistedState {
  favorites: FavoriteItem[];
  listenedAudios: ListenedAudio[];
  unfinishedRoutes: UnfinishedRoute[];
  completedQuizzes: string[];
  stamps: Stamp[];
  totalCorrectCount: number;
}

const loadPersistedState = (): Partial<PersistedState> => {
  try {
    const saved = Taro.getStorageSync(STORAGE_KEY);
    if (saved) {
      console.log('[Store] 从微信缓存加载数据成功');
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('[Store] 加载持久化数据失败:', e);
  }
  return {};
};

const savePersistedState = (state: Partial<PersistedState>) => {
  try {
    const current = loadPersistedState();
    const toSave = { ...current, ...state };
    Taro.setStorageSync(STORAGE_KEY, JSON.stringify(toSave));
    console.log('[Store] 状态已持久化到微信缓存');
  } catch (e) {
    console.warn('[Store] 保存持久化数据失败:', e);
  }
};

const persistedState = loadPersistedState();

export const useAppStore = create<AppState & { totalCorrectCount: number }>((set, get) => ({
  favorites: persistedState.favorites || [],
  listenedAudios: persistedState.listenedAudios || [],
  unfinishedRoutes: persistedState.unfinishedRoutes || [],
  completedQuizzes: persistedState.completedQuizzes || [],
  stamps: persistedState.stamps || initialStamps,
  totalCorrectCount: persistedState.totalCorrectCount || 0,
  currentPlayingExhibitId: null,
  isPlaying: false,

  addFavorite: (exhibitId: string) => {
    const { favorites } = get();
    if (!favorites.find(f => f.exhibitId === exhibitId)) {
      const newFavorites = [...favorites, { exhibitId, addedAt: new Date().toISOString() }];
      set({ favorites: newFavorites });
      savePersistedState({ favorites: newFavorites });
      console.log('[Store] 添加收藏:', exhibitId);
    }
  },

  removeFavorite: (exhibitId: string) => {
    const { favorites } = get();
    const newFavorites = favorites.filter(f => f.exhibitId !== exhibitId);
    set({ favorites: newFavorites });
    savePersistedState({ favorites: newFavorites });
    console.log('[Store] 移除收藏:', exhibitId);
  },

  isFavorite: (exhibitId: string) => {
    return get().favorites.some(f => f.exhibitId === exhibitId);
  },

  addListenedAudio: (exhibitId: string, progress: number) => {
    const { listenedAudios } = get();
    const existing = listenedAudios.find(l => l.exhibitId === exhibitId);
    let newListenedAudios;
    if (existing) {
      newListenedAudios = listenedAudios.map(l =>
        l.exhibitId === exhibitId
          ? { ...l, progress: Math.max(l.progress, progress), listenedAt: new Date().toISOString() }
          : l
      );
    } else {
      newListenedAudios = [...listenedAudios, {
        exhibitId,
        listenedAt: new Date().toISOString(),
        progress
      }];
    }
    set({ listenedAudios: newListenedAudios });
    savePersistedState({ listenedAudios: newListenedAudios });
    console.log('[Store] 更新收听记录:', exhibitId, progress);
  },

  saveUnfinishedRoute: (routeId: string, currentIndex: number) => {
    const { unfinishedRoutes } = get();
    const existing = unfinishedRoutes.find(r => r.routeId === routeId);
    let newUnfinishedRoutes;
    if (existing) {
      newUnfinishedRoutes = unfinishedRoutes.map(r =>
        r.routeId === routeId
          ? { ...r, currentExhibitIndex: currentIndex }
          : r
      );
    } else {
      newUnfinishedRoutes = [...unfinishedRoutes, {
        routeId,
        currentExhibitIndex: currentIndex,
        startedAt: new Date().toISOString()
      }];
    }
    set({ unfinishedRoutes: newUnfinishedRoutes });
    savePersistedState({ unfinishedRoutes: newUnfinishedRoutes });
    console.log('[Store] 保存未完成路线:', routeId, currentIndex);
  },

  removeUnfinishedRoute: (routeId: string) => {
    const { unfinishedRoutes } = get();
    const newUnfinishedRoutes = unfinishedRoutes.filter(r => r.routeId !== routeId);
    set({ unfinishedRoutes: newUnfinishedRoutes });
    savePersistedState({ unfinishedRoutes: newUnfinishedRoutes });
    console.log('[Store] 移除未完成路线:', routeId);
  },

  completeQuiz: (quizId: string, isCorrect?: boolean) => {
    const { completedQuizzes, totalCorrectCount } = get();
    if (!completedQuizzes.includes(quizId)) {
      const newCompletedQuizzes = [...completedQuizzes, quizId];
      const newTotalCorrectCount = isCorrect ? totalCorrectCount + 1 : totalCorrectCount;
      set({ 
        completedQuizzes: newCompletedQuizzes,
        totalCorrectCount: newTotalCorrectCount
      });
      savePersistedState({ 
        completedQuizzes: newCompletedQuizzes,
        totalCorrectCount: newTotalCorrectCount
      });
      console.log('[Store] 完成答题:', quizId, isCorrect ? '正确' : '错误');
    }
  },

  incrementCorrectCount: () => {
    const { totalCorrectCount } = get();
    const newCount = totalCorrectCount + 1;
    set({ totalCorrectCount: newCount });
    savePersistedState({ totalCorrectCount: newCount });
  },

  earnStamp: (stampId: string) => {
    const { stamps } = get();
    const newStamps = stamps.map(s =>
      s.id === stampId
        ? { ...s, earned: true, earnedDate: new Date().toISOString() }
        : s
    );
    set({ stamps: newStamps });
    savePersistedState({ stamps: newStamps });
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
