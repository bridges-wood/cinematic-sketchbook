import { readFileSync } from 'fs';
import { join } from 'path';
import { getPlaiceholder } from 'plaiceholder';

export const getBlurDataUrl = async (imagePath: string) => {
  const imageFile = readFileSync(join('public', imagePath));

  const blurDataUrl = await getPlaiceholder(imageFile);
  return blurDataUrl.base64;
};
