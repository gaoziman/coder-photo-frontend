<!-- components/layout/AppSidebar.vue -->
<template>
  <a-layout-sider
      v-model:collapsed="collapsedValue"
      class="app-sidebar"
      :width="240"
      :collapsed-width="80"
      :trigger="null"
      collapsible
  >
    <!-- 顶部标题区域 -->
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-icon-wrapper">
          <cloud-outlined class="logo-icon" />
        </div>
        <h1 class="logo-title" v-if="!collapsedValue">智能云图库</h1>
      </div>
    </div>

    <!-- 侧边栏内容容器 -->
    <div class="sidebar-container">
      <!-- 分组标题：主要菜单 -->
      <div class="menu-group-title" v-if="!collapsedValue">主要菜单</div>

      <!-- 主要菜单项 -->
      <div class="menu-items">
        <div
            v-for="item in mainMenuItems"
            :key="item.key"
            :class="['menu-item', {'active': selectedKeys.includes(item.key)}]"
            @click="selectMenuItem(item.key)"
        >
          <component :is="item.icon" class="menu-item-icon" />
          <span class="menu-item-label" v-if="!collapsedValue">{{ item.label }}</span>
        </div>
      </div>

      <!-- 分组标题：收藏分类 -->
      <div class="menu-group-title" v-if="!collapsedValue">收藏分类</div>

      <!-- 收藏分类菜单项 -->
      <div class="menu-items">
        <div
            v-for="item in favoriteMenuItems"
            :key="item.key"
            :class="['menu-item', {'active': selectedKeys.includes(item.key)}]"
            @click="selectMenuItem(item.key)"
        >
          <component :is="item.icon" class="menu-item-icon" />
          <span class="menu-item-label" v-if="!collapsedValue">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- 创建新团队按钮 -->
    <div class="sidebar-footer">
      <a-button
          type="primary"
          class="create-team-btn"
          block
          @click="handleCreateTeam"
      >
        <template #icon><plus-outlined /></template>
        <span v-if="!collapsedValue">创建新团队</span>
      </a-button>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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

// 接收props
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

// 定义事件
const emit = defineEmits(['update:collapsed']);

// 计算属性处理双向绑定
const collapsedValue = computed({
  get: () => props.collapsed,
  set: (value) => emit('update:collapsed', value)
});

// 选中的菜单项
const selectedKeys = ref(['public-gallery']);

// 主要菜单数据
const mainMenuItems = [
  {
    key: 'public-gallery',
    icon: PictureOutlined,
    label: '公共图库',
  },
  {
    key: 'my-space',
    icon: FolderOutlined,
    label: '我的空间',
  },
  {
    key: 'team-collaboration',
    icon: TeamOutlined,
    label: '团队协作',
  },
  {
    key: 'explore',
    icon: CompassOutlined,
    label: '探索发现',
  },
];

// 收藏分类菜单数据
const favoriteMenuItems = [
  {
    key: 'my-favorites',
    icon: HeartOutlined,
    label: '我的收藏',
  },
  {
    key: 'saved',
    icon: BookOutlined,
    label: '已保存',
  },
  {
    key: 'recent-viewed',
    icon: ClockCircleOutlined,
    label: '最近浏览',
  },
];

// 菜单项选择处理
const selectMenuItem = (key) => {
  selectedKeys.value = [key];
};

// 创建团队处理函数
const handleCreateTeam = () => {
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
  background: white;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  display: flex;
  flex-direction: column;
  border-radius: 0 16px 16px 0;
}

/* 顶部标题区域 */
.sidebar-header {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.logo-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  font-size: 24px;
  color: #4F46E5;
}

.logo-title {
  margin: 0 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  white-space: nowrap;
}

/* 侧边栏内容容器，使用flex布局 */
.sidebar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  overflow-y: auto;
}

/* 菜单分组标题 */
.menu-group-title {
  color: #616161;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  margin-top: 8px;
  margin-bottom: 4px;
}

/* 菜单项容器 */
.menu-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 单个菜单项 */
.menu-item {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;
  margin: 0 8px;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.menu-item.active {
  background-color: #EFF1FF;
}

.menu-item.active .menu-item-icon {
  color: #4F46E5;
}

.menu-item.active .menu-item-label {
  color: #4F46E5;
  font-weight: 500;
}

/* 菜单项图标 */
.menu-item-icon {
  font-size: 18px;
  color: #303030;
  margin-right: 12px;
}

/* 菜单项标签 */
.menu-item-label {
  font-size: 14px;
  color: #202020;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 底部按钮区域 */
.sidebar-footer {
  padding: 16px;
  margin-top: auto;
}

/* 创建新团队按钮 */
.create-team-btn {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4F46E5;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(79, 70, 229, 0.2);
  transition: all 0.3s;
}

.create-team-btn:hover {
  background: #4338CA;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.create-team-btn .anticon {
  font-size: 16px;
}

/* 折叠状态下的按钮样式 */
:deep(.ant-layout-sider-collapsed) .create-team-btn {
  padding: 0;
  width: 48px !important;
  height: 48px;
  margin: 0 auto;
}

/* 折叠状态下的图标居中显示 */
:deep(.ant-layout-sider-collapsed) .menu-item {
  padding: 0;
  justify-content: center;
}

:deep(.ant-layout-sider-collapsed) .menu-item-icon {
  margin-right: 0;
}

:deep(.ant-layout-sider-collapsed) .logo-icon-wrapper {
  margin: 0 auto;
}

/* 深色模式下的样式调整 */
:global([data-theme="dark"]) .app-sidebar {
  background: var(--bg-white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

:global([data-theme="dark"]) .sidebar-header {
  border-bottom-color: var(--border-color);
}

:global([data-theme="dark"]) .logo-title {
  color: var(--text-primary);
}

:global([data-theme="dark"]) .menu-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

:global([data-theme="dark"]) .menu-item.active {
  background-color: rgba(99, 102, 241, 0.2);
}

:global([data-theme="dark"]) .menu-item-icon,
:global([data-theme="dark"]) .menu-item-label {
  color: var(--text-primary);
}

:global([data-theme="dark"]) .menu-group-title {
  color: var(--text-secondary);
}
</style>