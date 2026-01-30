import app from './app.js';
import { config } from './config/env.js';

// Start server
app.listen(config.port, () => {
    console.log(`🚀 Decision Memory API running on http://localhost:${config.port}`);
    console.log(`📍 Environment: ${config.nodeEnv}`);
});

