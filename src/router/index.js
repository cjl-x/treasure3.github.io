import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import GameView from '@/views/GameView.vue'
import UserView from '@/views/UserView.vue'
import RankingView from '@/views/RankingView.vue'

const routes = [
  {
    path: '/',
    name: 'Game',
    component: GameView
  },
  {
    path: '/user',
    name: 'User',
    component: UserView,
    meta: { requiresAuth: true }  
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: RankingView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 用户认证检查
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  console.log(`路由跳转: ${from.name || '初始'} -> ${to.name}`)
  
  // 检查是否需要登录认证
  if (to.name === 'User' && !userStore.isLoggedIn) {
    console.log('未登录用户尝试访问用户页面，重定向到首页')
    next('/')
  } else {
    next()
  }
})

export default router