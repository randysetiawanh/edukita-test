// src/routes/api/userRoutes.ts
import express from 'express';
import { createUser, internalLogin } from '../../controllers/userController';

const router = express.Router();

router.post('/store', createUser);
router.post('/login', internalLogin);

export default router;
