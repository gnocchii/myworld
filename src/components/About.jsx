import { useState, useEffect } from 'react';
import StackedCarousel from './StackedCarousel';
import PhotoLabel from './PhotoLabel';

export default function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const carouselImages = [
    { src: '/images/about/image2.jpeg', alt: 'Photo 1' },
    { src: '/images/about/image1.jpeg', alt: 'Photo 2' },
    { src: '/images/about/photo4.jpeg', alt: 'Photo 3' },
    { src: '/images/about/image3.jpeg', alt: 'Photo 4' },
    { src: '/images/about/photo5.jpeg', alt: 'Photo 5' },
  ];

  return (
    <main className="content" style={{
      position: 'relative',
      top: 'auto',
      left: 'auto',
      transform: 'none',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'center',
      justifyContent: 'center',
      padding: '4rem 2rem 2rem 2rem',
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      gap: isMobile ? '2rem' : '3rem',
      transition: 'padding 0.3s ease',
      minHeight: '100vh',
      boxSizing: 'border-box',
    }}>
      {/* Stacked Carousel */}
      <div style={{
        flexShrink: 0,
        paddingTop: isMobile ? '0' : '0',
        marginLeft: isMobile ? '0' : '0',
        transform: isMobile ? 'scale(0.8)' : 'scale(1)',
        width: isMobile ? '100%' : 'auto',
        maxWidth: isMobile ? '100%' : '400px',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          position: 'absolute',
          top: isMobile ? '-0.3rem': '-0.3rem',
          left: '3.1rem',
          zIndex: 100,
        }}>
          <PhotoLabel count={5} />
        </div>
        <StackedCarousel images={carouselImages} />
      </div>

      {/* Text Content */}
      <div style={{
        fontFamily: "'Relationship of Melodrame', monospace",
        color: '#272622',
        flex: 1,
        width: isMobile ? '100%' : 'auto',
        maxWidth: isMobile ? '100%' : '600px',
        padding: '0',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          fontFamily: "'relationship of melodrame', serif",
          fontSize: isMobile ? '2rem' : '2.5rem',
          textAlign: isMobile ? 'center' : 'left',
          marginTop: '0',
          marginBottom: isMobile ? '1.5rem' : '1rem',
          transition: 'all 0.3s ease',
        }}>
          Welcome!
        </div>
        <div style={{
          fontSize: '0.8rem',
          lineHeight: '2',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          <p style={{ marginBottom: '2rem' }}>
            Hey! I'm Melody, so excited you're here! I'm a programmer passionate about creating
            meaningful digital experiences at the intersection of creativity and technology.
            I believe in the power of thoughtful design.
          </p>

          <p style={{ marginBottom: '2rem' }}>
            I'm currently studying Computer Science at Purdue University with minors in Mathematics and Management! I'm interested in
            fullstack development (more frontend), AI research, and creative problem solving.
          </p>

          <p style={{ marginBottom: '2rem' }}>
            Outside of work you can find me milking my music taste, at the cinema, skiing, sightreading Rachmaninoff, or destroying my digestive tracts with spicy snacks and kombucha!
          </p>
        </div>

        {/* Footer */}
        {isMobile && (
          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#888',
            fontFamily: "'Roboto Mono', monospace",
          }}>
            made with &lt;3
          </div>
        )}
      </div>
    </main>
  );
}
