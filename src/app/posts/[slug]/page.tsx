import Container from '@/app/_components/container';
import { CustomMDX } from '@/app/_components/mdx';
import { PostBody } from '@/app/_components/post-body';
import { PostHeader } from '@/app/_components/post-header';
import { getAllPosts, getPostBySlug } from '@/lib/api/posts';
import { CMS_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post(props: Params) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <article className="my-16 md:my-32">
          <PostHeader {...post} />
          <PostBody>
            <CustomMDX source={post.content} />
          </PostBody>
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;
