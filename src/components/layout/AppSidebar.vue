<!-- components/layout/AppSidebar.vue -->
<template>
  <a-layout-sider
      v-model:collapsed="collapsed"
      class="app-sidebar"
      :width="240"
      :trigger="null"
      collapsible
  >
    <!-- Logo区域 -->
    <div class="sidebar-logo">
      <cloud-outlined class="logo-icon" />
      <span class="logo-text" v-if="!collapsed">智能云图库</span>
    </div>

    <!-- 侧边栏菜单 -->
    <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :items="menuItems"
        class="sidebar-menu"
    ></a-menu>

    <!-- 创建新团队按钮 -->
    <div class="sidebar-footer">
      <a-button
          type="primary"
          class="create-team-btn"
          block
          @click="handleCreateTeam"
      >
        <template #icon><plus-outlined /></template>
        创建新团队
      </a-button>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'; // 添加h函数导入
import {
  CloudOutlined,
  PictureOutlined,
  FolderOutlined,
  TeamOutlined,
  CompassOutlined,
  HeartOutlined,
  BookOutlined,
  ClockCircleOutlined,
  PlusOutlined
} from '@ant-design/icons-vue';

// 侧边栏折叠状态
const collapsed = ref(false);

// 选中的菜单项
const selectedKeys = ref(['public-gallery']);

// 菜单数据结构
const menuItems = reactive([
  {
    type: 'group',
    title: '主要菜单',
    children: [
      {
        key: 'public-gallery',
        icon: () => h(PictureOutlined), // 使用h函数替代JSX
        label: '公共图库',
      },
      {
        key: 'my-space',
        icon: () => h(FolderOutlined), // 使用h函数替代JSX
        label: '我的空间',
      },
      {
        key: 'team-collaboration',
        icon: () => h(TeamOutlined), // 使用h函数替代JSX
        label: '团队协作',
      },
      {
        key: 'explore',
        icon: () => h(CompassOutlined), // 使用h函数替代JSX
        label: '探索发现',
      },
    ],
  },
  {
    type: 'group',
    title: '收藏分类',
    children: [
      {
        key: 'my-favorites',
        icon: () => h(HeartOutlined), // 使用h函数替代JSX
        label: '我的收藏',
      },
      {
        key: 'saved',
        icon: () => h(BookOutlined), // 使用h函数替代JSX
        label: '已保存',
      },
      {
        key: 'recent-viewed',
        icon: () => h(ClockCircleOutlined), // 使用h函数替代JSX
        label: '最近浏览',
      },
    ],
  },
]);

// 创建团队处理函数
const handleCreateTeam = () => {
  // 处理创建团队逻辑
  console.log('创建新团队');
};
</script>

<style scoped>
.app-sidebar {
  height: 100vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: white; /* 添加白色背景与头部和页脚保持一致 */
}

.sidebar-logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
}

.logo-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  color: var(--text-primary); /* 确保文字颜色一致 */
}

.sidebar-menu {
  border-right: none;
  padding: 12px;
}

.sidebar-footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 16px;
}

.create-team-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); /* 与头部上传按钮保持一致的渐变背景 */
  border: none;
}

/* 深色模式下的样式调整 */
:global([data-theme="dark"]) .app-sidebar {
  background: var(--bg-white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>