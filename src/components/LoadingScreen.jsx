import { useState, useEffect } from 'react';

export default function LoadingScreen({ onLoadingComplete, delayStart = 0 }) {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [canStart, setCanStart] = useState(delayStart === 0);
  const [fadeIn, setFadeIn] = useState(false);
  const maxChars = 8;

  // Fade in after a brief moment
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Delay start of password animation
  useEffect(() => {
    if (delayStart > 0) {
      const timer = setTimeout(() => setCanStart(true), delayStart);
      return () => clearTimeout(timer);
    }
  }, [delayStart]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Type password characters one by one (only after canStart)
  useEffect(() => {
    if (!canStart) return;

    if (password.length < maxChars) {
      const timer = setTimeout(() => {
        setPassword(prev => prev + '•');
      }, 250);
      return () => clearTimeout(timer);
    } else if (!isLoggingIn) {
      const timer = setTimeout(() => {
        setIsLoggingIn(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [password, isLoggingIn, canStart]);

  useEffect(() => {
    if (isLoggingIn) {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoggingIn]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onLoadingComplete]);

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 9999,
        opacity: fadeOut ? 0 : (fadeIn ? 1 : 0),
        transition: 'opacity 0.8s ease-in-out',
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.2)',
        }}
      />

      {/* Date and Time */}
      <div
        style={{
          position: 'fixed',
          top: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '1.2rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          {formatDate(currentTime)}
        </div>
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '5.5rem',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            lineHeight: 1,
          }}
        >
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Login section - positioned lower */}
      <div
        style={{
          position: 'absolute',
          bottom: '20vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* User Avatar */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #f5e6d3, #e8d4c0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        >
          <span style={{ fontSize: '1.75rem' }}>🧑‍💻</span>
        </div>

        {/* Username */}
        <div
          style={{
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 500,
            marginBottom: '1rem',
            textShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }}
        >
          Melody Yang
        </div>

        {/* Password Field */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              borderRadius: '8px',
              padding: '8px 16px',
              minWidth: '180px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {password.length > 0 ? (
              <span
                style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  letterSpacing: '2px',
                }}
              >
                {password}
              </span>
            ) : (
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.85rem',
                }}
              >
                Enter Password
              </span>
            )}
          </div>

          {/* Question mark button */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            ?
          </div>
        </div>

        {/* Helper text */}
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.8rem',
            marginTop: '1rem',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          {isLoggingIn ? 'Logging in...' : 'Your password is required to log in'}
        </div>
      </div>
    </div>
  );
}
