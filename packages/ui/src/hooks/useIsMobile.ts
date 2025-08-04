'use client';

import { useEffect, useState } from 'react';
import { tailwindCssBreakpoints } from '../breakpoints';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(`(max-width: ${tailwindCssBreakpoints.md - 1}px)`);

        const updateIsMobile = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        // Initial check
        updateIsMobile(mediaQuery);

        // Listen to changes
        mediaQuery.addEventListener('change', updateIsMobile);

        return () => mediaQuery.removeEventListener('change', updateIsMobile);
    }, []);

    return isMobile;
}
