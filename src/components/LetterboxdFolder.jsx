import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function LetterboxdFolder({ startX, startY, rotation = 5 }) {
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef(null);

  const items = [
    {
      text: "It's Such A Beautiful Day",
      image: "/images/letterboxd/isabd.webp",
      url: "https://www.imdb.com/title/tt2396224/?ref_=ttcrv_ov_i",
    },
    {
      text: "Farewell My Concubine",
      image: "/images/letterboxd/fmc.webp",
      url: "https://www.rogerebert.com/reviews/farewell-my-concubine-1993",
    },
    {
      text: "The Banshees of Inisherin",
      image: "/images/letterboxd/tboi.webp",
      url: "https://www.rogerebert.com/reviews/the-banshees-of-inisherin-film-review-2022",
    },
    {
      text: "Mulholland Drive",
      image: "/images/letterboxd/md.jpg",
      url: "https://www.rogerebert.com/reviews/mulholland-drive-2001",
    }
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    if (folderRef.current && !isMobile) {
      gsap.set(folderRef.current, { x: 0, y: 0 });
      Draggable.create(folderRef.current, {
        type: "x,y",
        bounds: document.body,
        inertia: true,
        zIndexBoost: true,
        dragClickables: false,
      });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (folderRef.current && !folderRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={folderRef}
      style={{
        position: 'absolute',
        left: isMobile ? '62%' :startX,
        top: isMobile ? '38%' : startY,
        zIndex: isOpen ? 120 : 30,
        transition: 'z-index 0.2s',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          transform: `rotate(${rotation}deg)`,
        }}
        onClick={toggleFolder}
      >
        <img
          src="/images/letterboxd.svg"
          alt="letterboxd"
          style={{
            width: isMobile? '68px':'80px',
            height: 'auto',
            cursor: 'grab',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Opened folder popup */}
      <div
        style={{
          position: 'absolute',
          top: '110%',
          right: '8%',
          transformOrigin: '100% -30%',
          transform: isOpen ? (isMobile ? 'scale(0.75)' : 'scale(1)') : 'scale(0)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          color: '#404040',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: '6px',
          width: '240px',
          transition: 'all 0.2s ease',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 120,
        }}
      >
        {/* Window header bar */}
        <div
          style={{
            width: '100%',
            height: '24px',
            backgroundColor: '#f3f4f6',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            borderRadius: '6px 6px 0 0',
          }}
        />

        {/* Movie poster images grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem 0.5rem',
            fontFamily: 'sans-serif',
            fontSize: '0.6rem',
            margin: '1.5rem 0',
            padding: '0 0.5rem',
            justifyContent: 'center',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    height: '120px',
                    width: '80px',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '0.35rem',
                    border: '3px solid white',
                    borderRadius: '3px',
                    boxShadow: '1px 2px 3px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '2px 4px 6px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '1px 2px 3px rgba(0,0,0,0.2)';
                  }}
                />
              </a>
              <p
                style={{
                  fontSize: '0.55rem',
                  width: '86px',
                  margin: 0,
                  fontFamily: "'Roboto Mono', monospace",
                  lineHeight: '1.2',
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
