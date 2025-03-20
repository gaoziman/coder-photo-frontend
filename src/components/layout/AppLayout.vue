<!-- components/layout/AppLayout.vue -->
<template>
  <a-layout class="app-layout">
    <!-- 侧边栏 -->
    <AppSidebar />

    <!-- 主内容区域 -->
    <a-layout class="main-content" :style="{ marginLeft: '240px' }">
      <AppHeader />

      <a-layout-content class="layout-content">
        <!-- 路由内容渲染区域 -->
        <slot></slot>
      </a-layout-content>

      <AppFooter />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.main-content {
  min-height: 100vh;
  transition: all 0.2s;
}

.layout-content {
  padding: 24px;
  background-color: var(--bg-color);
  min-height: calc(100vh - 64px - 66px); /* 减去头部和底部高度 */
  overflow-y: auto;
}
</style>