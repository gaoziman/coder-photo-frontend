<template>
  <div class="my-space-page">
    <!-- 用户个人资料和空间概览 -->
    <div class="profile-card">
      <div class="profile-cover gradient-bg"></div>

      <div class="profile-avatar-container">
        <a-avatar :size="128" :src="userInfo.avatar" class="profile-avatar"/>
        <div class="verified-badge">
          <check-outlined/>
        </div>
      </div>

      <div class="profile-info">
        <h2 class="profile-name">{{ userInfo.name }}</h2>
        <p class="profile-desc">{{ userInfo.level }} · 已加入 {{ userInfo.joinTime }}</p>

        <div class="profile-stats">
          <div class="stat-item">
            <div class="stat-count">{{ userInfo.imageCount }}</div>
            <div class="stat-label">图片</div>
          </div>
          <div class="stat-item">
            <div class="stat-count">{{ userInfo.spaceCount }}</div>
            <div class="stat-label">空间</div>
          </div>
          <div class="stat-item">
            <div class="stat-count">{{ userInfo.teamCount }}</div>
            <div class="stat-label">团队</div>
          </div>
          <div class="stat-item">
            <div class="stat-count">{{ userInfo.followerCount }}</div>
            <div class="stat-label">关注者</div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="profile-actions">
          <a-button type="primary" class="action-btn primary-btn">
            <template #icon>
              <upload-outlined/>
            </template>
            上传图片
          </a-button>
          <a-button class="action-btn">
            <template #icon>
              <edit-outlined/>
            </template>
            批量编辑
          </a-button>
          <a-button class="action-btn">
            <template #icon>
              <bar-chart-outlined/>
            </template>
            查看统计
          </a-button>
        </div>
      </div>
    </div>

    <!-- 空间类型和容量 -->
    <div class="space-types-container">
      <a-row :gutter="24">
        <!-- 普通空间 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <a-card class="space-card">
            <div class="space-card-header">
              <folder-outlined class="space-icon regular"/>
              <div class="space-info">
                <h3 class="space-title">普通空间</h3>
                <p class="space-status">已开通</p>
              </div>
            </div>

            <div class="space-details">
              <div class="space-detail-item">
                <span class="detail-label">存储空间</span>
                <span class="detail-value">5GB</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">图片数量限制</span>
                <span class="detail-value">1,000张</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">分享功能</span>
                <span class="detail-value">基础</span>
              </div>
            </div>

            <div class="space-usage">
              <div class="usage-header">
                <span class="usage-label">使用情况</span>
                <span class="usage-value">4.2GB/5GB</span>
              </div>
              <a-progress :percent="84" :show-info="false" stroke-color="#6366F1"/>
            </div>
          </a-card>
        </a-col>

        <!-- 专业版空间 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <a-card class="space-card current">
            <div class="current-tag">当前版本</div>
            <div class="space-card-header">
              <folder-open-outlined class="space-icon pro"/>
              <div class="space-info">
                <h3 class="space-title">专业版空间</h3>
                <p class="space-status">已开通</p>
              </div>
            </div>

            <div class="space-details">
              <div class="space-detail-item">
                <span class="detail-label">存储空间</span>
                <span class="detail-value">20GB</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">图片数量限制</span>
                <span class="detail-value">10,000张</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">分享功能</span>
                <span class="detail-value">高级</span>
              </div>
            </div>

            <div class="space-usage">
              <div class="usage-header">
                <span class="usage-label">使用情况</span>
                <span class="usage-value">8.5GB/20GB</span>
              </div>
              <a-progress :percent="42.5" :show-info="false" stroke-color="#6366F1"/>
            </div>
          </a-card>
        </a-col>

        <!-- 旗舰空间 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <a-card class="space-card">
            <div class="space-card-header">
              <folder-add-outlined class="space-icon"/>
              <div class="space-info">
                <h3 class="space-title">旗舰空间</h3>
                <p class="space-status">未开通</p>
              </div>
            </div>

            <div class="space-details">
              <div class="space-detail-item">
                <span class="detail-label">存储空间</span>
                <span class="detail-value">100GB</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">图片数量限制</span>
                <span class="detail-value">无限制</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">分享功能</span>
                <span class="detail-value">无限制</span>
              </div>
            </div>

            <div class="space-action">
              <a-button type="primary" block class="upgrade-btn">
                升级
              </a-button>
            </div>
          </a-card>
        </a-col>

        <!-- AI助力空间 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <a-card class="space-card">
            <div class="space-card-header">
              <bulb-outlined class="space-icon ai"/>
              <div class="space-info">
                <h3 class="space-title">AI助力空间</h3>
                <p class="space-status">新功能</p>
              </div>
            </div>

            <div class="space-details">
              <div class="space-detail-item">
                <span class="detail-label">智能分类</span>
                <span class="detail-value">支持</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">AI图像生成</span>
                <span class="detail-value">每月50次</span>
              </div>
              <div class="space-detail-item">
                <span class="detail-label">内容识别</span>
                <span class="detail-value">高级</span>
              </div>
            </div>

            <div class="space-action">
              <a-button type="primary" block class="try-btn">
                立即体验
              </a-button>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 搜索和筛选区域 -->
    <a-card class="filter-card" :bordered="false">
      <div class="filter-wrapper">
        <!-- 日期选择器 -->
        <div class="filter-item">
          <div class="filter-label">日期</div>
          <a-range-picker
              v-model:value="dateRange.value"
              :placeholder="['开始日期', '结束日期']"
              format="YYYY-MM-DD"
              @change="onDateChange"
              class="date-range-picker"
          />
        </div>

        <!-- 图片名称 -->
        <div class="filter-item">
          <div class="filter-label">图片名称</div>
          <input type="text" class="filter-input" placeholder="输入图片名称关键词" v-model="filterConditions.imageName" />
        </div>

        <!-- 图片简介 -->
        <div class="filter-item">
          <div class="filter-label">图片简介</div>
          <input type="text" class="filter-input" placeholder="输入图片简介关键词" v-model="filterConditions.imageDesc" />
        </div>

        <!-- 分类下拉框 - 修复宽度问题 -->
        <div class="filter-item">
          <div class="filter-label">分类</div>
          <a-select
              v-model:value="filterConditions.category"
              placeholder="全部分类"
              class="filter-select"
              style="width: 100%"
          >
            <a-select-option value="">全部分类</a-select-option>
            <a-select-option
                v-for="category in categories.filter(c => c.name !== '全部')"
                :key="category.name"
                :value="category.name"
            >
              {{ category.name }}
            </a-select-option>
          </a-select>
        </div>

        <!-- 图片宽度 -->
        <div class="filter-item">
          <div class="filter-label">图片宽度</div>
          <input type="number" class="filter-input" placeholder="宽度" v-model="filterConditions.minWidth" />
        </div>

        <!-- 图片高度 -->
        <div class="filter-item">
          <div class="filter-label">图片高度</div>
          <input type="number" class="filter-input" placeholder="高度" v-model="filterConditions.minHeight" />
        </div>

        <!-- 图片格式 - 修复宽度问题 -->
        <div class="filter-item">
          <div class="filter-label">图片格式</div>
          <a-select
              v-model:value="format"
              placeholder="全部格式"
              class="filter-select"
              style="width: 100%"
          >
            <a-select-option value="">全部格式</a-select-option>
            <a-select-option value="jpg">JPG/JPEG</a-select-option>
            <a-select-option value="png">PNG</a-select-option>
            <a-select-option value="svg">SVG</a-select-option>
            <a-select-option value="gif">GIF</a-select-option>
            <a-select-option value="webp">WEBP</a-select-option>
          </a-select>
        </div>

        <!-- 尺寸类型 - 修复宽度问题 -->
        <div class="filter-item">
          <div class="filter-label">尺寸类型</div>
          <a-select
              v-model:value="size"
              placeholder="全部尺寸"
              class="filter-select"
              style="width: 100%"
              @change="handleSizeChange"
          >
            <a-select-option value="">全部尺寸</a-select-option>
            <a-select-option value="small">小尺寸 (< 1MP)</a-select-option>
            <a-select-option value="medium">中等尺寸 (1-5MP)</a-select-option>
            <a-select-option value="large">大尺寸 (> 5MP)</a-select-option>
          </a-select>
        </div>

        <!-- 标签 - 修复多选下拉问题 -->
        <div class="filter-item">
          <div class="filter-label">标签</div>
          <a-select
              v-model:value="filterConditions.tags"
              mode="multiple"
              placeholder="选择标签"
              class="filter-select"
              style="width: 100%"
          >
            <a-select-option
                v-for="tag in tags"
                :key="tag.name"
                :value="tag.name"
            >
              {{ tag.name }}
            </a-select-option>
          </a-select>
        </div>

        <!-- 主色调 -->
        <div class="filter-item color-container">
          <div class="filter-label">主色调</div>
          <div class="color-options-wrapper">
            <div class="color-options">
              <div
                  v-for="(color, index) in colorOptions"
                  :key="index"
                  :class="['color-option', { 'selected': selectedColor === color.value }]"
                  :style="{ backgroundColor: color.color }"
                  :title="color.name"
                  @click="selectColor(color.value)"
              ></div>
            </div>

            <!-- 将按钮区域移到这里 -->
            <div class="filter-actions">
              <button class="filter-btn filter-btn-apply" @click="applyFilters">搜索</button>
              <button class="filter-btn filter-btn-reset" @click="resetFilters">重置</button>
            </div>
          </div>
        </div>
      </div>
    </a-card>

      <!-- 分类浏览 -->
      <div class="category-section">
        <div class="section-title">
          <h3>分类浏览</h3>
        </div>
        <div class="category-tags">
          <a-tag
              v-for="(category, index) in categories"
              :key="index"
              :class="['category-tag', { 'active': category.active }]"
              @click="toggleCategory(index)"
          >
            {{ category.name }}
          </a-tag>
        </div>

        <!-- 热门标签 -->
        <div class="tag-section">
          <div class="section-title">
            <h3>热门标签</h3>
          </div>
          <div class="tag-list">
            <a-tag
                v-for="(tag, index) in tags"
                :key="index"
                :class="['custom-tag', { 'tag-hot': tag.hot }]"
                @click="toggleTag(index)"
            >
              {{ tag.name }}
              <span v-if="tag.count" class="tag-count">{{ tag.count }}</span>
            </a-tag>
          </div>
        </div>
      </div>


    <!-- 瀑布流图片展示 -->
    <div class="masonry-gallery">
      <template v-if="galleryImages.length > 0">
        <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="masonry-item"
        >
          <div class="image-card">
            <!-- 图片容器 -->
            <div class="image-container">
              <img :src="image.src" :alt="image.title" class="gallery-image"/>
              <!-- 悬停显示的操作按钮覆盖层 -->
              <div class="image-overlay">
                <div class="image-action-buttons">
                  <div class="action-button">
                    <eye-outlined/>
                  </div>
                  <div class="action-button">
                    <download-outlined/>
                  </div>
                  <div class="action-button">
                    <delete-outlined/>
                  </div>
                </div>
              </div>
            </div>

            <!-- 图片信息 -->
            <div class="image-info">
              <h3 class="image-title">{{ image.title }}</h3>
              <div class="image-meta">
                <div class="image-author">
                  <a-avatar :src="userInfo.avatar" :size="24"/>
                  <span class="author-name">{{ userInfo.name }}</span>
                </div>
                <div class="image-tags">
                  <a-tag class="category-tag">{{ image.category }}</a-tag>
                  <a-tag class="format-tag">{{ getFileExtension(image.title) }}</a-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="empty-gallery">
        <a-empty description="没有找到匹配的图片">
          <template #extra>
            <a-button type="primary" @click="fetchGalleryImages">重新加载</a-button>
          </template>
        </a-empty>
      </div>
    </div>

    <!-- 加载更多 -->
    <div class="load-more">
      <a-button type="primary" class="load-more-btn" @click="loadMore">
        加载更多
        <template #icon>
          <down-outlined/>
        </template>
      </a-button>
    </div>

    <!-- 创建筛选器弹窗 -->
    <a-modal
        v-model:visible="filterModalVisible"
        title="创建筛选器"
        @ok="saveFilter"
        okText="保存筛选器"
        cancelText="取消"
        width="600px"
    >
      <a-form :model="newFilter" layout="vertical">
        <a-form-item label="筛选器名称" name="name">
          <a-input v-model:value="newFilter.name" placeholder="输入筛选器名称"/>
        </a-form-item>
        <a-form-item label="选择分类" name="categories">
          <a-select
              v-model:value="newFilter.categories"
              mode="multiple"
              placeholder="选择分类"
              style="width: 100%"
          >
            <a-select-option
                v-for="category in categories.filter(c => c.name !== '全部')"
                :key="category.name"
                :value="category.name"
            >
              {{ category.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择标签" name="tags">
          <a-select
              v-model:value="newFilter.tags"
              mode="multiple"
              placeholder="选择标签"
              style="width: 100%"
          >
            <a-select-option
                v-for="tag in tags"
                :key="tag.name"
                :value="tag.name"
            >
              {{ tag.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue';
import {
  UploadOutlined,
  EditOutlined,
  BarChartOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  FolderAddOutlined,
  BulbOutlined,
  FilterOutlined,
  DownOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
  CheckOutlined,
  CalendarOutlined
} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';

// 在script部分修改日期相关代码
import {DatePicker} from 'ant-design-vue';

const {RangePicker} = DatePicker;

// 日期相关（改为使用Ant Design的日期选择器）
const dateRange = reactive({
  value: null,
  startText: '',
  endText: ''
});

// 日期变化处理函数
const onDateChange = (dates, dateStrings) => {
  if (dates) {
    dateRange.startText = dateStrings[0];
    dateRange.endText = dateStrings[1];
  } else {
    dateRange.startText = '';
    dateRange.endText = '';
  }
  // 应用日期筛选
  fetchGalleryImages();
};

// 用户信息
const userInfo = reactive({
  name: '张小明',
  level: '专业版用户',
  joinTime: '1 年',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  imageCount: 245,
  spaceCount: 12,
  teamCount: 3,
  followerCount: '1.2K'
});

// 搜索相关
const searchText = ref('');
const onSearch = (value: string) => {
  console.log('搜索：', value);
};

// 分类数据
const categories = reactive([
  {name: '全部', active: true},
  {name: '设计素材', active: false},
  {name: '摄影作品', active: false},
  {name: '壁纸收藏', active: false},
  {name: '表情包', active: false}
]);

// 切换分类选中状态
const toggleCategory = (index: number) => {
  if (index === 0) {
    // 如果是全部，则只激活全部
    categories.forEach((cat, i) => {
      cat.active = i === 0;
    });
  } else {
    // 取消全部的激活
    categories[0].active = false;
    // 切换当前分类的激活状态
    categories[index].active = !categories[index].active;

    // 如果没有任何激活的分类，则激活全部
    const hasActive = categories.some(cat => cat.active);
    if (!hasActive) {
      categories[0].active = true;
    }
  }
  fetchGalleryImages();
};

// 获取文件扩展名
const getFileExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
};


// 标签数据
const tags = reactive([
  {name: '热门', hot: true, count: '120+'},
  {name: '海报', hot: false},
  {name: '高清', hot: false},
  {name: '艺术', hot: false},
  {name: '风景', hot: false},
  {name: 'Mac壁纸', hot: false}
]);

// 切换标签选中状态
const toggleTag = (index: number) => {
  tags[index].hot = !tags[index].hot;
  fetchGalleryImages();
};


const format = ref('');
const size = ref('');
const showCustomSize = ref(false);
const customSize = reactive({
  width: null,
  height: null
});

const handleSizeChange = (value: string) => {
  showCustomSize.value = value === 'custom';
};


const selectedColor = ref('');
const colorOptions = [
  {value: 'red', name: '红色', color: '#f5222d'},
  {value: 'orange', name: '橙色', color: '#fa8c16'},
  {value: 'yellow', name: '黄色', color: '#fadb14'},
  {value: 'green', name: '绿色', color: '#52c41a'},
  {value: 'cyan', name: '青色', color: '#13c2c2'},
  {value: 'blue', name: '蓝色', color: '#1677ff'},
  {value: 'purple', name: '紫色', color: '#722ed1'},
  {value: 'pink', name: '粉色', color: '#eb2f96'},
  {value: 'gray', name: '灰色', color: '#8c8c8c'},
  {value: 'black', name: '黑色', color: '#000000'},
  {value: 'white', name: '白色', color: '#ffffff', border: true}
];

const selectColor = (color: string) => {
  selectedColor.value = selectedColor.value === color ? '' : color;
  fetchGalleryImages();
};

// 排序相关
const currentSort = ref('newest');
const currentSortLabel = ref('最新上传');

const handleSortMenuClick = (e: any) => {
  currentSort.value = e.key;

  const sortLabels: Record<string, string> = {
    newest: '最新上传',
    oldest: '最早上传',
    name: '名称排序',
    size: '大小排序'
  };

  currentSortLabel.value = sortLabels[e.key] || '最新上传';
  fetchGalleryImages();
};

// 筛选器相关
const filterModalVisible = ref(false);
const newFilter = reactive({
  name: '',
  categories: [],
  tags: []
});

// 显示创建筛选器弹窗
const showCreateFilterModal = () => {
  // 重置新筛选器数据
  newFilter.name = '';
  newFilter.categories = [];
  newFilter.tags = [];

  filterModalVisible.value = true;
};

// 保存筛选器
const saveFilter = () => {
  if (!newFilter.name) {
    message.warning('请输入筛选器名称');
    return;
  }

  console.log('保存筛选器:', newFilter);
  message.success(`筛选器"${newFilter.name}"已创建`);
  filterModalVisible.value = false;
};

// 图库数据（修复重复和错误）
const galleryImages = reactive([
  {
    src: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: '设计风格指南.jpg',
    category: '设计素材',
    uploadTime: '2天前上传',
    size: '2.4MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '海边日落.jpg',
    category: '摄影作品',
    uploadTime: '3天前上传',
    size: '3.6MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: 'UI组件库.png',
    category: '设计素材',
    uploadTime: '昨天上传',
    size: '1.2MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '城市夜景.jpg',
    category: '壁纸收藏',
    uploadTime: '今天上传',
    size: '4.8MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1568633296406-f5d5c0d5dfc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '品牌标志.svg',
    category: '设计素材',
    uploadTime: '5小时前上传',
    size: '0.5MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1536782376847-3123f99bd6b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '可爱表情包.png',
    category: '表情包',
    uploadTime: '1周前上传',
    size: '0.8MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '自然风光.jpg',
    category: '摄影作品',
    uploadTime: '2周前上传',
    size: '5.2MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: 'Mac系统壁纸.jpg',
    category: '壁纸收藏',
    uploadTime: '3周前上传',
    size: '3.7MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '程序员壁纸.jpg',
    category: '壁纸收藏',
    uploadTime: '1个月前上传',
    size: '2.9MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '3D渲染场景.png',
    category: '设计素材',
    uploadTime: '2个月前上传',
    size: '6.3MB'
  },
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    title: '抽象艺术.jpg',
    category: '艺术',
    uploadTime: '3个月前上传',
    size: '4.1MB'
  }
]);

// 扩展筛选条件
const filterConditions = reactive({
  imageName: '',
  imageDesc: '',
  minWidth: null,
  maxWidth: null,
  minHeight: null,
  maxHeight: null,
  category: '',
  tags: []
});

// 重置筛选器
const resetFilters = () => {
  // 重置所有筛选条件
  Object.keys(filterConditions).forEach(key => {
    if (Array.isArray(filterConditions[key])) {
      filterConditions[key] = [];
    } else {
      filterConditions[key] = '';
    }
  });

  dateRange.start = null;
  dateRange.end = null;
  dateRange.startText = '';
  dateRange.endText = '';
  format.value = '';
  size.value = '';
  selectedColor.value = '';
  showCustomSize.value = false;
  customSize.width = null;
  customSize.height = null;

  // 重置分类和标签
  categories.forEach((cat, i) => {
    cat.active = i === 0;
  });

  tags.forEach(tag => {
    tag.hot = false;
  });

  // 标记第一个标签为热门（如果存在）
  if (tags.length > 0) {
    tags[0].hot = true;
  }

  // 重新加载图片
  fetchGalleryImages();

  message.success('筛选条件已重置');
};

// 应用筛选器（改名为搜索）
const applyFilters = () => {
  // 实际应用中，这里会根据所有筛选条件来过滤图片
  fetchGalleryImages();

  message.success('筛选条件已应用');
};

// 原始图库数据（用于筛选）
const originalGalleryImages = ref([...galleryImages]);

// 获取图片数据
const fetchGalleryImages = () => {
  // 应用筛选条件
  const filteredImages = [...originalGalleryImages.value].filter(image => {
    // 筛选分类
    if (!categories[0].active) {
      const activeCategoryNames = categories
          .filter(cat => cat.active)
          .map(cat => cat.name);

      if (activeCategoryNames.length > 0 && !activeCategoryNames.includes(image.category)) {
        return false;
      }
    }

    // 筛选标签（这里简化处理，实际情况可能需要根据图片标签进行筛选）
    const activeTagNames = tags
        .filter(tag => tag.hot)
        .map(tag => tag.name);

    if (activeTagNames.length > 0) {
      // 简化处理：假设图片标题或分类中包含标签名称则匹配
      const matchesTag = activeTagNames.some(tagName =>
          image.title.toLowerCase().includes(tagName.toLowerCase()) ||
          image.category.toLowerCase().includes(tagName.toLowerCase())
      );

      if (!matchesTag) return false;
    }

    // 筛选颜色（简化处理）
    if (selectedColor.value) {
      // 实际中应该是根据图片的颜色信息进行筛选
      // 这里简化处理，假设所有图片都通过颜色筛选
      return true;
    }

    // 筛选格式
    if (format.value) {
      const extension = image.title.split('.').pop()?.toLowerCase();
      if (format.value === 'jpg' && !['jpg', 'jpeg'].includes(extension || '')) {
        return false;
      } else if (format.value !== extension) {
        return false;
      }
    }

    // 筛选时间范围
    if (dateRange.start || dateRange.end) {
      // 实际应用中应该将上传时间字符串转换为Date对象进行比较
      // 这里简化处理，仅做示意
      return true;
    }

    // 筛选尺寸
    if (size.value && size.value !== 'custom') {
      // 实际应用中应该根据图片的实际尺寸进行筛选
      // 这里简化处理，仅做示意
      return true;
    }

    // 自定义尺寸筛选
    if (showCustomSize.value && (customSize.width || customSize.height)) {
      // 实际应用中应该根据图片的实际尺寸进行筛选
      // 这里简化处理，仅做示意
      return true;
    }

    // 图片名称
    if (filterConditions.imageName && !image.title.toLowerCase().includes(filterConditions.imageName.toLowerCase())) {
      return false;
    }

    // 图片简介 (假设有description字段，如果没有可以添加)
    if (filterConditions.imageDesc && image.description &&
        !image.description.toLowerCase().includes(filterConditions.imageDesc.toLowerCase())) {
      return false;
    }

    // 图片尺寸 (假设有width和height字段，如果没有可以添加)
    if (filterConditions.minWidth && image.width && image.width < filterConditions.minWidth) {
      return false;
    }

    if (filterConditions.maxWidth && image.width && image.width > filterConditions.maxWidth) {
      return false;
    }

    if (filterConditions.minHeight && image.height && image.height < filterConditions.minHeight) {
      return false;
    }

    if (filterConditions.maxHeight && image.height && image.height > filterConditions.maxHeight) {
      return false;
    }

    // 分类筛选
    if (filterConditions.category && image.category !== filterConditions.category) {
      return false;
    }

    // 标签筛选 (假设图片有tags字段，如果没有可以添加)
    if (filterConditions.tags.length > 0 && image.tags) {
      const matchesAnyTag = filterConditions.tags.some(tag =>
          image.tags.some(imageTag => imageTag.toLowerCase() === tag.toLowerCase())
      );

      if (!matchesAnyTag) {
        return false;
      }
    }

    // 日期范围 (需要转换文本格式到日期对象)
    if (dateRange.startText || dateRange.endText) {
      // 这里需要实现日期文本到日期对象的转换逻辑
      // 然后与图片上传时间进行比较
      // 简化示例:
      // const uploadDate = new Date(image.uploadTime);
      // if (dateRange.startText) {
      //   const startDate = parseDate(dateRange.startText);
      //   if (uploadDate < startDate) return false;
      // }
      // if (dateRange.endText) {
      //   const endDate = parseDate(dateRange.endText);
      //   if (uploadDate > endDate) return false;
      // }
    }

    return true;
  });

  // 应用排序
  const sortedImages = [...filteredImages].sort((a, b) => {
    if (currentSort.value === 'newest') {
      // 简化处理，以上传时间字符串的第一个数字作为排序依据
      // 这里用上传时间字符串的第一个数字作为排序依据
      const timeA = parseInt(a.uploadTime.match(/\d+/)?.[0] || '0');
      const timeB = parseInt(b.uploadTime.match(/\d+/)?.[0] || '0');

      // 对于"今天"、"昨天"等特殊处理
      if (a.uploadTime.includes('今天')) return -1;
      if (b.uploadTime.includes('今天')) return 1;
      if (a.uploadTime.includes('昨天')) return -1;
      if (b.uploadTime.includes('昨天')) return 1;

      // 小时比天优先
      if (a.uploadTime.includes('小时')) return -1;
      if (b.uploadTime.includes('小时')) return 1;

      // 数字越小越新
      return timeB - timeA;
    } else if (currentSort.value === 'oldest') {
      // 与newest相反的逻辑
      const timeA = parseInt(a.uploadTime.match(/\d+/)?.[0] || '0');
      const timeB = parseInt(b.uploadTime.match(/\d+/)?.[0] || '0');

      if (a.uploadTime.includes('今天')) return 1;
      if (b.uploadTime.includes('今天')) return -1;
      if (a.uploadTime.includes('昨天')) return 1;
      if (b.uploadTime.includes('昨天')) return -1;

      if (a.uploadTime.includes('小时')) return 1;
      if (b.uploadTime.includes('小时')) return -1;

      return timeA - timeB;
    } else if (currentSort.value === 'name') {
      return a.title.localeCompare(b.title);
    } else if (currentSort.value === 'size') {
      // 从大到小排序
      const sizeA = parseFloat(a.size.replace('MB', ''));
      const sizeB = parseFloat(b.size.replace('MB', ''));
      return sizeB - sizeA;
    }
    return 0;
  });

  // 更新图库数据
  galleryImages.splice(0, galleryImages.length, ...sortedImages);
};

// 加载更多
const loadMore = () => {
  console.log('加载更多图片');
  message.info('正在加载更多图片...');
  // 模拟加载更多，实际应该从API获取
};

// 初始化
onMounted(() => {
  // 保存原始数据副本
  originalGalleryImages.value = [...galleryImages];

  // 初始加载图片
  fetchGalleryImages();
});
</script>

<style scoped>
/* 基础样式 */
.my-space-page {
  padding: 1.5rem;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 用户个人资料卡片 */
.profile-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  margin-bottom: 2rem;
}

.profile-cover {
  height: 12rem;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.profile-avatar-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 4rem;
}

.profile-avatar {
  border: 4px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.verified-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2rem;
  width: 2rem;
  background-color: #6366F1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  color: white;
  font-size: 1rem;
}

.profile-info {
  padding-top: 4rem;
  padding-bottom: 1.5rem;
  text-align: center;
}

.profile-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.profile-desc {
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 1rem;
}

.profile-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;
}

.stat-item {
  text-align: center;
}

.stat-count {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
}

.action-btn :deep(.anticon) {
  margin-right: 0.5rem;
}

.primary-btn {
  background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.primary-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 空间类型卡片 */
.space-types-container {
  margin-bottom: 2rem;
}

.space-card {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s;
  height: 100%;
  position: relative;
}

.space-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.space-card.current {
  border: 2px solid #6366F1;
}

.current-tag {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #6366F1;
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.space-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.space-icon {
  font-size: 2rem;
  color: #9CA3AF;
  margin-right: 1rem;
}

.space-icon.pro {
  color: #6366F1;
}

.space-icon.ai {
  color: #8B5CF6;
}

.space-info h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
}

.space-status {
  font-size: 0.875rem;
  color: #6B7280;
}

.space-details {
  margin: 1rem 0;
}

.space-detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.detail-label {
  color: #6B7280;
}

.detail-value {
  font-weight: 500;
}

.space-usage {
  margin-top: 1rem;
}

.usage-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.usage-label {
  color: #6B7280;
}

.usage-value {
  color: #6366F1;
}

.upgrade-btn, .try-btn {
  background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
  border: none;
  margin-top: 1.5rem;
  transition: all 0.3s;
}

.try-btn {
  background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
}

.upgrade-btn:hover, .try-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* ================ 筛选区域终极优化 ================ */
/* ================ 筛选区域优化设计 ================ */
.filter-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin-bottom: 24px;
}

/* 筛选项网格布局 */
.filter-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

/* 筛选项样式 */
.filter-item {
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.2s ease;
  min-height: 90px;
}

/* 标签样式 */
.filter-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
}

/* 解决下拉菜单宽度问题 */
.filter-select {
  width: 100% !important;
}

/* 确保下拉菜单显示正确 */
.filter-select :deep(.ant-select-selector) {
  width: 100% !important;
  min-width: 100% !important;
  height: 36px !important;
  padding: 0 11px !important;
}

/* 修复下拉菜单在展开时的宽度问题 */
:deep(.ant-select-dropdown) {
  min-width: 180px !important;
}

/* 确保多选标签菜单可见 */
.filter-select[mode="multiple"] :deep(.ant-select-selector) {
  height: auto !important;
  min-height: 36px !important;
  padding: 2px 4px !important;
}

/* 统一输入框样式 */
.filter-input,
.date-range-picker :deep(.ant-picker) {
  width: 100%;
  height: 36px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 0 12px;
}

/* 日期选择器样式修复 */
.date-range-picker {
  width: 100%;
}

.date-range-picker :deep(.ant-picker) {
  width: 100% !important;
}

/* 颜色选择器容器 */
.filter-item:has(.color-options) {
  grid-column: span 2;
}

/* 颜色选择器样式 */
.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.color-option {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.color-option.selected {
  border: 2px solid white;
  box-shadow: 0 0 0 2px #6366F1;
}

/* 按钮容器 */
.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

/* 按钮样式 */
.filter-btn {
  min-width: 90px;
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.25s ease;
  cursor: pointer;
}

/* 重置按钮 */
.filter-btn-reset {
  background-color: white;
  color: #4B5563;
  border: 1px solid #E5E7EB;
}

/* 搜索按钮 */
.filter-btn-apply {
  background-color: #6366F1;
  color: white;
  border: none;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .filter-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .filter-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-item:has(.color-options) {
    grid-column: span 1;
  }
}

@media (max-width: 576px) {
  .filter-wrapper {
    grid-template-columns: 1fr;
  }
}


/* 按钮点击效果 */
.filter-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 分类与标签区域优化 */
.category-section {
  margin-top: 30px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 30px;  /* 增加与下方内容的间距 */
}

/* 标题样式优化 */
.section-title {
  margin-bottom: 20px;  /* 增加与内容的间距 */
}

.section-title h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  position: relative;
  display: inline-block;
}

.section-title h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #6366F1 0%, transparent 100%);
  border-radius: 3px;
}

/* 分类标签样式优化 */
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-tag {
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;
  background-color: #F9FAFB;
  color: #4B5563;
  border: 1px solid #E5E7EB;
  margin: 0;
  font-weight: 500;
}

.category-tag:hover {
  background-color: #F3F4F6;
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.category-tag.active {
  color: white;
  background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
  border-color: transparent;
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.25);
  font-weight: 600;
}

/* 热门标签区域 */
.tag-section {
  margin-top: 20px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  cursor: pointer;
  margin-top: 15px;
}

.custom-tag {
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.25s ease;
  background-color: #F9FAFB;
  color: #4B5563;
  border: 1px solid #E5E7EB;
  margin: 0;
}

.custom-tag:hover {
  background-color: #F3F4F6;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
}


.tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  margin-left: 6px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #6366F1;
  border-radius: 9px;
  padding: 0 6px;
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 图片卡片中的标签样式优化 */
.image-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.image-tags .category-tag {
  margin: 0;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366F1;
  border: none;
  padding: 3px 8px;
  font-size: 0.7rem;
  border-radius: 4px;
  font-weight: 400;
}

.image-tags .format-tag {
  margin: 0;
  background-color: rgba(107, 114, 128, 0.08);
  color: #6B7280;
  border: none;
  cursor: pointer;
  padding: 3px 8px;
  font-size: 0.7rem;
  border-radius: 4px;
  font-weight: 400;
}

/* 瀑布流布局 */
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
  width: 100%;
}

/* 图片卡片样式 */
.image-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* 图片容器 */
.image-container {
  position: relative;
  overflow: hidden;
}

/* 图片样式 */
.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.image-card:hover .gallery-image {
  transform: scale(1.03);
}

/* 覆盖层样式 */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

/* 操作按钮样式 */
.image-action-buttons {
  display: flex;
  gap: 16px;
}

.action-button {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.action-button:nth-child(1):hover {
  color: #1890ff; /* 查看按钮悬停颜色 */
}

.action-button:nth-child(2):hover {
  color: #52c41a; /* 下载按钮悬停颜色 */
}

.action-button:nth-child(3):hover {
  color: #f5222d; /* 删除按钮悬停颜色 */
}

/* 图片信息样式 */
.image-info {
  padding: 12px 16px;
}

.image-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}

.image-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-name {
  font-size: 12px;
  color: #666;
}

/* 空状态样式 */
.empty-gallery {
  text-align: center;
  padding: 60px 0;
}

/* 加载更多按钮 */
.load-more {
  text-align: center;
  margin: 2.5rem 0;
}

.load-more-btn {
  background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
  border: none;
  padding: 0 1.5rem;
  height: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.load-more-btn :deep(.anticon) {
  margin-left: 0.5rem;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .filter-container {
    grid-template-columns: repeat(3, 1fr);
  }

  .filter-item.date-item {
    grid-column: span 3;
  }

  .filter-item:nth-child(7),
  .filter-item:nth-child(8) {
    grid-column: span 1;
  }

  .filter-item:has(.color-options) {
    grid-column: span 2;
  }

  .filter-item.button-group {
    grid-column: 2 / span 2;
  }
}

@media (max-width: 900px) {
  .filter-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-item.date-item {
    grid-column: span 2;
  }

  .filter-item:has(.color-options) {
    grid-column: span 2;
  }

  .filter-item.button-group {
    grid-column: auto / span 2;
    justify-self: end;
  }
}

@media (max-width: 640px) {
  .filter-container {
    grid-template-columns: 1fr;
  }

  .filter-item.date-item,
  .filter-item:nth-child(7),
  .filter-item:nth-child(8),
  .filter-item:has(.color-options),
  .filter-item.button-group {
    grid-column: 1;
  }

  .filter-item.button-group {
    justify-self: stretch;
  }

  .filter-btn {
    flex: 1;
  }
}

.custom-tag.tag-hot {
  color: white;
  background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
  border-color: transparent;
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.25);
  font-weight: 600;
}

.tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  margin-left: 6px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #6366F1;
  border-radius: 9px;
  padding: 0 6px;
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 修改主色调容器样式 */
.filter-item.color-container {
  grid-column: span 2; /* 保持跨越2列 */
}

/* 色彩选项和按钮的包装容器 */
.color-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

/* 调整色彩选项区域宽度 */
.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
  flex: 1; /* 占据可用空间 */
}

/* 调整按钮区域样式 */
.filter-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px; /* 与颜色选项对齐 */
}

/* 按钮样式保持不变 */
.filter-btn {
  min-width: 90px;
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.25s ease;
}

/* 重置按钮 */
.filter-btn-reset {
  background-color: white;
  color: #4B5563;
  border: 1px solid #E5E7EB;
}

/* 搜索按钮 */
.filter-btn-apply {
  background-color: #6366F1;
  color: white;
  border: none;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .color-options-wrapper {
    flex-direction: column;
  }

  .filter-actions {
    margin-top: 16px;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .filter-item.color-container {
    grid-column: span 1;
  }
}
</style>