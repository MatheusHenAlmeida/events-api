"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const connection_1 = require("./database/connection");
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const swagger_1 = require("./config/swagger");
const di_dependencies_1 = require("./di/di.dependencies");
// Load environment variables
// config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Register database connection in DI container
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Events API Documentation'
}));
// Routes
app.use('/api', eventRoutes_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
/**
 * Start the server
 */
async function startServer() {
    try {
        // Test database connection
        const db = di_dependencies_1.container.resolve(connection_1.DatabaseConnection);
        await db.query('SELECT NOW()');
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    const db = di_dependencies_1.container.resolve(connection_1.DatabaseConnection);
    await db.close();
    process.exit(0);
});
