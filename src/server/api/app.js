import express from 'express';
import cors from 'cors';
import {
  handleAddToWaitlist,
  handleGetWaitlist,
  handleDeleteWaitlistEntry,
  handleGetWaitlistStats
} from './server.js';

function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.post('/api/waitlist', handleAddToWaitlist);
  app.get('/api/waitlist', handleGetWaitlist);
  app.delete('/api/waitlist/:id', handleDeleteWaitlistEntry);
  app.get('/api/waitlist/stats', handleGetWaitlistStats);

  return app;
}

function startServer() {
  const app = createServer();
  const PORT = 3001;

  try {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

export { startServer, createServer };
