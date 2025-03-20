<!-- components/layout/AppHeader.vue -->
<template>
  <a-layout-header class="app-header">
    <!-- 左侧导航区域 -->
    <div class="header-left">
      <!-- 主菜单项（首页、创建图片）-->
      <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :items="mainMenuItems"
          class="header-nav-menu"
      ></a-menu>

      <!-- 内容管理下拉菜单 -->
      <a-dropdown v-if="isAdmin" overlay-class-name="admin-dropdown">
        <a class="admin-menu-link">
          <appstore-outlined />
          内容管理
        </a>
        <template #overlay>
          <a-menu class="admin-menu">
            <a-menu-item key="dashboard">
              <dashboard-outlined /> 仪表盘
            </a-menu-item>
            <a-menu-item key="image-management">
              <picture-outlined /> 图片管理
            </a-menu-item>
            <a-menu-item key="space-management">
              <inbox-outlined /> 空间管理
            </a-menu-item>
            <a-menu-item key="category-management">
              <appstore-outlined /> 分类管理
            </a-menu-item>
            <a-menu-item key="tag-management">
              <tags-outlined /> 标签管理
            </a-menu-item>
            <a-menu-item key="comment-management">
              <comment-outlined /> 评论管理
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <!-- 系统设置下拉菜单 -->
      <a-dropdown v-if="isAdmin" overlay-class-name="admin-dropdown">
        <a class="admin-menu-link">
          <setting-outlined />
          系统设置
        </a>
        <template #overlay>
          <a-menu class="admin-menu">
            <a-menu-item key="user-management">
              <user-outlined /> 用户管理
            </a-menu-item>
            <a-menu-item key="system-settings">
              <setting-outlined /> 系统设置
            </a-menu-item>
            <a-menu-item key="security-center">
              <safety-outlined /> 安全中心
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <!-- 右侧工具栏 -->
    <div class="header-actions">
      <!-- 上传按钮 -->
      <a-button type="primary" class="upload-btn">
        <template #icon><upload-outlined /></template>
        上传图片
      </a-button>

      <!-- 深色模式切换按钮 -->
      <a-button
          type="text"
          class="theme-toggle-btn"
          @click="toggleDarkMode"
          shape="circle"
      >
        <template #icon>
          <moon-outlined v-if="!isDarkMode" />
          <sun-outlined v-else />
        </template>
      </a-button>

      <!-- 通知按钮 -->
      <a-badge dot>
        <a-button type="text" class="notification-btn" shape="circle">
          <template #icon><bell-outlined /></template>
        </a-button>
      </a-badge>

      <!-- 用户头像 -->
      <a-dropdown :trigger="['click']">
        <a class="user-dropdown">
          <a-avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="profile">个人资料</a-menu-item>
            <a-menu-item key="settings">账号设置</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, reactive, inject, h, computed } from 'vue';
import {
  HomeOutlined,
  PlusOutlined,
  UserOutlined,
  PictureOutlined,
  TagsOutlined,
  InboxOutlined,
  ReadOutlined,
  UploadOutlined,
  BellOutlined,
  SettingOutlined,
  DownOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  CommentOutlined,
  SafetyOutlined,
} from '@ant-design/icons-vue';

// 从 App.vue 中注入的深色模式状态和切换函数
const isDarkMode = inject('isDarkMode', ref(false));
const toggleDarkMode = inject('toggleDarkMode', () => {});

// 当前选中的导航
const selectedKeys = ref(['home']);

// 判断是否为管理员（实际项目中应从用户数据或权限系统中获取）
const isAdmin = ref(true);

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
  color: var(--primary-color, #6366f1);
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

.upload-btn {
  background: linear-gradient(135deg, var(--primary-color, #6366f1) 0%, var(--primary-light, #818cf8) 100%);
  border: none;
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
}

.notification-btn,
.theme-toggle-btn {
  position: relative;
  color: var(--text-secondary, rgba(0, 0, 0, 0.45));
}

.user-dropdown {
  cursor: pointer;
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
</style>