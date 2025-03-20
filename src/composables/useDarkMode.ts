// composables/useDarkMode.ts
import { ref, onMounted, watch } from 'vue';

export function useDarkMode() {
    // 深色模式状态
    const isDarkMode = ref(false);

    // 从本地存储初始化深色模式状态
    onMounted(() => {
        const savedTheme = localStorage.getItem('theme_mode');
        if (savedTheme === 'dark') {
            isDarkMode.value = true;
        } else if (savedTheme === null) {
            // 如果没有保存过主题，检查系统主题偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            isDarkMode.value = prefersDark;
        }
    });

    // 切换深色模式
    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        localStorage.setItem('theme_mode', isDarkMode.value ? 'dark' : 'light');
    };

    // 监听系统主题变化
    onMounted(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            // 只有当用户没有明确设置主题时才自动切换
            if (!localStorage.getItem('theme_mode')) {
                isDarkMode.value = e.matches;
            }
        };

        // 添加事件监听
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        }
    });

    return {
        isDarkMode,
        toggleDarkMode
    };
}