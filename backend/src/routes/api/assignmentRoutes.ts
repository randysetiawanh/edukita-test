// src/routes/api/userRoutes.ts
import express from 'express';
import { submitAssignment } from '../../controllers/assignmentController';

const router = express.Router();

router.post('/store', submitAssignment);

export default router;
