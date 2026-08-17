import { prisma } from './src/db';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();



async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.');
    process.exit(1);
  }

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log('Admin user already exists. Seed operation is idempotent.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      is_active: true,
    },
  });

  console.log('Admin user created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
