import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Generate Fake Data
  await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => ({
      title: faker.lorem.word(),
      body: faker.lorem.paragraph(),
      user_id: "3123123",
    })),
  });

  // await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () => ({
  //     email: faker.internet.email(),
  //     name: faker.internet.username(),
  //     address: {
  //       city: faker.location.city(),
  //       state: faker.location.state(),
  //       street: faker.location.street(),
  //       zip: faker.location.zipCode(),
  //     },
  //   })),
  // });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
