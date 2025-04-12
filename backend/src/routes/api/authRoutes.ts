// src/routes/api/userRoutes.ts

import express from 'express';
import { internalLogin } from '../../controllers/authController';

const router = express.Router();

router.post('/login', internalLogin);   // Endpoint untuk login internal menggunakan userId + internal password

export default router;