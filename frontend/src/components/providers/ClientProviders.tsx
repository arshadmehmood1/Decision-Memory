'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import QueryProvider from "@/lib/query-provider";
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';

const AuthSync = dynamic(() => import('@/components/auth-sync').then(mod => mod.AuthSync), { ssr: false });

export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <AuthSync />
            <QueryProvider>
                {children}
                <Toaster position="top-right" richColors closeButton />
            </QueryProvider>
        </ClerkProvider>
    );
}
