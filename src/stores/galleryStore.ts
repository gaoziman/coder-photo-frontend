/* stores/galleryStore.ts */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GalleryImage, Category, Tag } from '@/types';

export const useGalleryStore = defineStore('gallery', () => {
    // 图片数据
    const images = ref<GalleryImage[]>([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const totalPages = ref(1);

    // 分类
    const categories = ref<Category[]>([]);
    const activeCategoryId = ref<string | null>(null);

    // 标签
    const tags = ref<Tag[]>([]);
    const activeTagIds = ref<string[]>([]);

    // 排序方式
    const sortOption = ref('newest');

    // 搜索关键词
    const searchKeyword = ref('');

    // 获取筛选后的图片
    const filteredImages = computed(() => {
        let result = [...images.value];

        // 根据分类筛选
        if (activeCategoryId.value) {
            result = result.filter(image =>
                image.categoryId === activeCategoryId.value
            );
        }

        // 根据标签筛选
        if (activeTagIds.value.length > 0) {
            result = result.filter(image =>
                image.tags.some(tag => activeTagIds.value.includes(tag.id))
            );
        }

        // 根据搜索词筛选
        if (searchKeyword.value) {
            const keyword = searchKeyword.value.toLowerCase();
            result = result.filter(image =>
                image.title.toLowerCase().includes(keyword) ||
                image.author.name.toLowerCase().includes(keyword) ||
                image.tags.some(tag => tag.name.toLowerCase().includes(keyword))
            );
        }

        // 排序
        result.sort((a, b) => {
            if (sortOption.value === 'newest') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortOption.value === 'oldest') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (sortOption.value === 'popular') {
                return b.likes - a.likes;
            }
            return 0;
        });

        return result;
    });

    // 加载图片数据
    const fetchImages = async () => {
        loading.value = true;
        try {
            // 这里将来会接入实际的 API 请求
            // 模拟 API 请求延迟
            await new Promise(resolve => setTimeout(resolve, 500));

            // 模拟数据
            images.value = [
                // ... 这里会有实际的图片数据
            ];

            totalPages.value = 5; // 模拟总页数
        } catch (error) {
            console.error('Failed to fetch images', error);
        } finally {
            loading.value = false;
        }
    };

    // 加载更多图片
    const loadMoreImages = async () => {
        if (loading.value || currentPage.value >= totalPages.value) return;

        currentPage.value += 1;
        await fetchImages();
    };

    // 切换图片喜欢状态
    const toggleLike = (imageId: string) => {
        const image = images.value.find(img => img.id === imageId);
        if (image) {
            image.liked = !image.liked;
            image.likes += image.liked ? 1 : -1;

            // 这里将来会发送 API 请求来更新服务器数据
        }
    };

    // 设置活动分类
    const setActiveCategory = (categoryId: string | null) => {
        activeCategoryId.value = categoryId;
    };

    // 设置活动标签
    const toggleActiveTag = (tagId: string) => {
        const index = activeTagIds.value.indexOf(tagId);
        if (index > -1) {
            activeTagIds.value.splice(index, 1);
        } else {
            activeTagIds.value.push(tagId);
        }
    };

    // 设置排序方式
    const setSortOption = (option: string) => {
        sortOption.value = option;
    };

    // 设置搜索关键词
    const setSearchKeyword = (keyword: string) => {
        searchKeyword.value = keyword;
    };

    return {
        images,
        loading,
        currentPage,
        totalPages,
        categories,
        activeCategoryId,
        tags,
        activeTagIds,
        sortOption,
        searchKeyword,
        filteredImages,
        fetchImages,
        loadMoreImages,
        toggleLike,
        setActiveCategory,
        toggleActiveTag,
        setSortOption,
        setSearchKeyword
    };
});