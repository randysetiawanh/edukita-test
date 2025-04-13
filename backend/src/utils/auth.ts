// src/utils/auth.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient, UserRoles } from '@prisma/client';

// Inisialisasi Prisma client untuk akses database
const prisma = new PrismaClient();

// Tipe payload yang akan disimpan di dalam JWT
export interface AuthPayload {
  userId: string;
  role: string;
}

// Ambil secret key dari .env, atau fallback ke string kosong
const JWT_SECRET = process.env.JWT_SECRET || '';

// Middleware autentikasi global
// Mengecek apakah request memiliki token valid dan user masih ada
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Jika tidak ada header Authorization, tolak akses
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: false, message: 'No token provided.' });
  }

  // Ambil token dari header
  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi token menggunakan secret, hasilnya adalah payload
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    // Cari user berdasarkan ID yang ada di token
    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
    });

    // Jika user tidak ditemukan, tolak akses
    if (!user) {
      return res.status(401).json({ status: false, message: 'Invalid token. User not found.' });
    }

    // Simpan user ke dalam request (untuk digunakan di route berikutnya)
    (req as any).user = user;

    // Lanjut ke handler berikutnya
    next();
  } catch (err) {
    // Jika token invalid atau expired
    return res.status(401).json({ status: false, message: 'Invalid or expired token.' });
  }
};

// Middleware untuk validasi role user sesuai yang diharapkan
// Misalnya: hanya 'teacher' yang boleh akses route tertentu
export const requireRole = (role: UserRoles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.role !== role) {
      return res.status(403).json({
        status: false,
        message: `Only ${role}s can access this route.`,
      });
    }
    next();
  };
};

// Utility untuk membuat token JWT dari user ID dan role
export const generateToken = (userId: string, role: string): string => {
  const payload = { userId, role };

  return jwt.sign(payload, JWT_SECRET, {
    // Lama token berlaku, bisa di-set dari .env
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
  });
};