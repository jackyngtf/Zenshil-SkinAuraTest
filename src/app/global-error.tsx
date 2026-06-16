'use client';

// Owns the full document: global-error replaces the root layout entirely,
// so globals.css / Tailwind are NOT loaded here — inline styles only.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-HK">
      <body
        style={{
          margin: 0,
          display: 'flex',
          minHeight: '100dvh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8f5ef',
          padding: '0 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '24rem' }}>
          <p
            style={{
              marginBottom: '0.75rem',
              fontFamily: 'ui-serif, Georgia, serif',
              fontSize: '13px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#a8a29e',
            }}
          >
            Zenshil
          </p>
          <h1
            style={{
              fontFamily: 'ui-serif, Georgia, serif',
              fontSize: '22px',
              lineHeight: 1.4,
              margin: '0 0 0.75rem',
              color: '#292524',
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontSize: '14px',
              lineHeight: 1.7,
              margin: '0 0 2rem',
              color: '#78716c',
            }}
          >
            Please try again. If the problem persists, refresh the page.
          </p>
          <button
            onClick={reset}
            style={{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.04em',
              color: '#ffffff',
              background: '#292524',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.75rem 1.75rem',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
