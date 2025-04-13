// src/controllers/userController.ts

import { Request, Response } from 'express';
import { PrismaClient, UserRoles } from '../generated/prisma';
import logger from '../utils/logger';
import { generateToken } from '../utils/auth';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


// Controller untuk membuat user baru (baik student maupun teacher)
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, role } = req.body;

  // Validasi input wajib
  if (!name || !email || !role || !password) {
    return res.status(400).json({
      status: false,
      message: 'All field are required.',
    });
  }

  // Validasi bahwa role harus salah satu dari enum UserRoles (student/teacher)
  if (!Object.values(UserRoles).includes(role)) {
    return res.status(400).json({
      status: false,
      message: 'Role must be either "student" or "teacher".',
    });
  }

  try {
    // Cek apakah user dengan email tersebut sudah terdaftar
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: 'User with this email already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user baru ke database
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
    });

    // Generate token JWT untuk user yang baru dibuat
    const token = generateToken(user.id, user.role);

    // Kembalikan data user + token
    return res.status(201).json({
      status: true,
      message: 'User created successfully.',
      user,
      token
    });
  } catch (error) {
    console.error('Error creating user:', error);
    logger.error('Error creating user: ', error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong while creating user.',
    });
  }
};

