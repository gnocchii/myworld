import { createContext, useState, useContext, useEffect } from "react";
import cascade from "../assets/cascade.jpg";
import crumbling from "../assets/crumbling.png";
import aphex_twin from "../assets/aphex.jpg";
import inr from "../assets/inr.jpg";
import nujabes from "../assets/nujabes.jpeg";
import MFDOOM from "../assets/MFDOOM.webp";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const allSongs = [
    {
      image: nujabes,
      name: "WORLD WITHOUT WORDS",
      alt: "Nujabes",
      audio: "/audios/world without words.mp3",
    },
    {
      image: cascade,
      name: "FAST FORWARD",
      alt: "Crush",
      audio: "/audios/Fast Forward.mp3",
    },
    {
      image: crumbling,
      name: "DIRT",
      alt: "Dirt",
      audio: "/audios/Dirt.mp3",
    },
    {
      image: aphex_twin,
      name: "PULSEWIDTH",
      alt: "Starry Night",
      audio: "/audios/pulsewidth.mp3",
    },
    {
      image: inr,
      name: "HOUSE OF CARDS",
      alt: "Track Uno",
      audio: "/audios/hoc.mp3",
    },
    {
      image: MFDOOM,
      name: "LAVENDER BUDS",
      alt: "Lavender Buds",
      audio: "/audios/Lavender Buds.mp3",
    },
  ];

  const [status, setStatus] = useState("paused");
  const [isClient, setIsClient] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(1);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const savedIndex = localStorage.getItem("currentSongIndex");
      const savedStatus = localStorage.getItem("audioStatus");
      if (savedIndex) {
        setCurrentSongIndex(parseInt(savedIndex, 10));
      } else {
        setCurrentSongIndex(1);
      }
      if (savedStatus) {
        setStatus(savedStatus);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("audioStatus", status);
      localStorage.setItem("currentSongIndex", currentSongIndex);
    }
  }, [status, currentSongIndex, isClient]);

  return (
    <AudioContext.Provider
      value={{
        status,
        setStatus,
        currentSongIndex,
        setCurrentSongIndex,
        allSongs,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
