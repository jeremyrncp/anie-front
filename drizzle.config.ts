import "dotenv/config";
import type { Config } from "drizzle-kit";

const config: Config = {
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle", // Dossier où sont stockées les migrations
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};

export default config;
