import { Router, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

/**
 * GET /api/public/community - Fetch public decisions for anonymous viewing
 */
router.get('/community', async (req: any, res: Response, next: NextFunction) => {
    try {
        const decisions = await prisma.decision.findMany({
            where: {
                privacy: {
                    in: ['Public Community', 'Anonymous Public']
                }
            },
            take: 20,
            orderBy: { madeOn: 'desc' },
            include: {
                madeBy: { select: { id: true, name: true } },
                _count: { select: { assumptions: true } },
            },
        });

        const parsedDecisions = decisions.map(d => ({
            ...d,
            alternativesConsidered: d.alternativesConsidered ? JSON.parse(d.alternativesConsidered as string) : [],
            successCriteria: d.successCriteria ? JSON.parse(d.successCriteria as string) : [],
            tags: d.tags ? JSON.parse(d.tags as string) : [],
        }));

        res.json({
            success: true,
            data: parsedDecisions
        });
    } catch (error) {
        next(error);
    }
});


/**
 * GET /api/public/cms/:pageName - Fetch latest LIVE version of a page
 */
router.get('/cms/:pageName', async (req: any, res: Response, next: NextFunction) => {
    try {
        const version = await prisma.pageVersion.findFirst({
            where: {
                pageName: req.params.pageName,
                status: 'LIVE'
            },
            orderBy: { approvedAt: 'desc' }
        });

        if (!version) {
            return res.json({ success: true, data: null });
        }

        res.json({
            success: true,
            data: {
                ...version,
                content: JSON.parse(version.content)
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
