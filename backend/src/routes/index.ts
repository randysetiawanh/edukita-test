// src/routes/index.ts
import express from 'express';
import userRoutes from './api/userRoutes';

const router = express.Router();

router.use('/users', userRoutes);

export default router;
