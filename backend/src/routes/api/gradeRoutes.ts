// src/routes/api/userRoutes.ts
import express from 'express';
import { submitGrade } from '../../controllers/gradeController';

const router = express.Router();

router.post('/store', submitGrade);

export default router;
