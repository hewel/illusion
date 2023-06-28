import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  await prisma.mediaType.create({
    data: { name: "movie" },
  });
  await prisma.mediaType.create({
    data: { name: "tv" },
  });
  await prisma.user.create({
    data: {
      account: "admin",
      name: "admin",
      passwordHash: "1",
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
