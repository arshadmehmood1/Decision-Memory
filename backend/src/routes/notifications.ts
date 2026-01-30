
import { Router, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { prisma } from '../lib/prisma.js';
import { notFound } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/notifications - Get user notifications
 */
router.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.json({ success: true, data: notifications });
    } catch (error) {
        next(error);
    }
});

/**
 * PATCH /api/notifications/:id/read - Mark notification as read
 */
router.patch('/:id/read', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const notification = await prisma.notification.findFirst({
            where: { id: req.params.id as string, userId: req.userId }
        });

        if (!notification) {
            throw notFound('Notification not found');
        }

        const updated = await prisma.notification.update({
            where: { id: req.params.id as string },
            data: { isRead: true }
        });

        res.json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/notifications/mark-all-read - Mark all as read
 */
router.post('/mark-all-read', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        await prisma.notification.updateMany({
            where: { userId: req.userId, isRead: false },
            data: { isRead: true }
        });

        res.json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        next(error);
    }
});

/**
 * Helper to create a notification (internal use)
 */
export async function createNotification(userId: string, data: { type: string, title: string, message: string, link?: string }) {
    return await prisma.notification.create({
        data: {
            userId,
            ...data
        }
    });
}

export default router;
