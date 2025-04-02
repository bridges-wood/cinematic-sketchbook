import config from '@/tailwind';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useMediaQuery } from 'usehooks-ts';

export const breakpoints = resolveConfig(config).theme.screens;
export type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = <K extends Breakpoint>(breakpoint: K) => {
  if (!breakpoints) {
    throw new Error('No breakpoints found in theme');
  }

  const matches = useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
  return {
    [`is${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`]: matches,
  } as Record<`is${Capitalize<K>}`, boolean>;
};
