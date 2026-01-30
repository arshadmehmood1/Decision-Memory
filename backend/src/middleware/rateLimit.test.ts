import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Rate Limiting Middleware', () => {
    it('should include rate limit headers', async () => {
        const res = await request(app).get('/api/health');

        expect(res.status).toBe(200);
        expect(res.headers).toHaveProperty('ratelimit-limit');
        expect(res.headers).toHaveProperty('ratelimit-remaining');
    });

    // We don't want to actually exhaust the limit in tests as it slows things down,
    // but verifying headers confirms middleware is active.
});
