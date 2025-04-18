import { Post } from '@/interfaces/post';
import { getAverageColor } from 'fast-average-color-node';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { getBlurDataUrl } from '../images';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const imageColorData = await getImageColorData(data.coverImage.url);

  return {
    ...data,
    coverImage: {
      blurDataURL: await getBlurDataUrl(data.coverImage.url),
      ...data.coverImage,
      ...imageColorData,
    },
    slug: realSlug,
    content,
  } as Post;
}

export async function getImageColorData(
  path: string,
): Promise<Pick<Post['coverImage'], 'isDark' | 'dominantColor'>> {
  const qualifiedPath = join('public', path);

  const averageColorResult = await getAverageColor(qualifiedPath);
  return { ...averageColorResult, dominantColor: averageColorResult.hex };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
