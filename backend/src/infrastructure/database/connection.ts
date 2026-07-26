import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import logger from '../logger/winston';
import path from 'path';

const sqlitePath = path.join(process.cwd(), 'sqlite.db');
const sqlite = new Database(sqlitePath);

export const db = drizzle(sqlite, { schema });

export const connectDB = async () => {
  try {
    // SQLite doesn't need an async connect, but we keep the export for compatibility
    logger.info('✅ SQLite (Drizzle) initialized successfully!');
    logger.info(`📊 SQLite file path: ${sqlitePath}`);
  } catch (error) {
    logger.error('❌ SQLite initialization failed:', error);
    process.exit(1);
  }
};

export default connectDB;
