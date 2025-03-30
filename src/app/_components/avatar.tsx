import { Author } from '@/interfaces/author';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import slugify from 'slugify';

type AvatarProps = Author & {
  imageOnly?: boolean;
  className?: string;
};

const Avatar = ({ name, picture, imageOnly, className }: AvatarProps) => {
  return (
    <Link
      href={`/authors/${slugify(name, { lower: true })}`}
      className={cn('flex items-center', className)}
    >
      <img src={picture} className="mr-4 h-12 w-12 rounded-full" alt={name} />
      {imageOnly ? null : <div className="text-xl font-bold">{name}</div>}
    </Link>
  );
};

export default Avatar;
