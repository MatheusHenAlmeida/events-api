import { container } from "tsyringe";
import { EventService } from "../services/EventService";
import { EventRepository } from "../repositories/EventRepository";
import { DatabaseConnection } from "../database/connection";
import { CheckinRepository } from "../repositories/CheckinRepository";
import { EventController } from "../controllers/EventController";
import { config } from 'dotenv';

config();

container.registerSingleton(DatabaseConnection);
container.register(EventRepository, { useClass: EventRepository });
container.register(CheckinRepository, { useClass: CheckinRepository });
container.register(EventService, { useClass: EventService });
container.register(EventController, { useClass: EventController });

export { container }