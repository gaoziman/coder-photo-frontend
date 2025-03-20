// utils/imageUtils.ts

/**
 * 图片详情接口定义
 */
export interface ImageDetail {
    id: number;
    filename: string;
    src: string;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
        status: string;
    };
    category: string;
    tags: Array<{
        name: string;
        color: string;
    }>;
    format: string;
    width: number;
    height: number;
    aspectRatio: string;
    fileSize: string;
    views: number;
    uploadDate: string;
    liked: boolean;
    starred: boolean;
}

/**
 * 评论接口定义
 */
export interface Comment {
    id: number;
    author: {
        name: string;
        avatar: string;
        tag?: string;
    };
    content: string;
    time: string;
    likes: number;
    liked: boolean;
    showReplyInput: boolean;
    replyText: string;
    replies: Reply[];
    hasMoreReplies: boolean;
    hiddenRepliesCount: number;
}

/**
 * 回复接口定义
 */
export interface Reply {
    id: number;
    author: {
        name: string;
        avatar: string;
        tag?: string;
    };
    content: string;
    replyTo?: string;
    time: string;
    likes: number;
    liked: boolean;
    showReplyInput: boolean;
    nestedReplyText?: string;
}

/**
 * 获取图片详情
 * @param id 图片ID
 * @returns 图片详情数据
 */
export const getImageDetail = (id: string | number): Promise<ImageDetail> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Number(id),
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
        }, 300);
    });
};

/**
 * 获取图片评论
 * @param imageId 图片ID
 * @returns 评论数据列表
 */
export const getImageComments = (imageId: string | number): Promise<Comment[]> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
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
        }, 300);
    });
};

/**
 * 获取相似图片
 * @param imageId 图片ID
 * @returns 相似图片列表
 */
export const getSimilarImages = (imageId: string | number): Promise<any[]> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
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
        }, 300);
    });
};

/**
 * 获取图片配色方案
 * @param imageId 图片ID
 * @returns 配色方案列表
 */
export const getImageColors = (imageId: string | number): Promise<any[]> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: '主色调', value: '#667eea' },
                { name: '次要色调', value: '#764ba2' },
                { name: '强调色', value: '#4F46E5' },
                { name: '辅助色1', value: '#9F7AEA' },
                { name: '辅助色2', value: '#ED64A6' }
            ]);
        }, 300);
    });
};

/**
 * 添加评论
 * @param imageId 图片ID
 * @param content 评论内容
 * @returns 添加的评论对象
 */
export const addImageComment = (imageId: string | number, content: string): Promise<Comment> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Date.now(),
                author: {
                    name: '当前用户',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                },
                content,
                time: '刚刚',
                likes: 0,
                liked: false,
                showReplyInput: false,
                replyText: '',
                replies: [],
                hasMoreReplies: false,
                hiddenRepliesCount: 0
            });
        }, 300);
    });
};

/**
 * 添加回复
 * @param commentId 评论ID
 * @param content 回复内容
 * @param replyTo 回复的用户名
 * @returns 添加的回复对象
 */
export const addCommentReply = (commentId: number, content: string, replyTo: string): Promise<Reply> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Date.now(),
                author: {
                    name: '当前用户',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                },
                content,
                replyTo,
                time: '刚刚',
                likes: 0,
                liked: false,
                showReplyInput: false
            });
        }, 300);
    });
};

/**
 * 点赞图片
 * @param imageId 图片ID
 * @param status 点赞状态
 * @returns 操作结果
 */
export const likeImage = (imageId: string | number, status: boolean): Promise<{ success: boolean }> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 300);
    });
};

/**
 * 收藏图片
 * @param imageId 图片ID
 * @param status 收藏状态
 * @returns 操作结果
 */
export const favoriteImage = (imageId: string | number, status: boolean): Promise<{ success: boolean }> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 300);
    });
};

/**
 * 下载图片
 * @param imageId 图片ID
 * @returns 下载链接
 */
export const downloadImage = (imageId: string | number): Promise<{ url: string }> => {
    // 模拟API请求，实际项目中应该调用真实的API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=3000&q=100'
            });
        }, 300);
    });
};