import Scene from './components/Scene'
import './App.css'

function App() {
  return (
    <div className="app">
      <Scene />

      <div className="overlay">
        <header className="header">
          <h1 className="title">Your Name</h1>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main className="content">
          <section className="hero">
            <h2>Creative Developer</h2>
            <p>Building interactive 3D experiences on the web</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
