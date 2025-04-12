// src/routes/api/userRoutes.ts

import express from 'express';
import { getAssignments, submitAssignment } from '../../controllers/assignmentController';

const router = express.Router();

router.get('/list', getAssignments);
router.post('/store', submitAssignment);

export default router;
