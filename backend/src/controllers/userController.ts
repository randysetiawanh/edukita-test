// src/controllers/userController.ts
import { Request, Response } from 'express';

const createUser = (req: Request, res: Response): Response => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  return res.status(201).json({ message: 'User created', data: { name, email, role } });
};

export default createUser;
