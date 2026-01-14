export default function PhotoLabel({ count = 5 }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
    }}>
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#0A84FF" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#0A84FF" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#0A84FF" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#0A84FF" />
      </svg>
      <span
        style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#0A84FF',
        }}
      >
        {count} Photos
      </span>
    </div>
  );
}
