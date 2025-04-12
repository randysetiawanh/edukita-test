// src/controllers/authController.ts

import { Request, Response } from 'express';
import { PrismaClient, UserRoles } from '../generated/prisma';
import { generateToken } from '../utils/auth';

const prisma = new PrismaClient();
const INTERNAL_PASSWORD = process.env.AUTH_INTERNAL_PASSWORD || '';

// Controller untuk login internal menggunakan userId + password internal (bukan email/password konvensional)
export const internalLogin = async (req: Request, res: Response): Promise<Response> => {
  const { userId, password } = req.body;

  // Validasi input wajib: userId dan password harus diisi
  if (!userId || !password) {
    return res.status(400).json({
      status: false,
      message: 'User ID and password are required.',
    });
  }

  // Validasi password terhadap password internal yang disimpan di .env
  if (password !== INTERNAL_PASSWORD) {
    return res.status(401).json({
      status: false,
      message: 'Invalid password.',
    });
  }

  // Cek apakah user dengan ID tersebut ada di database
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  // Jika user tidak ditemukan, balikan error
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found.',
    });
  }

  // Buat token JWT berdasarkan userId dan role
  const token = generateToken(user.id, user.role);

  // Berhasil login, kembalikan token + data user
  return res.status(200).json({
    status: true,
    message: 'Login successful.',
    token,
    user,
  });
};