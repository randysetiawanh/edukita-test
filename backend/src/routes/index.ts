// src/routes/index.ts
import express from 'express';
import userRoutes from './api/userRoutes';
import assignmentRoutes from './api/assignmentRoutes';
import gradeRoutes from './api/gradeRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/assignment', assignmentRoutes);
router.use('/grades', gradeRoutes);

export default router;
