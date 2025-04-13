// src/controllers/assignmentController.ts

import { Request, Response } from 'express';
import { PrismaClient, Subject } from '../generated/prisma';
import logger from '../utils/logger';

const prisma = new PrismaClient();

// Controller untuk mengambil daftar assignment
// Mendukung filter berdasarkan subject dan id (jika ada)
export const getAssignments = async (req: Request, res: Response): Promise<Response> => {
  const { subject, studentId } = req.query;
  const filters: any = {};

  // Validasi subject jika diberikan sebagai query param
  if (subject && !Object.values(Subject).includes(subject as Subject)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid subject. Must be "ENGLISH" or "MATH".',
    });
  }

  try {
    // Tambahkan filter subject jika valid
    if (subject && Object.values(Subject).includes(subject as Subject)) {
      filters.subject = subject;
    }

    // Tambahkan filter id jika diberikan
    if (studentId) {
      filters.studentId = studentId;
    }

    // Ambil data assignment dari database, sertakan info siswa pengirim
    const assignments = await prisma.assignment.findMany({
      where: filters,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      status: true,
      message: 'Assignments retrieved successfully.',
      assignments,
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    logger.error('Error fetching assignment: ', error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong while retrieving assignments.',
    });
  }
};

// Controller untuk siswa mengumpulkan assignment
export const submitAssignment = async (req: Request, res: Response): Promise<Response> => {
  const { subject, title, content, studentId } = req.body;
  console.log(subject);
  // Validasi bahwa semua field wajib ada
  if (!subject || !title || !content || !studentId) {
    return res.status(400).json({
      status: false,
      message: 'All fields (subject, title, content, studentId) are required.',
    });
  }

  // Validasi subject hanya boleh ENGLISH atau MATH
  if (!['ENGLISH', 'MATH'].includes(subject)) {
    return res.status(400).json({
      status: false,
      message: 'Subject must be either "ENGLISH" or "MATH".',
    });
  }

  try {
    // Cari data user dan pastikan dia adalah student
    const student = await prisma.users.findUnique({ where: { id: studentId } });

    if (!student || student.role !== 'student') {
      return res.status(400).json({
        status: false,
        message: 'Invalid student ID or user is not a student.',
      });
    }

    // Simpan data assignment ke database
    const assignment = await prisma.assignment.create({
      data: {
        subject: subject as Subject,
        title,
        content,
        studentId,
      },
    });

    return res.status(201).json({
      status: true,
      message: 'Assignment submitted successfully.',
      assignment,
    });
  } catch (error) {
    console.error('Error submitting assignment: ', error);
    logger.error('Error submitting assignment: ', error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong while submitting the assignment.',
    });
  }
};
