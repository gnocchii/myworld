import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

export default function DraggableSticker({
  src,
  alt,
  width,
  height,
  startX = 0,
  startY = 0,
  rotation = 0,
}) {
  const stickerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable);
    if (stickerRef.current) {
      Draggable.create(stickerRef.current, {
        type: "x,y",
        inertia: true,
        bounds: document.body,
        zIndexBoost: true,
      });
    }
  }, []);

  return (
    <div
      ref={stickerRef}
      style={{
        position: "absolute",
        left: startX,
        top: startY,
        transform: `rotate(${rotation}deg)`,
        cursor: "grab",
        zIndex: 10,
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.cursor = "grabbing";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = "grab";
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        draggable={false}
        style={{
          cursor: "inherit",
          userSelect: "none",
        }}
      />
    </div>
  );
}
