import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { DatabaseConnection } from './database/connection';
import eventRoutes from './routes/eventRoutes';
import { specs } from './config/swagger';
import { container } from './di/di.dependencies';

// Load environment variables
// config();

const app = express();
const PORT = process.env.PORT || 3000;

// Register database connection in DI container


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Events API Documentation'
}));

// Routes
app.use('/api', eventRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

/**
 * Start the server
 */
async function startServer() {
  try {
    // Test database connection
    const db = container.resolve(DatabaseConnection);
    await db.query('SELECT NOW()');
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  const db = container.resolve(DatabaseConnection);
  await db.close();
  process.exit(0);
});