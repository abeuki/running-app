import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync } from "fs";
import { join } from "path";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const db = JSON.parse(
  readFileSync(join(process.cwd(), "../db.json"), "utf-8")
);

async function main() {

  await prisma.runPoint.deleteMany();
  await prisma.run.deleteMany();
  await prisma.runner.deleteMany();
  await prisma.coach.deleteMany();

  await prisma.coach.createMany({
    data: db.coaches
  });

  await prisma.runner.createMany({
    data: db.runners
  });

  await prisma.run.createMany({
    data: db.runs.map((run: any) => ({
      ...run,
      startedAt: new Date(run.startedAt),
      finishedAt: new Date(run.finishedAt)
    }))
  });

  await prisma.runPoint.createMany({
    data: db.runPoints.map((point: any) => ({
      ...point,
      datetime: new Date(point.datetime)
    }))
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });