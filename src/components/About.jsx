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
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'flex-start',
      justifyContent: 'center',
      padding: isMobile ? '3rem' : '2rem',
      maxWidth: '1100px',
      margin: '0 auto',
      gap: isMobile ? '-4rem' : '3rem',
      ...(isMobile && {
        height: '100vh',
        overflowY: 'scroll',
        paddingBottom: '4rem',
      }),
    }}>
      {/* Stacked Carousel */}
      <div style={{
        flexShrink: 0,
        paddingTop: isMobile ? '480px' : '13rem',
        marginLeft: isMobile ? '0' : '-10rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: isMobile ? 'scale(0.85)' : 'scale(1)',
      }}>
        <div style={{
          fontSize: '0.0001rem',
          marginLeft: isMobile ? '-14rem' : '3rem',
          marginBottom: isMobile ? '-0.6rem' : '0.5rem',
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
        maxWidth: isMobile ? '100%' : 'none',
        padding: isMobile ? '0 1rem' : '0',
      }}>
        <div style={{
          fontFamily: "'relationship of melodrame', serif",
          fontSize: isMobile ? '2rem' : '2.5rem',
          textAlign: isMobile ? 'center' : 'left',
          marginTop: isMobile ? '-5rem' : '13rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
        }}>
          welcome!
        </div>
        <div style={{
          fontSize: '0.8rem',
          lineHeight: '2',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          <p style={{ marginBottom: '2rem' }}>
            Hey! I'm Melody, a software engineer passionate about creating
            meaningful digital experiences at the intersection of creativity and technology.
            I believe in the power of design to tell stories and connect people.
          </p>

          <p style={{ marginBottom: '2rem' }}>
            I'm currently studying Computer Science at Purdue University with minors in Mathematics and Management! I'm interested in
            fullstack development (more frontend), AI research, and creative problem solving.
          </p>

          <p style={{ marginBottom: '2rem' }}>
            Outside of work you can find me milking my music taste, at the cinema, playing Celeste, skiing, sightreading Rachmaninoff, or destroying my digestive tracts with spicy snacks and kombucha!
          </p>
        </div>
      </div>
    </main>
  );
}
