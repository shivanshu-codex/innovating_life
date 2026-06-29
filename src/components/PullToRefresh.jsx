import { useRef, useEffect } from 'react';
import { initPullToRefresh } from '../js/gestures/pull-to-refresh';

export default function PullToRefresh({ onRefresh, children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const destroy = initPullToRefresh(containerRef.current, onRefresh);
    return destroy;
  }, [onRefresh]);

  return (
    <div ref={containerRef} className={`ptr-container ${className}`}>
      <div className="ptr-indicator" aria-hidden="true">
        <div className="ptr-spinner" />
      </div>
      <div className="ptr-label" aria-live="polite">Pull to refresh</div>
      {children}
    </div>
  );
}
