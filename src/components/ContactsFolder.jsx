import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function ContactsFolder({ startX, startY, rotation = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contacts = [
    {
      text: "LinkedIn",
      image: "/images/linkedin.png",
      url: "https://www.linkedin.com/in/melody-yang-8634b5254/", // Update with your LinkedIn URL
    },
    {
      text: "Email",
      image: "/images/mail.png",
      url: "mailto:melodyyang2006@gmail.com", // Update with your email
    },
    {
      text: "Devpost",
      image: "/images/devpost-logo.png",
      url: "https://devpost.com/meoies?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav", // Update with your Devpost URL
    },
    {
      text: "Tumblr",
      image: "/images/tumblr.png",
      url: "https://www.tumblr.com/dirtmat", // Update with your Tumblr URL
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
          src="/images/contacts.webp"
          alt="contacts"
          style={{
            width: '62px',
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
          top: isMobile ? '80px' : '110%',
          ...(isMobile
            ? { left: '-2%', transform: isOpen ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)' }
            : { left: '8%', transform: isOpen ? 'scale(1)' : 'scale(0)' }
          ),
          transformOrigin: isMobile ? 'center' : '0% -30%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          color: '#404040',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: '6px',
          width: isMobile? '168px':'240px',
          transition: 'all 0.2s ease',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          fontFamily: "'Roboto Mono', monospace",
          fontSize: '0.7rem',
          fontWeight: 300,
          textAlign: 'center',
          whiteSpace: 'nowrap',
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

        {/* Contact icons grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            fontFamily: 'sans-serif',
            fontSize: '0.7rem',
            margin: isMobile? '0.5rem 0px' : '1.5rem 0',
            padding: '0 1rem',
            justifyContent: 'center',
          }}
        >
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={contact.image}
                alt={contact.text}
                style={{
                  width: contact.text === 'LinkedIn' || contact.text === 'Tumblr' ? '80%' : '100%',
                  height: contact.text === 'LinkedIn' || contact.text === 'Tumblr' ? '80%' : '100%',
                  objectFit: 'contain',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
