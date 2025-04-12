// src/routes/api/userRoutes.ts

import express from 'express';
import { getGrades, submitGrade } from '../../controllers/gradeController';

const router = express.Router();


router.post('/store', submitGrade);         // Endpoint untuk memberikan nilai dan feedback terhadap assignment
router.get('/list/:studentId?', getGrades); // Endpoint untuk mengambil data grades

export default router;
