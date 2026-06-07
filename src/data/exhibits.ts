import type { Exhibit } from '@/types';

export const exhibits: Exhibit[] = [
  {
    id: 'e1',
    name: '司母戊鼎',
    description: '司母戊鼎是商代晚期的青铜器，是中国现存最大最重的青铜器。鼎身四周铸有精巧的盘龙纹和饕餮纹，增加了文物本身的威武凝重之感。',
    image: 'https://picsum.photos/id/1/300/300',
    detailImages: [
      'https://picsum.photos/id/1/750/500',
      'https://picsum.photos/id/2/750/500',
      'https://picsum.photos/id/3/750/500'
    ],
    audioUrl: '',
    audioDuration: '3分25秒',
    era: '商代晚期',
    year: '约公元前1300年',
    relatedPeople: [
      {
        name: '商王武丁',
        avatar: 'https://picsum.photos/id/64/200/200',
        description: '商朝第二十二任君主，在位期间国势强盛，史称"武丁中兴"。'
      }
    ],
    exhibitionId: 'ex1',
    category: '青铜器',
    location: '第一展厅 A区'
  },
  {
    id: 'e2',
    name: '四羊方尊',
    description: '四羊方尊是商代晚期青铜礼器，祭祀用品。此器四角各有一只卷角羊，造型生动逼真，是现存商代青铜方尊中最大的一件。',
    image: 'https://picsum.photos/id/2/300/300',
    detailImages: [
      'https://picsum.photos/id/4/750/500',
      'https://picsum.photos/id/5/750/500'
    ],
    audioUrl: '',
    audioDuration: '2分48秒',
    era: '商代晚期',
    year: '约公元前1200年',
    relatedPeople: [],
    exhibitionId: 'ex1',
    category: '青铜器',
    location: '第一展厅 B区'
  },
  {
    id: 'e3',
    name: '青花缠枝莲纹瓶',
    description: '明代永乐年间官窑精品，通体绘青花缠枝莲纹，发色鲜艳，层次分明，是明代青花瓷的代表作。',
    image: 'https://picsum.photos/id/3/300/300',
    detailImages: [
      'https://picsum.photos/id/6/750/500',
      'https://picsum.photos/id/7/750/500'
    ],
    audioUrl: '',
    audioDuration: '2分15秒',
    era: '明代',
    year: '永乐年间（1403-1424）',
    relatedPeople: [
      {
        name: '郑和',
        avatar: 'https://picsum.photos/id/91/200/200',
        description: '明代航海家，七下西洋，促进了中外文化交流，带回了大量青花原料。'
      }
    ],
    exhibitionId: 'ex3',
    category: '陶瓷',
    location: '第五展厅 C区'
  },
  {
    id: 'e4',
    name: '金缕玉衣',
    description: '西汉时期的殓服，由2000多片玉片用金丝编缀而成，是汉代皇帝和高级贵族的葬服，体现了古人"玉能防腐"的观念。',
    image: 'https://picsum.photos/id/6/300/300',
    detailImages: [
      'https://picsum.photos/id/8/750/500',
      'https://picsum.photos/id/9/750/500'
    ],
    audioUrl: '',
    audioDuration: '3分10秒',
    era: '西汉',
    year: '约公元前100年',
    relatedPeople: [
      {
        name: '中山靖王刘胜',
        avatar: 'https://picsum.photos/id/177/200/200',
        description: '西汉诸侯王，其墓中出土的金缕玉衣是考古发现中保存最完整的。'
      }
    ],
    exhibitionId: 'ex1',
    category: '玉器',
    location: '第二展厅 A区'
  },
  {
    id: 'e5',
    name: '《清明上河图》摹本',
    description: '清代宫廷画家摹张择端《清明上河图》，生动记录了北宋汴京的城市面貌和社会各阶层人民的生活状况。',
    image: 'https://picsum.photos/id/8/300/300',
    detailImages: [
      'https://picsum.photos/id/10/750/500',
      'https://picsum.photos/id/11/750/500'
    ],
    audioUrl: '',
    audioDuration: '4分30秒',
    era: '清代',
    year: '乾隆年间',
    relatedPeople: [
      {
        name: '张择端',
        avatar: 'https://picsum.photos/id/338/200/200',
        description: '北宋著名画家，《清明上河图》原作作者，被誉为"天才画家"。'
      }
    ],
    exhibitionId: 'ex3',
    category: '书画',
    location: '第六展厅 A区'
  },
  {
    id: 'e6',
    name: '镶金兽首玛瑙杯',
    description: '唐代玉器精品，杯体为玛瑙材质，一端雕成兽首形，镶金装饰，是丝绸之路文化交流的见证。',
    image: 'https://picsum.photos/id/9/300/300',
    detailImages: [
      'https://picsum.photos/id/119/750/500',
      'https://picsum.photos/id/160/750/500'
    ],
    audioUrl: '',
    audioDuration: '2分55秒',
    era: '唐代',
    year: '约公元700年',
    relatedPeople: [],
    exhibitionId: 'ex2',
    category: '玉器',
    location: '临展厅A B区'
  },
  {
    id: 'e7',
    name: '彩绘陶俑',
    description: '唐代彩陶俑群，色彩鲜艳，造型生动，展现了唐代贵族生活的各个方面，是研究唐代社会的珍贵实物资料。',
    image: 'https://picsum.photos/id/11/300/300',
    detailImages: [
      'https://picsum.photos/id/201/750/500',
      'https://picsum.photos/id/237/750/500'
    ],
    audioUrl: '',
    audioDuration: '2分20秒',
    era: '唐代',
    year: '约公元650年',
    relatedPeople: [],
    exhibitionId: 'ex2',
    category: '陶瓷',
    location: '临展厅A C区'
  },
  {
    id: 'e8',
    name: '银鎏金鹦鹉纹盒',
    description: '唐代金银器精品，盒面錾刻鹦鹉纹，通体鎏金，工艺精湛，是唐代金银器制作水平的代表。',
    image: 'https://picsum.photos/id/12/300/300',
    detailImages: [
      'https://picsum.photos/id/312/750/500',
      'https://picsum.photos/id/326/750/500'
    ],
    audioUrl: '',
    audioDuration: '1分58秒',
    era: '唐代',
    year: '约公元750年',
    relatedPeople: [],
    exhibitionId: 'ex2',
    category: '金银器',
    location: '临展厅B A区'
  },
  {
    id: 'e9',
    name: '新出土青铜鼎',
    description: '2025年最新考古发现，铭文内容涉及西周早期重要历史事件，具有极高的历史价值。',
    image: 'https://picsum.photos/id/13/300/300',
    detailImages: [
      'https://picsum.photos/id/401/750/500',
      'https://picsum.photos/id/431/750/500'
    ],
    audioUrl: '',
    audioDuration: '3分05秒',
    era: '西周早期',
    year: '约公元前1000年',
    relatedPeople: [],
    exhibitionId: 'ex4',
    category: '青铜器',
    location: '临展厅C A区'
  },
  {
    id: 'e10',
    name: '战国水晶杯',
    description: '战国时期玉器珍品，杯体为整块水晶雕成，器形规整，透明度高，是战国时期玉器制作工艺的巅峰之作。',
    image: 'https://picsum.photos/id/15/300/300',
    detailImages: [
      'https://picsum.photos/id/570/750/500',
      'https://picsum.photos/id/580/750/500'
    ],
    audioUrl: '',
    audioDuration: '2分30秒',
    era: '战国',
    year: '约公元前300年',
    relatedPeople: [],
    exhibitionId: 'ex4',
    category: '玉器',
    location: '临展厅C B区'
  },
  {
    id: 'e11',
    name: '汝窑天青釉盘',
    description: '宋代汝窑瓷器，天青色釉，釉面开细碎片纹，是宋代五大名窑之一汝窑的代表作品，存世稀少。',
    image: 'https://picsum.photos/id/16/300/300',
    detailImages: [
      'https://picsum.photos/id/625/750/500',
      'https://picsum.photos/id/659/750/500'
    ],
    audioUrl: '',
    audioDuration: '2分40秒',
    era: '宋代',
    year: '北宋徽宗年间',
    relatedPeople: [
      {
        name: '宋徽宗赵佶',
        avatar: 'https://picsum.photos/id/1027/200/200',
        description: '北宋第八位皇帝，书画家，汝窑瓷器的重要推动者。'
      }
    ],
    exhibitionId: 'ex3',
    category: '陶瓷',
    location: '第五展厅 A区'
  },
  {
    id: 'e12',
    name: '越王勾践剑',
    description: '春秋时期越国铸造的青铜剑，剑身铭有"越王勾践，自作用剑"八字，历经两千余年仍锋利如新。',
    image: 'https://picsum.photos/id/17/300/300',
    detailImages: [
      'https://picsum.photos/id/718/750/500',
      'https://picsum.photos/id/783/750/500'
    ],
    audioUrl: '',
    audioDuration: '3分15秒',
    era: '春秋',
    year: '约公元前500年',
    relatedPeople: [
      {
        name: '勾践',
        avatar: 'https://picsum.photos/id/1025/200/200',
        description: '越国君主，"卧薪尝胆"典故的主人公，最终灭掉吴国称霸。'
      }
    ],
    exhibitionId: 'ex1',
    category: '青铜器',
    location: '第一展厅 C区'
  }
];

export const getExhibitById = (id: string): Exhibit | undefined => {
  return exhibits.find(e => e.id === id);
};

export const getExhibitsByExhibitionId = (exhibitionId: string): Exhibit[] => {
  return exhibits.filter(e => e.exhibitionId === exhibitionId);
};

export const getExhibitsByIds = (ids: string[]): Exhibit[] => {
  return ids.map(id => exhibits.find(e => e.id === id)).filter(Boolean) as Exhibit[];
};
