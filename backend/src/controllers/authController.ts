import { Request, Response } from 'express';
import { PrismaClient, UserRoles } from '../generated/prisma';
import { generateToken } from '../utils/auth';

const prisma = new PrismaClient();
const INTERNAL_PASSWORD = process.env.AUTH_INTERNAL_PASSWORD || 'edukita-inT3rN4l!Lk31s@1kaKl$204asS';

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