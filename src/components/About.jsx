export default function About() {
  return (
    <main className="content" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <div style={{
        fontFamily: "'Roboto Mono', monospace",
        color: '#272622',
        textAlign: 'center',
      }}>
        

        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          margin: '2rem 0',
          flexWrap: 'wrap',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            paddingBottom: '3rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transform: 'rotate(-5deg)',
            transition: 'transform 0.3s ease',
          }}>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            paddingBottom: '3rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transform: 'rotate(5deg)',
            transition: 'transform 0.3s ease',
          }}>
            
          </div>
        </div>

        <div style={{
          fontSize: '1rem',
          lineHeight: '1.8',
          textAlign: 'left',
          marginTop: '2rem',
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Hi! Welcome to M.Y space!
            
            I'm Melody Yang, a multidisciplinary software engineer passionate about creating
            meaningful digital experiences that blend creativity with technology.
            I believe in the power of design to tell stories and connect people.
          </p>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginTop: '2rem',
            marginBottom: '1rem',
          }}>
            Current Adventure
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Currently studying Computer Science at Purdue University with minors in Mathematics and Management!
          </p>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginTop: '2rem',
            marginBottom: '1rem',
          }}>
            Philosophies
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            • Design should feel effortless, even when it's complex<br/>
            • Every detail matters, from pixels to interactions<br/>
            • The best work comes from curiosity and experimentation<br/>
            • Technology is a tool for human connection, not a replacement for it
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
          }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#4A90E2',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Instagram
            </a>
            <a
              href="mailto:hello@melody.com"
              style={{
                color: '#4A90E2',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Email
            </a>
            <a
              href="https://usc.edu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#4A90E2',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              USC
            </a>
            <a
              href="https://deeplocal.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#4A90E2',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Deeplocal
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
