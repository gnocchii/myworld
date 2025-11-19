import Scene from './components/Scene'
import Dock from './components/Dock'
import './App.css'

function App() {
  return (
    <div className="app">
      <Scene />

      <div className="overlay">
        <div className="branding">
          <span className="melody-text">melody</span>
        </div>

        <Dock />

        <main className="content">
          <section className="hero">
            <p>Building interactive 3D experiences on the web</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
