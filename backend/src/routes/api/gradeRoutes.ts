// src/routes/api/userRoutes.ts
import express from 'express';
import { getGrades, submitGrade } from '../../controllers/gradeController';

const router = express.Router();

router.post('/store', submitGrade);
router.get('/list/:studentId?', getGrades);

export default router;
