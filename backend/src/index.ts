import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic routing structure
app.get('/', (req, res) => {
  res.json({
    message: 'PMP Intelligent Flashcard System API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      cards: '/api/cards',
      review: '/api/review',
      stats: '/api/stats',
      webhook: '/webhook/sync'
    }
  });
});

// Protected routes will be added here with authMiddleware
// app.use('/api', authMiddleware);
// app.use('/api/cards', cardsRouter);
// app.use('/api/review', reviewRouter);
// app.use('/api/stats', statsRouter);

// Webhook endpoint (no auth required)
app.post('/webhook/sync', async (req, res) => {
  // GitHub sync webhook - to be implemented
  res.json({ received: true });
});

// Error handler middleware
app.use(
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error'
    });
  }
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Server startup
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  process.exit(0);
});

start();

export default app;
