import { readable } from 'svelte/store';

function getCurrentWindowDimenstions() {
    if (typeof window === "object" && "innerWidth" in window && "innerHeight" in window) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    return {
        width: 0,
        height: 0
    };
}
export function useWindowSize() {
    const size = readable(getCurrentWindowDimenstions(), (set) => {
        function handler() {
            set(getCurrentWindowDimenstions());
        }

        if (typeof window === "object") {
            window.addEventListener('resize', handler);
            return () => {
                window.removeEventListener('resize', handler);
            };
        }
    });
    return size;
}
