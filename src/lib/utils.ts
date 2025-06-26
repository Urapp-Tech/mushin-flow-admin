import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  const customTwMerge = extendTailwindMerge({
    prefix: 'tw',
  });
  return customTwMerge(clsx(inputs));
}
