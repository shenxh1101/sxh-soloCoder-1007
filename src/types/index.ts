export interface Exhibition {
  id: string;
  name: string;
  type: 'permanent' | 'temporary';
  description: string;
  coverImage: string;
  openAreas: string[];
  duration: string;
  crowdLevel: 'comfortable' | 'moderate' | 'busy';
  startDate?: string;
  endDate?: string;
  exhibitCount: number;
}

export interface Exhibit {
  id: string;
  name: string;
  description: string;
  image: string;
  detailImages: string[];
  audioUrl: string;
  audioDuration: string;
  era: string;
  year: string;
  relatedPeople: RelatedPerson[];
  exhibitionId: string;
  category: string;
  location: string;
}

export interface RelatedPerson {
  name: string;
  avatar: string;
  description: string;
}

export interface Route {
  id: string;
  name: string;
  type: 'family' | 'fast' | 'deep';
  description: string;
  duration: string;
  distance: string;
  exhibitCount: number;
  exhibitIds: string[];
  icon: string;
  tags: string[];
}

export interface Quiz {
  id: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  chapter: string;
  exhibitionId: string;
}

export interface Chapter {
  id: string;
  title: string;
  exhibitionId: string;
  quizCount: number;
  completed: boolean;
}

export interface Stamp {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface FavoriteItem {
  exhibitId: string;
  addedAt: string;
}

export interface ListenedAudio {
  exhibitId: string;
  listenedAt: string;
  progress: number;
}

export interface UnfinishedRoute {
  routeId: string;
  currentExhibitIndex: number;
  startedAt: string;
}

export interface AppState {
  favorites: FavoriteItem[];
  listenedAudios: ListenedAudio[];
  unfinishedRoutes: UnfinishedRoute[];
  completedQuizzes: string[];
  stamps: Stamp[];
  currentPlayingExhibitId: string | null;
  isPlaying: boolean;
  addFavorite: (exhibitId: string) => void;
  removeFavorite: (exhibitId: string) => void;
  isFavorite: (exhibitId: string) => boolean;
  addListenedAudio: (exhibitId: string, progress: number) => void;
  saveUnfinishedRoute: (routeId: string, currentIndex: number) => void;
  removeUnfinishedRoute: (routeId: string) => void;
  completeQuiz: (quizId: string) => void;
  earnStamp: (stampId: string) => void;
  setCurrentPlaying: (exhibitId: string | null) => void;
  togglePlay: () => void;
}
