import { Post } from '@/interfaces/post';
import { PostPreview } from './post-preview';

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <PostPreview {...post} />
        ))}
      </div>
    </section>
  );
}
