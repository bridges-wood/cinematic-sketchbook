'use client';
import { useGlare } from '@/hooks/useGlare';
import { Post } from '@/interfaces/post';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import slugify from 'slugify';
import { EditorsChoice } from './editors-choice';
import StarRating from './star-rating';

type HeroPostProps = Post & { className?: string };

export function HeroPost({
  title,
  coverImage,
  tags,
  excerpt,
  author,
  rating,
  slug,
  editorsChoice,
  className,
}: HeroPostProps) {
  const router = useRouter();

  const cardRef = useRef<HTMLDivElement>(null);
  const { transform, glare, handleMouseMove, handleMouseLeave } =
    useGlare(cardRef);
  const textColor = coverImage.isDark ? 'text-white' : 'text-gray-900';
  const textColorMuted = coverImage.isDark
    ? 'text-gray-200 hover:text-gray-900'
    : 'text-gray-700 hover:text-white';
  const backgroundMuted = coverImage.isDark
    ? 'border-gray-200 border-2 hover:bg-gray-200'
    : 'border-gray-700 border-2 hover:bg-gray-700';

  const widthRatio = Number(coverImage.aspectRatio.split('/')[0]);
  const heightRatio = Number(coverImage.aspectRatio.split('/')[1]);

  console.log(coverImage.dominantColor);

  const calculateDisplayableTags = (tags: string[]) => {
    const maxLength = 15;
    const tagsToDisplay = tags.reduce((acc, tag) => {
      const tagLength = tag.length;
      if (acc.length + tagLength <= maxLength) {
        acc.push(tag);
      }
      return acc;
    }, [] as string[]);

    return tagsToDisplay;
  };

  console.log(coverImage.aspectRatio);
  console.log(
    cn(
      'relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ease-out',
      'mx-auto w-full max-w-4xl shadow-xl',
      `aspect-[${coverImage.aspectRatio}]`,
      'group',
      className,
    ),
  );

  return (
    <div
      className={cn(
        'relative w-[300px] sm:w-[400px] lg:w-[450px]',
        `h-[${(300 / widthRatio) * heightRatio}px] sm:h-[${(400 / widthRatio) * heightRatio}px] lg:h-[${(450 / widthRatio) * heightRatio}px]`,
      )}
    >
      <div
        ref={cardRef}
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ease-out',
          'mx-auto w-full max-w-4xl shadow-xl',
          'group',
          className,
        )}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          aspectRatio: coverImage.aspectRatio,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cover background */}
        <Link
          href={`/posts/${slug}`}
          className="absolute inset-0 h-full w-full transition-all duration-500 group-hover:blur-md"
        >
          <Image
            src={coverImage.url}
            alt={`Cover Image for ${title}`}
            fill
            className="object-cover"
            priority
            sizes="(min-width:640px) 450px, (min-width:1024px) 450px, 300px"
          />
        </Link>

        {/* Glare */}
        <div
          className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x} ${glare.y}, rgba(255,255,255,${glare.opacity}), transparent 50%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Content */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 flex h-full translate-y-[calc(200%)] transform flex-col justify-end p-6 transition-all duration-500 ease-in-out group-hover:translate-y-0',
          )}
        >
          <h3
            className={cn(
              'text-balance text-3xl font-bold leading-tight lg:text-4xl',
              textColor,
            )}
          >
            <Link
              href={`/posts/${slug}`}
              className="after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:content-['']"
            >
              {title}
            </Link>
          </h3>
          <div className="my-2 flex flex-row gap-1">
            {calculateDisplayableTags(tags).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slugify(tag, { lower: true })}`}
                className={cn(
                  'bg z-10 rounded-full px-2 text-xs font-normal uppercase transition-colors duration-200',
                  textColorMuted,
                  backgroundMuted,
                )}
              >
                {tag}
              </Link>
            ))}
          </div>
          <StarRating
            rating={rating}
            className={cn(
              'text-md',
              coverImage.isDark ? 'text-gray-200' : 'text-gray-700',
            )}
          />
          <div>
            <p
              className={cn(
                'text-md mb-2 hidden leading-relaxed md:block',
                textColor,
              )}
            >
              {excerpt}
            </p>
          </div>
        </div>
      </div>
      {/* Editors Choice Badge */}
      {editorsChoice && <EditorsChoice />}
    </div>
  );
}
