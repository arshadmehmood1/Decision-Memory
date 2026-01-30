import { Router, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { prisma } from '../lib/prisma.js';
import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from '../lib/validation.js';
import { badRequest, notFound, forbidden } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/workspaces - List user's workspaces
 */
router.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw badRequest('Authentication required');
        }

        const workspaces = await prisma.workspace.findMany({
            where: {
                users: {
                    some: { id: req.userId as string },
                },
            },
            include: {
                _count: { select: { users: true, decisions: true } },
            },
        });

        res.json({ success: true, data: workspaces });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/workspaces/:id - Get workspace details
 */
router.get('/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw badRequest('Authentication required');
        }

        const workspace = await prisma.workspace.findFirst({
            where: {
                id: req.params.id as string,
                users: { some: { id: req.userId as string } },
            },
            include: {
                users: { select: { id: true, name: true, email: true, role: true } },
                _count: { select: { decisions: true } },
            },
        });

        if (!workspace) {
            throw notFound('Workspace not found');
        }

        res.json({ success: true, data: workspace });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/workspaces - Create a new workspace
 */
router.post('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw badRequest('Authentication required: User ID missing');
        }

        const parsed = CreateWorkspaceSchema.safeParse(req.body);
        if (!parsed.success) {
            throw badRequest(parsed.error.errors.map(e => e.message).join(', '));
        }

        // Check workspace limit for free tier
        const existingCount = await prisma.workspace.count({
            where: { createdBy: req.userId },
        });

        if (existingCount >= 1) {
            // Check if user has upgraded plan
            const user = await prisma.user.findUnique({
                where: { id: req.userId },
                include: { workspace: true },
            });

            if (user?.workspace.planTier === 'FREE') {
                throw forbidden('Free tier users can only have 1 workspace. Upgrade to Pro for more.');
            }
        }

        const workspace = await prisma.workspace.create({
            data: {
                name: parsed.data.name,
                createdBy: req.userId,
                users: {
                    connect: { id: req.userId },
                },
            },
        });

        res.status(201).json({ success: true, data: workspace });
    } catch (error) {
        next(error);
    }
});

/**
 * PATCH /api/workspaces/:id - Update workspace
 */
router.patch('/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw badRequest('Authentication required');
        }

        const parsed = UpdateWorkspaceSchema.safeParse(req.body);
        if (!parsed.success) {
            throw badRequest(parsed.error.errors.map(e => e.message).join(', '));
        }

        // Verify ownership
        const workspace = await prisma.workspace.findFirst({
            where: {
                id: req.params.id as string,
                createdBy: req.userId as string,
            },
        });

        if (!workspace) {
            throw notFound('Workspace not found or you are not the owner');
        }

        const updated = await prisma.workspace.update({
            where: { id: req.params.id as string },
            data: parsed.data,
        });

        res.json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/workspaces/:id/stats - Get workspace statistics
 */
router.get('/:id/stats', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw badRequest('Authentication required');
        }

        const workspace = await prisma.workspace.findFirst({
            where: {
                id: req.params.id as string,
                users: { some: { id: req.userId as string } },
            },
        });

        if (!workspace) {
            throw notFound('Workspace not found');
        }

        const [total, succeeded, failed, reversed, active, byCategory] = await Promise.all([
            prisma.decision.count({ where: { workspaceId: req.params.id as string } }),
            prisma.decision.count({ where: { workspaceId: req.params.id as string, status: 'SUCCEEDED' } }),
            prisma.decision.count({ where: { workspaceId: req.params.id as string, status: 'FAILED' } }),
            prisma.decision.count({ where: { workspaceId: req.params.id as string, status: 'REVERSED' } }),
            prisma.decision.count({ where: { workspaceId: req.params.id as string, status: 'ACTIVE' } }),
            prisma.decision.groupBy({
                by: ['category'],
                where: { workspaceId: req.params.id as string },
                _count: true,
            }),
        ]);

        const reviewCount = succeeded + failed + reversed;
        const successRate = reviewCount > 0 ? Math.round((succeeded / reviewCount) * 100) : 0;

        res.json({
            success: true,
            data: {
                total,
                succeeded,
                failed,
                reversed,
                active,
                successRate,
                byCategory: (byCategory as any[]).reduce((acc, item) => {
                    acc[item.category] = item._count;
                    return acc;
                }, {} as Record<string, number>),
            },
        });
    } catch (error) {
        next(error);
    }
});

export default router;
