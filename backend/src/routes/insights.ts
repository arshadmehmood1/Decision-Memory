import { Router, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { prisma } from '../lib/prisma.js';
import { InsightFiltersSchema } from '../lib/validation.js';
import { badRequest, notFound } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/insights - List workspace insights
 */
router.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const parsed = InsightFiltersSchema.safeParse(req.query);
        if (!parsed.success) {
            throw badRequest(parsed.error.errors.map(e => e.message).join(', '));
        }

        const { page, limit, includeDismissed } = parsed.data;
        const skip = (page - 1) * limit;

        const where: any = {
            workspaceId: req.workspaceId,
        };

        if (!includeDismissed) {
            where.dismissed = false;
        }

        const [insights, total] = await Promise.all([
            prisma.insight.findMany({
                where,
                skip,
                take: limit,
                orderBy: { generatedAt: 'desc' },
            }),
            prisma.insight.count({ where }),
        ]);

        // Parse relatedDecisions JSON
        const parsedInsights = insights.map(i => ({
            ...i,
            relatedDecisions: i.relatedDecisions ? JSON.parse(i.relatedDecisions) : [],
        }));

        res.json({
            success: true,
            data: parsedInsights,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/insights/generate - Generate insights for workspace
 */
router.post('/generate', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // Check if workspace has enough decisions (min 10 for meaningful insights)
        const decisionCount = await prisma.decision.count({
            where: { workspaceId: req.workspaceId },
        });

        if (decisionCount < 10) {
            res.json({
                success: true,
                data: {
                    generated: false,
                    message: `Need at least 10 decisions for insights. You have ${decisionCount}.`,
                    required: 10,
                    current: decisionCount,
                },
            });
            return;
        }

        // Get all decisions for analysis
        const decisions = await prisma.decision.findMany({
            where: { workspaceId: req.workspaceId },
            include: {
                assumptions: true,
                review: true,
            },
        });

        // Calculate basic stats
        const total = decisions.length;
        const succeeded = decisions.filter(d => d.status === 'SUCCEEDED').length;
        const failed = decisions.filter(d => d.status === 'FAILED').length;
        const reversed = decisions.filter(d => d.status === 'REVERSED').length;
        const successRate = total > 0 ? Math.round((succeeded / (succeeded + failed + reversed || 1)) * 100) : 0;

        // Category breakdown
        const categoryStats = decisions.reduce((acc, d) => {
            acc[d.category] = (acc[d.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topCategory = Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0];

        // Generate insights (mock for now, real AI when enabled)
        const generatedInsights: { type: string; title: string; description: string; decisionIds: string[] }[] = [];

        // Insight 1: Success Rate
        generatedInsights.push({
            type: 'SUCCESS_RATE',
            title: `Your decision success rate is ${successRate}%`,
            description: `Out of ${succeeded + failed + reversed} decisions with outcomes, ${succeeded} succeeded, ${failed} failed, and ${reversed} were reversed.`,
            decisionIds: decisions.filter(d => d.review).map(d => d.id).slice(0, 5),
        });

        // Insight 2: Category Trend
        if (topCategory) {
            generatedInsights.push({
                type: 'CATEGORY_TREND',
                title: `Most decisions are in ${topCategory[0]} category`,
                description: `You've made ${topCategory[1]} decisions in the ${topCategory[0]} category, which is ${Math.round((topCategory[1] / total) * 100)}% of all decisions.`,
                decisionIds: decisions.filter(d => d.category === topCategory[0]).map(d => d.id).slice(0, 5),
            });
        }

        // Insight 3: Assumption patterns (if enough validated assumptions)
        const validatedAssumptions = decisions.flatMap(d => d.assumptions.filter(a => a.validatedAs));
        const falseAssumptions = validatedAssumptions.filter(a => a.validatedAs === 'FALSE');
        if (falseAssumptions.length >= 3) {
            generatedInsights.push({
                type: 'ASSUMPTION_BLINDSPOT',
                title: `${falseAssumptions.length} assumptions turned out to be false`,
                description: 'Review your past assumptions to identify patterns in your blind spots.',
                decisionIds: [...new Set(falseAssumptions.map(a => a.decisionId))].slice(0, 5),
            });
        }

        // Additional rule-based insight: Reversals pattern
        const reversals = decisions.filter(d => d.status === 'REVERSED');
        if (reversals.length >= 2) {
            generatedInsights.push({
                type: 'REVERSAL_PATTERN',
                title: `${reversals.length} decisions were reversed`,
                description: 'Consider whether these reversals could have been avoided with more thorough analysis upfront.',
                decisionIds: reversals.map(d => d.id).slice(0, 5),
            });
        }

        // Save insights to database
        const savedInsights = await Promise.all(
            generatedInsights.map(insight =>
                prisma.insight.create({
                    data: {
                        workspaceId: req.workspaceId!,
                        insightType: insight.type,
                        title: insight.title,
                        description: insight.description,
                        relatedDecisions: JSON.stringify(insight.decisionIds),
                    },
                })
            )
        );

        res.status(201).json({
            success: true,
            data: {
                generated: true,
                count: savedInsights.length,
                insights: savedInsights.map(i => ({
                    ...i,
                    relatedDecisions: JSON.parse(i.relatedDecisions),
                })),
            },
        });
    } catch (error) {
        next(error);
    }
});

/**
 * PATCH /api/insights/:id/dismiss - Dismiss an insight
 */
router.patch('/:id/dismiss', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.workspaceId) {
            throw badRequest('Workspace ID required');
        }

        const insight = await prisma.insight.findFirst({
            where: {
                id: req.params.id as string,
                workspaceId: req.workspaceId as string,
            },
        });

        if (!insight) {
            throw notFound('Insight not found');
        }

        const updated = await prisma.insight.update({
            where: { id: req.params.id as string },
            data: { dismissed: true },
        });

        res.json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
});

export default router;
