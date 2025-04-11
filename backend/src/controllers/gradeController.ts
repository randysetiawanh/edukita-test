import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import logger from '../utils/logger';

const prisma = new PrismaClient();

export const submitGrade = async (req: Request, res: Response): Promise<Response> => {
  const { grade, feedback, teacherId, assignmentId } = req.body;

  if (!grade || !feedback || !teacherId || !assignmentId) {
    return res.status(400).json({
      status: false,
      message: 'All fields (grade, feedback, teacherId, assignmentId) are required.',
    });
  }

  try {
    const teacher = await prisma.users.findUnique({ where: { id: teacherId } });
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({
        status: false,
        message: 'Invalid teacher ID.',
      });
    }

    const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) {
      return res.status(404).json({
        status: false,
        message: 'Assignment not found.',
      });
    }

    const existingGrade = await prisma.grade.findUnique({
      where: { assignmentId },
    });

    if (existingGrade) {
      return res.status(400).json({
        status: false,
        message: 'This assignment has already been graded.',
      });
    }

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

export const getGrades = async (req: Request, res: Response): Promise<Response> => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({
      status: false,
      message: 'Student ID is required.',
    });
  }

  try {
    const student = await prisma.users.findUnique({ where: { id: studentId } });
    if (!student || student.role !== 'student') {
      return res.status(404).json({
        status: false,
        message: 'Student not found or invalid role.',
      });
    }

    const gradedAssignments = await prisma.assignment.findMany({
      where: {
        studentId,
        grade: { 
          NOT: {} 
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