import { Pool } from 'pg';
import { injectable } from 'tsyringe';

@injectable()
export class DatabaseConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }

  /**
   * Get database connection pool
   */
  getPool(): Pool {
    return this.pool;
  }

  /**
   * Execute a query with parameters
   */
  async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  /**
   * Close all database connections
   */
  async close(): Promise<void> {
    await this.pool.end();
  }
}