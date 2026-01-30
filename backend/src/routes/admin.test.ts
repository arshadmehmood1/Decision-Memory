import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

// Mock the auth middleware to control user roles
vi.mock('../middleware/auth', () => ({
    authMiddleware: (req: any, res: any, next: any) => {
        // Default to ADMIN for admin tests, override in specific tests if needed
        req.userId = 'test-admin-id';
        req.workspaceId = 'test-workspace-id';
        req.userRole = req.headers['x-test-role'] || 'ADMIN';
        next();
    },
    requireRole: (role: string) => (req: any, res: any, next: any) => {
        const userRole = req.headers['x-test-role'] || 'ADMIN';
        if (userRole !== role && role === 'ADMIN') {
            return res.status(403).json({ success: false, error: 'Forbidden' });
        }
        next();
    }
}));

// Mock Prisma
vi.mock('../lib/prisma', () => {
    const mockPrisma = {
        user: { count: vi.fn().mockResolvedValue(0), findMany: vi.fn().mockResolvedValue([]), update: vi.fn().mockResolvedValue({}) },
        workspace: { count: vi.fn().mockResolvedValue(0) },
        userActivity: { count: vi.fn().mockResolvedValue(0), findMany: vi.fn().mockResolvedValue([]), aggregate: vi.fn().mockResolvedValue({ _avg: { duration: 0 } }), create: vi.fn().mockResolvedValue({}) },
        priceConfig: { findMany: vi.fn().mockResolvedValue([]), create: vi.fn().mockResolvedValue({}), upsert: vi.fn().mockResolvedValue({}), delete: vi.fn().mockResolvedValue({}), deleteMany: vi.fn().mockResolvedValue({ count: 0 }), createMany: vi.fn().mockResolvedValue({ count: 0 }) },
        pageVersion: { create: vi.fn().mockResolvedValue({}), upsert: vi.fn().mockResolvedValue({}), findUnique: vi.fn().mockResolvedValue({}), update: vi.fn().mockResolvedValue({}), updateMany: vi.fn().mockResolvedValue({ count: 0 }), findMany: vi.fn().mockResolvedValue([]), delete: vi.fn().mockResolvedValue({}) },
        systemBroadcast: { create: vi.fn().mockResolvedValue({ id: '1' }) },
        notification: { createMany: vi.fn().mockResolvedValue({ count: 0 }) }
    };
    return {
        prisma: mockPrisma,
        default: mockPrisma
    };
});

describe('Admin API Integration', () => {

    describe('RBAC (Role Based Access Control)', () => {
        it('should block non-admin users from admin routes', async () => {
            const res = await request(app)
                .get('/api/admin/stats')
                .set('x-test-role', 'MEMBER');

            expect(res.status).toBe(403);
            expect(res.body.error).toContain('Forbidden');
        });

        it('should allow admin users to access admin routes', async () => {
            (prisma.user.count as any).mockResolvedValue(10);
            (prisma.workspace.count as any).mockResolvedValue(5);
            (prisma.userActivity.findMany as any).mockResolvedValue([]);
            (prisma.userActivity.aggregate as any).mockResolvedValue({ _avg: { duration: 0 } });

            const res = await request(app)
                .get('/api/admin/stats')
                .set('x-test-role', 'ADMIN');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('GET /api/admin/stats', () => {
        it('should return system-wide statistics', async () => {
            (prisma.user.count as any).mockResolvedValue(100);
            (prisma.workspace.count as any).mockResolvedValue(50);
            (prisma.userActivity.findMany as any).mockResolvedValue([]);
            (prisma.userActivity.aggregate as any).mockResolvedValue({ _avg: { duration: 120 } });

            const res = await request(app)
                .get('/api/admin/stats');

            expect(res.status).toBe(200);
            expect(res.body.data).toHaveProperty('userCount', 100);
            expect(res.body.data).toHaveProperty('paidUserCount', 50);
        });
    });

    describe('POST /api/admin/pricing', () => {
        it('should update pricing configuration', async () => {
            const payload = {
                planTier: 'PRO',
                amount: 29.99,
                countryCode: 'US',
                currency: 'USD'
            };

            (prisma as any).priceConfig.upsert.mockResolvedValue({ id: '1' });

            const res = await request(app)
                .post('/api/admin/pricing')
                .send(payload);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('id', '1');
        });

        it('should validate pricing payload', async () => {
            const res = await request(app)
                .post('/api/admin/pricing')
                .send({ planTier: 'INVALID' });

            expect(res.status).toBe(400);
        });
    });

    describe('POST /api/admin/broadcast', () => {
        it('should track global broadcasts', async () => {
            const payload = {
                title: 'System Maintenance',
                message: 'All sectors will be offline for 10 minutes.',
                type: 'WARNING'
            };

            (prisma as any).systemBroadcast.create.mockResolvedValue({ id: '1' });
            (prisma as any).user.findMany.mockResolvedValue([{ id: 'user-1' }]);
            (prisma as any).notification.createMany.mockResolvedValue({ count: 1 });

            const res = await request(app)
                .post('/api/admin/broadcast')
                .send(payload);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
        });
    });

    describe('CMS Matrix Workflow', () => {
        let draftId: string;

        it('should create a new page version draft', async () => {
            (prisma as any).pageVersion.create.mockResolvedValue({ id: 'draft-123' });

            const res = await request(app)
                .post('/api/admin/cms/version')
                .send({
                    pageName: 'landing',
                    content: JSON.stringify({ hero: 'New Hero' }),
                    changes: 'Experimental hero text'
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            draftId = res.body.data.id;
        });

        it('should approve a draft and make it live', async () => {
            (prisma as any).pageVersion.findUnique.mockResolvedValue({ id: 'draft-123', pageId: 'page-1', page: { id: 'page-1' } });
            (prisma as any).pageVersion.updateMany.mockResolvedValue({ count: 1 });
            (prisma as any).pageVersion.update.mockResolvedValue({ id: 'draft-123', status: 'LIVE' });

            const res = await request(app)
                .post('/api/admin/cms/approve')
                .send({ id: 'draft-123' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
