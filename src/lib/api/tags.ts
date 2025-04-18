import { Post } from '@/interfaces/post';
import { Tag } from '@/interfaces/tag';
import { head, isEmpty } from 'lodash';
import { slugify } from '../utils';
import { getAllPosts } from './posts';

/**
 * Retrieves a tag by its slug.
 *
 * @param slug - The slug of the tag to retrieve.
 * @description This function retrieves all posts, filters them by the given tag slug, and returns the first matching tag.
 * If no posts are found with the given tag slug, it rejects the promise with an error.
 * If a post is found with the given tag slug, it returns an object containing the tag title, slug, and the posts that have that tag.
 * @throws {Error} If no posts are found with the given tag slug or if the post does not have a matching tag.
 * @example
 * const tag = await getTagBySlug('example-tag');
 * console.log(tag); // { title: 'Example Tag', slug: 'example-tag', posts: [...] }
 * @returns A promise that resolves to an object containing the tag title, slug, and the posts that have that tag.
 */
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

/**
 * Retrieves all posts that have a specific tag slug.
 *
 * @param slug - The slug of the tag to retrieve.
 * @description This function retrieves all posts and filters them by the given tag slug.
 * It returns an array of posts that have the specified tag.
 * @returns A promise that resolves to an array of posts that have the specified tag.
 */
export async function getPostsByTagSlug(slug: string): Promise<Post[]> {
  const posts = await getAllPosts();

  return posts.filter((post) => post.tags.map(slugify).includes(slug));
}
