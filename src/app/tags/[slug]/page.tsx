import Container from '@/app/_components/container';
import { PostPreview } from '@/app/_components/post-preview';
import { getTagBySlug } from '@/lib/api/tags';
import { uniq } from 'lodash';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Tag(props: Params) {
  const params = await props.params;
  const tag = await getTagBySlug(params.slug);

  if (!tag) return notFound();

  return (
    <Container>
      <section className="w-full max-w-5xl pt-12 md:pt-24 lg:pt-32">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {tag.title}
        </h1>
        <small className="pl-2 text-sm">
          <span>{tag.posts.length} post(s)</span>
          &nbsp;/&nbsp;
          <span>
            {uniq(tag.posts.map((post) => post.author)).length} author(s)
          </span>
        </small>
      </section>
      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {tag.posts.map((post, idx) => (
          <PostPreview key={idx} {...post} />
        ))}
      </main>
    </Container>
  );
}
