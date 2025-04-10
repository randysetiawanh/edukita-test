// src/controllers/userController
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '../models/User';
import { users } from '../data/users';

export const createUser = (req: Request, res: Response): Response => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Name, email, and role are required.' });
  }

  if (role !== 'student' && role !== 'teacher') {
    return res.status(400).json({ message: 'Role must be either "student" or "teacher".' });
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    roles: role as UserRole,
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'User created successfully.',
    user: newUser,
  });
};
