import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
};

declare global {
  var database: ReturnType<typeof prismaClientSingleton>;
}

const database = globalThis.database ?? prismaClientSingleton();

export default database;

if (process.env.NODE_ENV !== "production") globalThis.database = database;
