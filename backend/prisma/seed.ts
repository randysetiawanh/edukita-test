import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const plainPassword = '123456';

  await prisma.users.deleteMany();

  // Student
  const studPass1 = await bcrypt.hash(plainPassword, 10);
  await prisma.users.create({
    data: {
      name: 'Student 1',
      email: 'student1@gmail.com',
      role: 'student',
      password: studPass1,
      createdAt: new Date(),
    },
  });

  const studPass2 = await bcrypt.hash(plainPassword, 10);
  await prisma.users.create({
    data: {
      name: 'Student 2',
      email: 'student2@gmail.com',
      role: 'student',
      password: studPass2,
      createdAt: new Date(),
    },
  });

  const hashedPassword2 = await bcrypt.hash(plainPassword, 10);
  // Teacher
  await prisma.users.create({
    data: {
      name: 'Teacher',
      email: 'teacher@gmail.com',
      role: 'teacher',
      password: hashedPassword2,
      createdAt: new Date(),
    },
  });

  console.log('✅ Users created with hashed password.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
