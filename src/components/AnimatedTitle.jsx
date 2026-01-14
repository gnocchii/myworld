import { useState, useEffect } from 'react';
import { useAudio } from './AudioContext';

export default function AnimatedTitle() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Start false for SSR safety
  const { status } = useAudio();
  const images = ['/images/rom.png', '/images/kunanyi.PNG', '/images/brat.png', '/images/pencil.png'];

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
  const isKun = currentImageSrc === '/images/kunanyi.PNG';

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: isMobile ? '29%' : '34%',
      width: isMobile ? '250px' : '325px',
      height: isMobile ? 'auto' : '120px',
      margin: '0 auto',
      zIndex: 60,
      pointerEvents: 'none',
      transform: isPaper
        ? `translate(-50%, -50%) scale(${isMobile ? 1 : 1.3})`
        : 'translate(-50%, -50%)',
      transition: 'top 0.3s ease',
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