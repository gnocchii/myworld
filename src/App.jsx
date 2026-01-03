import { useState, useEffect } from 'react'
import Scene from './components/Scene'
import Dock from './components/Dock'
import CDPlayer from './components/CDPlayer'
import AudioPlayer from './components/AudioPlayer'
import DraggableSticker from './components/DraggableSticker'
import Folder from './components/Folder'
import LetterboxdFolder from './components/LetterboxdFolder'
import ContactsFolder from './components/ContactsFolder'
import About from './components/About'
import Work from './components/Work'
import Play from './components/Play'
import AnimatedTitle from './components/AnimatedTitle'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            startX="27.8%"
            startY="46%"
            rotation={0}
          />

          {/* <DraggableSticker
            src="/images/kiko folder.png"
            width={150}
            height={150}
            startX="73%"
            startY="54%"
            rotation={8}
          /> */}

          <LetterboxdFolder
            startX="67%"
            startY="22%"
            rotation={0}
          />

          <ContactsFolder
            startX="66.7%"
            startY="54.3%"
            rotation={0}
          />

          <AnimatedTitle />

          {/* <main className="content">
            <div className="hero-title" style={isMobile ? {
              background: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgb(229, 229, 229)',
              borderRadius: '50%',
              width: '33px',
              height: '33px',
              top: isMobile? '-114px' : '85px',
              left: '-1px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: '0.2s',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 100,
              pointerEvents: 'auto',
            } : {}}>

            </div>
           </main> */}
        </div>

        {currentPage === 'about' && <About />}
        {currentPage === 'work' && <Work />}
        {currentPage === 'play' && <Play />}
      </div>
    </div>
  )
}

export default App
