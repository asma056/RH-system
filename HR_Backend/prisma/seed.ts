import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();


async function main() {
  const adminEmail = process.env.DEV_ADMIN_EMAIL;
  const defaultPassword = process.env.DEV_ADMIN_PASSWORD;
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const userCount = await prisma.user.count();
  const companyCount = await prisma.company.count();

  if (userCount <= 0 || companyCount <= 0) {
    const userAdmin = await prisma.user.upsert({
      where: {
        email: adminEmail,
      },
      update: {},
      create: {
        email: adminEmail,
        name: 'Super Admin',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        company: {
          create: {
            actived: true,
            name: '3035TECH',
          },
        },
      },
    });

    console.log('Seeding database...', {
      id: userAdmin.id,
      email: userAdmin.email,
      companyId: userAdmin.companyId,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
