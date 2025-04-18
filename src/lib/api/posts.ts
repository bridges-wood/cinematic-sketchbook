import { Post } from '@/interfaces/post';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { getBlurDataUrl, getImageColorData } from '../images';

/**
 * Directory where posts are stored.
 * @constant
 */
const POSTS_DIRECTORY = join(process.cwd(), '_posts');

/**
 * Retrieves the metadata and content of a post by its slug.
 * @param slug - The slug of the post to retrieve.
 * @description This function reads the post file, parses the front matter using `gray-matter`, and returns the post metadata and content.
 * @returns A promise that resolves to an object containing the post metadata and content.
 */
export async function getPostBySlug(slug: string) {
  const { data, content } = matter(getPostFile(slug));

  const imageColorData = await getImageColorData(data.coverImage.url);

  return {
    ...data,
    coverImage: {
      blurDataURL: await getBlurDataUrl(data.coverImage.url),
      ...data.coverImage,
      ...imageColorData,
    },
    slug: removeExtension(slug),
    content,
  } as Post;
}

/**
 * Retrieves all posts.
 * @description This function retrieves all post slugs, fetches the metadata and content for each post, and sorts them by date in descending order.
 * @returns A promise that resolves to an array of objects containing the metadata and content of all posts.
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

function getPostSlugs() {
  return fs.readdirSync(POSTS_DIRECTORY);
}

function removeExtension(filename: string) {
  return filename.replace(/\.mdx$/, '');
}

function getPostFile(slug: string) {
  const realSlug = removeExtension(slug);
  const fullPath = join(POSTS_DIRECTORY, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return fileContents;
}
