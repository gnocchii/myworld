import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioContext";
import { useState, useEffect } from "react";

function CD() {
  const { currentSongIndex, setCurrentSongIndex, status, setStatus, allSongs } = useAudio();
  const currentSong = allSongs[currentSongIndex];
  const playing = status === "playing";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % allSongs.length;
    setCurrentSongIndex(nextIndex);
  };

  const handlePreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + allSongs.length) % allSongs.length;
    setCurrentSongIndex(prevIndex);
  };

  const cdSize = isMobile ? 275 : 475;
  const containerWidth = isMobile ? "100%" : "700px";
  const statusTop = isMobile ? "59px" : "-60px";
  const statusFontSize = isMobile ? "0.7rem" : "0.9rem";
  const cdTop = isMobile ? "86px" : "0";

  return (
    <div style={{
      position: "absolute",
      height: "225px",
      width: containerWidth,
      left: "50%",
      bottom: "15%",
      transform: "translateX(-50%)",
      zIndex: 50,
      pointerEvents: "none"
    }}>
      {/* Status display */}
      <div style={{
        position: "absolute",
        top: statusTop,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'Roboto Mono', monospace",
        fontSize: statusFontSize,
        color: "#272622",
        fontWeight: 300,
        textAlign: "center",
        whiteSpace: "nowrap",
      }}>
        {playing ? "NOW PLAYING: " : "CLICK TO PLAY: "}
        <span style={{ fontWeight: 400 }}>{currentSong.name}</span>
      </div>

      <motion.div
        initial={{ rotate: 0, x: "-50%", borderRadius: 250 }}
        animate={
          playing
            ? {
                rotate: 360,
                y: [0, 45],
                transition: {
                  rotate: {
                    ease: "linear",
                    duration: 20,
                    repeat: Infinity,
                  },
                  y: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                },
              }
            : {
                rotate: 0,
                y: 0,
                transition: { duration: 0.5 },
              }
        }
        whileHover={{
          scale: 1.03,
        }}
        onTap={() => {
          setStatus(status === "playing" ? "paused" : "playing");
        }}
        style={{
          width: `${cdSize}px`,
          height: `${cdSize}px`,
          position: "absolute",
          left: "50%",
          top: cdTop,
          zIndex: 20,
          display: "flex",
          transformOrigin: "center",
          userSelect: "none",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: "2px solid #d3d3d3",
          background: "#e5e5e5",
          boxShadow: "0 0 80px -20px rgba(0,0,0,0.2)",
          borderRadius: "50%",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      >
        {/* Album Art with fade transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSongIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={currentSong.image}
              alt={currentSong.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* CD center hole and rings */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            display: "flex",
            transform: "translate(-50%, -50%)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "480px",
              height: "480px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "0.1px solid white",
              background: "transparent",
              opacity: 0.35,
            }}
          />
          <div
            style={{
              width: isMobile? "105px":"150px",
              height: isMobile? "105px":"150px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "0.75px solid white",
              backdropFilter: "blur(4px)",
            }}
          />
          <div
            style={{
              width: isMobile? "95px": "143px",
              height: isMobile? "95px": "143px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "5px dotted rgba(229, 231, 235, 0.15)",
            }}
          />
          <div
            style={{
              width: isMobile? "67px": "127px",
              height: isMobile? "67px": "127px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "0.8px solid white",
              background: "#c3c3c5",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: isMobile? "55px":"85px",
              height: isMobile? "55px":"85px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "#bdbabc",
            }}
          />
          <div
            style={{
              width: isMobile? "45px":"70px",
              height: isMobile? "45px":"70px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "#cfcdcf",
            }}
          />
          <div
            style={{
              width: isMobile? "45px":"67px",
              height: isMobile? "45px":"67px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "#e9e4ea",
            }}
          />
          <div
            style={{
              width: isMobile? "35px":"60px",
              height: isMobile? "35px":"60px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "1px solid #c8c7c5",
              background: "#f5f5f5",
              boxShadow: "0 0 24px -12px rgba(0,0,0,0.30) inset",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Previous/Next buttons */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -100px)",
          gap: isMobile ? "200px" : "500px",
        }}
      >
        <button
          onClick={handlePreviousSong}
          aria-label="previous"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid #e5e5e5",
            borderRadius: "50%",
            width: isMobile ? "33px" : "40px",
            height: isMobile ? "33px" : "40px",
            ...(isMobile ? { top: "77px", left: "-45px" } : {}),
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            cursor: "pointer",
            position: "relative", 
            zIndex: 100,
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.6)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.75 0.75V20.75H4.08336V10.7504L20.75 20.75V0.75L4.08336 10.7492V0.75H0.75Z"
              fill="#AFAFAF"
            />
          </svg>
        </button>

        <button
          onClick={handleNextSong}
          aria-label="next"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgb(229, 229, 229)",
            borderRadius: "50%",
            width: isMobile ? "33px" : "40px",
            height: isMobile ? "33px" : "40px",
            ...(isMobile ? { top: "77px", left: "45px" } : {}),
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "0.2s",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px",
            cursor: "pointer",
            position: "relative",
            zIndex: 100,
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.6)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.75 0.75V20.75H17.4166V10.7504L0.75 20.75V0.75L17.4166 10.7492V0.75H20.75Z"
              fill="#AFAFAF"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CD;
