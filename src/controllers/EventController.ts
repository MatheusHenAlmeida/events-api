import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { EventService } from '../services/EventService';

@injectable()
export class EventController {
  constructor(
    @inject(EventService) private eventService: EventService
  ) {}

  /**
   * Get all events endpoint handler
   */
  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await this.eventService.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error('Get all events error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get event by ID endpoint handler
   */
  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const { eventId } = req.params;
      const event = await this.eventService.getEventById(eventId);

      if (!event) {
        res.status(404).json({ error: 'Event not found' });
        return;
      }

      res.json(event);
    } catch (error) {
      console.error('Get event by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Process checkin endpoint handler
   */
  async processCheckin(req: Request, res: Response): Promise<void> {
    try {
      const { eventId, name, email } = req.body;

      // Validate request body
      if (!eventId || !name || !email) {
        res.status(400).json({ error: 'Missing required fields: eventId, name, email' });
        return;
      }

      const result = await this.eventService.processCheckin({ eventId, name, email });

      if (!result.success) {
        if (result.message === 'Event not found') {
          res.status(404).json({ error: result.message });
          return;
        }
        res.status(400).json({ error: result.message });
        return;
      }

      res.json({ message: result.message });
    } catch (error) {
      console.error('Process checkin error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
