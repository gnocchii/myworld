function Dock({ currentPage, setCurrentPage }) {
  return (
    <nav style={{
      position: 'fixed',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex',
      gap: '2rem',
      fontFamily: "'Roboto Mono', monospace",
      fontWeight: 300,
      fontSize: '1rem',
      color: '#272622',
    }}>
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('home');
        }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        home
      </a>
      <a
        href="#work"
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        work
      </a>
      <a
        href="#play"
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        play
      </a>
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('about');
        }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        about
      </a>
    </nav>
  );
}

export default Dock;