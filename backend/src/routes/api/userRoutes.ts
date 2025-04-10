// src/routes/api/userRoutes.ts
import express from 'express';
import createUser from '../../controllers/userController'; // sekarang pakai default import

const router = express.Router();

router.post('/', createUser);

export default router;
