import { useState } from 'react'
import './Dock.css'

function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const dockItems = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
  ]

  return (
    <div className="dock-container">
      <div className="dock">
        {dockItems.map((item, index) => (
          <div
            key={item.id}
            className={`dock-item ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="dock-item-content">
              <span className="dock-icon">{item.icon}</span>
            </div>
            <span className="dock-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dock
