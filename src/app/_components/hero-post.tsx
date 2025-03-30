'use client';
import Avatar from '@/app/_components/avatar';
import { Post } from '@/interfaces/post';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
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
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: '50%', y: '50%', opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const textColor = coverImage.isDark ? 'text-white' : 'text-gray-900';
  const textColorMuted = coverImage.isDark ? 'text-gray-200' : 'text-gray-700';
  const backgroundMuted = coverImage.isDark ? 'bg-gray-400' : 'bg-gray-500';

  console.log(editorsChoice);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    );

    // Update glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({
      x: `${glareX}%`,
      y: `${glareY}%`,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    setGlare({ x: '50%', y: '50%', opacity: 0 });
  };

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ease-out',
          'mx-auto aspect-[3/4] w-full max-w-4xl shadow-xl',
          'group',
          className,
        )}
        style={{ transform, transformStyle: 'preserve-3d' }}
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
        <div className="absolute inset-x-0 bottom-0 flex h-full translate-y-[calc(100%-130px)] transform flex-col justify-end bg-gradient-to-t to-transparent p-6 transition-all duration-500 ease-in-out group-hover:translate-y-0">
          <h3
            className={cn(
              'text-4xl font-extrabold leading-tight lg:text-5xl',
              textColor,
            )}
          >
            <Link href={`/posts/${slug}`}>{title}</Link>
          </h3>
          <div className="flex flex-row gap-1">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slugify(tag, { lower: true })}`}
                className={cn(
                  'bg rounded-full px-2 text-sm font-semibold uppercase text-gray-500 transition-colors duration-200 hover:text-gray-900',
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
            className={cn('text-lg', textColorMuted)}
          />
          <div>
            <p
              className={cn(
                'mb-4 hidden text-lg leading-relaxed md:block',
                textColor,
              )}
            >
              {excerpt}
            </p>
            <Avatar
              name={author.name}
              picture={author.picture}
              className={cn(textColor)}
            />
          </div>
        </div>
      </div>
      {/* Editors Choice Badge */}
      {editorsChoice && <EditorsChoice />}
    </>
  );
}
