import { getBlurDataUrl } from '@/lib/images';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Image, { ImageProps } from 'next/image';
import { JSX } from 'react';

const DEFAULT_COMPONENTS = {
  Image: async (props: any) => {
    return (
      <Image
        placeholder="blur"
        sizes="100vw"
        blurDataURL={await getBlurDataUrl(props.src)}
        style={{ width: '100%', height: `${props.height}px` }}
        {...(props as ImageProps)}
      />
    );
  },
};

export function CustomMDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...DEFAULT_COMPONENTS, ...(props.components || {}) }}
    />
  );
}
