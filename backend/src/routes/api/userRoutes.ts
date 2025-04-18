// src/routes/api/userRoutes.ts

import express from 'express';
import { createUser } from '../../controllers/userController';

const router = express.Router();

router.post('/store', createUser); // Endpoint untuk membuat user baru (student atau teacher)

export default router;
