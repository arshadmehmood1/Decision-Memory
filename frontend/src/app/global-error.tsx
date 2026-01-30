'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-black text-white flex items-center justify-center min-h-screen p-6">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto border border-red-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-black uppercase tracking-tighter">System Critical Failure</h2>
                        <p className="text-gray-500 text-sm font-medium">An unexpected error occurred.</p>
                    </div>

                    <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-left">
                        <p className="font-mono text-xs text-red-200 break-all">
                            {error?.message || 'An unexpected error occurred'}
                        </p>
                        {error?.digest && (
                            <p className="font-mono text-[10px] text-red-400 mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-gray-200 transition-colors"
                    >
                        Reinitialize System
                    </button>
                </div>
            </body>
        </html>
    );
}
