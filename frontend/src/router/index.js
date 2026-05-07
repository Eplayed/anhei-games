import { createRouter, createWebHistory } from 'vue-router'

// 路由懒加载
const HomePage = () => import('@/pages/HomePage.vue')
const FavoritesPage = () => import('@/pages/FavoritesPage.vue')
const AboutPage = () => import('@/pages/AboutPage.vue')

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
        meta: { title: '首页' }
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: FavoritesPage,
        meta: { title: '我的收藏' }
      },
      {
        path: '/about',
        name: 'About',
        component: AboutPage,
        meta: { title: '关于' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  const baseTitle = '魔兽世界玩家导航'
  document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
  next()
})

export default router
