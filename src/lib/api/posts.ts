import { Post } from '@/interfaces/post';
import { getAverageColor } from 'fast-average-color-node';
import fs from 'fs';
import matter from 'gray-matter';
import { gcd } from 'mathjs';
import { join } from 'path';
import sharp from 'sharp';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const imageColorData = await getImageColorData(data.coverImage.url);

  return {
    ...data,
    coverImage: {
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

export async function getImageAspectRatio(
  path: string,
): Promise<{ aspectRatio: string }> {
  const qualifiedPath = join('public', path);
  const metadata = await sharp(qualifiedPath).metadata();
  const { width, height } = metadata;
  if (!width || !height)
    throw new Error(`Cannot calculate height or width of ${qualifiedPath}`);

  const { height: roundedHeight, width: roundedWidth } = approximateAspectRatio(
    width,
    height,
  );

  return { aspectRatio: `${roundedWidth}/${roundedHeight}` };
}

function approximateAspectRatio(
  width: number,
  height: number,
): { height: number; width: number } {
  const roundedWidth = Math.round(width / 10) * 10;
  const roundedHeight = Math.round(height / 10) * 10;
  const base = gcd(roundedWidth, roundedHeight);

  const simplifiedWidth = roundedWidth / base;
  const simplifiedHeight = roundedHeight / base;

  if (simplifiedHeight > 10 && simplifiedWidth > 10) {
    return approximateAspectRatio(simplifiedWidth, simplifiedHeight);
  }

  return { width: simplifiedWidth, height: simplifiedHeight };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
