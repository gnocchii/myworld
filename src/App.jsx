import Scene from './components/Scene'
import AnimatedName from './components/AnimatedName'
import Dock from './components/Dock'
import './App.css'

function App() {
  return (
    <div className="app">
      <Scene />
      <AnimatedName />
      <Dock />

      <div className="scroll-content">
        <section id="home" className="section">
          <div className="section-inner">
            <h2>Welcome</h2>
            <p>Scroll down to explore my work and learn more about me.</p>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-inner">
            <h2>About Me</h2>
            <p>I'm a creative developer passionate about building beautiful and interactive web experiences.</p>
            <p>With expertise in modern web technologies, I bring ideas to life through code and design.</p>
            <div className="skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Three.js</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">CSS</span>
              <span className="skill-tag">UI/UX</span>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section">
          <div className="section-inner">
            <h2>Portfolio</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Project One</h3>
                <p>An innovative web application with stunning 3D visuals and smooth interactions.</p>
              </div>
              <div className="project-card">
                <h3>Project Two</h3>
                <p>A creative portfolio showcasing modern design principles and cutting-edge technology.</p>
              </div>
              <div className="project-card">
                <h3>Project Three</h3>
                <p>Interactive experience combining art and technology for an immersive user journey.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-inner">
            <h2>Get in Touch</h2>
            <p>I'd love to hear about your project and how we can work together.</p>
            <div className="contact-links">
              <a href="mailto:hello@melody.dev" className="contact-link">Email</a>
              <a href="https://github.com/melody" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
              <a href="https://linkedin.com/in/melody" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
              <a href="https://twitter.com/melody" target="_blank" rel="noopener noreferrer" className="contact-link">Twitter</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
