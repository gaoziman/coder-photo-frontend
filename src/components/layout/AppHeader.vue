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
      <a-dropdown
          v-if="isAdmin"
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
          <a-menu class="enhanced-admin-menu">
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
      <!-- 系统设置下拉菜单 -->
      <a-dropdown
          v-if="isAdmin"
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
          <a-menu class="enhanced-admin-menu">
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
  background-color: rgba(99, 102, 241, 0.08);
  color: var(--primary-color, #6366f1);
}

:deep(.enhanced-admin-menu .ant-menu-item-selected) {
  background-color: rgba(99, 102, 241, 0.12) !important;
  color: var(--primary-color, #6366f1) !important;
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