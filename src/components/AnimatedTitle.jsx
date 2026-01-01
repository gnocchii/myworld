import { useState, useEffect } from 'react';

export default function AnimatedTitle() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/images/rom.png', '/images/aston-script.png', '/images/arial.png', '/images/paper.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 4);
    }, 2000); // Switch every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Check if current image is paper.png
  const currentImageSrc = images[currentImage];
  const isPaper = currentImageSrc === '/images/paper.png';

  return (
    <div style={{
      position: 'relative',
      width: '400px',
      height: '120px',
      margin: '0 auto',
    }}>
      <img
        key={currentImageSrc}
        src={currentImageSrc}
        alt="Melody Yang"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: isPaper ? 'scale(1.5) translateY(-30px)' : 'scale(1)',
        }}
      />
    </div>
  );
}
