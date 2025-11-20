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
      name: "BEAT LAMENTS THE WORLD",
      alt: "Nujabes",
      audio: "/audios/world without words.mp3",
    },
    {
      image: cascade,
      name: "Fast Forward",
      alt: "Crush",
      audio: "/audios/Fast Forward.mp3",
    },
    {
      image: crumbling,
      name: "Dirt",
      alt: "Dirt",
      audio: "/audios/Dirt.mp3",
    },
    {
      image: aphex_twin,
      name: "STARRY NIGHT",
      alt: "Starry Night",
      audio: "/audios/Starry Night.mp3",
    },
    {
      image: inr,
      name: "TRACK UNO",
      alt: "Track Uno",
      audio: "/audios/TRACK UNO.mp3",
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
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const savedIndex = localStorage.getItem("currentSongIndex");
      const savedStatus = localStorage.getItem("audioStatus");
      if (savedIndex) {
        setCurrentSongIndex(parseInt(savedIndex, 10));
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
