import { PrismaClient } from '@prisma/client';
import process from 'process';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create a default workspace
    const workspace = await prisma.workspace.upsert({
        where: { id: 'dev-workspace-1' },
        update: {},
        create: {
            id: 'dev-workspace-1',
            name: "Demo Workspace",
            createdBy: 'dev-user-1',
            planTier: 'FREE',
        },
    });

    console.log('✓ Created workspace:', workspace.name);

    // Create a default user
    const user = await prisma.user.upsert({
        where: { id: 'dev-user-1' },
        update: {},
        create: {
            id: 'dev-user-1',
            clerkId: 'dev-clerk-1',
            email: 'demo@decisionmemory.com',
            name: 'Demo User',
            workspaceId: workspace.id,
            role: 'ADMIN',
        },
    });

    console.log('✓ Created user:', user.name);

    // Create sample decisions
    const decisions = [
        {
            id: 'decision-1',
            title: 'Switch from Heroku to Railway',
            category: 'TECH' as const,
            status: 'SUCCEEDED' as const,
            theDecision: "We're migrating all production services to Railway to cut costs and improve DX.",
            context: "Heroku's pricing increased 40% and our build times were hitting 20m+. We need a modern PaaS.",
            alternativesConsidered: [
                { name: 'AWS ECS', whyRejected: 'Too much DevOps overhead for our team size.' },
                { name: 'Render', whyRejected: 'Lacked specific region support we need.' },
            ],
            successCriteria: ['Monthly bill <$100', 'Build times <5m'],
            tags: ['infrastructure', 'cost-cutting', 'migration'],
            assumptions: [
                { text: 'Migration will take <2 weeks' },
                { text: 'Railway uptime matches Heroku' },
            ],
        },
        {
            id: 'decision-2',
            title: 'Hire Senior Frontend Engineer',
            category: 'HIRING' as const,
            status: 'SUCCEEDED' as const,
            theDecision: 'Hired a senior engineer with React/Next.js expertise.',
            context: 'Feature delivery velocity was slowing down due to frontend bottlenecks.',
            alternativesConsidered: [
                { name: 'Hire 2 Juniors', whyRejected: 'Need immediate architectural impact.' },
                { name: 'Outsource Agency', whyRejected: 'Need long-term product ownership.' },
            ],
            successCriteria: ['Velocity +40%'],
            tags: ['team-growth', 'culture'],
            assumptions: [{ text: 'Onboarding time <1 month' }],
        },
        {
            id: 'decision-3',
            title: 'Pivot to Enterprise Sales Motion',
            category: 'SALES' as const,
            status: 'ACTIVE' as const,
            theDecision: 'Shift focus from PLG to top-down Enterprise sales for Q1 2026.',
            context: 'Churn is high in SMB segment. Enterprise contracts offer better LTV/CAC.',
            alternativesConsidered: [
                { name: 'Fix SMB Churn', whyRejected: 'Market structure issue, not product issue.' },
            ],
            successCriteria: ['$50k ARR added'],
            tags: ['strategy', 'enterprise', 'pivot'],
            assumptions: [{ text: 'We can close 3 logos in Q1' }],
        },
        {
            id: 'decision-4',
            title: 'Implement Usage-Based Pricing',
            category: 'PRODUCT' as const,
            status: 'ACTIVE' as const,
            theDecision: 'Moving from seat-based to event-based pricing model.',
            context: 'Seat-based pricing is limiting expansion revenue.',
            alternativesConsidered: [
                { name: 'Feature Gating', whyRejected: 'Competitors are doing it for free.' },
            ],
            successCriteria: ['NRR increases to 120%'],
            tags: ['pricing', 'revenue'],
            assumptions: [{ text: 'Customers prefer pay-as-you-go' }],
        },
        {
            id: 'decision-5',
            title: 'Open Source the UI Library',
            category: 'MARKETING' as const,
            status: 'FAILED' as const,
            theDecision: 'Publishing our internal UI kit as an open source package.',
            context: 'Expected to drive developer brand awareness and hiring.',
            alternativesConsidered: [],
            successCriteria: ['1k GitHub Stars'],
            tags: ['opensource', 'marketing'],
            assumptions: [{ text: 'Community will contribute back' }],
        },
    ];

    for (const d of decisions) {
        const { assumptions, alternativesConsidered, successCriteria, tags, ...decisionData } = d;

        await prisma.decision.upsert({
            where: { id: d.id },
            update: {},
            create: {
                ...decisionData,
                alternativesConsidered: JSON.stringify(alternativesConsidered),
                successCriteria: JSON.stringify(successCriteria),
                tags: JSON.stringify(tags),
                workspaceId: workspace.id,
                madeById: user.id,
                assumptions: {
                    create: assumptions.map(a => ({ text: a.text })),
                },
            } as any, // Cast to any for SQLite string handling
        });
    }

    console.log('✓ Created', decisions.length, 'sample decisions');
    console.log('✅ Seeding complete!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
