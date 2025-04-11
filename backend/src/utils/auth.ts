import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../generated/prisma';

export interface AuthPayload {
  userId: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: false, message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as AuthPayload;
    (req as any).user = decoded;
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
  const secret = process.env.JWT_SECRET || 'default-secret';
  return jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
  });  
};
