export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //     path: '/welcome',
  //     name: 'welcome',
  //     icon: 'smile',
  //     component: './Welcome',
  // },
  // {
  //     path: '/admin',
  //     name: 'admin',
  //     icon: 'crown',
  //     access: 'canAdmin',
  //     routes: [
  //         {
  //             path: '/admin/sub-page',
  //             name: 'sub-page',
  //             icon: 'smile',
  //             component: './Admin',
  //         },
  //         {
  //             component: './404',
  //         },
  //     ],
  // },
  // {
  //     name: 'list.table-list',
  //     icon: 'table',
  //     path: '/list',
  //     component: './TableList',
  // },
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: '/dash',
    component: './DashBoard',
  },
  {
    name: 'good.good-list',
    icon: 'gift',
    path: '/good-list',
    component: './GoodList',
  },

  {
    name: 'class.class-list',
    icon: 'table',
    path: '/class-list',
    component: './ClassList',
  },
  {
    name: 'label.label-list',
    icon: 'tags',
    path: '/label-list',
    component: './LabelList',
  },
  {
    name: 'tips.tips-list',
    icon: 'dollar',
    path: '/tips-list',
    component: './TipsList',
  },
  {
    name: 'tips.recommend-list',
    icon: 'trophy',
    path: '/recommend-list',
    component: './RecommendList',
  },
  {
    name: 'tips.menu-list',
    icon: 'partition',
    path: '/menu-list',
    component: './MenuList',
  },
  {
    name: 'tips.order-list',
    icon: 'fileDone',
    path: '/order-list',
    component: './OrderList',
  },

  {
    path: '/',
    redirect: '/good-list',
  },
  {
    component: './404',
  },
];
