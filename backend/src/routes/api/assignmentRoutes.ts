// src/routes/api/userRoutes.ts

import express from 'express';
import { getAssignments, submitAssignment } from '../../controllers/assignmentController';

const router = express.Router();

router.get('/list', getAssignments);        // Endpoint untuk mengambil semua assignment.
router.post('/store', submitAssignment);    // Endpoint untuk siswa mengumpulkan assignment baru

export default router;
