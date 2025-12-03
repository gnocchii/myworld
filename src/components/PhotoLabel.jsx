export default function PhotoLabel({ count = 5 }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="2" fill="#0A84FF" />
        <rect x="16" y="2" width="10" height="10" rx="2" fill="#0A84FF" />
        <rect x="2" y="16" width="10" height="10" rx="2" fill="#0A84FF" />
        <rect x="16" y="16" width="10" height="10" rx="2" fill="#0A84FF" />
      </svg>
      <span
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: '#0A84FF',
        }}
      >
        {count} Photos
      </span>
    </div>
  );
}
