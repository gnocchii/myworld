import { useState } from 'react';

const Card = ({ title, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
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
  return (
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
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
            <div style={{ flex: 0.5 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Opal</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Project description</p>
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
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
            <div style={{ flex: 0.5 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Darwin</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Project description</p>
            </div>
            <div style={{ flex: 2 }}>
              <img
                src="/images/darwin mac mockup.png"
                alt="Darwin Mac Mockup"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </Card>
        <Card title="Skills" />
        <Card title="Education" />
      </div>
    </main>
  );
}
