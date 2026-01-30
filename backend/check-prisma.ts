import { prisma } from './src/lib/prisma.js';

const models = Object.keys(prisma).filter(k => typeof (prisma as any)[k] === 'object' && !k.startsWith('$') && !k.startsWith('_'));
console.log('Detected Prisma Models (lowerCamelCase expected):');
models.forEach(m => console.log(`- ${m}`));

if ((prisma as any).userActivity) {
    console.log('SUCCESS: userActivity found');
    console.log('userActivity keys:', Object.keys((prisma as any).userActivity));
} else {
    console.log('FAILURE: userActivity NOT found');
}
process.exit(0);
