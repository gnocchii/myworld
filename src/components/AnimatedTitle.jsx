import { useState, useEffect } from 'react';

export default function AnimatedTitle() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/images/brat.png', '/images/aston-script.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 2);
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '400px',
      height: '120px',
      margin: '0 auto',
    }}>
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={index === 0 ? 'Brat' : 'Aston Script'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: currentImage === index ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      ))}
    </div>
  );
}
