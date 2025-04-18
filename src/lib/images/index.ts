import { Post } from '@/interfaces/post';
import { getAverageColor } from 'fast-average-color-node';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getPlaiceholder } from 'plaiceholder';

/**
 * Reads an image file and returns its base64 encoded blur data URL.
 * @param path - path to the image file
 * @returns A promise that resolves to the base64 encoded blur data URL of the image
 * @example
 * const blurDataUrl = await getBlurDataUrl('/path/to/image.jpg');
 * // console.log(blurDataUrl); // data:image/jpeg;base64,...
 * @see {@link https://plaiceholder.co/}
 */
export const getBlurDataUrl = async (path: string) => {
  const imageFile = readFileSync(resolveImageFilePath(path));

  const blurDataUrl = await getPlaiceholder(imageFile);
  return blurDataUrl.base64;
};

/**
 * Retrieves the average color of an image file.
 * @param path - path to the image file
 * @description This function uses the `fast-average-color-node` library to get the average color of an image.
 * @returns An object containing the average color of the image in hex format and a boolean indicating if the color is dark.
 * @example
 * const colorData = await getImageColorData('/path/to/image.jpg');
 * // console.log(colorData); // { isDark: true, dominantColor: '#000000' }
 * @see {@link https://github.com/fast-average-color/fast-average-color/}
 */
export async function getImageColorData(
  path: string,
): Promise<Pick<Post['coverImage'], 'isDark' | 'dominantColor'>> {
  const averageColorResult = await getAverageColor(resolveImageFilePath(path));
  return { ...averageColorResult, dominantColor: averageColorResult.hex };
}

function resolveImageFilePath(path: string): string {
  return join('public', path);
}
