import { useState, useRef } from 'react';

export default function StackedCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const CARD_WIDTH = 280;
  const CARD_HEIGHT = 340;
  const PEEK_AMOUNT = 12;

  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentX - dragStartX.current;

    // Rubber band at boundaries
    if ((currentIndex === 0 && diff > 0) || (currentIndex === images.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = CARD_WIDTH * 0.2;

    if (dragOffset < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setDragOffset(0);
  };

  const getCardStyle = (index) => {
    const actualRelative = index - currentIndex;
    let translateX = 0;
    let zIndex = 0;
    let opacity = 1;

    if (actualRelative === 0) {
      // Current card follows drag
      translateX = dragOffset;
      zIndex = 100;
    } else if (actualRelative === 1 && dragOffset < 0) {
      // Next card coming in from right as we drag left
      const progress = Math.abs(dragOffset) / CARD_WIDTH;
      const startPos = PEEK_AMOUNT;
      const endPos = 0;
      translateX = startPos + (endPos - startPos) * progress;
      zIndex = 99;
    } else if (actualRelative === -1 && dragOffset > 0) {
      // Previous card coming in from left as we drag right
      const progress = dragOffset / CARD_WIDTH;
      const startPos = -PEEK_AMOUNT;
      const endPos = 0;
      translateX = startPos + (endPos - startPos) * progress;
      zIndex = 99;
    } else if (actualRelative > 0) {
      // Other cards on the right
      const shift = Math.min(0, dragOffset / CARD_WIDTH);
      translateX = (actualRelative + shift) * PEEK_AMOUNT;
      if (translateX < PEEK_AMOUNT * 0.3) translateX = PEEK_AMOUNT * 0.3;
      zIndex = 50 - actualRelative;
      opacity = actualRelative <= 4 ? 1 : 0;
    } else if (actualRelative < 0) {
      // Other cards on the left
      const shift = Math.max(0, dragOffset / CARD_WIDTH);
      translateX = (actualRelative + shift) * PEEK_AMOUNT;
      if (translateX > -PEEK_AMOUNT * 0.3) translateX = -PEEK_AMOUNT * 0.3;
      zIndex = 50 + actualRelative;
      opacity = actualRelative >= -4 ? 1 : 0;
    }

    return {
      transform: `translateX(${translateX}px)`,
      zIndex,
      opacity,
    };
  };

  const sortedIndices = [...Array(images.length).keys()].sort((a, b) => {
    return getCardStyle(a).zIndex - getCardStyle(b).zIndex;
  });

  return (
    <div
      style={{
        position: 'relative',
        width: CARD_WIDTH + 100,
        height: CARD_HEIGHT + 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {sortedIndices.map((index) => {
        const image = images[index];
        const style = getCardStyle(index);

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              ...style,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              draggable="false"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
