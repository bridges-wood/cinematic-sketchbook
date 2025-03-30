import { Post } from './post';

export type Tag = {
  slug: string;
  title: string;
  posts: Post[];
};
