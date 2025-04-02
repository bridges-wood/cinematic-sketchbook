import { Author } from '@/interfaces/author';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import shimmer from './shimmer';

type AvatarProps = Author & {
  imageOnly?: boolean;
  className?: string;
};

const Avatar = ({ name, picture, imageOnly, className }: AvatarProps) => {
  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return (
    <Link
      href={`/authors/${slugify(name, { lower: true })}`}
      className={cn('flex items-center', className)}
    >
      <Image
        src={picture}
        className={cn(
          'aspect-square h-12 w-12 rounded-full',
          !imageOnly && 'mr-4',
        )}
        alt={name}
        width={48}
        height={48}
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(48, 48))}`}
      />
      {imageOnly ? null : <div className="text-xl font-bold">{name}</div>}
    </Link>
  );
};

export default Avatar;
