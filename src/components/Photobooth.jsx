import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import PhotoboothModal from "./PhotoboothModal";

export default function Photobooth({
  width = 120,
  height = 120,
  startX = 0,
  startY = 0,
  rotation = 0,
}) {
  const stickerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    gsap.registerPlugin(Draggable);
    if (stickerRef.current && !isMobile) {
      Draggable.create(stickerRef.current, {
        type: "x,y",
        inertia: true,
        bounds: document.body,
        zIndexBoost: true,
      });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <>
      <div
        ref={stickerRef}
        style={{
          position: "absolute",
          left: isMobile ? '18%' : startX,
          top: isMobile ? '38%' : startY,
          transform: `rotate(${rotation}deg)`,
          cursor: isMobile ? "default" : "grab",
          zIndex: 10,
        }}
        onMouseDown={(e) => {
          if (!isMobile) {
            e.currentTarget.style.cursor = "grabbing";
          }
        }}
        onMouseUp={(e) => {
          if (!isMobile) {
            e.currentTarget.style.cursor = "grab";
          }
        }}
      >
        <img
          src="/images/photobooth.webp"
          alt="photobooth"
          width={isMobile ? Math.round(width * 0.67) : width}
          height={isMobile ? Math.round(height * 0.67) : height}
          draggable={false}
          onClick={() => setIsModalOpen(true)}
          style={{
            cursor: "pointer",
            userSelect: "none",
          }}
        />
      </div>

      <PhotoboothModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
