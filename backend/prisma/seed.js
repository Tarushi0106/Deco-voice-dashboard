import bcrypt from "bcryptjs";
import prisma from "../src/db.js";

async function main() {
  const email = "tarushi.chaudhary@shaurryatele.com";
  const plainPassword = "12345";
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log("Seed user already exists:", email);
    return;
  }

  const hashed = await bcrypt.hash(plainPassword, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: "Tarushi",
      onboarded: false,
    },
  });

  console.log("Seed user created:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
