import { createRouter, createWebHistory } from 'vue-router';

// 页面组件（懒加载）
const HomePage = () => import('../pages/HomePage.vue');
const GuidesPage = () => import('../pages/GuidesPage.vue');
const ToolsPage = () => import('../pages/ToolsPage.vue');
const NewsPage = () => import('../pages/NewsPage.vue');
const FavoritesPage = () => import('../pages/FavoritesPage.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: '首页' }
  },
  {
    path: '/guides',
    name: 'Guides',
    component: GuidesPage,
    meta: { title: '攻略社区' }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: ToolsPage,
    meta: { title: '工具集合' }
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage,
    meta: { title: '新闻资讯' }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesPage,
    meta: { title: '我的收藏' }
  }
];

const router = createRouter({
  history: createWebHistory('/anhei-games/'),
  routes
});

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
