// src/utils/logger.ts

import { createLogger, format, transports } from 'winston';
import path from 'path';

// Buat custom format log: [timestamp] LEVEL: message
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Inisialisasi logger utama
const logger = createLogger({
  // Level default: hanya log level 'info' ke atas (info, warn, error)
  level: 'info',

  // Format default: timestamp + custom log format
  format: format.combine(format.timestamp(), logFormat),

  // Transports: logger dikirim ke beberapa tempat
  transports: [
    // Tampilkan log ke console (untuk development)
    new transports.Console({
      format: format.combine(
        format.colorize(), // Beri warna berdasarkan level log
        format.simple()    // Format sederhana untuk console
      ),
    }),

    // Simpan log level 'error' ke file logs/error.log
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }),

    // Simpan semua log (termasuk info, warn, error) ke file logs/combined.log
    new transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
    }),
  ],
});

// Export logger agar bisa digunakan di seluruh aplikasi
export default logger;