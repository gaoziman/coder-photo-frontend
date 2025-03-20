/* router/index.ts */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/home/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            title: '智能云图库 - 发现精彩图片世界',
        },
    },
    // {
    //     path: '/user',
    //     name: 'UserManagement',
    //     component: () => import('@/pages/user/UserManagement.vue'),
    //     meta: {
    //         title: '用户管理 - 智能云图库',
    //     },
    // },
    // {
    //     path: '/image',
    //     name: 'ImageManagement',
    //     component: () => import('@/pages/image/ImageManagement.vue'),
    //     meta: {
    //         title: '图片管理 - 智能云图库',
    //     },
    // },
    // {
    //     path: '/tag',
    //     name: 'TagManagement',
    //     component: () => import('@/pages/tag/TagManagement.vue'),
    //     meta: {
    //         title: '标签管理 - 智能云图库',
    //     },
    // },
    // {
    //     path: '/space',
    //     name: 'SpaceManagement',
    //     component: () => import('@/pages/space/SpaceManagement.vue'),
    //     meta: {
    //         title: '空间管理 - 智能云图库',
    //     },
    // },
    // {
    //     path: '/knowledge',
    //     name: 'KnowledgeNavigation',
    //     component: () => import('@/pages/knowledge/KnowledgeNavigation.vue'),
    //     meta: {
    //         title: '知识导航 - 智能云图库',
    //     },
    // },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/pages/error/NotFound.vue'),
    //     meta: {
    //         title: '页面未找到 - 智能云图库',
    //     },
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 动态设置页面标题
router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string || '智能云图库';
    next();
});

export default router;