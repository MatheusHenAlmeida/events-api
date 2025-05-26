import { injectable, inject } from 'tsyringe';
import { DatabaseConnection } from '../database/connection';
import { CheckinRequest, Checkin } from '../types/Event';

@injectable()
export class CheckinRepository {
  constructor(
    @inject(DatabaseConnection) private db: DatabaseConnection
  ) {}

  /**
   * Create a new checkin record
   */
  async createCheckin(checkinData: CheckinRequest): Promise<Checkin> {
    const result = await this.db.query(
      'INSERT INTO checkins (event_id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [checkinData.eventId, checkinData.name, checkinData.email]
    );

    const row = result.rows[0];
    return {
      id: row.id.toString(),
      eventId: row.event_id,
      name: row.name,
      email: row.email,
      checkinDate: row.checkin_date
    };
  }

  /**
   * Check if user is already checked in for an event
   */
  async isUserCheckedIn(eventId: string, email: string): Promise<boolean> {
    const result = await this.db.query(
      'SELECT 1 FROM checkins WHERE event_id = $1 AND email = $2',
      [eventId, email]
    );
    return result.rows.length > 0;
  }
}