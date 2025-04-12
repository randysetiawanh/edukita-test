// src/index.ts

import express, { Request, Response, NextFunction } from 'express';
import apiRoutes from './routes/index';
import { authenticate } from './utils/auth';
import logger from './utils/logger'; // import logger

const app = express();
const PORT = 10101;

app.use(express.json());

// Middleware untuk proteksi semua route kecuali whitelist
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  const publicRoutes = ['/auth/login', '/users'];

  const isPublic = publicRoutes.some(path => req.path.startsWith(path));

  if (isPublic) {
    return next(); // Skip authenticate
  }

  return authenticate(req, res, next);
});

// Main API Route
app.use('/api', apiRoutes);

// Global error handler (winston + fallback response)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack || err.message || err); // ⬅️ log ke file dan console
  res.status(500).json({
    status: false,
    message: 'Internal server error.',
  });
});

// Server started log
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
