import { useState, useEffect } from 'react';
import { useAudio } from './AudioContext';

export default function AnimatedTitle() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Start false for SSR safety
  const { status } = useAudio();
  const images = ['/images/rom.png', '/images/aston-script.png', '/images/arial.png', '/images/paper.png'];

  useEffect(() => {
    // Set initial state and handle resize
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    
    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (status === 'playing') {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % 4);
      }, 2000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [status]);

  const currentImageSrc = images[currentImage];
  const isPaper = currentImageSrc === '/images/paper.png';

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: isMobile ? '22%' : '40%',
      width: isMobile ? '200px' : '400px',
      height: isMobile ? 'auto' : '120px',
      margin: '0 auto',
      zIndex: 60,
      pointerEvents: 'none',
      transform: isPaper
        ? `translate(-50%, -50%) scale(${isMobile ? 1.2 : 1.5})`
        : 'translate(-50%, -50%) scale(1)',
      transition: 'top 0.3s ease, transform 0.3s ease',
    }}>
      <img
        key={currentImageSrc}
        src={currentImageSrc}
        alt="Melody Yang"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}