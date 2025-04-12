// src/routes/api/userRoutes.ts

import express from 'express';
import { frontendLogin, internalLogin } from '../../controllers/authController';

const router = express.Router();

router.post('/login', internalLogin);           // Endpoint untuk login internal menggunakan userId + internal password
router.post('/frontend-login', frontendLogin)   // Endpoint untuk login menggunakan email + password user

export default router;