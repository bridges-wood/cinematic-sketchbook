import { Post } from '@/interfaces/post';
import { Tag } from '@/interfaces/tag';
import { head, isEmpty } from 'lodash';
import { slugify } from '../utils';
import { getAllPosts } from './posts';

export async function getTagBySlug(slug: string): Promise<Tag> {
  const posts = await getPostsByTagSlug(slug);
  if (isEmpty(posts))
    return Promise.reject(new Error('No posts have tag that matches slug'));

  const tag = head(posts)?.tags.find((tag) => slugify(tag) === slug);
  if (!tag) throw new Error(`Illegal State: Post must have matching tag`);

  return {
    title: tag,
    slug,
    posts,
  };
}

export async function getPostsByTagSlug(slug: string): Promise<Post[]> {
  const posts = await getAllPosts();

  return posts.filter((post) => post.tags.map(slugify).includes(slug));
}
