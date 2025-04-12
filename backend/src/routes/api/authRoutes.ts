// src/routes/api/userRoutes.ts
import express from 'express';
import { internalLogin } from '../../controllers/authController';

const router = express.Router();

router.post('/login', internalLogin);

export default router;
