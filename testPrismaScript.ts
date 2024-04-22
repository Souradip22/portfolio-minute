const { PrismaClient } = require("@prisma/client");

const prismaC = new PrismaClient();

async function createSiteTest() {
  const siteDetails = await prismaC.site.create({
    data: {
      subdomain: "souradipc",
      profile: {
        connect: { id: "clv9u8urv00ezccn1prahpwkx" },
      },
    },
  });
}

createSiteTest()
  .then(async () => {
    await prismaC.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaC.$disconnect();
    process.exit(1);
  });
