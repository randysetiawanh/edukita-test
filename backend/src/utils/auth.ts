// src/utils/auth.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient, UserRoles } from '../generated/prisma';

const prisma = new PrismaClient();
export interface AuthPayload {
  userId: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: false, message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ status: false, message: 'Invalid token. User not found.' });
    }

    // Attach full user object to request
    (req as any).user = user;

    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Invalid or expired token.' });
  }
};

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

export const generateToken = (userId: string, role: string): string => {
  const payload = { userId, role };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
  });  
};