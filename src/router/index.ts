import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/layout' },
  {
    name: 'layout',
    path: '/layout',
    component: () => import('@/views/layout/index.vue')
  },
  {
    name: 'article-list',
    path: '/article-list',
    component: () => import('@/views/article-list/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
