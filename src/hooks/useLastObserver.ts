// hooks/useInfiniteScroll.ts
import { useRef, useEffect } from 'react';

export const useLastObserver = (hasMore: boolean, loading: boolean, callback: () => void) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && hasMore && !loading) {
                    callback();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );

        if (lastProductRef.current) {
            observer.current.observe(lastProductRef.current);
        }

        return () => {
            if (observer.current && lastProductRef.current) {
                observer.current.unobserve(lastProductRef.current);
            }
        };
    }, [hasMore, loading, callback]);

    return { lastProductRef };
};
