import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for pull-to-refresh functionality
 * @param {Function} onRefresh - Callback function to call when refresh is triggered
 * @param {number} threshold - Minimum distance to pull before refresh triggers (default: 80)
 * @returns {Object} Object with ref to attach to container and isRefreshing state
 */
export const usePullToRefresh = (onRefresh, threshold = 80) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isPulling = useRef(false);
  const pullDistance = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
        pullDistance.current = 0;
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling.current) return;

      currentY.current = e.touches[0].clientY;
      pullDistance.current = currentY.current - startY.current;

      if (pullDistance.current > 0 && window.scrollY === 0) {
        e.preventDefault();
        container.style.transform = `translateY(${Math.min(pullDistance.current, threshold)}px)`;
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling.current) return;

      isPulling.current = false;
      container.style.transform = '';

      if (pullDistance.current >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }

      pullDistance.current = 0;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, isRefreshing]);

  return { containerRef, isRefreshing };
};

