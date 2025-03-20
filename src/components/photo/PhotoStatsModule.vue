<template>
  <a-card :bordered="false" class="usage-stats-card">
    <!-- 统计标题栏 -->
    <div class="stats-header">
      <div class="stats-title">
        <bar-chart-outlined />
        <h3 class="stats-title-text">图片使用统计</h3>
      </div>
      <a-tag color="cyan" class="stats-status">实时数据</a-tag>
    </div>

    <!-- 统计内容 -->
    <div class="stats-content">
      <p class="stats-description">了解图片的使用情况和受欢迎程度</p>

      <!-- 使用指标卡片 -->
      <div class="stats-metrics">
        <div class="metric-card">
          <eye-outlined class="metric-icon" />
          <div class="metric-info">
            <span class="metric-value">{{ formatNumber(metrics.views) }}</span>
            <span class="metric-label">浏览量</span>
          </div>
          <span class="metric-trend" :class="{'trend-up': metrics.viewsChange > 0, 'trend-down': metrics.viewsChange < 0}">
            <up-outlined v-if="metrics.viewsChange > 0" />
            <down-outlined v-if="metrics.viewsChange < 0" />
            {{ Math.abs(metrics.viewsChange) }}%
          </span>
        </div>

        <div class="metric-card">
          <heart-outlined class="metric-icon" />
          <div class="metric-info">
            <span class="metric-value">{{ formatNumber(metrics.likes) }}</span>
            <span class="metric-label">收藏数</span>
          </div>
          <span class="metric-trend" :class="{'trend-up': metrics.likesChange > 0, 'trend-down': metrics.likesChange < 0}">
            <up-outlined v-if="metrics.likesChange > 0" />
            <down-outlined v-if="metrics.likesChange < 0" />
            {{ Math.abs(metrics.likesChange) }}%
          </span>
        </div>
      </div>

      <!-- 历史趋势图 -->
      <div class="trend-section">
        <div class="section-header">
          <span class="section-label">30天趋势</span>
          <a-radio-group v-model:value="trendType" size="small" class="trend-toggle">
            <a-radio-button value="views">浏览</a-radio-button>
            <a-radio-button value="likes">收藏</a-radio-button>
            <a-radio-button value="downloads">下载</a-radio-button>
          </a-radio-group>
        </div>
        <div class="trend-chart">
          <div
              v-for="(value, index) in getTrendData()"
              :key="index"
              class="trend-bar"
              :style="{
              height: `${(value / getMaxTrendValue()) * 60}px`,
              backgroundColor: getTrendColor()
            }"
              :title="`${getTrendDateLabel(index)}: ${value}`"
          ></div>
        </div>
        <div class="trend-labels">
          <span>{{ getTrendDateLabel(0) }}</span>
          <span>{{ getTrendDateLabel(14) }}</span>
          <span>{{ getTrendDateLabel(29) }}</span>
        </div>
      </div>

      <!-- 使用者画像 -->
      <div class="user-demographics">
        <div class="section-header">
          <span class="section-label">图片受众</span>
        </div>
        <div class="demographics-content">
          <div class="demographic-item">
            <span class="demographic-label">设计师</span>
            <div class="demographic-bar-container">
              <div class="demographic-bar" style="width: 78%; background-color: #4F46E5;"></div>
              <span class="demographic-value">78%</span>
            </div>
          </div>
          <div class="demographic-item">
            <span class="demographic-label">开发者</span>
            <div class="demographic-bar-container">
              <div class="demographic-bar" style="width: 45%; background-color: #667eea;"></div>
              <span class="demographic-value">45%</span>
            </div>
          </div>
          <div class="demographic-item">
            <span class="demographic-label">学生</span>
            <div class="demographic-bar-container">
              <div class="demographic-bar" style="width: 36%; background-color: #9F7AEA;"></div>
              <span class="demographic-value">36%</span>
            </div>
          </div>
          <div class="demographic-item">
            <span class="demographic-label">其他</span>
            <div class="demographic-bar-container">
              <div class="demographic-bar" style="width: 23%; background-color: #ED64A6;"></div>
              <span class="demographic-value">23%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="usage-context">
        <div class="section-header">
          <span class="section-label">常见使用场景</span>
        </div>
        <div class="usage-tags">
          <a-tag color="blue" class="usage-tag">网站设计 <span class="usage-tag-count">46%</span></a-tag>
          <a-tag color="purple" class="usage-tag">移动应用 <span class="usage-tag-count">32%</span></a-tag>
          <a-tag color="cyan" class="usage-tag">教学课件 <span class="usage-tag-count">28%</span></a-tag>
          <a-tag color="orange" class="usage-tag">演示文稿 <span class="usage-tag-count">24%</span></a-tag>
          <a-tag color="green" class="usage-tag">社交媒体 <span class="usage-tag-count">18%</span></a-tag>
        </div>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="stats-footer">
      <a-button class="stats-btn" block>
        <bar-chart-outlined />查看完整统计报告
      </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  BarChartOutlined,
  EyeOutlined,
  HeartOutlined,
  DownloadOutlined,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons-vue';

// 数据指标
const metrics = reactive({
  views: 1467,
  viewsChange: 8.2,
  likes: 324,
  likesChange: 12.5,
  downloads: 187,
  downloadsChange: -3.4
});

// 格式化数字显示
const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

// 趋势图类型
const trendType = ref('views');

// 趋势数据
const trendsData = reactive({
  views: [42, 48, 53, 45, 38, 55, 60, 56, 63, 58, 52, 65, 72, 68, 74, 82, 78, 85, 92, 88, 95, 104, 98, 110, 105, 115, 120, 112, 124, 130],
  likes: [12, 15, 10, 8, 14, 18, 16, 22, 19, 24, 27, 25, 30, 28, 32, 35, 30, 38, 34, 42, 45, 40, 47, 43, 50, 48, 52, 55, 58, 63],
  downloads: [8, 6, 10, 7, 12, 9, 14, 11, 16, 15, 19, 17, 22, 20, 24, 21, 18, 16, 20, 19, 22, 25, 23, 28, 25, 22, 20, 18, 16, 15]
});

// 获取当前趋势数据
const getTrendData = () => {
  return trendsData[trendType.value];
};

// 获取最大趋势值
const getMaxTrendValue = () => {
  const data = getTrendData();
  return Math.max(...data) * 1.1; // 加10%的空间
};

// 获取趋势颜色
const getTrendColor = () => {
  const colorMap = {
    'views': '#4F46E5',
    'likes': '#ED64A6',
    'downloads': '#667eea'
  };
  return colorMap[trendType.value];
};

// 获取趋势日期标签
const getTrendDateLabel = (index: number) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - (29 - index));
  return `${date.getMonth() + 1}/${date.getDate()}`;
};
</script>

<style scoped>
/* 统计卡片 */
.usage-stats-card {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #F0F9FF;
  border-bottom: 1px solid #BAE6FD;
}

.stats-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0EA5E9;
}

.stats-title-text {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.stats-content {
  padding: 16px;
}

.stats-description {
  font-size: 14px;
  color: #333;
  margin: 0 0 16px;
}

/* 指标卡片样式 */
.stats-metrics {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.metric-card {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  transition: all 0.2s;
}

.metric-card:hover {
  background-color: #f3f4f6;
  transform: translateY(-2px);
}

.metric-icon {
  font-size: 20px;
  color: #6366f1;
  margin-right: 8px;
}

.metric-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.metric-label {
  font-size: 12px;
  color: #666;
}

.metric-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.trend-up {
  color: #10b981;
}

.trend-down {
  color: #ef4444;
}

/* 趋势图表样式 */
.trend-section {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.trend-toggle {
  font-size: 12px;
}

.trend-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 80px;
  margin-bottom: 8px;
}

.trend-bar {
  flex: 1;
  min-width: 3px;
  border-radius: 2px 2px 0 0;
  transition: all 0.3s;
}

.trend-bar:hover {
  transform: scaleY(1.05);
  opacity: 0.8;
}

.trend-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #666;
}

/* 用户画像样式 */
.user-demographics {
  margin-bottom: 20px;
}

.demographics-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demographic-item {
  display: flex;
  align-items: center;
}

.demographic-label {
  width: 60px;
  font-size: 13px;
  color: #333;
}

.demographic-bar-container {
  flex: 1;
  position: relative;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.demographic-bar {
  height: 100%;
  border-radius: 4px;
}

.demographic-value {
  position: absolute;
  right: 0;
  top: -6px;
  font-size: 11px;
  color: #666;
}

/* 使用场景标签 */
.usage-context {
  margin-bottom: 20px;
}

.usage-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.usage-tag {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.usage-tag-count {
  opacity: 0.7;
}

/* 底部按钮 */
.stats-footer {
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
}

.stats-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  border-color: #0EA5E9;
  color: #0EA5E9;
}
</style>