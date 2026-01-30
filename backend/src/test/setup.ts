import { vi, beforeAll, afterAll } from 'vitest';

// Mock Prisma Client
vi.mock('../lib/prisma', () => ({
    prisma: {
        decision: {
            findMany: vi.fn(),
            findFirst: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            count: vi.fn(),
        },
        user: {
            findUnique: vi.fn(),
            update: vi.fn(),
        },
        workspace: {
            findMany: vi.fn(),
            count: vi.fn(),
        },
        comment: {
            findMany: vi.fn(),
            create: vi.fn(),
            delete: vi.fn(),
            findFirst: vi.fn(),
        },
        insight: {
            findMany: vi.fn(),
            create: vi.fn(),
            count: vi.fn(),
        },
        pageVersion: {
            findMany: vi.fn(),
            findFirst: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        priceConfig: {
            findMany: vi.fn(),
            findFirst: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
        },
        systemBroadcast: {
            create: vi.fn(),
        },
        userActivity: {
            count: vi.fn(),
            findMany: vi.fn(),
            aggregate: vi.fn(),
        },
        notification: {
            createMany: vi.fn(),
        },
        $disconnect: vi.fn(),
    },
}));

beforeAll(() => {
    console.log('Starting tests...');
});

afterAll(() => {
    vi.clearAllMocks();
});
