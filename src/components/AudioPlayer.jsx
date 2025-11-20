import { useEffect, useRef } from "react";
import { useAudio } from "./AudioContext";

export default function AudioPlayer() {
  const { currentSongIndex, allSongs, status, setCurrentSongIndex } = useAudio();
  const audioRef = useRef(null);
  const playing = status === "playing";

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch((error) => {
          console.log("Playback prevented:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, currentSongIndex]);

  const handleEnded = () => {
    // Auto-advance to next song when current song ends
    setCurrentSongIndex((currentSongIndex + 1) % allSongs.length);
  };

  return (
    <audio
      ref={audioRef}
      src={allSongs[currentSongIndex]?.audio}
      onEnded={handleEnded}
    />
  );
}
