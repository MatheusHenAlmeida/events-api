import { injectable, inject } from 'tsyringe';
import { DatabaseConnection } from '../database/connection';
import { Event } from '../types/Event';

@injectable()
export class EventRepository {
  constructor(
    @inject(DatabaseConnection) private db: DatabaseConnection
  ) {}

  /**
   * Get all events from database
   */
  async getAllEvents(): Promise<Event[]> {
    const result = await this.db.query('SELECT * FROM events ORDER BY date ASC');
    return result.rows.map(this.mapRowToEvent);
  }

  /**
   * Get event by ID from database
   */
  async getEventById(id: string): Promise<Event | null> {
    const result = await this.db.query('SELECT * FROM events WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToEvent(result.rows[0]);
  }

  /**
   * Check if event exists in database
   */
  async eventExists(id: string): Promise<boolean> {
    const result = await this.db.query('SELECT 1 FROM events WHERE id = $1', [id]);
    return result.rows.length > 0;
  }

  /**
   * Map database row to Event object
   */
  private mapRowToEvent(row: any): Event {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      date: parseInt(row.date),
      image: row.image,
      longitude: parseFloat(row.longitude),
      latitude: parseFloat(row.latitude),
      price: parseFloat(row.price),
      people: row.people || []
    };
  }
}