import { Post } from '@/interfaces/post';
import { slugify } from '@/lib/utils';
import Link from 'next/link';
import CoverImage from './cover-image';
import DateFormatter from './date-formatter';
import { EditorsChoice } from './editors-choice';
import StarRating from './star-rating';

type Props = Post;

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  editorsChoice,
  rating,
  slug,
}: Props) {
  console.log(editorsChoice);
  return (
    <div className="relative">
      <div className="mb-5">
        <CoverImage slug={slug} title={title} image={coverImage} />
      </div>
      <h3 className="flex flex-row items-center gap-2 text-2xl font-bold leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <StarRating
        rating={rating}
        className="text-md relative mb-2 items-baseline"
      />
      <span
        id="byline"
        className="text-md flex w-full flex-row items-baseline leading-tight text-gray-500"
      >
        By&nbsp;
        <Link
          href={`/authors/${slugify(author.name)}`}
          className="mb-2 flex items-center gap-2"
        >
          {author.name}
        </Link>
        <DateFormatter dateString={date} className="ml-auto mr-2" />
      </span>

      <p className="text-md mb-4 leading-relaxed">{excerpt}</p>
      {/* Editor's choice badge */}
      {editorsChoice && <EditorsChoice />}
    </div>
  );
}
