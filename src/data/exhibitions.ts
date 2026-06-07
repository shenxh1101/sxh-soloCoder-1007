import type { Exhibition } from '@/types';

export const exhibitions: Exhibition[] = [
  {
    id: 'ex1',
    name: '华夏文明之光',
    type: 'permanent',
    description: '本展览汇集了从新石器时代到明清时期的珍贵文物，全面展现中华文明五千年的发展脉络。包括青铜器、陶瓷、书画、玉器等多个门类的精品馆藏。',
    coverImage: 'https://picsum.photos/id/1082/750/400',
    openAreas: ['第一展厅', '第二展厅', '第三展厅', '第四展厅'],
    duration: '约2.5小时',
    crowdLevel: 'moderate',
    exhibitCount: 128
  },
  {
    id: 'ex2',
    name: '丝路遗珍',
    type: 'temporary',
    description: '特别呈现丝绸之路沿线出土的珍贵文物，包括来自中亚、西亚的金银器、玻璃器，以及东西方文化交流的见证物。',
    coverImage: 'https://picsum.photos/id/1039/750/400',
    openAreas: ['临展厅A', '临展厅B'],
    duration: '约1.5小时',
    crowdLevel: 'busy',
    startDate: '2026-01-15',
    endDate: '2026-06-30',
    exhibitCount: 86
  },
  {
    id: 'ex3',
    name: '明清宫廷艺术',
    type: 'permanent',
    description: '展示明清两代宫廷收藏的珍贵艺术品，包括官窑瓷器、宫廷书画、皇家玉器等，再现宫廷艺术的辉煌。',
    coverImage: 'https://picsum.photos/id/1015/750/400',
    openAreas: ['第五展厅', '第六展厅'],
    duration: '约2小时',
    crowdLevel: 'comfortable',
    exhibitCount: 92
  },
  {
    id: 'ex4',
    name: '考古新发现',
    type: 'temporary',
    description: '近年最新考古成果特展，首次公开展出多个重大考古遗址出土的珍贵文物，带您亲临考古现场。',
    coverImage: 'https://picsum.photos/id/1018/750/400',
    openAreas: ['临展厅C'],
    duration: '约1小时',
    crowdLevel: 'moderate',
    startDate: '2026-03-01',
    endDate: '2026-08-31',
    exhibitCount: 58
  }
];

export const getExhibitionById = (id: string): Exhibition | undefined => {
  return exhibitions.find(e => e.id === id);
};

export const getPermanentExhibitions = (): Exhibition[] => {
  return exhibitions.filter(e => e.type === 'permanent');
};

export const getTemporaryExhibitions = (): Exhibition[] => {
  return exhibitions.filter(e => e.type === 'temporary');
};
