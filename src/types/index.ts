/* types/index.ts */
export interface Author {
    id: string;
    name: string;
    avatar: string;
}

export interface Tag {
    id: string;
    name: string;
    color?: string;
    count?: number;
}

export interface Category {
    id: string;
    name: string;
    active?: boolean;
}

export interface GalleryImage {
    id: string;
    src: string;
    title: string;
    description?: string;
    author: Author;
    tags: Tag[];
    categoryId: string;
    liked: boolean;
    likes: number;
    views: number;
    downloads: number;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
    bio?: string;
    role: 'user' | 'admin';
    createdAt: string;
}