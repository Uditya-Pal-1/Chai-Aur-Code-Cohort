import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis;

// 1. Initialize the Postgres driver adapter
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

// 2. Pass the adapter to the new PrismaClient instance
export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = db;
}