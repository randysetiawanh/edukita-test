// src/controllers/userController
import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ 
      status: false,
      message: 'Name, email, and role are required.' 
    });
  }

  if (role !== 'student' && role !== 'teacher') {
    return res.status(400).json({ 
      status: false,
      message: 'Role must be either "student" or "teacher".' 
    });
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ 
        status: false,
        message: 'User with this email already exists.'
      });
    }

    const user = await prisma.users.create({
      data: { name, email, role },
    });

    return res.status(201).json({ 
      status: true,
      message: 'User created successfully',
      user
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ 
      message: 'Something went wrong' 
    });
  }
};
