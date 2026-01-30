'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // Prevent any rendering during SSR or build time (which causes the useContext error on Render)
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div
            style={{
                fontFamily: 'system-ui, sans-serif',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                margin: 0,
                padding: '20px',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '10px' }}>Application Error</h2>
                <p style={{ color: '#888', marginBottom: '20px' }}>A critical system error occurred.</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Reload
                </button>
                {error?.digest && (
                    <p style={{ fontSize: '12px', color: '#444', marginTop: '20px' }}>
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
