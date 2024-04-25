const { PrismaClient } = require("@prisma/client");

const prismaC = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prismaC.$on("query", (e: any) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

// async function createSiteTest() {
//   const siteDetails = await prismaC.site.create({
//     data: {
//       subdomain: "souradipc",
//       profile: {
//         connect: { id: "clv9u8urv00ezccn1prahpwkx" },
//       },
//     },
//   });
// }

// createSiteTest()
//   .then(async () => {
//     await prismaC.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prismaC.$disconnect();
//     process.exit(1);
//   });
// npx ts-node testPrismaScript.ts
async function callFetch() {
  const usersWithPosts = await prismaC.user.findUnique({
    where: {
      email: "souradip000@gmail.com",
    },
    // include: {
    //   // skills: true,
    //   socialLinks: true,
    //   projects: true,
    //   educationWithExperiences: true,
    // },
  });
  console.dir(usersWithPosts, { depth: null });
}

callFetch()
  .then(async () => {
    await prismaC.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaC.$disconnect();
    process.exit(1);
  });
