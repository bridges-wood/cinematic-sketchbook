'use client';
import Avatar from '@/app/_components/avatar';
import { type Author } from '@/interfaces/author';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import DateFormatter from './date-formatter';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  className?: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  className,
}: Props) {
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: '50%', y: '50%', opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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
    <Link href={`/posts/${slug}`}>
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
        <div className="absolute inset-0 h-full w-full transition-all duration-500 group-hover:blur-sm">
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            fill
            className="object-cover"
            priority
          />
        </div>

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
          <h3 className="mb-4 text-4xl leading-tight lg:text-5xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <DateFormatter dateString={date} />
          </div>
          <div>
            <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
      </div>
    </Link>
  );
}
