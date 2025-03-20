<!-- pages/image/ImageDetailPage.vue -->
<template>
  <!-- 主要内容区域 -->
  <div class="main-content">
    <div class="content-container">
      <!-- 左侧图片展示区域 -->
      <div class="left-content">
        <!-- 图片预览区域 -->
        <a-card class="image-preview-card" :bordered="false">
          <!-- 图片工具栏 -->
          <div class="image-toolbar">
            <div class="image-filename">{{ image.filename }}</div>
            <div class="image-tools">
              <a-button type="text" class="tool-btn">
                <template #icon><zoom-in-outlined /></template>
                放大
              </a-button>
              <a-button type="text" class="tool-btn">
                <template #icon><zoom-out-outlined /></template>
                缩小
              </a-button>
              <a-button type="text" class="tool-btn">
                <template #icon><redo-outlined /></template>
                旋转
              </a-button>
              <a-button type="text" class="tool-btn">
                <template #icon><border-outlined /></template>
                裁剪
              </a-button>
              <a-button type="text" class="tool-btn">
                <template #icon><control-outlined /></template>
                调整
              </a-button>
            </div>
          </div>

          <!-- 图片容器 -->
          <div class="image-container">
            <img :src="image.src" :alt="image.title" class="image-view" />

            <!-- 上一张/下一张按钮 -->
            <div class="image-nav-btn prev-btn" @click="navigateToPrev">
              <left-outlined />
            </div>
            <div class="image-nav-btn next-btn" @click="navigateToNext">
              <right-outlined />
            </div>
          </div>

          <!-- 图片操作栏 -->
          <div class="image-actions">
            <div class="action-left">
              <a-button type="text" class="action-btn" @click="toggleLike">
                <template #icon><heart-outlined :class="{ 'action-active': image.liked }" /></template>
                收藏
              </a-button>
              <a-button type="text" class="action-btn" @click="toggleStar">
                <template #icon><star-outlined :class="{ 'action-active': image.starred }" /></template>
                点赞
              </a-button>
              <a-button type="text" class="action-btn" @click="scrollToComments">
                <template #icon><comment-outlined /></template>
                评论
              </a-button>
            </div>
            <div class="action-right">
              <a-button type="text" class="action-btn" @click="showShareOptions">
                <template #icon><share-alt-outlined /></template>
                分享
              </a-button>
              <a-button type="text" class="action-btn" @click="downloadImage">
                <template #icon><download-outlined /></template>
                下载
              </a-button>
            </div>
          </div>
        </a-card>

        <!-- 相关图片推荐 -->
        <div class="related-images">
          <h3 class="section-title">相关推荐</h3>
          <div class="related-grid">
            <div v-for="(img, index) in relatedImages" :key="index" class="related-item">
              <img :src="img.src" :alt="img.title" class="related-image" />
            </div>
          </div>
        </div>

        <!-- 评论区组件 -->
        <CommentSection
            ref="commentsSection"
            :comments="comments"
            :current-user="currentUser"
            :comment-sort="commentSort"
            @update:comment-sort="commentSort = $event"
            @add-comment="addComment"
            @toggle-comment-like="toggleCommentLike"
            @toggle-reply-input="toggleReplyInput"
            @add-reply="addReply"
            @toggle-reply-like="toggleReplyLike"
            @toggle-nested-reply-input="toggleNestedReplyInput"
            @add-nested-reply="addNestedReply"
            @load-more-replies="loadMoreReplies"
            @load-more-comments="loadMoreComments"
        />
      </div>

      <!-- 右侧信息栏 -->
      <div class="right-sidebar">
        <!-- 图片信息卡片 -->
        <a-card :bordered="false" class="info-card">
          <!-- 作者信息 -->
          <div class="author-info">
            <a-avatar :src="image.author.avatar" :size="40" />
            <div class="author-details">
              <h4 class="author-name">{{ image.author.name }}</h4>
              <span class="author-status">{{ image.author.status }}</span>
            </div>
            <a-button class="follow-btn">
              关注
            </a-button>
          </div>

          <!-- 图片标题和描述 -->
          <div class="image-info">
            <h3 class="image-title">{{ image.title }}</h3>
            <p class="image-description">{{ image.description }}</p>
          </div>

          <!-- 图片元数据 -->
          <div class="image-metadata">
            <div class="metadata-item">
              <span class="metadata-label">分类：</span>
              <a-tag class="metadata-value">{{ image.category }}</a-tag>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">标签：</span>
              <div class="metadata-tags">
                <a-tag v-for="(tag, index) in image.tags" :key="index" :color="tag.color">{{ tag.name }}</a-tag>
              </div>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">格式：</span>
              <span class="metadata-value">{{ image.format }}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">宽度：</span>
              <span class="metadata-value">{{ image.width }}px</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">高度：</span>
              <span class="metadata-value">{{ image.height }}px</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">宽高比：</span>
              <span class="metadata-value">{{ image.aspectRatio }}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">大小：</span>
              <span class="metadata-value">{{ image.fileSize }}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">浏览量：</span>
              <span class="metadata-value">{{ image.views }}次</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">上传时间：</span>
              <span class="metadata-value">{{ image.uploadDate }}</span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="image-action-buttons">
            <a-button type="primary" class="action-button download-btn" block>
              <download-outlined />下载图片
            </a-button>
            <a-button class="action-button edit-btn" block>
              <edit-outlined />编辑图片
            </a-button>
            <a-button class="action-button colors-btn" block>
              <bg-colors-outlined />提取配色方案
            </a-button>
          </div>
        </a-card>

        <!-- 图片统计模块 -->
        <PhotoStatsModule
            :views="image.views"
            :likes="image.liked ? 1 : 0"
            :downloads="0"
        />

        <!-- 相似图片组件 -->
        <SimilarImages
            :similar-images="similarImages"
            :color-palette="colorPalette"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  BorderOutlined,
  ControlOutlined,
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  StarOutlined,
  CommentOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  EditOutlined,
  BgColorsOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import CommentSection from '@/components/photo/CommentSection.vue';
import SimilarImages from '@/components/photo/SimilarImages.vue';
import PhotoStatsModule from '@/components/photo/PhotoStatsModule.vue';

// 获取路由参数
const route = useRoute();
const imageId = route.params.id;

// 当前用户
const currentUser = reactive({
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  name: '当前用户'
});

// 图片数据
const image = reactive({
  id: 1,
  filename: 'macbook-abstract-40.jpg',
  src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  title: 'macbook-abstract-40',
  description: '抽象风格的Mac壁纸设计，适合现代简约风格的桌面环境。',
  author: {
    name: '程序员Leo',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: '已认证创作者'
  },
  category: '海报',
  tags: [
    { name: 'Mac壁纸', color: 'blue' },
    { name: '抽象', color: 'purple' },
    { name: '现代', color: 'orange' }
  ],
  format: 'JPEG',
  width: 6016,
  height: 3900,
  aspectRatio: '1.54',
  fileSize: '2.45 MB',
  views: 63,
  uploadDate: '2025-02-20',
  liked: false,
  starred: false
});

// 相关推荐图片
const relatedImages = reactive([
  {
    src: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相关图片1'
  },
  {
    src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相关图片2'
  },
  {
    src: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相关图片3'
  },
  {
    src: 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相关图片4'
  }
]);

// 评论数据
const comments = reactive([
  {
    id: 1,
    author: {
      name: '设计师小明',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      tag: '设计师'
    },
    content: '这张图片的色彩搭配非常棒，我很喜欢这种抽象的设计风格。能分享一下创作思路吗？',
    time: '2天前',
    likes: 12,
    liked: false,
    showReplyInput: false,
    replyText: '',
    replies: [],
    hasMoreReplies: false,
    hiddenRepliesCount: 0
  },
  {
    id: 2,
    author: {
      name: 'Mac爱好者',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    content: '已经设置为我的桌面壁纸了，真的很赞！请问有没有更多类似风格的作品？',
    time: '1天前',
    likes: 8,
    liked: false,
    showReplyInput: false,
    replyText: '',
    replies: [
      {
        id: 21,
        author: {
          name: '程序员Leo',
          avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          tag: '作者'
        },
        content: '谢谢喜欢！我的个人空间里有更多类似风格的作品，欢迎关注。',
        replyTo: 'Mac爱好者',
        time: '1天前',
        likes: 5,
        liked: false,
        showReplyInput: false,
        nestedReplyText: ''
      },
      {
        id: 22,
        author: {
          name: 'Mac爱好者',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        content: '太好了！刚刚关注了你，期待更多精彩作品。',
        replyTo: '程序员Leo',
        time: '1天前',
        likes: 3,
        liked: false,
        showReplyInput: false,
        nestedReplyText: ''
      }
    ],
    hasMoreReplies: false,
    hiddenRepliesCount: 0
  },
  {
    id: 3,
    author: {
      name: '设计学生',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    content: '请问这个是用什么软件制作的？效果真的很棒。',
    time: '5小时前',
    likes: 3,
    liked: false,
    showReplyInput: false,
    replyText: '',
    replies: [],
    hasMoreReplies: false,
    hiddenRepliesCount: 0
  },
  {
    id: 4,
    author: {
      name: '前端爱好者',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    content: '这种色彩渐变非常适合应用到我正在开发的网站界面，请问有渐变的色值吗？',
    time: '8小时前',
    likes: 7,
    liked: false,
    showReplyInput: false,
    replyText: '',
    replies: [
      {
        id: 41,
        author: {
          name: '程序员Leo',
          avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          tag: '作者'
        },
        content: '主要的渐变色值是 #667eea 到 #764ba2，CSS 代码：background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
        replyTo: '前端爱好者',
        time: '7小时前',
        likes: 5,
        liked: false,
        showReplyInput: false,
        nestedReplyText: ''
      }
    ],
    hasMoreReplies: true,
    hiddenRepliesCount: 3
  },
  {
    id: 5,
    author: {
      name: '设计总监Lily',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      tag: '设计总监'
    },
    content: '简洁大气的设计，很有现代感。建议可以考虑增加一些微妙的纹理元素，会让整体效果更加丰富。',
    time: '刚刚',
    likes: 2,
    liked: false,
    showReplyInput: false,
    replyText: '',
    replies: [],
    hasMoreReplies: false,
    hiddenRepliesCount: 0
  }
]);

// 评论排序方式
const commentSort = ref('newest');
// 评论区引用
const commentsSection = ref<HTMLElement | null>(null);

// 相似图片
const similarImages = reactive([
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相似图片1'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相似图片2'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相似图片3'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    title: '相似图片4'
  }
]);

// 配色方案
const colorPalette = reactive([
  { name: '主色调', value: '#667eea' },
  { name: '次要色调', value: '#764ba2' },
  { name: '强调色', value: '#4F46E5' },
  { name: '辅助色1', value: '#9F7AEA' },
  { name: '辅助色2', value: '#ED64A6' }
]);

// 切换喜欢状态
const toggleLike = () => {
  image.liked = !image.liked;
  message.success(image.liked ? '已加入收藏' : '已取消收藏');
};

// 切换星标状态
const toggleStar = () => {
  image.starred = !image.starred;
  message.success(image.starred ? '已点赞' : '已取消点赞');
};

// 导航到上一张图片
const navigateToPrev = () => {
  message.info('正在加载上一张图片');
  // 这里可以实现实际的图片导航逻辑
};

// 导航到下一张图片
const navigateToNext = () => {
  message.info('正在加载下一张图片');
  // 这里可以实现实际的图片导航逻辑
};

// 显示分享选项
const showShareOptions = () => {
  message.info('分享功能即将上线');
};

// 下载图片
const downloadImage = () => {
  message.success('图片开始下载');
  // 这里可以实现实际的下载逻辑
};

// 滚动到评论区
const scrollToComments = () => {
  nextTick(() => {
    if (commentsSection.value) {
      commentsSection.value.$el.scrollIntoView({ behavior: 'smooth' });
    }
  });
};

// 切换评论喜欢状态
const toggleCommentLike = (index: number) => {
  const comment = comments[index];
  comment.liked = !comment.liked;
  comment.likes += comment.liked ? 1 : -1;
};

// 切换回复喜欢状态
const toggleReplyLike = (commentIndex: number, replyIndex: number) => {
  const reply = comments[commentIndex].replies[replyIndex];
  reply.liked = !reply.liked;
  reply.likes += reply.liked ? 1 : -1;
};

// 显示/隐藏回复输入框
const toggleReplyInput = (index: number) => {
  comments[index].showReplyInput = !comments[index].showReplyInput;
  // 关闭其他评论的回复框
  comments.forEach((comment, i) => {
    if (i !== index) {
      comment.showReplyInput = false;
    }
    // 关闭所有嵌套回复框
    comment.replies.forEach(reply => {
      reply.showReplyInput = false;
    });
  });
};

// 显示/隐藏嵌套回复输入框
const toggleNestedReplyInput = (commentIndex: number, replyIndex: number) => {
  const reply = comments[commentIndex].replies[replyIndex];
  reply.showReplyInput = !reply.showReplyInput;

  // 关闭其他回复框
  comments.forEach((comment, i) => {
    comment.showReplyInput = false;
    comment.replies.forEach((reply, j) => {
      if (i !== commentIndex || j !== replyIndex) {
        reply.showReplyInput = false;
      }
    });
  });
};

// 添加评论
const addComment = (commentText: string) => {
  if (!commentText.trim()) {
    message.warning('评论内容不能为空');
    return;
  }

  comments.unshift({
    id: comments.length + 1,
    author: {
      name: currentUser.name,
      avatar: currentUser.avatar
    },
    content: commentText,
    time: '刚刚',
    likes: 0,
    liked: false,
    showReplyInput: false,
    replyText: '',
    replies: [],
    hasMoreReplies: false,
    hiddenRepliesCount: 0
  });

  message.success('评论已发布');
};

// 添加回复
const addReply = (index: number, replyText: string) => {
  const comment = comments[index];

  if (!replyText.trim()) {
    message.warning('回复内容不能为空');
    return;
  }

  comment.replies.push({
    id: comment.replies.length + 1,
    author: {
      name: currentUser.name,
      avatar: currentUser.avatar
    },
    content: replyText,
    replyTo: comment.author.name,
    time: '刚刚',
    likes: 0,
    liked: false,
    showReplyInput: false,
    nestedReplyText: ''
  });

  comment.replyText = '';
  comment.showReplyInput = false;
  message.success('回复已发布');
};

// 添加嵌套回复
const addNestedReply = (commentIndex: number, replyIndex: number, nestedReplyText: string) => {
  const comment = comments[commentIndex];
  const reply = comment.replies[replyIndex];

  if (!nestedReplyText.trim()) {
    message.warning('回复内容不能为空');
    return;
  }

  comment.replies.push({
    id: comment.replies.length + 1,
    author: {
      name: currentUser.name,
      avatar: currentUser.avatar
    },
    content: nestedReplyText,
    replyTo: reply.author.name,
    time: '刚刚',
    likes: 0,
    liked: false,
    showReplyInput: false,
    nestedReplyText: ''
  });

  reply.nestedReplyText = '';
  reply.showReplyInput = false;
  message.success('回复已发布');
};

// 加载更多回复
const loadMoreReplies = (index: number) => {
  // 这里可以实现加载更多回复的逻辑
  comments[index].hasMoreReplies = false;
  comments[index].hiddenRepliesCount = 0;
  message.success('已加载全部回复');
};

// 加载更多评论
const loadMoreComments = () => {
  // 这里可以实现加载更多评论的逻辑
  message.info('正在加载更多评论');
};

// 页面初始化
onMounted(() => {
  // 从API获取图片详情数据
  console.log('获取图片ID:', imageId);

  // 在实际项目中，可以使用以下代码获取图片详情
  // const fetchImageDetail = async () => {
  //   try {
  //     const result = await getImageDetail(imageId);
  //     Object.assign(image, result);
  //   } catch (error) {
  //     console.error('获取图片详情失败:', error);
  //     message.error('获取图片详情失败');
  //   }
  // };
  //
  // fetchImageDetail();
});
</script>

<style scoped>
/* 主要内容区域 */
.main-content {
  width: 100%;
  max-width: 1440px; /* 增加最大宽度，让内容左右更宽 */
  margin: 0 auto;
  padding: 0; /* 移除内边距，让父组件控制 */
}

.content-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* 左侧内容 */
.left-content {
  flex: 1;
  min-width: 0;
  width: 100%;
}

@media (min-width: 1024px) {
  .left-content {
    width: calc(72% - 8px);
  }
}

/* 图片预览卡片 */
.image-preview-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 图片工具栏 */
.image-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.image-filename {
  font-size: 14px;
  font-weight: 500;
}

.image-tools {
  display: flex;
  gap: 8px;
}

.tool-btn {
  color: #666;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.tool-btn:hover {
  background-color: rgba(79, 70, 229, 0.1);
  color: #4F46E5;
}

/* 图片容器 */
.image-container {
  position: relative;
  height: calc(100vh - 360px);
  min-height: 400px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-view {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.image-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s;
}

.image-nav-btn:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.9);
}

.prev-btn {
  left: 16px;
}

.next-btn {
  right: 16px;
}

/* 图片操作栏 */
.image-actions {
  padding: 12px 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.action-left, .action-right {
  display: flex;
  gap: 16px;
}

.action-btn {
  color: #666;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.action-btn:hover {
  color: #4F46E5;
}

.action-active {
  color: #f5222d;
}

/* 相关推荐 */
.related-images {
  margin-top: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #333;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .related-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.related-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s;
}

.related-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.related-image {
  width: 100%;
  height: auto;
  display: block;
}

/* 右侧侧边栏 */
.right-sidebar {
  width: 100%;
}

@media (min-width: 1024px) {
  .right-sidebar {
    width: 28%;
  }
}

/* 图片信息卡片 */
.info-card {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.author-details {
  margin-left: 12px;
  flex: 1;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.author-status {
  font-size: 12px;
  color: #666;
}

.follow-btn {
  font-size: 12px;
  padding: 0 12px;
  height: 28px;
  border-color: #4F46E5;
  color: #4F46E5;
}

.image-info {
  margin-top: 16px;
}

.image-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px;
  color: #333;
}

.image-description {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.image-metadata {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metadata-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.metadata-label {
  color: #666;
}

.metadata-value {
  font-weight: 500;
  color: #333;
}

.metadata-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.image-action-buttons {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-button {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.download-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.download-btn:hover {
  opacity: 0.9;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.edit-btn {
  border-color: #4F46E5;
  color: #4F46E5;
}

.colors-btn {
  border-color: #666;
  color: #666;
}
</style>