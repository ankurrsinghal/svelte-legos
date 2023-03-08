import { writableToReadable } from '$lib/shared';
import { writable } from 'svelte/store';
import { useEventListener } from '$lib';

export function useHover<T extends HTMLElement = HTMLElement>(ref: T | undefined | null) {
	const store = writable(false);

  const handleMouseEnter = () => store.set(true);
  const handleMouseLeave = () => store.set(false);

  if (ref && ref !== null) {
    useEventListener('mouseenter', handleMouseEnter, ref);
    useEventListener('mouseleave', handleMouseLeave, ref);
  }

  return writableToReadable(store);
}
