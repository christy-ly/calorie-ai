import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client';
import { FOODS } from '../src/lib/foods';
import path from 'path';

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const food of FOODS) {
    await prisma.food.upsert({
      where: { name: food.name },
      create: food,
      update: food,
    });
  }
  console.log(`Seeded ${FOODS.length} foods.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
