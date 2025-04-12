// src/routes/index.ts

import express from 'express';
import userRoutes from './api/userRoutes';
import assignmentRoutes from './api/assignmentRoutes';
import gradeRoutes from './api/gradeRoutes';
import authRoutes from './api/authRoutes';

const router = express.Router();

// Grouping semua route API berdasarkan fitur
// Setiap prefix akan mengarahkan ke route file masing-masing
router.use('/users', userRoutes);               // Endpoint untuk manajemen user (register, get list user, dll)
router.use('/assignment', assignmentRoutes);    // Endpoint untuk pengumpulan assignment dari siswa
router.use('/grades', gradeRoutes);             // Endpoint untuk pemberian nilai dan melihat hasil grading
router.use('/auth', authRoutes);                // Endpoint untuk autentikasi internal login

// Export router utama agar bisa digunakan di index.ts
export default router;