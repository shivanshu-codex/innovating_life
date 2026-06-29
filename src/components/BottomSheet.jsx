import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { haptic } from '../js/ux/haptics';

export default function BottomSheet({ isOpen, onClose, title, children }) {
  const sheetRef = useRef(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const draggingRef = useRef(false);

  // Close on backdrop click
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      haptic('light');
      onClose();
    }
  }

  // Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Drag-to-dismiss on the handle
  function onHandleTouchStart(e) {
    startYRef.current = e.touches[0].clientY;
    draggingRef.current = true;
    if (sheetRef.current) sheetRef.current.style.transition = 'none';
  }

  function onHandleTouchMove(e) {
    if (!draggingRef.current) return;
    const dy = e.touches[0].clientY - startYRef.current;
    currentYRef.current = dy;
    if (dy > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${dy}px)`;
    }
  }

  function onHandleTouchEnd() {
    draggingRef.current = false;
    if (sheetRef.current) sheetRef.current.style.transition = '';

    if (currentYRef.current > 100) {
      haptic('light');
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
    currentYRef.current = 0;
  }

  return (
    <>
      <div
        className={`sheet-backdrop${isOpen ? ' is-open' : ''}`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        className={`bottom-sheet${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className="sheet-handle"
          onTouchStart={onHandleTouchStart}
          onTouchMove={onHandleTouchMove}
          onTouchEnd={onHandleTouchEnd}
          role="presentation"
        />
        {title && (
          <div className="sheet-header">
            <span className="sheet-title">{title}</span>
            <button
              className="sheet-close"
              onClick={() => { haptic('light'); onClose(); }}
              aria-label="Close"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}
        <div className="sheet-body">
          {children}
        </div>
      </div>
    </>
  );
}
