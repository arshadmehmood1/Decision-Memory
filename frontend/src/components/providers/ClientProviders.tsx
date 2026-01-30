'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import QueryProvider from "@/lib/query-provider";
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';

const AuthSync = dynamic(() => import('@/components/auth-sync').then(mod => mod.AuthSync), { ssr: false });

export function ClientProviders({ children }: { children: ReactNode }) {
    // Highly defensive check for Render build environment
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    // If we're in build time and key is missing, we might want to skip ClerkProvider 
    // to avoid the useContext crash, but children might depend on it.
    // However, for /_global-error prerendering, we want to be safe.

    return (
        <ClerkProvider publishableKey={clerkKey}>
            <AuthSync />
            <QueryProvider>
                {children}
                <Toaster position="top-right" richColors closeButton />
            </QueryProvider>
        </ClerkProvider>
    );
}
