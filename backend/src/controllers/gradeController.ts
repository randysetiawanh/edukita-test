// src/controllers/gradeController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import logger from '../utils/logger';

const prisma = new PrismaClient();

// Controller untuk memberikan nilai dan feedback terhadap assignment
export const submitGrade = async (req: Request, res: Response): Promise<Response> => {
  const { grade, feedback, teacherId, assignmentId } = req.body;

  // Validasi input wajib
  if (!grade || !feedback || !teacherId || !assignmentId) {
    return res.status(400).json({
      status: false,
      message: 'All fields (grade, feedback, teacherId, assignmentId) are required.',
    });
  }

  try {
    // Cek apakah teacher valid
    const teacher = await prisma.users.findUnique({ where: { id: teacherId } });
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({
        status: false,
        message: 'Invalid teacher ID.',
      });
    }

    // Cek apakah assignment valid
    const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) {
      return res.status(404).json({
        status: false,
        message: 'Assignment not found.',
      });
    }

    // Cek apakah assignment sudah dinilai sebelumnya
    const existingGrade = await prisma.grade.findUnique({
      where: { assignmentId },
    });

    if (existingGrade) {
      return res.status(400).json({
        status: false,
        message: 'This assignment has already been graded.',
      });
    }

    // Simpan data penilaian ke database
    const newGrade = await prisma.grade.create({
      data: {
        grade,
        feedback,
        teacherId,
        assignmentId,
      },
    });

    return res.status(201).json({
      status: true,
      message: 'Grade submitted successfully.',
      grade: newGrade,
    });
  } catch (error) {
    console.error('Error grading assignment:', error);
    logger.error('Error grading assignment: ', error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong while submitting grade.',
    });
  }
};

// Controller untuk mengambil semua assignment milik siswa yang sudah dinilai
export const getGrades = async (req: Request, res: Response): Promise<Response> => {
  const { studentId } = req.params;

  // Validasi input student ID
  if (!studentId) {
    return res.status(400).json({
      status: false,
      message: 'Student ID is required.',
    });
  }

  try {
    // Cek apakah student valid
    const student = await prisma.users.findUnique({ where: { id: studentId } });
    if (!student || student.role !== 'student') {
      return res.status(404).json({
        status: false,
        message: 'Student not found or invalid role.',
      });
    }

    // Ambil assignment yang sudah dinilai (grade is not null)
    const gradedAssignments = await prisma.assignment.findMany({
      where: {
        studentId,
        grade: { 
          NOT: {} // hanya assignment yang sudah dinilai
        },
      },
      include: {
        grade: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      status: true,
      message: 'Graded assignments retrieved successfully.',
      assignments: gradedAssignments,
    });
  } catch (error) {
    console.error('Error fetching grades:', error);
    logger.error('Error fetching grades:', error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong while fetching grades.',
    });
  }
};