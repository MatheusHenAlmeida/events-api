import { injectable, inject } from 'tsyringe';
import { EventRepository } from '../repositories/EventRepository';
import { CheckinRepository } from '../repositories/CheckinRepository';
import { Event, CheckinRequest } from '../types/Event';

@injectable()
export class EventService {
  constructor(
    @inject(EventRepository) private eventRepository: EventRepository,
    @inject(CheckinRepository) private checkinRepository: CheckinRepository
  ) {}

  /**
   * Get all available events
   */
  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.getAllEvents();
  }

  /**
   * Get specific event by ID
   */
  async getEventById(id: string): Promise<Event | null> {
    return await this.eventRepository.getEventById(id);
  }

  /**
   * Process user checkin for an event
   */
  async processCheckin(checkinData: CheckinRequest): Promise<{ success: boolean; message: string }> {
    // Check if event exists
    const eventExists = await this.eventRepository.eventExists(checkinData.eventId);
    if (!eventExists) {
      return { success: false, message: 'Event not found' };
    }

    // Check if user is already checked in
    const isAlreadyCheckedIn = await this.checkinRepository.isUserCheckedIn(
      checkinData.eventId, 
      checkinData.email
    );
    
    if (isAlreadyCheckedIn) {
      return { success: false, message: 'User already checked in for this event' };
    }

    try {
      await this.checkinRepository.createCheckin(checkinData);
      return { success: true, message: 'Checkin successful' };
    } catch (error) {
      console.error('Checkin error:', error);
      return { success: false, message: 'Internal server error' };
    }
  }
}
