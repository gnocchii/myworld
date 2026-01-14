import { useState, useEffect } from 'react';

function Dock({ currentPage, setCurrentPage }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={{
      position: currentPage === 'about' ? 'absolute' : 'fixed',
      top: '2rem',
      ...(isMobile ? {
        left: '50%',
        transform: 'translateX(-50%)',
      } : {
        right: '2rem',
      }),
      zIndex: 100,
      display: 'flex',
      gap: '2rem',
      fontFamily: "'Roboto Mono', monospace",
      fontWeight: 300,
      fontSize: isMobile? '0.85rem' : '1rem',
      color: '#272622',
    }}>
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('home');
        }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        home
      </a>
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('work');
        }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        work
      </a>
      <a
        href="#play"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('play');
        }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        play
      </a>
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('about');
        }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        about
      </a>
    </nav>
  );
}

export default Dock;