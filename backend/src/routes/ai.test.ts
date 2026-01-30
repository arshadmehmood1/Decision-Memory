import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

const MOCK_HEADERS = {
    'x-mock-user-id': 'test-user-id',
    'x-mock-workspace-id': 'test-workspace-id'
};

describe('AI Routes Integration', () => {

    describe('POST /api/ai/blindspot', () => {
        it('should detect confirmation bias', async () => {
            const res = await request(app)
                .post('/api/ai/blindspot')
                .set(MOCK_HEADERS)
                .send({
                    title: 'Launch Feature',
                    context: 'It is absolutely perfect and obvious that we must do this.',
                    theDecision: 'Launch',
                    alternatives: ['Do nothing']
                });

            if (res.status !== 200) {
                console.error('FAIL STATUS:', res.status);
                console.error('BODY:', JSON.stringify(res.body, null, 2));
            }
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            const blindspots = res.body.data.blindspots.join(' ');
            if (!blindspots.includes('Confirmation Bias')) {
                console.error('BLINDSPOTS:', JSON.stringify(res.body.data.blindspots, null, 2));
            }
            expect(blindspots).toContain('Confirmation Bias');
            expect(blindspots).toContain('Lack of Alternatives');
        });

        it('should pass for balanced decision', async () => {
            const res = await request(app)
                .post('/api/ai/blindspot')
                .set(MOCK_HEADERS)
                .send({
                    title: 'Launch Feature',
                    context: 'We have analyzed the pros and cons deeply. The market data suggests a strong fit, but risks remain.',
                    theDecision: 'Launch MVP',
                    alternatives: ['Delay launch', 'Kill project', 'Launch beta']
                });

            if (res.status !== 200) {
                console.error('FAIL STATUS:', res.status);
                console.error('BODY:', JSON.stringify(res.body, null, 2));
            }
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            const blindspots = res.body.data.blindspots;
            if (blindspots.some((b: string) => b.includes('Lack of Alternatives'))) {
                console.error('UNEXPECTED BLINDSPOTS:', JSON.stringify(blindspots, null, 2));
            }
            expect(blindspots.some((b: string) => b.includes('Lack of Alternatives'))).toBe(false);
        });
    });

    describe('POST /api/ai/check-assumption', () => {
        it('should flag vague assumptions', async () => {
            const res = await request(app)
                .post('/api/ai/check-assumption')
                .set(MOCK_HEADERS)
                .send({
                    text: 'Users might mostly like this sort of thing maybe'
                });

            expect(res.status).toBe(200);
            expect(res.body.data.score).toBeLessThan(80);
            expect(res.body.data.issues.some((i: string) => i.includes('Vague Language'))).toBe(true);
        });

        it('should validate falsifiable assumptions', async () => {
            const res = await request(app)
                .post('/api/ai/check-assumption')
                .set(MOCK_HEADERS)
                .send({
                    text: 'Customer retention will increase by 15% in Q3 2024.'
                });

            expect(res.status).toBe(200);
            expect(res.body.data.score).toBeGreaterThan(80);
        });
    });

    describe('POST /api/ai/tag', () => {
        it('should extract relevant tags', async () => {
            const res = await request(app)
                .post('/api/ai/tag')
                .set(MOCK_HEADERS)
                .send({
                    title: 'Marketing Strategy for new Campaign',
                    context: 'Focus on growth and seo optimization',
                    theDecision: 'Run ads'
                });

            expect(res.status).toBe(200);
            const tags = res.body.data.tags;
            expect(tags).toContain('marketing');
            expect(tags.some((t: string) => ['growth', 'seo', 'campaign'].includes(t))).toBe(true);
        });
    });

    describe('POST /api/ai/risk', () => {
        it('should calculate critical risk for irreversible high impact', async () => {
            const res = await request(app)
                .post('/api/ai/risk')
                .set(MOCK_HEADERS)
                .send({
                    impact: 'CRITICAL',
                    reversibility: 'IRREVERSIBLE',
                    confidenceLevel: 95,
                    alternativesCount: 1,
                    assumptionsCount: 1
                });

            expect(res.status).toBe(200);
            expect(res.body.data.riskLevel).toBe('CRITICAL');
            expect(res.body.data.isNeuralHigh).toBe(true);
            expect(res.body.data.neuralInsight).toContain('NEURAL OVERLOAD');
        });

        it('should reduce risk for high depth and reversibility', async () => {
            const res = await request(app)
                .post('/api/ai/risk')
                .set(MOCK_HEADERS)
                .send({
                    impact: 'LOW',
                    reversibility: 'EASY',
                    confidenceLevel: 80,
                    alternativesCount: 4,
                    assumptionsCount: 5
                });

            expect(res.status).toBe(200);
            expect(res.body.data.riskLevel).toBe('LOW');
            expect(res.body.data.riskScore).toBeLessThan(30);
        });
    });

    describe('Neural Sentiment Analysis', () => {
        it('should detect neural overload in stressful language', async () => {
            const res = await request(app)
                .post('/api/ai/blindspot')
                .set(MOCK_HEADERS)
                .send({
                    title: 'Emergency Fix',
                    context: 'I am so overwhelmed and panicked about this emergency asap',
                    theDecision: 'Fix it now',
                    alternatives: []
                });

            expect(res.body.data.psychologicalTrace).toBe('NEURAL OVERLOAD DETECTED');
            expect(res.body.data.blindspots.some((b: string) => b.includes('Neural Overload'))).toBe(true);
        });
    });
});
