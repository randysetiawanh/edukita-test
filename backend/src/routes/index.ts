// src/routes/index.ts

import express from 'express';
import userRoutes from './api/userRoutes';
import assignmentRoutes from './api/assignmentRoutes';
import gradeRoutes from './api/gradeRoutes';
import authRoutes from './api/authRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/assignment', assignmentRoutes);
router.use('/grades', gradeRoutes);
router.use('/auth', authRoutes);

export default router;
