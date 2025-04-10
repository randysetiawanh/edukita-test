// src/routes/index.ts
import express from 'express';
import userRoutes from './api/userRoutes';
import assignmentRoutes from './api/assignmentRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/assignment', assignmentRoutes);

export default router;
