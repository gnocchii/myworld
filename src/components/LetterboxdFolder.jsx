import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function LetterboxdFolder({ startX, startY, rotation = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef(null);

  const items = [
    {
      text: "It's Such A Beautiful Day",
      image: "/images/letterboxd/isabd.webp",
    },
    {
      text: "Farewell My Concubine",
      image: "/images/letterboxd/fmc.webp",
    },
    {
      text: "The Banshees of Inisherin",
      image: "/images/letterboxd/tboi.webp",
    },
    {
      text: "Mulholland Drive",
      image: "/images/letterboxd/md.jpg",
    }
  ];

  useEffect(() => {
    if (folderRef.current) {
      gsap.set(folderRef.current, { x: 0, y: 0 });
      Draggable.create(folderRef.current, {
        type: "x,y",
        bounds: document.body,
        inertia: true,
        zIndexBoost: true,
      });
    }
  }, []);

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
        left: startX,
        top: startY,
        zIndex: 30,
        transition: 'all 0.2s',
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
            width: '80px',
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
          left: '8%',
          transformOrigin: '0% -30%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          color: '#404040',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: '6px',
          width: '240px',
          transition: 'all 0.2s ease',
          transform: isOpen ? 'scale(1)' : 'scale(0)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
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
                }}
              />
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
