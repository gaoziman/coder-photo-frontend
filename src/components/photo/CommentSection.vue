<!-- pages/image/components/CommentSection.vue -->
<template>
  <!-- 评论区 -->
  <div class="comments-section">
    <div class="comments-header">
      <h3 class="section-title">评论 ({{ comments.length }})</h3>
      <div class="comments-sort">
        <span class="sort-label">排序方式：</span>
        <a-select v-model:value="localCommentSort" size="small" bordered="false" class="sort-select">
          <a-select-option value="newest">最新</a-select-option>
          <a-select-option value="hottest">最热</a-select-option>
          <a-select-option value="oldest">时间正序</a-select-option>
        </a-select>
      </div>
    </div>

    <!-- 评论输入框 -->
    <div class="comment-input-container">
      <a-avatar :src="currentUser.avatar" :size="40" />
      <div class="comment-input-wrapper">
        <div class="comment-input">
          <a-textarea
              v-model:value="newComment"
              placeholder="添加评论..."
              :rows="2"
              class="comment-textarea"
          />
          <div class="comment-input-actions">
            <div class="input-tools">
              <a-button type="text" class="tool-btn">
                <smile-outlined />
              </a-button>
              <a-button type="text" class="tool-btn">
                <picture-outlined />
              </a-button>
            </div>
            <a-button type="primary" class="publish-btn" @click="handleAddComment">
              发布
            </a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list">
      <div v-for="(comment, index) in comments" :key="index" class="comment-thread">
        <div class="comment-container">
          <a-avatar :src="comment.author.avatar" :size="40" />
          <div class="comment-content">
            <div class="comment-bubble">
              <div class="comment-header">
                <span class="comment-author">{{ comment.author.name }}</span>
                <a-tag v-if="comment.author.tag" color="blue" class="author-tag">{{ comment.author.tag }}</a-tag>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <p class="comment-text">{{ comment.content }}</p>
              <div class="comment-actions">
                <a-button type="text" class="comment-action-btn" @click="handleCommentLike(index)">
                  <heart-outlined :class="{ 'liked': comment.liked }" />
                  <span>{{ comment.likes }}</span>
                </a-button>
                <a-button type="text" class="comment-action-btn" @click="handleReplyInput(index)">
                  <comment-outlined />
                  <span>回复</span>
                </a-button>
                <a-button type="text" class="comment-action-btn">
                  <ellipsis-outlined />
                </a-button>
              </div>
            </div>

            <!-- 回复输入框 -->
            <div
                :class="['reply-input', { 'active': comment.showReplyInput }]"
                v-if="comment.showReplyInput"
            >
              <div class="reply-input-container">
                <a-avatar :src="currentUser.avatar" :size="24" />
                <div class="reply-input-field">
                  <a-input
                      v-model:value="comment.replyText"
                      :placeholder="`回复 @${comment.author.name}...`"
                  />
                </div>
                <a-button type="primary" size="small" class="reply-btn" @click="handleAddReply(index)">
                  回复
                </a-button>
              </div>
            </div>

            <!-- 回复列表 -->
            <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
              <div
                  v-for="(reply, replyIndex) in comment.replies"
                  :key="replyIndex"
                  class="reply-container"
              >
                <a-avatar :src="reply.author.avatar" :size="32" />
                <div class="reply-content">
                  <div class="reply-bubble">
                    <div class="reply-header">
                      <span class="reply-author">{{ reply.author.name }}</span>
                      <a-tag v-if="reply.author.tag" color="purple" class="author-tag">{{ reply.author.tag }}</a-tag>
                      <span class="reply-time">{{ reply.time }}</span>
                    </div>
                    <p class="reply-text">
                      <span v-if="reply.replyTo" class="reply-to">@{{ reply.replyTo }} </span>
                      {{ reply.content }}
                    </p>
                    <div class="reply-actions">
                      <a-button type="text" class="reply-action-btn" @click="handleReplyLike(index, replyIndex)">
                        <heart-outlined :class="{ 'liked': reply.liked }" />
                        <span>{{ reply.likes }}</span>
                      </a-button>
                      <a-button type="text" class="reply-action-btn" @click="handleNestedReplyInput(index, replyIndex)">
                        <comment-outlined />
                        <span>回复</span>
                      </a-button>
                    </div>
                  </div>

                  <!-- 嵌套回复输入框 -->
                  <div
                      :class="['reply-input', { 'active': reply.showReplyInput }]"
                      v-if="reply.showReplyInput"
                  >
                    <div class="reply-input-container">
                      <a-avatar :src="currentUser.avatar" :size="24" />
                      <div class="reply-input-field">
                        <a-input
                            v-model:value="reply.nestedReplyText"
                            :placeholder="`回复 @${reply.author.name}...`"
                        />
                      </div>
                      <a-button type="primary" size="small" class="reply-btn" @click="handleAddNestedReply(index, replyIndex)">
                        回复
                      </a-button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 更多回复按钮 -->
              <div v-if="comment.hasMoreReplies" class="more-replies">
                <a-button class="more-replies-btn" @click="handleLoadMoreReplies(index)">
                  <down-outlined />
                  <span>查看更多回复 ({{ comment.hiddenRepliesCount }})</span>
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多评论 -->
    <div class="load-more-comments">
      <a-button class="load-more-btn" @click="handleLoadMoreComments">
        <sync-outlined />
        <span>加载更多评论</span>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  SmileOutlined,
  PictureOutlined,
  HeartOutlined,
  CommentOutlined,
  EllipsisOutlined,
  DownOutlined,
  SyncOutlined
} from '@ant-design/icons-vue';

// 接收props
const props = defineProps({
  comments: {
    type: Array,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  },
  commentSort: {
    type: String,
    default: 'newest'
  }
});

// 事件
const emit = defineEmits([
  'update:comment-sort',
  'add-comment',
  'toggle-comment-like',
  'toggle-reply-input',
  'add-reply',
  'toggle-reply-like',
  'toggle-nested-reply-input',
  'add-nested-reply',
  'load-more-replies',
  'load-more-comments'
]);

// 本地排序状态
const localCommentSort = computed({
  get: () => props.commentSort,
  set: (value) => emit('update:comment-sort', value)
});

// 新评论
const newComment = ref('');

// 处理添加评论
const handleAddComment = () => {
  emit('add-comment', newComment.value);
  newComment.value = '';
};

// 处理评论点赞
const handleCommentLike = (index: number) => {
  emit('toggle-comment-like', index);
};

// 处理回复点赞
const handleReplyLike = (commentIndex: number, replyIndex: number) => {
  emit('toggle-reply-like', commentIndex, replyIndex);
};

// 显示/隐藏回复输入框
const handleReplyInput = (index: number) => {
  emit('toggle-reply-input', index);
};

// 显示/隐藏嵌套回复输入框
const handleNestedReplyInput = (commentIndex: number, replyIndex: number) => {
  emit('toggle-nested-reply-input', commentIndex, replyIndex);
};

// 添加回复
const handleAddReply = (index: number) => {
  const comment = props.comments[index];
  emit('add-reply', index, comment.replyText);
};

// 添加嵌套回复
const handleAddNestedReply = (commentIndex: number, replyIndex: number) => {
  const reply = props.comments[commentIndex].replies[replyIndex];
  emit('add-nested-reply', commentIndex, replyIndex, reply.nestedReplyText);
};

// 加载更多回复
const handleLoadMoreReplies = (index: number) => {
  emit('load-more-replies', index);
};

// 加载更多评论
const handleLoadMoreComments = () => {
  emit('load-more-comments');
};
</script>

<style scoped>
/* 评论区 */
.comments-section {
  margin-top: 24px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0;
  color: #333;
}

.comments-sort {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.sort-label {
  color: #666;
  margin-right: 8px;
}

.sort-select {
  width: 100px;
  text-align: center;
  color: #4F46E5;
}

/* 评论输入 */
.comment-input-container {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.comment-input-wrapper {
  flex: 1;
}

.comment-input {
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
}

.comment-textarea {
  background-color: transparent;
  padding: 12px;
  border: none;
  resize: none;
}

.comment-input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f0f0f0;
  border-top: 1px solid #e0e0e0;
}

.input-tools {
  display: flex;
  gap: 8px;
}

.tool-btn {
  color: #666;
}

.publish-btn {
  border-radius: 16px;
  height: 32px;
  background-color: #4F46E5;
}

/* 评论列表 */
.comments-list {
  margin-top: 24px;
}

.comment-thread {
  margin-bottom: 24px;
}

.comment-container {
  display: flex;
  gap: 12px;
}

.comment-content {
  flex: 1;
}

.comment-bubble {
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.2s;
}

.comment-bubble:hover {
  background-color: #f3f4f6;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.comment-author {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.author-tag {
  margin-left: 8px;
  font-size: 12px;
}

.comment-time {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}

.comment-text {
  font-size: 14px;
  color: #333;
  margin: 0;
}

.comment-actions {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.comment-action-btn {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.comment-action-btn:hover {
  color: #4F46E5;
}

.comment-action-btn .liked {
  color: #f5222d;
}

/* 回复输入框 */
.reply-input {
  margin-top: 8px;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;
}

.reply-input.active {
  height: 40px;
}

.reply-input-container {
  display: flex;
  gap: 8px;
  align-items: center;
}

.reply-input-field {
  flex: 1;
}

.reply-btn {
  border-radius: 16px;
  height: 24px;
  padding: 0 12px;
  background-color: #4F46E5;
}

/* 回复列表 */
.replies-list {
  margin-top: 12px;
  margin-left: 24px;
  border-left: 2px solid #eee;
  padding-left: 12px;
}

.reply-container {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.reply-content {
  flex: 1;
}

.reply-bubble {
  background-color: #f3f4f6;
  border-radius: 10px;
  padding: 10px 14px;
  transition: all 0.2s;
}

.reply-bubble:hover {
  background-color: #e5e7eb;
}

.reply-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.reply-author {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.reply-time {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}

.reply-text {
  font-size: 13px;
  color: #333;
  margin: 0;
}

.reply-to {
  color: #4F46E5;
  font-weight: 500;
}

.reply-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.reply-action-btn {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.reply-action-btn:hover {
  color: #4F46E5;
}

.more-replies {
  margin-top: 12px;
}

.more-replies-btn {
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 0;
  color: #4F46E5;
  background-color: #EEF2FF;
  border: none;
  border-radius: 6px;
  transition: all 0.2s;
}

.more-replies-btn:hover {
  background-color: #E0E7FF;
}

/* 加载更多评论 */
.load-more-comments {
  margin-top: 16px;
}

.load-more-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 0;
  color: #4F46E5;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  transition: all 0.2s;
}

.load-more-btn:hover {
  background-color: #eee;
}
</style>