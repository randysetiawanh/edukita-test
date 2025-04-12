// src/index.ts

import express, { Request, Response, NextFunction } from 'express';
import apiRoutes from './routes/index';
import { authenticate } from './utils/auth';
import logger from './utils/logger';

const app = express();
const PORT = 10101;

// Middleware untuk parsing JSON body dari request
app.use(express.json());

// Middleware global untuk proteksi semua route di bawah "/api"
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  // Daftar route publik yang tidak membutuhkan token (whitelist)
  const publicRoutes = ['/auth/login', '/users'];

  // Cek apakah route saat ini termasuk route publik
  const isPublic = publicRoutes.some(path => req.path.startsWith(path));

  // Jika route publik, lanjut ke route berikutnya tanpa autentikasi
  if (isPublic) {
    return next();
  }

  // Jika bukan publik, jalankan middleware autentikasi
  return authenticate(req, res, next);
});

// Daftarkan semua route API dari folder "routes"
app.use('/api', apiRoutes);

// Middleware terakhir untuk menangani semua error yang tidak ditangani
// Error akan dicatat menggunakan winston logger ke file dan console
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack || err.message || err);
  res.status(500).json({
    status: false,
    message: 'Internal server error.',
  });
});

// Jalankan server di port yang telah ditentukan
// Info server akan dicatat ke console dan file log
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
