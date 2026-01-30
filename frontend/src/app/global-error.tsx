'use client';

// Force dynamic rendering to avoid static generation issues on Render
export const dynamic = 'force-dynamic';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0 }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '10px' }}>Application Error</h2>
                <p style={{ color: '#888', marginBottom: '20px' }}>A critical system error occurred.</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{ padding: '10px 20px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Reload Application
                </button>
                {error?.digest && (
                    <p style={{ fontSize: '10px', color: '#444', marginTop: '20px' }}>Ref: {error.digest}</p>
                )}
            </div>
        </div>
    );
}
