import Scene from './components/Scene'
import Dock from './components/Dock'
import CDPlayer from './components/CDPlayer'
import AudioPlayer from './components/AudioPlayer'
import './App.css'

function App() {
  return (
    <div className="app">
      <AudioPlayer />
      <Scene />

      <div className="overlay">
        <CDPlayer />

        <Dock />

        <main className="content">
          <div className="hero-title">
            <h1>Melody Yang</h1>
            <p>MULTIDISCIPLINARY DESIGNER DEDICATED TO CRAFTING DELIGHTFUL DIGITAL EXPERIENCES</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
