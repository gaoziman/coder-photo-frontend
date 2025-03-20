<!-- pages/home/HomePage.vue -->
<template>
  <div class="home-page">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-wrapper">
        <a-input-search
            v-model:value="searchText"
            placeholder="搜索图片、标签、作者..."
            class="search-input"
            @search="onSearch"
            enter-button
        >
        </a-input-search>
      </div>
    </div>
    <!-- 分类和筛选器 -->
    <a-card class="filter-card" :bordered="false">
      <!-- 排序和筛选器 -->
      <div class="filter-header">
        <div class="filter-actions">
          <a-button type="primary" class="create-filter-btn" @click="showCreateFilterModal">
            <template #icon><plus-outlined /></template>
            创建筛选器
          </a-button>

          <!-- 添加我的筛选器下拉菜单 -->
          <filter-list
              :filters="filterStore.savedFilters"
              @select="handleApplyFilter"
              @delete="handleDeleteFilter"
              @create="showCreateFilterModal"
          />
        </div>

        <a-dropdown :trigger="['click']">
          <a-button class="sort-dropdown">
            筛选排序：最新发布
            <down-outlined />
          </a-button>
          <template #overlay>
            <a-menu @click="handleSortMenuClick">
              <a-menu-item key="newest">最新发布</a-menu-item>
              <a-menu-item key="popular">最受欢迎</a-menu-item>
              <a-menu-item key="look">最多浏览</a-menu-item>
              <a-menu-item key="oldest">最多收藏</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>

      <!-- 显示活动筛选器 -->
      <div v-if="filterStore.activeFilter" class="active-filter">
        <a-alert type="info" show-icon>
          <template #message>
            <div class="active-filter-info">
              <span>当前筛选器: <b>{{ filterStore.activeFilter.name }}</b></span>
              <a-button type="link" size="small" @click="handleClearFilter">
                清除筛选
              </a-button>
            </div>
          </template>
        </a-alert>
      </div>

      <!-- 分类导航 -->
      <div class="category-section">
        <div class="section-title">
          <h3>分类浏览</h3>
        </div>

        <div class="category-tags">
          <a-tag
              v-for="(category, index) in filterStore.categories"
              :key="index"
              :class="{
    'category-tag': true,
    'category-tag-active': category.active,
    'category-filter-applied': filterStore.activeFilter && filterStore.activeFilter.categories.includes(category.name)
  }"
              @click="toggleCategoryActive(index)"
          >
            {{ category.name }}
          </a-tag>
        </div>
      </div>

      <!-- 标签选择器 -->
      <div class="tag-section">
        <div class="section-title">
          <h3>热门标签</h3>
        </div>

        <div class="tag-list">
          <a-tag
              v-for="(tag, index) in filterStore.tags"
              :key="index"
              :class="{
    'custom-tag': true,
    'tag-hot': tag.hot || tag.name === '热门',
    'tag-filter-applied': filterStore.activeFilter && filterStore.activeFilter.tags.includes(tag.name)
  }"
              @click="toggleTagActive(index)"
          >
            {{ tag.name }}
            <span v-if="tag.count" class="tag-count">{{ tag.count }}</span>
          </a-tag>
        </div>
      </div>
    </a-card>

    <!-- 瀑布流图片展示 -->
    <div class="masonry-gallery">
      <template v-if="galleryImages.length > 0">
      <div
          v-for="(image, index) in galleryImages"
          :key="index"
          class="masonry-item"
      >
        <a-card :bordered="false" class="image-card" hoverable>
          <template #cover>
            <img :src="image.src" :alt="image.title" class="gallery-image" />
          </template>
          <a-card-meta :title="image.title">
            <template #description>
              <div class="image-meta">
                <div class="image-author">
                  <a-avatar :src="image.author.avatar" :size="20" />
                  <span class="author-name">{{ image.author.name }}</span>
                </div>
                <div class="image-tags">
                  <a-tag v-for="(tag, tagIndex) in image.tags" :key="tagIndex" :color="tag.color">
                    {{ tag.name }}
                  </a-tag>
                </div>
              </div>
            </template>
          </a-card-meta>
          <template #actions>
            <heart-outlined key="like" :class="{ 'liked': image.liked }" @click="toggleLike(index)" />
            <download-outlined key="download" />
            <share-alt-outlined key="share" />
          </template>
        </a-card>
      </div>
      </template>
      <div v-else class="empty-gallery">
        <a-empty description="没有找到匹配的图片">
          <template #extra>
            <a-button type="primary" @click="handleClearFilter">清除筛选</a-button>
          </template>
        </a-empty>
      </div>
    </div>

    <!-- 加载更多 -->
    <div class="load-more">
      <a-button type="primary" class="load-more-btn" @click="loadMore">
        加载更多
        <template #icon><down-outlined /></template>
      </a-button>
    </div>

    <!-- 创建筛选器弹窗 -->
    <create-filter-modal
        v-model:visible="filterModalVisible"
        :categories="categories"
        :tags="tags"
        @save="saveFilter"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, watch} from 'vue';
import {
  PlusOutlined,
  DownOutlined,
  HeartOutlined,
  DownloadOutlined,
  ShareAltOutlined
} from '@ant-design/icons-vue';
import CreateFilterModal from "@/pages/home/CreateFilterModal.vue";
import FilterList from "@/pages/home/FilterList.vue";
import { useFilterStore } from '@/stores/filterStore';
import { storeToRefs } from 'pinia';
import {message} from "ant-design-vue";

// 搜索文本
const searchText = ref('');
const onSearch = (value: string) => {
  console.log('搜索：', value);
};


// 使用筛选器Store
const filterStore = useFilterStore();


// 排序标签映射
const getSortLabel = (key: string) => {
  const sortMap = {
    newest: '最新发布',
    popular: '最受欢迎',
    look: '最多浏览',
    oldest: '最多收藏'
  };
  return sortMap[key] || '最新发布';
};



// 排序方式
const handleSortMenuClick = (e: any) => {
  filterStore.setSort(e.key);
  fetchGalleryImages();
};

// 分类数据
const categories = reactive([
  { name: '全部', active: true },
  { name: '个人', active: false },
  { name: '星球', active: false },
  { name: '面试题', active: false },
  { name: '表情包', active: false },
  { name: '素材', active: false },
  { name: '学习', active: false },
  { name: 'Bugs', active: false },
  { name: '海报', active: false },
  { name: '壁纸', active: false },
  { name: '动漫', active: false },
]);

// 处理分类标签点击
const handleToggleCategory = (index: number) => {
  filterStore.toggleCategoryActive(index);
  fetchGalleryImages();
};

// 处理标签点击
const handleToggleTag = (index: number) => {
  filterStore.toggleTagActive(index);
  fetchGalleryImages();
};


// 处理保存筛选器
const handleSaveFilter = (filter :any) => {
  const result = filterStore.saveFilter(filter);
  if (result.success) {
    message.success(result.message);
  } else {
    message.warning(result.message);
  }
};

// 处理应用筛选器
const handleApplyFilter = (filter) => {
  const result = filterStore.applyFilter(filter);
  if (result.success) {
    message.info(result.message);
    fetchGalleryImages();

    // 添加滚动到图片区域的代码
    setTimeout(() => {
      const galleryEl = document.querySelector('.masonry-gallery');
      if (galleryEl) {
        galleryEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }
};

// 切换分类选中状态
const toggleCategoryActive = (index: number) => {
  filterStore.toggleCategoryActive(index);
  fetchGalleryImages();
};

// 标签数据
const tags = reactive([
  { name: '热门', hot: true, count: '120+' },
  { name: '头像', hot: false },
  { name: '高清', hot: false },
  { name: '艺术', hot: false },
  { name: '校园', hot: false },
  { name: '风景', hot: false },
  { name: '简历', hot: false },
  { name: '创意', hot: false },
  { name: 'Spring', hot: false },
  { name: 'SpringBoot', hot: false },
  { name: '美女', hot: false },
  { name: '海边', hot: false },
  { name: 'Mac壁纸', hot: false },
]);

// 切换标签选中状态
const toggleTagActive = (index: number) => {
  filterStore.toggleTagActive(index);
  fetchGalleryImages();
};

// 图库数据
const galleryImages = reactive([
  {
    src: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'macbook-abstract-40',
    author: {
      name: '程序员Leo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: '海报', color: 'purple' },
      { name: 'Mac壁纸', color: '' },
    ],
    liked: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '自然风光摄影集',
    author: {
      name: '摄影师小王',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: '风景', color: 'blue' },
      { name: '高清', color: '' },
    ],
    liked: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '现代UI组件设计集',
    author: {
      name: 'UI设计师小李',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: '素材', color: 'green' },
      { name: '创意', color: '' },
    ],
    liked: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '二次元精选壁纸',
    author: {
      name: '动漫爱好者',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: '动漫', color: 'pink' },
      { name: '壁纸', color: '' },
    ],
    liked: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1536782376847-3123f99bd6b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '搞笑表情包合集',
    author: {
      name: '表情大师',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: '表情包', color: 'orange' },
      { name: '热门', color: '' },
    ],
    liked: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: 'Spring Boot项目结构',
    author: {
      name: 'Java大神',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: 'SpringBoot', color: 'blue' },
      { name: '代码', color: '' },
    ],
    liked: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '校园风光四季集',
    author: {
      name: '校园摄影师',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: '校园', color: 'cyan' },
      { name: '四季', color: '' },
    ],
    liked: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '现代抽象艺术作品',
    author: {
      name: '艺术家小陈',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    },
    tags: [
      { name: '艺术', color: 'red' },
      { name: '创意', color: '' },
    ],
    liked: false,
  },
]);

// 切换喜欢状态
const toggleLike = (index: number) => {
  galleryImages[index].liked = !galleryImages[index].liked;
};

// 加载更多
const loadMore = () => {
  console.log('加载更多图片');
  // 模拟加载更多，这里可以添加实际的加载逻辑
};

// 排序相关
const currentSort = ref('newest');

// 筛选器相关
const filterModalVisible = ref(false);
const savedFilters = ref([]);
const activeFilter = ref(null);

// 显示创建筛选器弹窗
const showCreateFilterModal = () => {
  filterModalVisible.value = true;
};

// 保存筛选器
const saveFilter = (filter :any) => {
  // 检查是否已有相同名称的筛选器
  const exists = savedFilters.value.some(f => f.name === filter.name);
  if (exists) {
    message.warning(`已存在名为"${filter.name}"的筛选器`);
    return;
  }

  // 添加到保存的筛选器中
  savedFilters.value.push(filter);

  // 保存到本地存储
  localStorage.setItem('userFilters', JSON.stringify(savedFilters.value));

  message.success(`筛选器"${filter.name}"已创建`);
};


// 处理删除筛选器
const handleDeleteFilter = (filterId :any) => {
  const result = filterStore.deleteFilter(filterId);
  if (result.success) {
    message.success(result.message);
  }
};

// 处理清除筛选器
const handleClearFilter = () => {
  const result = filterStore.clearFilter();
  if (result.success) {
    message.info(result.message);
    fetchGalleryImages();
  }
};

// 原始图库数据（完整数据）
const originalGalleryImages = [...galleryImages];

// 获取图片数据
const fetchGalleryImages = () => {
  // 获取当前筛选条件
  const filters = filterStore.getCurrentFilters();
  console.log('应用筛选条件获取图片:', filters);

  // 模拟根据筛选条件过滤图片
  const filteredImages = originalGalleryImages.filter(image => {
    // 筛选分类
    if (filters.categories.length > 0 && !filters.categories.includes('全部')) {
      // 这里简单模拟，实际中可能需要根据图片与分类的关联关系筛选
      // 假设每个图片都有一个隐含的分类属性
      const imageCategoryMatch = image.tags.some(tag =>
          filters.categories.includes(tag.name)
      );
      if (!imageCategoryMatch) return false;
    }

    // 筛选标签
    if (filters.tags.length > 0) {
      const tagMatch = image.tags.some(tag =>
          filters.tags.includes(tag.name)
      );
      if (!tagMatch) return false;
    }

    return true;
  });

  // 根据排序条件排序
  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (filters.sort) {
      case 'newest':
        // 假设有创建时间字段，这里简单模拟
        return 0; // 保持原顺序
      case 'popular':
        // 假设有热度字段，这里简单模拟
        return b.liked ? 1 : -1;
      case 'look':
        // 假设有浏览量字段，这里简单模拟
        return 0; // 保持原顺序
      case 'oldest':
        // 假设有收藏数字段，这里简单模拟
        return 0; // 保持原顺序
      default:
        return 0;
    }
  });

  // 更新图库数据
  galleryImages.splice(0, galleryImages.length, ...sortedImages);
};


// 初始化
onMounted(() => {
  originalGalleryImages.push(...galleryImages);
  // 初始化筛选Store，传入初始分类和标签数据
  const initialCategories = [
    { name: '全部', active: true },
    { name: '个人', active: false },
    { name: '星球', active: false },
    { name: '面试题', active: false },
    { name: '表情包', active: false },
    { name: '素材', active: false },
    { name: '学习', active: false },
    { name: 'Bugs', active: false },
    { name: '海报', active: false },
    { name: '壁纸', active: false },
    { name: '动漫', active: false },
  ];

  const initialTags = [
    { name: '热门', hot: true, count: '120+' },
    { name: '头像', hot: false },
    { name: '高清', hot: false },
    { name: '艺术', hot: false },
    { name: '校园', hot: false },
    { name: '风景', hot: false },
    { name: '简历', hot: false },
    { name: '创意', hot: false },
    { name: 'Spring', hot: false },
    { name: 'SpringBoot', hot: false },
    { name: '美女', hot: false },
    { name: '海边', hot: false },
    { name: 'Mac壁纸', hot: false },
  ];

  filterStore.initialize(initialCategories, initialTags);

  // 初始加载图片
  fetchGalleryImages();
});

watch(
    () => [
      filterStore.currentSort,
      filterStore.categories.map(c => c.active),
      filterStore.tags.map(t => t.hot)
    ],
    () => {
      if (!filterStore.activeFilter) {
        // 只有在没有激活的筛选器时才自动刷新
        // 避免重复刷新，因为应用筛选器会单独触发刷新
        fetchGalleryImages();
      }
    },
    { deep: true }
);
</script>

<style scoped>
/* 搜索区域顶部间距 */
.home-page {
  padding-top: 16px;
}


/* 移除标签的默认内边距和边框 */
.category-tag:deep(.ant-tag),
.custom-tag:deep(.ant-tag) {
  margin: 0;
  padding: 0;
}

/* 修复排序下拉按钮 */
.sort-dropdown {
  display: flex;
  align-items: center;
  height: 36px;
  border-radius: 6px;
  padding: 0 12px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.sort-dropdown .anticon {
  margin-left: 6px;
}
.search-container {
  padding: 16px 0 24px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-wrapper {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  position: relative; /* 添加相对定位 */
}

/* 整体搜索框样式 */
.search-input {
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

/* 输入框部分样式 */
.search-input :deep(.ant-input) {
  height: 44px; /* 统一高度 */
  font-size: 14px;
  padding-left: 16px;
  border-radius: 8px 0 0 8px;
}

/* 前缀图标样式 */
.search-input :deep(.ant-input-prefix) {
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
}

/* 搜索按钮样式 */
.search-input :deep(.ant-input-search-button) {
  height: 44px; /* 与输入框高度一致 */
  width: 60px; /* 增加按钮宽度 */
  border-radius: 0 8px 8px 0;
  background: #6366f1; /* 统一按钮颜色 */
  display: flex;
  align-items: center; /* 垂直居中图标 */
  justify-content: center; /* 水平居中图标 */
  border: none;
}

/* 搜索按钮内的图标居中 */
.search-input :deep(.ant-input-search-button .anticon) {
  line-height: 1;
  font-size: 18px;
  height: 18px; /* 固定图标高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

/* 确保按钮内无空隙 */
.search-input :deep(.ant-input-group-addon) {
  padding: 0;
  overflow: hidden;
}

/* 输入框聚焦时样式 */
.search-input :deep(.ant-input:focus) {
  border-color: #6366f1;
}

/* 禁用按钮悬停阴影，保持一致外观 */
.search-input :deep(.ant-input-search-button:hover) {
  background: #5258e9; /* 稍微深一点的紫色 */
}

/* 确保搜索按钮的高度和输入框完全一致 */
.search-input :deep(.ant-input-affix-wrapper) {
  height: 44px;
  padding: 0 11px;
}

.search-input {
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.search-input :deep(.ant-input) {
  height: 42px;
  font-size: 14px;
  padding-left: 16px;
}

.search-input :deep(.ant-input-prefix) {
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
}

.search-input :deep(.ant-input-search-button) {
  height: 42px;
  border-radius: 0 8px 8px 0;
  width: 48px;
  background: var(--primary-color);
}
/* 分类浏览区域样式优化 */
.category-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color-light);
}

.section-title {
  margin-bottom: 12px;
}

.section-title h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* 分类标签优化 */
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 8px;
}

.category-tag {
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: none;
  transition: all 0.2s ease;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
  height: auto;
  line-height: 1.5;
  user-select: none;
}

.category-tag-active {
  color: white;
  background: #6366f1; /* 更纯正的紫色，更接近原型图 */
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.25);
}

/* 热门标签 */
.tag-section {
  padding-top: 16px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}

.custom-tag {
  cursor: pointer;
  margin: 0;
  padding: 4px 12px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  border-radius: 16px; /* 更圆润的标签 */
  border: 1px solid #e8e8e8;
  background-color: white;
  font-size: 13px;
  height: auto;
  line-height: 1.5;
  user-select: none;
}

.tag-hot {
  color: white;
  background: #6366f1; /* 与激活的分类标签一致 */
  border-color: transparent;
}

.tag-count {
  margin-left: 4px;
  background: rgba(255, 255, 255, 0.85);
  color: #6366f1;
  border-radius: 10px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: bold;
  line-height: normal;
}

.masonry-gallery {
  column-count: 1;
  column-gap: 20px;
  margin-bottom: 32px;
}

@media (min-width: 640px) {
  .masonry-gallery {
    column-count: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-gallery {
    column-count: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-gallery {
    column-count: 4;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
}

.gallery-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  transition: transform 0.5s;
}

.image-card {
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.3s;
  display: block; /* 确保卡片正确显示 */
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}


.image-card:hover .gallery-image {
  transform: scale(1.03);
}


.image-card {
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.3s;
}

.image-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s;
}

.image-card:hover .gallery-image {
  transform: scale(1.03);
}

.image-meta {
  margin-top: 8px;
}

.image-author {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.author-name {
  margin-left: 8px;
}

.image-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.liked {
  color: #ff4d4f;
}

.load-more {
  text-align: center;
  margin-top: 16px;
  margin-bottom: 40px;
}

.load-more-btn {
  padding: 0 24px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border: none;
  transition: all 0.3s;
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.filter-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color-light);
}

.create-filter-btn {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border: none;
  border-radius: 8px;
  height: 38px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
  transition: all 0.3s;
}

.create-filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.25);
}

.sort-dropdown {
  height: 38px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--text-primary);
  background-color: white;
  border: 1px solid var(--border-color);
  transition: all 0.2s;
}

.sort-dropdown:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* 添加的新样式 */
.filter-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.active-filter {
  margin-bottom: 20px;
}

.active-filter-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* 筛选器列表按钮 */
.filter-list-btn {
  border-radius: 8px;
  height: 38px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

/* 确保筛选器按钮的图标垂直居中 */
.create-filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-filter-btn .anticon {
  margin-right: 6px;
}
.empty-gallery {
  text-align: center;
  padding: 60px 0;
}
.category-filter-applied {
  border: 1px dashed #6366f1;
}

.tag-filter-applied {
  border: 1px dashed #6366f1;
}
</style>