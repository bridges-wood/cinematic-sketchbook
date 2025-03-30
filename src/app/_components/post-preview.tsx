import { Post } from '@/interfaces/post';
import Link from 'next/link';
import Avatar from './avatar';
import CoverImage from './cover-image';
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
        <CoverImage slug={slug} title={title} src={coverImage.url} />
      </div>
      <h3 className="mb-3 flex flex-row items-center text-2xl font-bold leading-snug">
        <Avatar name={author.name} picture={author.picture} imageOnly />
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <StarRating rating={rating} className="text-md mb-2" />
      {/* <div className="mb-4 text-lg text-gray-500">
        <DateFormatter dateString={date} />
      </div> */}
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      {/* Editor's choice badge */}
      {editorsChoice && <EditorsChoice />}
    </div>
  );
}
