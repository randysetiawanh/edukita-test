// src/controllers/assignmentController.ts
import { Request, Response } from 'express';
import { PrismaClient, Subject } from '../generated/prisma';

const prisma = new PrismaClient();


export const submitAssignment = async (req: Request, res: Response): Promise<Response> => {
  const { subject, title, content, studentId } = req.body;

  if (!subject || !title || !content || !studentId) {
    return res.status(400).json({
      status: false,
      message: 'All fields (subject, title, content, studentId) are required.',
    });
  }

  if (!['ENGLISH', 'MATH'].includes(subject)) {
    return res.status(400).json({
      status: false,
      message: 'Subject must be either "ENGLISH" or "MATH".',
    });
  }

  try {
    const student = await prisma.users.findUnique({ where: { id: studentId } });

    if (!student || student.role !== 'student') {
      return res.status(400).json({
        status: false,
        message: 'Invalid student ID or user is not a student.',
      });
    }

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
    console.error('Error submitting assignment:', error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong while submitting the assignment.',
    });
  }
};
