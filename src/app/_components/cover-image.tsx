'use client';
import { Post } from '@/interfaces/post';
import cn from 'classnames';
import NextImage from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  image: Post['coverImage'];
  slug?: string;
};

const CoverImage = ({ title, image, slug }: Props) => {
  const innerImage = (
    <NextImage
      src={image.url}
      alt={`Cover Image for ${title}`}
      className={cn('object-cover shadow-sm', {
        'transition-shadow duration-200 hover:shadow-lg': slug,
      })}
      fill
      priority
      sizes="(max-width: 640px) 300px, (min-width: 640px) 450px, (min-width: 768px) 600px, (min-width: 1024px) 900px, (min-width: 1280px) 100vw"
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      suppressHydrationWarning={true}
      onLoad={(e) => {
        // On larger screens, load the full resolution image
        if (e.currentTarget.width >= 900) {
          e.currentTarget.src = image.url;
          e.currentTarget.srcset = image.url;
        }
      }}
    />
  );

  return (
    <div
      className={cn(
        'relative mx-auto w-[300px] sm:w-[450px] md:w-[600px] lg:w-[900px] xl:w-[1200px]',
        ``,
      )}
      style={{
        aspectRatio: image.aspectRatio,
      }}
    >
      {slug ? (
        <Link
          href={`/posts/${slug}`}
          aria-label={title}
          className="h-full w-full"
        >
          {innerImage}
        </Link>
      ) : (
        innerImage
      )}
    </div>
  );
};

export default CoverImage;
