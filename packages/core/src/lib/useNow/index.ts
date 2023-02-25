import { writable } from 'svelte/store';

export interface UseCounterOptions {
	min?: number;
	max?: number;
}

export function useNow(initialValue = 0, options: UseCounterOptions = {}) {
	
}
