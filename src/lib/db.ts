/* eslint-disable @typescript-eslint/no-require-imports */
// Prisma client singleton (starter template).
//
// The generated Prisma client is created on install via `prisma generate`.
// Until generation has run (fresh clone / offline environment), this module
// lazily requires the client on first use so the portfolio app — which does
// not depend on a database — still type-checks, builds, and runs.

const globalForPrisma = globalThis as unknown as { prisma?: any };

function createClient(): any {
  const { PrismaClient } = require("@prisma/client");
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : ["error"],
  });
}

export const db: any =
  globalForPrisma.prisma ??
  new Proxy(
    {},
    {
      get(_target, prop) {
        if (!globalForPrisma.prisma) {
          globalForPrisma.prisma = createClient();
        }
        return Reflect.get(globalForPrisma.prisma as object, prop);
      },
    }
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
