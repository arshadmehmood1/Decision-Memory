import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.js';
import { prisma } from '../lib/prisma.js';
import { PLANS, PlanType } from '../config/plans.js';
import { paymentRequired } from './errorHandler.js';

export const checkLimit = (feature: 'DECISIONS' | 'MEMBERS') => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const workspaceId = req.workspaceId;
            if (!workspaceId) return next();

            const workspace = await prisma.workspace.findUnique({
                where: { id: workspaceId },
                select: { planTier: true }
            });

            if (!workspace) return next();

            const plan = (workspace.planTier as PlanType) || 'FREE';
            const limit = PLANS[plan][feature];

            // If unlimited (-1), pass
            if (limit === -1) return next();

            // Check usage
            let usage = 0;
            if (feature === 'DECISIONS') {
                usage = await prisma.decision.count({
                    where: { workspaceId }
                });
            } else if (feature === 'MEMBERS') {
                usage = await prisma.user.count({
                    where: { workspaceId }
                });
            }

            if (usage >= limit) {
                throw paymentRequired(`You have reached the limit of ${limit} ${feature.toLowerCase()} on the ${plan} plan. Please upgrade.`);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
