import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STICKERS = [
  { id: 1, emoji: "⭐", label: "Star" },
  { id: 2, emoji: "❤️", label: "Heart" },
  { id: 3, emoji: "✨", label: "Sparkle" },
  { id: 4, emoji: "🌸", label: "Flower" },
  { id: 5, emoji: "🦋", label: "Butterfly" },
  { id: 6, emoji: "🌈", label: "Rainbow" },
];

const STRIP_COLORS = [
  { id: "black", color: "#000000ff", label: "Black" },  
  { id: "cream", color: "#faf6f0", label: "Cream" },
  { id: "white", color: "#ffffff", label: "White" },
  { id: "royal blue", color: "#5765f2", label: "Blue" },
  { id: "blue", color: "#add8e6", label: "Blue" },
  { id: "lavender", color: "#e6e6fa", label: "Lavender" },
];

export default function PhotoboothModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showPhotoStrip, setShowPhotoStrip] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [mirrorMode, setMirrorMode] = useState(false);

  // Customization options
  const [stripColor, setStripColor] = useState("black");
  const [activeFilter, setActiveFilter] = useState("none"); // "none", "bwfilm", "editorial", "digicam"
  const [placedStickers, setPlacedStickers] = useState([]);
  const [draggingSticker, setDraggingSticker] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const stripRef = useRef(null);

  // Start webcam when modal opens
  useEffect(() => {
    if (isOpen) {
      startWebcam();
    } else {
      stopWebcam();
      resetState();
    }

    return () => stopWebcam();
  }, [isOpen]);

  // Re-attach stream when returning to camera view
  useEffect(() => {
    if (!showPhotoStrip && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [showPhotoStrip, stream]);

  const resetState = () => {
    setPhotos([]);
    setShowPhotoStrip(false);
    setIsPrinting(false);
    setStripColor("black");
    setActiveFilter("none");
    setPlacedStickers([]);
  };

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      alert("Unable to access webcam. Please grant camera permissions.");
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return null;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    // Apply mirror transformation if enabled
    if (mirrorMode) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Apply flash brightness boost if enabled
    if (flashEnabled) {
      ctx.filter = "brightness(1.15) contrast(1.05)";
    }

    ctx.drawImage(video, 0, 0);

    // Reset transformation and filter
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.filter = "none";

    return canvas.toDataURL("image/png");
  };

  const startPhotoSequence = async () => {
    if (isCapturing) return;

    setIsCapturing(true);
    setPhotos([]);
    setShowPhotoStrip(false);
    setPlacedStickers([]);

    const capturedPhotos = [];

    // Take 3 photos with countdown
    for (let i = 0; i < 3; i++) {
      // Countdown 3, 2, 1
      for (let count = 3; count > 0; count--) {
        setCountdown(count);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Flash effect and capture
      setCountdown(null);
      setIsFlashing(true);
      const photo = capturePhoto();
      if (photo) {
        capturedPhotos.push(photo);
      }

      await new Promise((resolve) => setTimeout(resolve, flashEnabled ? 350 : 100));
      setIsFlashing(false);

      // Pause between photos (except after the last one)
      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    setPhotos(capturedPhotos);
    setIsCapturing(false);

    // Start printing animation
    setIsPrinting(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShowPhotoStrip(true);
  };

  const downloadPhotoStrip = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Photostrip dimensions
    const photoWidth = 300;
    const photoHeight = 225;
    const padding = 16;
    const stripWidth = photoWidth + padding * 2;
    const stripHeight = photoHeight * 3 + padding * 4;

    canvas.width = stripWidth;
    canvas.height = stripHeight;

    // Background color
    const selectedColor = STRIP_COLORS.find(c => c.id === stripColor);
    ctx.fillStyle = selectedColor?.color || "#ffffff";
    ctx.fillRect(0, 0, stripWidth, stripHeight);

    // Draw each photo
    let loadedCount = 0;
    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        const y = padding + index * (photoHeight + padding);

        // Apply filter based on selection
        if (activeFilter === "bwfilm") {
          ctx.filter = "grayscale(100%) contrast(1.05) brightness(1.02) sepia(8%)";
        } else if (activeFilter === "editorial") {
          ctx.filter = "grayscale(100%) contrast(1.4) brightness(1.05)";
        } else if (activeFilter === "digicam") {
          ctx.filter = "saturate(0.65) contrast(0.85) brightness(1.08) sepia(20%)";
        }
        ctx.drawImage(img, padding, y, photoWidth, photoHeight);
        ctx.filter = "none";

        // B&W Film overlays
        if (activeFilter === "bwfilm") {
          // Lifted blacks / faded look
          ctx.globalAlpha = 0.06;
          ctx.fillStyle = "#232323";
          ctx.globalCompositeOperation = "lighten";
          ctx.fillRect(padding, y, photoWidth, photoHeight);
          ctx.globalCompositeOperation = "source-over";

          // Subtle warm tint
          ctx.globalAlpha = 0.03;
          ctx.fillStyle = "#f5f0e6";
          ctx.globalCompositeOperation = "overlay";
          ctx.fillRect(padding, y, photoWidth, photoHeight);
          ctx.globalCompositeOperation = "source-over";

          // Film grain
          ctx.globalAlpha = 0.12;
          for (let gx = 0; gx < photoWidth; gx += 2) {
            for (let gy = 0; gy < photoHeight; gy += 2) {
              if (Math.random() > 0.55) {
                const brightness = Math.random();
                ctx.fillStyle = brightness > 0.5 ? "#e8e8e8" : "#1a1a1a";
                ctx.fillRect(padding + gx, y + gy, 1, 1);
              }
            }
          }
          ctx.globalAlpha = 1;
        }

        // Editorial high-contrast overlays
        if (activeFilter === "editorial") {
          // Deepen blacks slightly
          ctx.globalAlpha = 0.02;
          ctx.fillStyle = "#000000";
          ctx.globalCompositeOperation = "multiply";
          ctx.fillRect(padding, y, photoWidth, photoHeight);
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
        }

        // Soft natural phone camera overlays
        if (activeFilter === "digicam") {
          // Soft peachy/pink warmth
          ctx.globalAlpha = 0.06;
          ctx.fillStyle = "#ffebe6";
          ctx.globalCompositeOperation = "overlay";
          ctx.fillRect(padding, y, photoWidth, photoHeight);
          ctx.globalCompositeOperation = "source-over";

          // Soft lifted shadows
          ctx.globalAlpha = 0.03;
          ctx.fillStyle = "#3c3732";
          ctx.globalCompositeOperation = "lighten";
          ctx.fillRect(padding, y, photoWidth, photoHeight);
          ctx.globalCompositeOperation = "source-over";

          // Soft diffused glow - natural light effect
          const glowGradient = ctx.createRadialGradient(
            padding + photoWidth / 2, y + photoHeight * 0.3, 0,
            padding + photoWidth / 2, y + photoHeight * 0.3, photoWidth * 0.7
          );
          glowGradient.addColorStop(0, "rgba(255, 252, 250, 0.08)");
          glowGradient.addColorStop(1, "transparent");
          ctx.globalAlpha = 1;
          ctx.fillStyle = glowGradient;
          ctx.globalCompositeOperation = "screen";
          ctx.fillRect(padding, y, photoWidth, photoHeight);
          ctx.globalCompositeOperation = "source-over";

          // Very subtle natural vignette
          const vignetteGradient = ctx.createRadialGradient(
            padding + photoWidth / 2, y + photoHeight / 2, photoWidth * 0.45,
            padding + photoWidth / 2, y + photoHeight / 2, photoWidth * 0.7
          );
          vignetteGradient.addColorStop(0, "transparent");
          vignetteGradient.addColorStop(1, "rgba(40, 35, 30, 0.05)");
          ctx.globalAlpha = 1;
          ctx.fillStyle = vignetteGradient;
          ctx.fillRect(padding, y, photoWidth, photoHeight);
        }

        loadedCount++;
        // Download after all images are drawn
        if (loadedCount === photos.length) {
          // Draw stickers
          placedStickers.forEach((sticker) => {
            ctx.font = "24px serif";
            ctx.fillText(sticker.emoji, sticker.x * (stripWidth / 200), sticker.y * (stripHeight / 350));
          });

          const link = document.createElement("a");
          link.download = `photostrip-${Date.now()}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      };
    });
  };

  const retakePhotos = async () => {
    setPhotos([]);
    setShowPhotoStrip(false);
    setIsPrinting(false);
    setPlacedStickers([]);
    setActiveFilter("none");

    // Re-attach stream to video element after state updates
    setTimeout(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, 50);
  };

  const addSticker = (emoji) => {
    // Add sticker at center of the strip
    const newSticker = {
      id: Date.now(),
      emoji,
      x: 88,
      y: 175,
    };
    setPlacedStickers([...placedStickers, newSticker]);
  };

  const removeSticker = (stickerId) => {
    setPlacedStickers(placedStickers.filter(s => s.id !== stickerId));
  };

  const handleStickerMouseDown = (e, sticker) => {
    e.preventDefault();
    e.stopPropagation();
    const stripRect = stripRef.current?.getBoundingClientRect();
    if (!stripRect) return;

    setDraggingSticker(sticker.id);
    setHasDragged(false);
    setDragOffset({
      x: e.clientX - stripRect.left - sticker.x,
      y: e.clientY - stripRect.top - sticker.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingSticker || !stripRef.current) return;

    setHasDragged(true);
    const stripRect = stripRef.current.getBoundingClientRect();
    const newX = e.clientX - stripRect.left - dragOffset.x;
    const newY = e.clientY - stripRect.top - dragOffset.y;

    // Clamp to strip bounds
    const clampedX = Math.max(0, Math.min(newX, 176));
    const clampedY = Math.max(0, Math.min(newY, 350));

    setPlacedStickers(placedStickers.map(s =>
      s.id === draggingSticker ? { ...s, x: clampedX, y: clampedY } : s
    ));
  };

  const handleStickerMouseUp = (stickerId) => {
    if (!hasDragged && draggingSticker === stickerId) {
      // It was a click, not a drag - remove the sticker
      removeSticker(stickerId);
    }
    setDraggingSticker(null);
    setHasDragged(false);
  };

  const handleMouseUp = () => {
    setDraggingSticker(null);
    setHasDragged(false);
  };

  if (!isOpen) return null;

  const selectedColorObj = STRIP_COLORS.find(c => c.id === stripColor);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      >
        {/* Full Screen Flash Effect - MASSIVE */}
        <AnimatePresence>
          {isFlashing && flashEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.03, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "-100vh",
                left: "-100vw",
                width: "300vw",
                height: "300vh",
                backgroundColor: "white",
                zIndex: 999999,
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#f5f5f7",
            borderRadius: "12px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            width: "90%",
            maxWidth: showPhotoStrip ? "800px" : "550px",
            height: showPhotoStrip ? "520px" : "auto",
            display: "flex",
            flexDirection: "column",
            transition: "max-width 0.3s ease",
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              background: "linear-gradient(180deg, #e8e8e8 0%, #d5d5d5 100%)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #c0c0c0",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                onClick={onClose}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#ff5f56",
                  cursor: "pointer",
                  border: "0.5px solid #e0443e",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'SF Pro', -apple-system, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Photobooth
            </div>
            <div style={{ width: "12px" }} />
          </div>

          {/* Content Area */}
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: showPhotoStrip ? "row" : "column",
              alignItems: showPhotoStrip ? "stretch" : "center",
              gap: "20px",
              flex: 1,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Webcam Preview */}
            {!showPhotoStrip && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "500px",
                  aspectRatio: "4/3",
                  backgroundColor: "#000",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: mirrorMode ? "scaleX(-1)" : "none",
                  }}
                />

                {/* Countdown Overlay */}
                {countdown && (
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "120px",
                      fontWeight: "bold",
                      color: "white",
                      textShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {countdown}
                  </motion.div>
                )}

                {/* Flash Effect */}
                <AnimatePresence>
                  {isFlashing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "white",
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Photo Strip Display - Left Side */}
            {showPhotoStrip && (
              <>
                <motion.div
                  ref={stripRef}
                  initial={{ y: -400 }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    duration: 1.5
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{
                    backgroundColor: selectedColorObj?.color || "#fff",
                    padding: "12px",
                    borderRadius: 0,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "200px",
                    flexShrink: 0,
                    position: "relative",
                    alignSelf: "flex-start",
                    marginTop: "-10px",
                    userSelect: "none",
                  }}
                >
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={photo}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 0,
                          filter: activeFilter === "bwfilm"
                            ? "grayscale(100%) contrast(1.05) brightness(1.02) sepia(8%)"
                            : activeFilter === "editorial"
                            ? "grayscale(100%) contrast(1.4) brightness(1.05)"
                            : activeFilter === "digicam"
                            ? "saturate(0.88) contrast(0.92) brightness(1.06) sepia(5%)"
                            : "none",
                          pointerEvents: "none",
                        }}
                        alt={`Photo ${index + 1}`}
                      />
                      {/* B&W Film overlays */}
                      {activeFilter === "bwfilm" && (
                        <>
                          {/* Lifted blacks / faded look */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(35, 35, 35, 0.08)",
                              mixBlendMode: "lighten",
                              pointerEvents: "none",
                            }}
                          />
                          {/* Subtle warm tint */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(245, 240, 230, 0.04)",
                              mixBlendMode: "overlay",
                              pointerEvents: "none",
                            }}
                          />
                          {/* Film grain */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                              opacity: 0.18,
                              mixBlendMode: "overlay",
                              pointerEvents: "none",
                            }}
                          />
                        </>
                      )}
                      {/* Editorial high-contrast overlays */}
                      {activeFilter === "editorial" && (
                        <>
                          {/* Deep blacks enhancement */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0, 0, 0, 0.03)",
                              mixBlendMode: "multiply",
                              pointerEvents: "none",
                            }}
                          />
                        </>
                      )}
                      {/* Soft natural phone camera overlays */}
                      {activeFilter === "digicam" && (
                        <>
                          {/* Soft peachy/pink warmth for skin tones */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(180deg, rgba(255, 235, 230, 0.08) 0%, rgba(255, 220, 210, 0.06) 100%)",
                              mixBlendMode: "overlay",
                              pointerEvents: "none",
                            }}
                          />
                          {/* Soft lifted shadows for that gentle look */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(60, 55, 50, 0.04)",
                              mixBlendMode: "lighten",
                              pointerEvents: "none",
                            }}
                          />
                          {/* Soft diffused glow - like natural window light */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "radial-gradient(ellipse at 50% 30%, rgba(255, 252, 250, 0.1) 0%, transparent 70%)",
                              mixBlendMode: "screen",
                              pointerEvents: "none",
                            }}
                          />
                          {/* Very subtle natural vignette */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "radial-gradient(ellipse at center, transparent 65%, rgba(40, 35, 30, 0.06) 100%)",
                              pointerEvents: "none",
                            }}
                          />
                        </>
                      )}
                    </div>
                  ))}

                  {/* Placed Stickers - Draggable & Clickable to Remove */}
                  {placedStickers.map((sticker) => (
                    <div
                      key={sticker.id}
                      onMouseDown={(e) => handleStickerMouseDown(e, sticker)}
                      onMouseUp={() => handleStickerMouseUp(sticker.id)}
                      style={{
                        position: "absolute",
                        left: `${sticker.x}px`,
                        top: `${sticker.y}px`,
                        fontSize: "24px",
                        cursor: draggingSticker === sticker.id ? "grabbing" : "grab",
                        userSelect: "none",
                        zIndex: draggingSticker === sticker.id ? 100 : 10,
                      }}
                      title="Drag to move, click to remove"
                    >
                      {sticker.emoji}
                    </div>
                  ))}
                </motion.div>

                {/* Options Panel - Right Side */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    overflow: "hidden",
                  }}
                >
                  {/* Strip Color */}
                  <div>
                    <div style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#666",
                      marginBottom: "8px",
                      fontFamily: "'SF Pro', -apple-system, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>
                      Strip Color
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {STRIP_COLORS.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => setStripColor(c.id)}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: c.color,
                            cursor: "pointer",
                            border: stripColor === c.id
                              ? "3px solid #007aff"
                              : "2px solid #ddd",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Filter */}
                  <div>
                    <div style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#666",
                      marginBottom: "8px",
                      fontFamily: "'SF Pro', -apple-system, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>
                      Filter
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        onClick={() => setActiveFilter(activeFilter === "bwfilm" ? "none" : "bwfilm")}
                        style={{
                          padding: "8px 12px",
                          backgroundColor: activeFilter === "bwfilm" ? "#e5e5e5" : "#fff",
                          color: "#333",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontFamily: "'SF Pro', -apple-system, sans-serif",
                        }}
                      >
                        B&W Film
                      </button>
                      <button
                        onClick={() => setActiveFilter(activeFilter === "editorial" ? "none" : "editorial")}
                        style={{
                          padding: "8px 12px",
                          backgroundColor: activeFilter === "editorial" ? "#e5e5e5" : "#fff",
                          color: "#333",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontFamily: "'SF Pro', -apple-system, sans-serif",
                        }}
                      >
                        Editorial
                      </button>
                      <button
                        onClick={() => setActiveFilter(activeFilter === "digicam" ? "none" : "digicam")}
                        style={{
                          padding: "8px 12px",
                          backgroundColor: activeFilter === "digicam" ? "#e5e5e5" : "#fff",
                          color: "#333",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontFamily: "'SF Pro', -apple-system, sans-serif",
                        }}
                      >
                        Soft
                      </button>
                    </div>
                  </div>

                  {/* Stickers */}
                  <div>
                    <div style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#666",
                      marginBottom: "8px",
                      fontFamily: "'SF Pro', -apple-system, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>
                      Stickers
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                      {STICKERS.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => addSticker(s.emoji)}
                          style={{
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            cursor: "pointer",
                            border: "2px solid #eee",
                            transition: "transform 0.1s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                          title={s.label}
                        >
                          {s.emoji}
                        </div>
                      ))}
                    </div>
                    {placedStickers.length > 0 && (
                      <div style={{
                        fontSize: "11px",
                        color: "#999",
                        marginTop: "4px",
                        fontFamily: "'SF Pro', -apple-system, sans-serif",
                      }}>
                        Drag to move, click to remove
                      </div>
                    )}
                  </div>

                </div>

                {/* Retake - Camera Button (bottom center, same position as landing) */}
                <button
                  onClick={retakePhotos}
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(220, 220, 220, 0.15)",
                    border: "3px solid rgba(200, 200, 200, 0.6)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  title="Retake"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(160, 160, 160, 0.9)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>

                {/* Export - Bottom Right of Modal */}
                <button
                  onClick={downloadPhotoStrip}
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(220, 220, 220, 0.15)",
                    border: "2px solid rgba(200, 200, 200, 0.6)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  title="Export"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(160, 160, 160, 0.9)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </button>
              </>
            )}

            {/* Hidden canvas for capturing */}
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {/* Controls - Only shown before capture */}
            {!showPhotoStrip && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                {/* Toggle Options */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* Flash Toggle */}
                  <button
                    onClick={() => !isCapturing && setFlashEnabled(!flashEnabled)}
                    disabled={isCapturing}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: flashEnabled ? "#fff" : "#f5f5f5",
                      color: flashEnabled ? "#333" : "#999",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: isCapturing ? "not-allowed" : "pointer",
                      fontFamily: "'SF Pro', -apple-system, sans-serif",
                      opacity: isCapturing ? 0.5 : 1,
                    }}
                  >
                    Flash
                  </button>

                  {/* Mirror Toggle */}
                  <button
                    onClick={() => !isCapturing && setMirrorMode(!mirrorMode)}
                    disabled={isCapturing}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: mirrorMode ? "#fff" : "#f5f5f5",
                      color: mirrorMode ? "#333" : "#999",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: isCapturing ? "not-allowed" : "pointer",
                      fontFamily: "'SF Pro', -apple-system, sans-serif",
                      opacity: isCapturing ? 0.5 : 1,
                    }}
                  >
                    Mirror
                  </button>
                </div>

              </div>
            )}

            {/* Camera Button - Fixed position at bottom center */}
            {!showPhotoStrip && (
              <button
                onClick={startPhotoSequence}
                disabled={isCapturing || !stream}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: isCapturing ? "rgba(200, 200, 200, 0.2)" : "rgba(220, 220, 220, 0.15)",
                  border: isCapturing ? "3px solid #ccc" : "3px solid rgba(200, 200, 200, 0.6)",
                  cursor: isCapturing ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isCapturing ? "#bbb" : "rgba(160, 160, 160, 0.9)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
