/* composables/useDarkMode.ts */
import { ref, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

export function useDarkMode() {
    // 使用本地存储保存用户的深色模式偏好
    const isDarkMode = useLocalStorage('dark-mode', false);

    // CSS 类处理函数
    const updateTheme = (dark: boolean) => {
        // 根据深色模式状态添加或移除 HTML 根元素上的 class
        if (dark) {
            document.documentElement.classList.add('dark');
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.setAttribute('data-theme', 'light');
        }
    };

    // 在状态变化时更新 CSS
    watch(
        () => isDarkMode.value,
        (newValue) => {
            updateTheme(newValue);
        },
        { immediate: true } // 立即执行一次
    );

    // 切换深色/浅色模式
    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
    };

    // 检测系统偏好
    const detectSystemPreference = () => {
        if (isDarkMode.value !== null) return; // 用户已有设置，不覆盖

        // 检测系统深色模式偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode.value = prefersDark;

        // 监听系统偏好变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (isDarkMode.value === null) { // 只有当用户未手动设置时才跟随系统
                isDarkMode.value = e.matches;
            }
        });
    };

    // 返回相关状态和方法
    return {
        isDarkMode,
        toggleDarkMode,
        detectSystemPreference
    };
}