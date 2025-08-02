'use client';

import { useEffect, useState } from 'react';
import { tailwindCssBreakpoints } from '../breakpoints';

// detect screen size
export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () =>
            setIsMobile(window.innerWidth < Number(tailwindCssBreakpoints.md));
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}
