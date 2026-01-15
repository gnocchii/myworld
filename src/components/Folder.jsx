import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function Folder({ title, startX, startY, rotation = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef(null);

  const photos = [
    {
      text: "cso!!",
      image: "/images/symphony.png"
    },
    {
      text: "bison :3",
      image: "/images/bison.png"
    },
    ,
    {
      text: "machine#gal",
      image: "/images/machinegirl.jpeg"
    },
    {
      text: "houston ballet",
      image: "/images/ballet.png"
    },
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
        left: isMobile? '18.8%':startX,
        top: isMobile? '47%':startY,
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
          src="/images/folder-icon copy.webp"
          alt="folder"
          style={{
            width: isMobile? '66px' : '80px',
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
          width: '288px',
          transition: 'all 0.2s ease',
          transform: isOpen ? (isMobile ? 'scale(0.75)' : 'scale(1)') : 'scale(0)',
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

        {/* Photos grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem 0.25rem',
            fontFamily: 'sans-serif',
            fontSize: '0.75rem',
            margin: '1.5rem 0',
            padding: '0 0.5rem',
            justifyContent: 'center',
          }}
        >
          {photos.map((item, index) => (
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
                  height: '80px',
                  width: '112px',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginBottom: '0.5rem',
                  border: '4px solid white',
                  borderRadius: '4px',
                  boxShadow: '1px 2px 3px rgba(0,0,0,0.2)',
                }}
              />
              <p
                style={{
                  fontSize: '0.75rem',
                  width: '128px',
                  margin: 0,
                  fontFamily: "'Roboto Mono', monospace",
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
