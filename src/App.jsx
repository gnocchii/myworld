import { useState } from 'react'
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
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app">
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
              <h1>Melody Yang</h1>
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
