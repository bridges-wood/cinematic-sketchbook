import { type Author } from './author';

type PostMetadata = {
  slug: string;
  title: string;
  date: string;
  rating: number;
  tags: string[];
  editorsChoice: boolean;
  featured: boolean;
  coverImage: {
    url: string;
    blurDataURL: string;
    aspectRatio: string;
  };
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: any;
  preview?: boolean;
};

type ComputedMetadata = {
  coverImage: {
    isDark: boolean;
    dominantColor: string;
  };
};

export type Post = PostMetadata & ComputedMetadata;
