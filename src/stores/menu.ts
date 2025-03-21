// stores/menu.ts
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        // 当前活跃的菜单类型: 'top' 或 'side'
        activeMenuType: 'side',
        // 顶部菜单选中的键
        topSelectedKeys: ['home'],
        // 侧边栏菜单选中的键
        sideSelectedKeys: ['public-gallery']
    }),
    actions: {
        // 激活顶部菜单
        activateTopMenu(key: string) {
            this.activeMenuType = 'top';
            this.topSelectedKeys = [key];
            this.sideSelectedKeys = [];
        },
        // 激活侧边栏菜单
        activateSideMenu(key: string) {
            this.activeMenuType = 'side';
            this.sideSelectedKeys = [key];
            this.topSelectedKeys = [];
        }
    }
});