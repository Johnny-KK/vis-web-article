import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/layout/list' },
  { name: 'layout', path: '/layout/:type', props: true, component: () => import('@/views/layout/index.vue') },
  { name: 'article-edit', path: '/article-edit/:type/:id', props: true, component: () => import('@/views/article-edit/index.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
