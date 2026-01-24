import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function MacbookIntro({ onZoomComplete }) {
  const [isMobile, setIsMobile] = useState(false);
  const [zoomConfig, setZoomConfig] = useState(null);
  const lidControls = useAnimation();
  const containerControls = useAnimation();
  const baseControls = useAnimation();
  const overlayControls = useAnimation();
  const screenRef = useRef(null);

  useEffect(() => {
    const mobile = window && window.innerWidth < 768;
    if (mobile) {
      setIsMobile(true);
    }

    // Calculate the exact scale needed to fit the viewport
    const calculateZoom = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // The LID dimensions (the whole screen element, not just inner content)
      // Desktop lid: 640x400 (16:10 ratio), Mobile lid: 280x336
      // After lid opens with scale 1.5: 960x600 (desktop) or 420x504 (mobile)
      const scaledLidWidth = mobile ? 420 : 960;
      const scaledLidHeight = mobile ? 504 : 600;

      // Calculate scale to make the lid fill the viewport
      const scaleX = viewportWidth / scaledLidWidth;
      const scaleY = viewportHeight / scaledLidHeight;

      // Use max to fully COVER the viewport (overflow is hidden)
      const finalScale = Math.max(scaleX, scaleY);

      console.log('Zoom calculation:', {
        viewport: { width: viewportWidth, height: viewportHeight },
        scaledLid: { width: scaledLidWidth, height: scaledLidHeight },
        scales: { x: scaleX.toFixed(2), y: scaleY.toFixed(2) },
        finalScale: finalScale.toFixed(2)
      });

      setZoomConfig({ scale: finalScale, y: 0 });
    };

    calculateZoom();
  }, []);

  useEffect(() => {
    // Wait for zoom config to be calculated before animating
    if (!zoomConfig) return;

    const animate = async () => {
      // Wait a moment
      await new Promise((r) => setTimeout(r, 400));

      // Open the lid
      await lidControls.start({
        rotateX: 0,
        scaleX: 1.5,
        scaleY: 1.5,
        transition: { duration: 1, ease: "easeOut" },
      });

      await new Promise((r) => setTimeout(r, 200));

      // Zoom into the screen and fade out keyboard
      await Promise.all([
        containerControls.start({
          scale: zoomConfig.scale,
          y: zoomConfig.y,
          transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
        }),
        baseControls.start({
          opacity: 0,
          transition: { duration: 0.6 },
        }),
      ]);

      // Smooth cross-fade to LoadingScreen
      await overlayControls.start({
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });

      // Hand off to the loading screen
      onZoomComplete?.();
    };

    animate();
  }, [lidControls, containerControls, baseControls, overlayControls, onZoomComplete, zoomConfig]);

  return (
    <motion.div
      animate={overlayControls}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#f5f5f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={containerControls}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transformOrigin: "center top",
        }}
      >
        {/* Lid */}
        <div style={{ position: "relative", perspective: "800px" }}>
          {/* Base (closed lid showing Apple logo) */}
          <div
            style={{
              transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
              transformOrigin: "bottom",
              transformStyle: "preserve-3d",
              width: isMobile ? "280px" : "512px",
              height: isMobile ? "168px" : "192px",
              borderRadius: "16px",
              background: "#010101",
              padding: "8px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                background: "#010101",
                boxShadow: "0px 2px 0px 2px #171717 inset",
              }}
            >
              <span style={{ color: "white" }}>
                <AppleLogo />
              </span>
            </div>
          </div>

          {/* Screen (animates open) */}
          <motion.div
            initial={{
              rotateX: -28,
              scaleX: 1.2,
              scaleY: 0.6,
            }}
            animate={lidControls}
            style={{
              position: "absolute",
              inset: 0,
              width: isMobile ? "280px" : "512px",
              height: isMobile ? "336px" : "384px",
              borderRadius: "16px",
              background: "#010101",
              padding: "8px",
              transformStyle: "preserve-3d",
              transformOrigin: "top",
            }}
          >
            <div
              ref={screenRef}
              style={{
                position: "absolute",
                inset: "8px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {/* Simple background - matches LoadingScreen background */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                {/* Dark overlay to match LoadingScreen */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Keyboard base */}
        <motion.div
          animate={baseControls}
          style={{
            position: "relative",
            zIndex: -1,
            width: isMobile ? "280px" : "512px",
            height: isMobile ? "192px" : "352px",
            borderRadius: "16px",
            background: "#e5e5e5",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", height: "40px", width: "100%" }}>
            <div style={{
              position: "absolute",
              left: "10%",
              right: "10%",
              height: "16px",
              background: "#050505",
            }} />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "10%", overflow: "hidden" }}>
              <SpeakerGrid />
            </div>
            <div style={{ width: "80%" }}>
              <Keypad isMobile={isMobile} />
            </div>
            <div style={{ width: "10%", overflow: "hidden" }}>
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          <div style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "8px",
            borderRadius: "12px 12px 0 0",
            background: "linear-gradient(to top, #272729, #050505)",
          }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const Trackpad = () => (
  <div style={{
    margin: "4px auto",
    width: "40%",
    height: "80px",
    borderRadius: "12px",
    boxShadow: "0px 0px 1px 1px #00000020 inset",
  }} />
);

const Keypad = ({ isMobile }) => {
  const rows = isMobile ? [10, 10, 8] : [14, 14, 14, 13, 12, 10];
  return (
    <div style={{
      margin: "4px",
      height: "100%",
      borderRadius: "6px",
      background: "#050505",
      padding: "4px",
    }}>
      {rows.map((keys, row) => (
        <div key={row} style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
          {Array(keys).fill(0).map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: isMobile ? "12px" : "24px",
              borderRadius: isMobile ? "2px" : "4px",
              background: "#0A090D",
              boxShadow: "0px -0.5px 2px 0 #0D0D0F inset",
            }} />
          ))}
        </div>
      ))}
    </div>
  );
};

const SpeakerGrid = () => (
  <div style={{
    marginTop: "8px",
    height: "160px",
    backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
    backgroundSize: "3px 3px",
  }} />
);

const AppleLogo = () => (
  <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3 13.1c-.3.7-.7 1.3-1.1 1.9-.6.8-1.1 1.3-1.5 1.6-.6.5-1.2.8-1.9.8-.5 0-1.1-.1-1.8-.4-.7-.3-1.3-.4-1.8-.4-.6 0-1.2.1-1.8.4-.7.3-1.2.4-1.6.4-.7 0-1.3-.3-1.9-.8-.4-.3-.9-.9-1.5-1.7C.5 13.8.1 12.6 0 11.3c0-1.2.3-2.2.8-3.1.4-.7 1-1.3 1.7-1.7.7-.4 1.5-.7 2.3-.7.5 0 1.2.2 2 .5.8.3 1.3.5 1.5.5.2 0 .7-.2 1.7-.5.9-.3 1.6-.5 2.2-.4 1.6.1 2.8.8 3.6 2-1.4.9-2.1 2.1-2.1 3.6 0 1.2.4 2.2 1.3 3 .4.4.8.7 1.3.9-.1.3-.2.6-.3.9zM10.2.4c0 .9-.3 1.8-1 2.6-.8.9-1.8 1.5-2.9 1.4 0-.1 0-.2 0-.3 0-.9.4-1.8 1-2.5.3-.4.7-.7 1.2-.9.5-.2.9-.4 1.4-.4 0 .1 0 .2 0 .3z"/>
  </svg>
);
