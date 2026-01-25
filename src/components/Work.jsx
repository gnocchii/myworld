import { useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';

const PROJECTS = {
  opal: {
    title: 'OPAL',
    subtitle: 'built @ Nexhacks 2026',
    heroImage: '/images/opal mac mockup.png',
    sections: {
      background: 'In an increasingly digital world, managing screen time has become a critical aspect of maintaining mental health and productivity.',
    },
  },
  darwin: {
    title: 'DARWIN',
    subtitle: 'winner @ Calhacks 2025',
    description: 'Darwin is a multi-agent AI coding battle royale. Watch four AI agents with distinct personalities compete to build react components in real-time, with live voice commentary and on-chain voting. Click into the laptop for a full demo!',
    heroImage: '/images/darwin-demo.mov',
    heroLink: 'https://www.youtube.com/watch?v=8Z5D-vZgShg',
    sections: {
  about: (
    <>
      <p>darwin pits four ai agents against each other in a live coding battle. you give them a prompt like "make a landing page" and watch them race to build it. each agent has a different personality - speedrunner optimizes for speed, bloom goes hard on aesthetics, solver focuses on clean logic, and loader handles the complex async stuff. as they code, you can steer them with voice commands or text feedback. vote for your favorite, tip them with sui, and watch the ai commentator roast their code in real-time.</p>
    </>
  ),
  howItWorks: (
    <>
      
    </>
  ),
  mocks: (
    <>
    </>
  ),
    },
  },
};

const Card = ({ title, children, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.5rem',
        minHeight: '260px',
        background: 'transparent',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children || <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500 }}>{title}</div>}
    </div>
  );
};

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (projectKey) => {
    setSelectedProject(PROJECTS[projectKey]);
    setIsModalOpen(true);
  };

  const closeProject = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <main style={{
        padding: '12rem 2rem 4rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2.5rem',
        }}>
          <Card onClick={() => openProject('opal')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <div style={{ flex: 0.5 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>OPAL</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>built @ Nexhacks 2026</p>
              </div>
              <div style={{ flex: 2 }}>
                <img
                  src="/images/opal mac mockup.png"
                  alt="Opal Mac Mockup"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </Card>
          <Card onClick={() => openProject('darwin')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <div style={{ flex: 0.5 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>DARWIN</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>winner @ Calhacks 2025</p>
              </div>
              <div style={{ flex: 2 }}>
                <img
                  src="/images/darwin favicon.png"
                  alt="Darwin Mac Mockup"
                  style={{ width: '50%', height: 'auto' }}
                />
              </div>
            </div>
          </Card>
          <Card title="Skills" />
          <Card title="Education" />
        </div>
      </main>

      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={closeProject}
        project={selectedProject}
      />
    </>
  );
}
