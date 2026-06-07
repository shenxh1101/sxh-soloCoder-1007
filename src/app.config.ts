export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/route/index',
    'pages/quiz/index',
    'pages/favorite/index',
    'pages/exhibit-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#8B6914',
    navigationBarTitleText: '博物馆导览',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F5F1E8'
  },
  tabBar: {
    color: '#8D6E63',
    selectedColor: '#8B6914',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/route/index',
        text: '路线'
      },
      {
        pagePath: 'pages/quiz/index',
        text: '互动'
      },
      {
        pagePath: 'pages/favorite/index',
        text: '收藏'
      }
    ]
  }
})
