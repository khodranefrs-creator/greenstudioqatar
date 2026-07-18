// Database connection placeholder
// To use: set DATABASE_URL env var to your PostgreSQL connection string
// Then uncomment the import and usage below

// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// const globalForDb = globalThis as unknown as {
//   conn: ReturnType<typeof postgres> | undefined;
// };

// function getConnection() {
//   if (globalForDb.conn) return globalForDb.conn;
//   const connectionString = process.env.DATABASE_URL;
//   if (!connectionString) {
//     throw new Error("DATABASE_URL is not set.");
//   }
//   globalForDb.conn = postgres(connectionString, { max: 1 });
//   return globalForDb.conn;
// }

// export const db = drizzle(getConnection());

// For now, all data is served from /src/data/ files
export const db = null;
