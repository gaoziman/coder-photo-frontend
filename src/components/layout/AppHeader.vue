<!-- components/layout/AppHeader.vue -->
<template>
  <a-layout-header class="app-header">
    <!-- 左侧导航区域 -->
    <div class="header-left">
      <!-- 主菜单项-->
      <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :items="mainMenuItems"
          class="header-nav-menu"
          @select="handleMenuSelect"
      ></a-menu>


      <!-- 内容管理下拉菜单 - 仅当用户为管理员时显示 -->
      <a-dropdown
          v-if="userStore.isAdmin"
          overlay-class-name="enhanced-admin-dropdown"
          :trigger="['click']"
          placement="bottomLeft"
      >
        <a class="admin-menu-link">
          <div class="admin-link-content">
            <appstore-outlined />
            <span>内容管理</span>
            <down-outlined class="dropdown-arrow" />
          </div>
        </a>
        <template #overlay>
          <a-menu class="enhanced-admin-menu" @click="handleAdminMenuClick">
            <a-menu-item key="dashboard" class="menu-item-with-icon">
              <div class="menu-item-content">
                <dashboard-outlined />
                <span>仪表盘</span>
              </div>
            </a-menu-item>
            <a-menu-item key="image-management" class="menu-item-with-icon">
              <div class="menu-item-content">
                <picture-outlined />
                <span>图片管理</span>
              </div>
            </a-menu-item>
            <a-menu-item key="space-management" class="menu-item-with-icon">
              <div class="menu-item-content">
                <inbox-outlined />
                <span>空间管理</span>
              </div>
            </a-menu-item>
            <a-menu-item key="category-management" class="menu-item-with-icon">
              <div class="menu-item-content">
                <appstore-outlined />
                <span>分类管理</span>
              </div>
            </a-menu-item>
            <a-menu-item key="tag-management" class="menu-item-with-icon">
              <div class="menu-item-content">
                <tags-outlined />
                <span>标签管理</span>
              </div>
            </a-menu-item>
            <a-menu-item key="comment-management" class="menu-item-with-icon">
              <div class="menu-item-content">
                <comment-outlined />
                <span>评论管理</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <!-- 系统设置下拉菜单 -->
      <a-dropdown
          v-if="userStore.isAdmin"
          overlay-class-name="enhanced-admin-dropdown"
          :trigger="['click']"
          placement="bottomLeft"
      >
        <a class="admin-menu-link">
          <div class="admin-link-content">
            <setting-outlined />
            <span>系统设置</span>
            <down-outlined class="dropdown-arrow" />
          </div>
        </a>
        <template #overlay>
          <a-menu class="enhanced-admin-menu" @click="handleSettingsMenuClick">
            <a-menu-item key="user-management" class="menu-item-with-icon">
              <div class="menu-item-content">
                <user-outlined />
                <span>用户管理</span>
              </div>
            </a-menu-item>
            <a-menu-item key="system-settings" class="menu-item-with-icon">
              <div class="menu-item-content">
                <setting-outlined />
                <span>系统设置</span>
              </div>
            </a-menu-item>
            <a-menu-item key="security-center" class="menu-item-with-icon">
              <div class="menu-item-content">
                <safety-outlined />
                <span>安全中心</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <!-- 右侧工具栏 -->
    <div class="header-actions">
      <!-- 未登录状态：显示登录按钮 -->
      <template v-if="!userStore.isLoggedIn">
        <a-button
            type="primary"
            class="login-btn"
            @click="openLoginModal"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }"
        >
          <template #icon><login-outlined /></template>
          登录
        </a-button>
      </template>

      <!-- 已登录状态：显示上传按钮、通知、头像等 -->
      <template v-else>
        <!-- 上传按钮 -->
        <a-button type="primary" class="upload-btn">
          <template #icon><upload-outlined /></template>
          上传图片
        </a-button>

        <!-- 通知按钮 -->
        <a-badge dot>
          <a-button type="text" class="notification-btn" shape="circle">
            <template #icon><bell-outlined /></template>
          </a-button>
        </a-badge>

        <!-- 用户头像 -->
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <a class="user-dropdown">
            <a-avatar :src="userStore.userInfo?.avatar" />
          </a>
          <template #overlay>
            <a-menu @click="handleUserMenuClick">
              <a-menu-item key="profile">
                <user-outlined />
                个人资料
              </a-menu-item>
              <a-menu-item key="settings">
                <setting-outlined />
                账号设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="handleLogout">
                <logout-outlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import {ref, reactive, h, watch, computed} from 'vue';
import {
  HomeOutlined,
  PlusOutlined,
  UserOutlined,
  PictureOutlined,
  TagsOutlined,
  InboxOutlined,
  UploadOutlined,
  BellOutlined,
  SettingOutlined,
  DownOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  CommentOutlined,
  SafetyOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';


import { useUserStore } from '@/stores/user';
import { message } from 'ant-design-vue';
import {useRoute, useRouter} from "vue-router";
import { useMenuStore } from '@/stores/menu';

// 获取路由实例
const router = useRouter();
const route = useRoute()

// 获取用户状态和菜单状态
const userStore = useUserStore();
const menuStore = useMenuStore();

// 使用共享的选中状态
const selectedKeys = computed(() => menuStore.topSelectedKeys);


// 打开登录弹窗
const openLoginModal = () => {
  window.dispatchEvent(new CustomEvent('openLoginModal'));
};

// 处理退出登录
const handleLogout = () => {
  userStore.logout();
  message.success('已成功退出登录');
};

// 使用渲染函数的方式定义主导航菜单项
const mainMenuItems = reactive([
  {
    key: 'home',
    icon: () => h(HomeOutlined),
    label: '首页',
  },
  {
    key: 'create',
    icon: () => h(PlusOutlined),
    label: '创建图片',
  },
]);

// 处理菜单选择
const handleMenuSelect = ({ key }: any) => {
  menuStore.activateTopMenu(key); // 激活顶部菜单

  switch (key) {
    case 'home':
      router.push('/');
      break;
    case 'create':
      router.push('/create');
      break;
    default:
      break;
  }
};

// 处理管理菜单点击
const handleAdminMenuClick = ({ key } :any) => {
  // 根据key判断跳转路由
  switch (key) {
    case 'dashboard':
      router.push('/admin/dashboard');
      break;
    case 'image-management':
      router.push('/admin/images');
      break;
    case 'space-management':
      router.push('/admin/spaces');
      break;
    case 'category-management':
      router.push('/admin/categories');
      break;
    case 'tag-management':
      router.push('/admin/tags');
      break;
    case 'comment-management':
      router.push('/admin/comments');
      break;
    default:
      break;
  }
};

// 处理设置菜单点击
const handleSettingsMenuClick = ({ key } :any) => {
  switch (key) {
    case 'user-management':
      router.push('/admin/users');
      break;
    case 'system-settings':
      router.push('/admin/settings');
      break;
    case 'security-center':
      router.push('/admin/security');
      break;
    default:
      break;
  }
};

// 处理用户菜单点击
const handleUserMenuClick = ({ key } :any) => {
  switch (key) {
    case 'profile':
      router.push('/user/profile');
      break;
    case 'settings':
      router.push('/user/settings');
      break;
    default:
      break;
  }
};

// 导航到上传页面
const navigateToUpload = () => {
  router.push('/upload');
};

// 监听路由变化，更新菜单状态
watch(() => route.path, (newPath) => {
  // 只有当侧边栏菜单未被激活时，才更新顶部菜单状态
  if (menuStore.activeMenuType !== 'side') {
    if (newPath === '/' || newPath === '/home') {
      menuStore.activateTopMenu('home');
    } else if (newPath === '/create') {
      menuStore.activateTopMenu('create');
    }
  }
}, { immediate: true });


// 暴露方法给父组件
defineExpose({
  openLoginModal
});
</script>

<style scoped>
.app-header {
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  z-index: 9;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-nav-menu {
  line-height: 64px;
  border-bottom: none;
}

/* 管理菜单链接样式 */
.admin-menu-link {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 64px;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.admin-menu-link:hover {
  color: var(--primary-color, #4F46E5);
}

.admin-menu-link .anticon {
  margin-right: 4px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

:deep(.admin-dropdown) {
  min-width: 180px;
}

:deep(.admin-menu .ant-dropdown-menu-item) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.admin-menu .anticon) {
  font-size: 16px;
}

/* 登录按钮样式 */
.login-btn {
  background: linear-gradient(135deg, var(--primary-color, #4F46E5) 0%, var(--primary-light, #818cf8) 100%);
  border: none;
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(79, 70, 229, 0.15);
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.25);
}

.upload-btn {
  background: linear-gradient(135deg, var(--primary-color, #4F46E5) 0%, var(--primary-light, #818cf8) 100%);
  border: none;
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.25);
}

.notification-btn,
.theme-toggle-btn {
  position: relative;
  color: var(--text-secondary, rgba(0, 0, 0, 0.45));
}

.user-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.user-dropdown:hover {
  transform: scale(1.05);
}

/* 深色模式下的样式调整 */
:global([data-theme="dark"]) .app-header {
  background: var(--bg-white, #1f1f1f);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

:global([data-theme="dark"]) .notification-btn,
:global([data-theme="dark"]) .theme-toggle-btn {
  color: var(--text-primary, rgba(255, 255, 255, 0.85));
}

:global([data-theme="dark"]) .admin-menu-link {
  color: var(--text-primary, rgba(255, 255, 255, 0.85));
}

:global([data-theme="dark"]) .admin-menu-link:hover {
  color: var(--primary-light, #818cf8);
}

/* 增强型下拉菜单样式 */
.admin-link-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dropdown-arrow {
  font-size: 12px;
  margin-left: 2px;
  transition: transform 0.3s ease;
}

.admin-menu-link:hover .dropdown-arrow {
  transform: rotate(180deg);
}

/* 定制下拉菜单容器 */
:deep(.enhanced-admin-dropdown) {
  min-width: 220px;
  animation: dropdownFadeIn 0.25s ease-out;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
  padding: 6px 0;
}

/* 下拉动画 */
@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 菜单项样式 */
.enhanced-admin-menu {
  padding: 4px;
  background: white;
  border-radius: 8px;
}

.menu-item-with-icon {
  height: 44px !important;
  line-height: 44px !important;
  margin: 4px 0;
  padding: 0 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-item-content .anticon {
  font-size: 18px;
  opacity: 0.8;
}

/* 菜单项悬停效果 */
:deep(.enhanced-admin-menu .ant-menu-item) {
  margin: 4px 6px !important;
  border-radius: 6px;
}

:deep(.enhanced-admin-menu .ant-menu-item:hover) {
  background-color: rgba(79, 70, 229, 0.08);
  color: var(--primary-color, #4F46E5);
}

:deep(.enhanced-admin-menu .ant-menu-item-selected) {
  background-color: rgba(79, 70, 229, 0.12) !important;
  color: var(--primary-color, #4F46E5) !important;
}

/* 深色模式适配 */
:global([data-theme="dark"]) .enhanced-admin-menu {
  background: #262626;
}

:global([data-theme="dark"]) :deep(.enhanced-admin-dropdown) {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.2);
}

:global([data-theme="dark"]) :deep(.enhanced-admin-menu .ant-menu-item:hover) {
  background-color: rgba(129, 140, 248, 0.15);
}

:global([data-theme="dark"]) :deep(.enhanced-admin-menu .ant-menu-item-selected) {
  background-color: rgba(129, 140, 248, 0.2) !important;
}
</style>