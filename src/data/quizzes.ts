import type { Quiz, Chapter } from '@/types';

export const chapters: Chapter[] = [
  {
    id: 'c1',
    title: '青铜时代',
    exhibitionId: 'ex1',
    quizCount: 5,
    completed: false
  },
  {
    id: 'c2',
    title: '陶瓷艺术',
    exhibitionId: 'ex1',
    quizCount: 4,
    completed: false
  },
  {
    id: 'c3',
    title: '玉器精粹',
    exhibitionId: 'ex1',
    quizCount: 3,
    completed: false
  },
  {
    id: 'c4',
    title: '丝路文化',
    exhibitionId: 'ex2',
    quizCount: 4,
    completed: false
  },
  {
    id: 'c5',
    title: '明清宫廷',
    exhibitionId: 'ex3',
    quizCount: 5,
    completed: false
  },
  {
    id: 'c6',
    title: '考古发现',
    exhibitionId: 'ex4',
    quizCount: 3,
    completed: false
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: '青铜时代 第1题',
    question: '司母戊鼎是哪个朝代的青铜器？',
    options: ['夏朝', '商朝', '周朝', '秦朝'],
    correctIndex: 1,
    explanation: '司母戊鼎是商代晚期的青铜器，是中国现存最大最重的青铜器，重达832.84公斤。',
    chapter: '青铜时代',
    exhibitionId: 'ex1'
  },
  {
    id: 'q2',
    title: '青铜时代 第2题',
    question: '四羊方尊的主要装饰图案是什么？',
    options: ['龙纹', '凤纹', '羊首', '虎纹'],
    correctIndex: 2,
    explanation: '四羊方尊四角各有一只卷角羊，造型生动逼真，因此得名"四羊方尊"。',
    chapter: '青铜时代',
    exhibitionId: 'ex1'
  },
  {
    id: 'q3',
    title: '青铜时代 第3题',
    question: '越王勾践剑最令人惊叹的特点是什么？',
    options: ['体积巨大', '纹饰精美', '历经两千余年仍锋利', '重量惊人'],
    correctIndex: 2,
    explanation: '越王勾践剑埋藏地下两千余年，出土时仍锋利如新，可轻易划破二十余层纸，体现了春秋战国时期高超的铸剑工艺。',
    chapter: '青铜时代',
    exhibitionId: 'ex1'
  },
  {
    id: 'q4',
    title: '青铜时代 第4题',
    question: '青铜器上的"饕餮纹"象征什么？',
    options: ['吉祥如意', '威严与权力', '富贵荣华', '长命百岁'],
    correctIndex: 1,
    explanation: '饕餮纹是青铜器上常见的纹饰，以狰狞神秘的兽面为特征，象征着统治者的威严与权力。',
    chapter: '青铜时代',
    exhibitionId: 'ex1'
  },
  {
    id: 'q5',
    title: '青铜时代 第5题',
    question: '新出土青铜鼎的铭文主要涉及什么内容？',
    options: ['祭祀活动', '战争记录', '西周早期历史事件', '王室联姻'],
    correctIndex: 2,
    explanation: '这件2025年新出土的青铜鼎铭文内容涉及西周早期重要历史事件，具有极高的历史研究价值。',
    chapter: '青铜时代',
    exhibitionId: 'ex1'
  },
  {
    id: 'q6',
    title: '陶瓷艺术 第1题',
    question: '青花瓷最早出现在哪个朝代？',
    options: ['唐代', '宋代', '元代', '明代'],
    correctIndex: 0,
    explanation: '青花瓷最早出现在唐代，但成熟的青花瓷则出现在元代景德镇，明代永乐、宣德时期达到鼎盛。',
    chapter: '陶瓷艺术',
    exhibitionId: 'ex1'
  },
  {
    id: 'q7',
    title: '陶瓷艺术 第2题',
    question: '汝窑瓷器的典型釉色是什么？',
    options: ['纯白色', '天青色', '翠绿色', '霁蓝色'],
    correctIndex: 1,
    explanation: '汝窑以天青色釉著称，传说这是宋徽宗梦中所见的颜色，"雨过天晴云破处，这般颜色做将来"。',
    chapter: '陶瓷艺术',
    exhibitionId: 'ex1'
  },
  {
    id: 'q8',
    title: '陶瓷艺术 第3题',
    question: '宋代五大名窑不包括以下哪个？',
    options: ['汝窑', '官窑', '哥窑', '景德镇窑'],
    correctIndex: 3,
    explanation: '宋代五大名窑是：汝窑、官窑、哥窑、钧窑、定窑。景德镇窑虽然著名，但不属于宋代五大名窑。',
    chapter: '陶瓷艺术',
    exhibitionId: 'ex1'
  },
  {
    id: 'q9',
    title: '陶瓷艺术 第4题',
    question: '彩绘陶俑主要反映了哪个朝代的社会生活？',
    options: ['汉代', '唐代', '宋代', '明代'],
    correctIndex: 1,
    explanation: '唐代彩绘陶俑生动展现了唐代社会各阶层的生活风貌，是研究唐代历史的珍贵实物资料。',
    chapter: '陶瓷艺术',
    exhibitionId: 'ex1'
  },
  {
    id: 'q10',
    title: '玉器精粹 第1题',
    question: '金缕玉衣是哪个时期的殓服？',
    options: ['先秦', '汉代', '唐代', '宋代'],
    correctIndex: 1,
    explanation: '金缕玉衣是汉代皇帝和高级贵族的殓服，体现了古人"玉能防腐"的观念，只有皇帝才能使用金缕。',
    chapter: '玉器精粹',
    exhibitionId: 'ex1'
  },
  {
    id: 'q11',
    title: '玉器精粹 第2题',
    question: '镶金兽首玛瑙杯是哪一文化交流的见证？',
    options: ['茶马古道', '丝绸之路', '京杭运河', '海上丝路'],
    correctIndex: 1,
    explanation: '镶金兽首玛瑙杯的造型和工艺受到中亚、西亚文化的影响，是丝绸之路文化交流的重要见证。',
    chapter: '玉器精粹',
    exhibitionId: 'ex1'
  },
  {
    id: 'q12',
    title: '玉器精粹 第3题',
    question: '战国水晶杯最令人惊叹的是什么？',
    options: ['巨大的尺寸', '精美的纹饰', '整块水晶雕成', '彩绘装饰'],
    correctIndex: 2,
    explanation: '战国水晶杯由整块水晶雕成，透明度高，器形规整，在战国时期的工艺条件下完成如此作品令人叹为观止。',
    chapter: '玉器精粹',
    exhibitionId: 'ex1'
  },
  {
    id: 'q13',
    title: '丝路文化 第1题',
    question: '丝绸之路的起点是？',
    options: ['洛阳', '长安', '敦煌', '兰州'],
    correctIndex: 1,
    explanation: '丝绸之路的起点是长安（今西安），经河西走廊、中亚、西亚，最终到达欧洲。',
    chapter: '丝路文化',
    exhibitionId: 'ex2'
  },
  {
    id: 'q14',
    title: '丝路文化 第2题',
    question: '银鎏金鹦鹉纹盒体现了唐代哪方面的工艺水平？',
    options: ['陶瓷', '丝绸', '金银器', '玉器'],
    correctIndex: 2,
    explanation: '银鎏金鹦鹉纹盒是唐代金银器的精品，錾刻工艺精湛，体现了唐代金银器制作的高超水平。',
    chapter: '丝路文化',
    exhibitionId: 'ex2'
  },
  {
    id: 'q15',
    title: '丝路文化 第3题',
    question: '以下哪种物品不是通过丝绸之路传入中国的？',
    options: ['葡萄', '石榴', '丝绸', '汗血马'],
    correctIndex: 2,
    explanation: '丝绸是中国通过丝绸之路向外输出的代表性商品，而葡萄、石榴、汗血马等则是从西域传入中国的。',
    chapter: '丝路文化',
    exhibitionId: 'ex2'
  },
  {
    id: 'q16',
    title: '丝路文化 第4题',
    question: '唐代彩绘陶俑中的"胡姬"形象反映了什么？',
    options: ['唐代女性审美', '民族融合', '中外文化交流', '以上都是'],
    correctIndex: 3,
    explanation: '胡姬俑反映了唐代社会对西域女性的审美、各民族之间的融合以及中外文化交流的繁荣景象。',
    chapter: '丝路文化',
    exhibitionId: 'ex2'
  },
  {
    id: 'q17',
    title: '明清宫廷 第1题',
    question: '青花缠枝莲纹瓶是哪个朝代的官窑精品？',
    options: ['唐代', '宋代', '明代', '清代'],
    correctIndex: 2,
    explanation: '青花缠枝莲纹瓶是明代永乐年间官窑精品，这一时期的青花瓷代表了明代青花瓷器的最高水平。',
    chapter: '明清宫廷',
    exhibitionId: 'ex3'
  },
  {
    id: 'q18',
    title: '明清宫廷 第2题',
    question: '《清明上河图》描绘的是哪个城市的景象？',
    options: ['长安', '洛阳', '汴京', '南京'],
    correctIndex: 2,
    explanation: '《清明上河图》描绘了北宋汴京（今开封）的城市面貌和社会各阶层人民的生活状况。',
    chapter: '明清宫廷',
    exhibitionId: 'ex3'
  },
  {
    id: 'q19',
    title: '明清宫廷 第3题',
    question: '汝窑瓷器主要供谁使用？',
    options: ['百姓', '商人', '皇室', '官员'],
    correctIndex: 2,
    explanation: '汝窑是宋代专为宫廷烧造御用瓷器的官窑，产品主要供皇室使用，民间流传极少，有"汝瓷为魁"之说。',
    chapter: '明清宫廷',
    exhibitionId: 'ex3'
  },
  {
    id: 'q20',
    title: '明清宫廷 第4题',
    question: '宋徽宗赵佶除了是皇帝，还是著名的？',
    options: ['军事家', '书法家和画家', '医学家', '科学家'],
    correctIndex: 1,
    explanation: '宋徽宗赵佶虽然在政治上昏庸，但在艺术上成就极高，创造了"瘦金体"书法，花鸟画也自成一派。',
    chapter: '明清宫廷',
    exhibitionId: 'ex3'
  },
  {
    id: 'q21',
    title: '明清宫廷 第5题',
    question: '明清两代的皇宫位于今天的哪里？',
    options: ['西安', '洛阳', '北京', '南京'],
    correctIndex: 2,
    explanation: '明清两代的皇宫是紫禁城，即今天的北京故宫，是中国现存最大最完整的古建筑群。',
    chapter: '明清宫廷',
    exhibitionId: 'ex3'
  },
  {
    id: 'q22',
    title: '考古发现 第1题',
    question: '考古学中，判断遗址年代最常用的方法是？',
    options: ['文献记载', '碳-14测年', '传说故事', '器物类型学'],
    correctIndex: 1,
    explanation: '碳-14测年法是考古学中最常用的测定年代方法，通过测定有机物中碳-14的含量来推算年代。',
    chapter: '考古发现',
    exhibitionId: 'ex4'
  },
  {
    id: 'q23',
    title: '考古发现 第2题',
    question: '青铜器上的铭文为什么具有重要的历史价值？',
    options: ['书法价值高', '记载了真实历史事件', '工艺精美', '金属价值高'],
    correctIndex: 1,
    explanation: '青铜器铭文记载了当时的祭祀、战争、赏赐等真实历史事件，是研究古代历史的第一手资料。',
    chapter: '考古发现',
    exhibitionId: 'ex4'
  },
  {
    id: 'q24',
    title: '考古发现 第3题',
    question: '以下哪项不是考古工作的基本步骤？',
    options: ['调查勘探', '发掘清理', '随意挖掘', '修复保护'],
    correctIndex: 2,
    explanation: '考古工作需要严格的科学方法，包括调查、勘探、发掘、清理、修复、保护等步骤，随意挖掘会对文物造成不可逆的破坏。',
    chapter: '考古发现',
    exhibitionId: 'ex4'
  }
];

export const getQuizzesByChapter = (chapter: string): Quiz[] => {
  return quizzes.filter(q => q.chapter === chapter);
};

export const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find(q => q.id === id);
};

export const getChapterById = (id: string): Chapter | undefined => {
  return chapters.find(c => c.id === id);
};
