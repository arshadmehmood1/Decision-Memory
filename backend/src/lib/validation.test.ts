import { describe, it, expect } from 'vitest';
import { GenerateTagsSchema } from '../lib/validation';

// We can test the rule-based logic helper functions if we export them,
// but since they are not exported, we can test the inputs/outputs via integration tests
// OR we can copy the logic into a purely utility file later.
// For now, let's test the Validation Schemas which is a good unit test.

describe('Validation Schemas', () => {
    describe('GenerateTagsSchema', () => {
        it('should validate valid input', () => {
            const input = {
                title: 'New Feature Launch',
                context: 'We are launching a new feature',
                theDecision: 'Launch on Monday',
            };
            const result = GenerateTagsSchema.safeParse(input);
            expect(result.success).toBe(true);
        });

        it('should fail if title is missing', () => {
            const input = {
                context: 'Context only',
            };
            const result = GenerateTagsSchema.safeParse(input);
            expect(result.success).toBe(false);
        });
    });
});
