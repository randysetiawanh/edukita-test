import { Request, Response } from 'express';
import { PrismaClient, UserRoles } from '../generated/prisma';
import logger from '../utils/logger';
import { generateToken } from '../utils/auth';

const prisma = new PrismaClient();
const INTERNAL_PASSWORD = process.env.AUTH_INTERNAL_PASSWORD || 'edukita-inT3rN4l!Lk31s@1kaKl$204asS';


export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      status: false,
      message: 'Name, email, and role are required.',
    });
  }

  if (!Object.values(UserRoles).includes(role)) {
    return res.status(400).json({
      status: false,
      message: 'Role must be either "student" or "teacher".',
    });
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: 'User with this email already exists.',
      });
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
        role,
      },
    });

    const token = generateToken(user.id, user.role);

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

export const internalLogin = async (req: Request, res: Response): Promise<Response> => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({
      status: false,
      message: 'User ID and password are required.',
    });
  }

  if (password !== INTERNAL_PASSWORD) {
    return res.status(401).json({
      status: false,
      message: 'Invalid password.',
    });
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found.',
    });
  }

  const token = generateToken(user.id, user.role);

  return res.status(200).json({
    status: true,
    message: 'Login successful.',
    token,
    user,
  });
};
