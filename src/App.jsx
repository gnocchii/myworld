import { useState, useEffect } from 'react'
import Scene from './components/Scene'
import Dock from './components/Dock'
import CDPlayer from './components/CDPlayer'
import AudioPlayer from './components/AudioPlayer'
import DraggableSticker from './components/DraggableSticker'
import Folder from './components/Folder'
import LetterboxdFolder from './components/LetterboxdFolder'
import About from './components/About'
import Work from './components/Work'
import Play from './components/Play'
import AnimatedTitle from './components/AnimatedTitle'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Trigger fade in on initial load
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Trigger fade in when navigating to about page
    if (currentPage === 'about') {
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  return (
    <div className="app">
      {/* Initial page load overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f3ed',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1.2s ease-out',
        pointerEvents: fadeOut ? 'none' : 'all',
        zIndex: 9999,
      }} />
      <AudioPlayer />
      <Scene />

      <div className="overlay">
        <div style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
          <CDPlayer />
        </div>

        <Dock currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <div style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
          <Folder
            title="photos"
            startX="20%"
            startY="45%"
            rotation={-8}
          />

          <DraggableSticker
            src="/images/kiko folder.png"
            width={150}
            height={150}
            startX="73%"
            startY="54%"
            rotation={8}
          />

          <LetterboxdFolder
            startX="75%"
            startY="25%"
            rotation={1}
          />

          <main className="content">
            <div className="hero-title">
              <AnimatedTitle />
              <p>MULTIDISCIPLINARY DESIGNER REIMAGINING CREATIVE DIGITAL EXPERIENCES</p>
            </div>
          </main>
        </div>

        {currentPage === 'about' && <About />}
        {currentPage === 'work' && <Work />}
        {currentPage === 'play' && <Play />}
      </div>
    </div>
  )
}

export default App
