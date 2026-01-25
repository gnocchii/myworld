import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
  'ABOUT',
  'HOW IT WORKS',
  'MOCKS',
  'LEARNINGS',
];

export default function ProjectDetailModal({ isOpen, onClose, project }) {
  const [activeSection, setActiveSection] = useState('ABOUT');

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          overflowY: 'auto',
          backgroundColor: '#f8f8f8',
          background: `
            linear-gradient(-90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(-90deg, rgba(0, 0, 0, 0.01) 1px, transparent 1px),
            linear-gradient(rgba(0, 0, 0, 0.01) 1px, transparent 1px),
            linear-gradient(transparent 3px, #f8f8f8 3px, #f8f8f8 198px, transparent 198px),
            linear-gradient(-90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(-90deg, transparent 3px, #f8f8f8 3px, #f8f8f8 198px, transparent 198px),
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            #f8f8f8
          `,
          backgroundSize: '10px 10px, 10px 10px, 200px 200px, 200px 200px, 200px 200px, 200px 200px, 200px 200px, 200px 200px',
          backgroundPosition: 'calc(50% + 5px) 0, calc(50% + 5px) 0, calc(50% + 5px) 0, calc(50% + 5px) 0, calc(50% + 5px) 0, calc(50% + 5px) 0, calc(50% + 5px) 0, calc(50% + 5px) 0',
        }}
      >
        {/* Scrollable content wrapper */}
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            paddingTop: '7rem', // Space to see dock initially
            paddingLeft: '3rem',
            paddingRight: '8rem',
            paddingBottom: '5rem',
          }}
        >
          {/* Left Sidebar - Fixed position */}
          <div
            style={{
              width: '180px',
              paddingTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              flexShrink: 0,
              position: 'sticky',
              top: '4rem',
              height: 'fit-content',
            }}
          >
            {/* Back Button */}
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: '#1d1d1f',
                padding: '0.5rem 0',
                marginBottom: '1.5rem',
                fontFamily: "'SF Mono', monospace",
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ fontSize: '1rem' }}>&larr;</span> BACK
            </button>

            {/* Project Title */}
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '2rem',
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                letterSpacing: '-0.02em',
              }}
            >
              {project.title.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'block' }}>{word}</span>
              ))}
            </h1>

            {/* Menu Items */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              {MENU_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    fontWeight: activeSection === item ? 600 : 400,
                    color: activeSection === item ? '#2563eb' : '#1d1d1f',
                    padding: '0.4rem 0',
                    fontFamily: "'SF Mono', monospace",
                    letterSpacing: '0.03em',
                    textAlign: 'left',
                  }}
                >
                  {activeSection === item && <span style={{ color: '#1d1d1f' }}>—</span>}
                  <span style={{ marginLeft: activeSection === item ? 0 : '1.1rem' }}>{item}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area - Paper background */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#fafafa',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
              padding: '4rem 4rem 3rem',
              marginLeft: '2rem',
              marginTop: '2rem',
              minHeight: 'calc(100vh - 6rem)',
            }}
          >
            {/* Description */}
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: '#1d1d1f',
                maxWidth: '750px',
                fontFamily: "'SF Pro', -apple-system, sans-serif",
                textAlign: 'center',
                margin: '0 auto 2.5rem auto',
              }}
            >
              {project.description}
            </p>

            {/* Hero Image */}
            {project.heroImage && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {project.heroImage.match(/\.(mp4|mov|webm)$/i) ? (
                  <video
                    src={project.heroImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={project.heroLink ? () => window.open(project.heroLink, '_blank') : undefined}
                    style={{
                      maxWidth: project.heroLink ? '60%' : '100%',
                      height: 'auto',
                      cursor: project.heroLink ? 'pointer' : 'default',
                    }}
                  />
                ) : (
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    onClick={project.heroLink ? () => window.open(project.heroLink, '_blank') : undefined}
                    style={{
                      maxWidth: project.heroLink ? '60%' : '100%',
                      height: 'auto',
                      cursor: project.heroLink ? 'pointer' : 'default',
                    }}
                  />
                )}
              </div>
            )}

            {/* Section Content */}
            <div style={{ marginTop: '3rem', maxWidth: '750px', margin: '3rem auto 0' }}>
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  About
                </h2>
                <div style={{
                  lineHeight: 1.8,
                  color: '#4b5563',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  {project.sections?.about}
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  How It Works
                </h2>
                <div style={{
                  lineHeight: 1.8,
                  color: '#4b5563',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  {project.sections?.howItWorks}
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  Mocks
                </h2>
                <div style={{
                  lineHeight: 1.8,
                  color: '#4b5563',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  {project.sections?.mocks}
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  Learnings
                </h2>
                <div style={{
                  lineHeight: 1.8,
                  color: '#4b5563',
                  fontFamily: "'SF Pro', -apple-system, sans-serif",
                }}>
                  {project.sections?.learnings}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
