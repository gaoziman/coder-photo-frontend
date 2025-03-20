<!-- pages/image/components/SimilarImages.vue -->
<template>
  <!-- 相似图片推荐 -->
  <a-card :bordered="false" class="similar-card">
    <div class="similar-header">
      <h3 class="similar-title">相似图片</h3>
      <a class="similar-more">查看更多</a>
    </div>
    <p class="similar-description">基于AI算法推荐</p>
    <div class="similar-images">
      <div v-for="(img, index) in similarImages.slice(0, 4)" :key="index" class="similar-item">
        <img :src="img.src" :alt="img.title" class="similar-image" />
      </div>
    </div>
    <div class="similar-colors">
      <h4 class="colors-title">主要配色</h4>
      <div class="color-list">
        <div
            v-for="(color, index) in colorPalette"
            :key="index"
            class="color-item"
            :style="{ backgroundColor: color.value }"
            :title="color.name"
        ></div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
// 定义props
const props = defineProps({
  similarImages: {
    type: Array,
    required: true
  },
  colorPalette: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
/* 相似图片卡片 */
.similar-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.similar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.similar-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.similar-more {
  font-size: 12px;
  color: #4F46E5;
  cursor: pointer;
}

.similar-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px;
}

.similar-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.similar-item {
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}

.similar-image {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.3s;
}

.similar-item:hover .similar-image {
  transform: scale(1.05);
}

.similar-colors {
  margin-top: 16px;
}

.colors-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 12px;
  color: #333;
}

.color-list {
  display: flex;
  gap: 8px;
}

.color-item {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-item:hover {
  transform: scale(1.2);
}
</style>