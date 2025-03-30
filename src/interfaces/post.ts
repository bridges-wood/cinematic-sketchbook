import { type Author } from './author';

type PostMetadata = {
  slug: string;
  title: string;
  date: string;
  rating: number;
  tags: string[];
  editorsChoice: boolean;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};

type ComputedMetadata = {
  coverImage: {
    url: string;
    isDark: boolean;
  };
};

export type Post = PostMetadata & ComputedMetadata;
