
/**
 * Mock Email Service for Decision Memory
 * In development, this just logs to console with styling.
 */

export interface MailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

const logEmail = (options: MailOptions) => {
    console.log('\n' + '✉️ '.repeat(20));
    console.log(`[EMAIL SENDING] To: ${options.to}`);
    console.log(`[SUBJECT] ${options.subject}`);
    console.log(`[BODY] ${options.text}`);
    console.log('✉️ '.repeat(20) + '\n');
};

export const mailService = {
    sendWelcomeEmail: async (email: string, name: string) => {
        await logEmail({
            to: email,
            subject: 'Welcome to Decision Memory 🧠',
            text: `Hi ${name || 'there'},\n\nWelcome to Decision Memory. We're excited to help you track and improve your strategic choices.\n\nStart by logging your first decision today!`,
        });
    },

    sendSubscriptionSuccessEmail: async (email: string, plan: string) => {
        await logEmail({
            to: email,
            subject: `Upgrade Successful: Welcome to ${plan}! 🚀`,
            text: `Your workspace has been upgraded to the ${plan} tier. All premium features are now unlocked.`,
        });
    },

    sendDecisionMilestoneEmail: async (email: string, count: number) => {
        await logEmail({
            to: email,
            subject: `Milestone Reached: ${count} Decisions Logged! 📈`,
            text: `Congratulations! You've logged ${count} decisions in Decision Memory. Your analytical data is growing stronger.`,
        });
    }
};
