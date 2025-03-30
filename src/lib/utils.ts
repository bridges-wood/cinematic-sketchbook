import { clsx, type ClassValue } from 'clsx';
import baseSlugify from 'slugify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string) {
  return baseSlugify(input, {
    lower: true,
  });
}
