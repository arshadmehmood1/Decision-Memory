
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

async function verifyClerk() {
    if (!CLERK_SECRET_KEY) {
        console.error('❌ CLERK_SECRET_KEY not found in .env');
        process.exit(1);
    }

    console.log('--- Verifying Clerk Secret Key ---');
    console.log(`Key starts with: ${CLERK_SECRET_KEY.substring(0, 7)}...`);

    try {
        const response = await fetch('https://api.clerk.com/v1/users?limit=1', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ SUCCESS: Clerk Secret Key is valid.');
            console.log('Clerk response (1st user or empty list):', Array.isArray(data) ? `Found ${data.length} users.` : 'Response received.');
        } else {
            console.error('❌ FAILED: Clerk API returned an error.');
            console.error('Status:', response.status);
            console.error('Error Details:', data);
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ FAILED: Network error or script failure.');
        console.error(error);
        process.exit(1);
    }
}

verifyClerk();
