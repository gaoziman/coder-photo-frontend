// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/home/HomePage.vue';
import { useUserStore } from '@/stores/user';
import { App, h, render } from 'vue';
import { Modal, message } from 'ant-design-vue';
import ImageDetailPage from "@/pages/photo/PhotoDetailPage.vue";

// 定义需要鉴权的路由
const authRoutes = ['UserManagement', 'ImageManagement', 'TagManagement', 'SpaceManagement'];

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            title: '智能云图库 - 发现精彩图片世界',
            requiresAuth: false
        },
    },
    {
        path: '/photo/:id',
        name: 'PhotoDetailPage',
        component: ImageDetailPage,
        props: true
    }
    // {
    //     path: '/user',
    //     name: 'UserManagement',
    //     component: () => import('@/pages/user/UserManagement.vue'),
    //     meta: {
    //         title: '用户管理 - 智能云图库',
    //         requiresAuth: true,
    //         requiresAdmin: true
    //     },
    // },
    // {
    //     path: '/image',
    //     name: 'ImageManagement',
    //     component: () => import('@/pages/image/ImageManagement.vue'),
    //     meta: {
    //         title: '图片管理 - 智能云图库',
    //         requiresAuth: true
    //     },
    // },
    // {
    //     path: '/tag',
    //     name: 'TagManagement',
    //     component: () => import('@/pages/tag/TagManagement.vue'),
    //     meta: {
    //         title: '标签管理 - 智能云图库',
    //         requiresAuth: true,
    //         requiresAdmin: true
    //     },
    // },
    // {
    //     path: '/space',
    //     name: 'SpaceManagement',
    //     component: () => import('@/pages/space/SpaceManagement.vue'),
    //     meta: {
    //         title: '空间管理 - 智能云图库',
    //         requiresAuth: true
    //     },
    // },
    // {
    //     path: '/knowledge',
    //     name: 'KnowledgeNavigation',
    //     component: () => import('@/pages/knowledge/KnowledgeNavigation.vue'),
    //     meta: {
    //         title: '知识导航 - 智能云图库',
    //         requiresAuth: false
    //     },
    // },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/pages/error/NotFound.vue'),
    //     meta: {
    //         title: '页面未找到 - 智能云图库',
    //         requiresAuth: false
    //     },
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 注册应用实例，用于访问全局组件
let app: App;
export function registerApp(appInstance: App) {
    app = appInstance;
}

// 路由守卫 - 验证权限并显示登录提示
router.beforeEach(async (to, from, next) => {
    // 动态设置页面标题
    document.title = to.meta.title as string || '智能云图库';

    const userStore = useUserStore();

    // 检查是否需要登录权限
    if (to.meta.requiresAuth) {
        // 如果用户未登录
        if (!userStore.isLoggedIn) {
            // 显示提示消息
            message.warning('请先登录后再访问此页面');

            // 创建一个包含登录模态框的临时容器
            const container = document.createElement('div');
            document.body.appendChild(container);

            // 使用 Ant Design Vue 的 Modal 组件
            Modal.confirm({
                title: '需要登录',
                content: '该页面需要登录才能访问，是否立即登录？',
                okText: '登录',
                cancelText: '返回首页',
                onOk: () => {
                    // 通过事件总线或其他方式打开登录弹窗
                    // 这里需要根据实际项目情况调整
                    // 例如，可以触发事件总线上的事件
                    window.dispatchEvent(new CustomEvent('openLoginModal'));
                    next('/');
                },
                onCancel: () => {
                    next('/');
                }
            });

            return;
        }

        // 检查是否需要管理员权限
        if (to.meta.requiresAdmin && userStore.userInfo?.role !== 'admin') {
            message.error('无权访问此页面');
            next('/');
            return;
        }
    }

    // 符合权限要求，允许访问
    next();
});

export default router;