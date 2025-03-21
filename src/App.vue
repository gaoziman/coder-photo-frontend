<!-- App.vue -->
<template>
  <a-config-provider :theme="themeConfig">
    <div class="app-container">
      <AppLayout>
        <!-- 路由视图容器 -->
        <router-view v-slot="{ Component }">
          <!-- 使用过渡效果增强用户体验 -->
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </AppLayout>

      <!-- 全局消息通知 -->
      <a-message />

      <!-- 全局确认对话框 -->
      <a-modal v-model:visible="confirmVisible" :title="confirmTitle" @ok="handleConfirm">
        {{ confirmMessage }}
      </a-modal>

      <!-- 登录/注册弹窗 -->
      <auth-modal ref="loginModalRef" />
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive, provide, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '@/components/layout/AppLayout.vue';
import emitter from '@/utils/eventBus';
import { registerApp } from '@/router';
import AuthModal from "@/components/auth/AuthModal.vue";

// 主题配置
const themeConfig = reactive({
  token: {
    colorPrimary: '#4F46E5',
    borderRadius: 8,
    wireframe: false,
  },
});

// 缓存的视图组件名称列表
const cachedViews = ref(['Home', 'UserManagement', 'ImageManagement']);

// 全局确认对话框状态
const confirmVisible = ref(false);
const confirmTitle = ref('确认操作');
const confirmMessage = ref('');
const confirmCallback = ref<(() => void) | null>(null);

// 处理确认操作
const handleConfirm = () => {
  if (confirmCallback.value) {
    confirmCallback.value();
    confirmCallback.value = null;
  }
  confirmVisible.value = false;
};

// 初始化全局确认对话框
const initGlobalConfirm = () => {
  // 通过事件总线监听确认对话框事件
  emitter.on('confirm', ({ title, message, callback }) => {
    confirmTitle.value = title || '确认操作';
    confirmMessage.value = message;
    confirmCallback.value = callback;
    confirmVisible.value = true;
  });
};


// 引用 login-modal 组件，用于打开登录模态窗口
const loginModalRef = ref();


// 在组件挂载后执行初始化操作
onMounted(() => {
  initGlobalConfirm();

  // 监听页面可见性变化，优化用户体验
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // 页面变为可见时，可以执行一些操作，比如刷新数据
      console.log('页面处于前台，可以刷新数据');
    }
  });

  // 监听打开登录模态窗口事件
  window.addEventListener('openLoginModal', () => {
    nextTick(() => {
      loginModalRef.value?.open();
    });
  });

  // 注册 app 实例，使路由守卫可以访问全局组件
  registerApp({
    config: {
      globalProperties: {
        openLoginModal: () => {
          loginModalRef.value?.open();
        }
      }
    }
  } as any);
});
</script>

<style>
/* 引入全局样式 */
@import '@/assets/styles/base.css';

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局样式覆盖 */
#app {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
}

/* 应用容器 */
.app-container {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

/* 数据主题样式 - 亮色主题 */
[data-theme="light"] {
  --bg-white: #ffffff;
  --bg-gray: #f9fafb;
  --bg-gray-light: #f3f4f6;
  --text-primary: rgba(0, 0, 0, 0.85);
  --text-secondary: rgba(0, 0, 0, 0.45);
  --border-color: #e5e7eb;
  --primary-color: #4F46E5;
  --primary-light: #818cf8;
}


/* 滚动条样式优化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 全局过渡效果 */
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* 禁止文字选择，用于特定UI元素 */
.no-select {
  user-select: none;
  -webkit-user-select: none;
}

/* 响应式布局断点样式 */
@media (max-width: 768px) {
  .mobile-hidden {
    display: none !important;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .tablet-hidden {
    display: none !important;
  }
}

@media (min-width: 1201px) {
  .desktop-hidden {
    display: none !important;
  }
}
</style>