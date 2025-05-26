"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const tsyringe_1 = require("tsyringe");
const EventRepository_1 = require("../repositories/EventRepository");
const CheckinRepository_1 = require("../repositories/CheckinRepository");
let EventService = class EventService {
    constructor(eventRepository, checkinRepository) {
        this.eventRepository = eventRepository;
        this.checkinRepository = checkinRepository;
    }
    /**
     * Get all available events
     */
    async getAllEvents() {
        return await this.eventRepository.getAllEvents();
    }
    /**
     * Get specific event by ID
     */
    async getEventById(id) {
        return await this.eventRepository.getEventById(id);
    }
    /**
     * Process user checkin for an event
     */
    async processCheckin(checkinData) {
        // Check if event exists
        const eventExists = await this.eventRepository.eventExists(checkinData.eventId);
        if (!eventExists) {
            return { success: false, message: 'Event not found' };
        }
        // Check if user is already checked in
        const isAlreadyCheckedIn = await this.checkinRepository.isUserCheckedIn(checkinData.eventId, checkinData.email);
        if (isAlreadyCheckedIn) {
            return { success: false, message: 'User already checked in for this event' };
        }
        try {
            await this.checkinRepository.createCheckin(checkinData);
            return { success: true, message: 'Checkin successful' };
        }
        catch (error) {
            console.error('Checkin error:', error);
            return { success: false, message: 'Internal server error' };
        }
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(EventRepository_1.EventRepository)),
    __param(1, (0, tsyringe_1.inject)(CheckinRepository_1.CheckinRepository)),
    __metadata("design:paramtypes", [EventRepository_1.EventRepository,
        CheckinRepository_1.CheckinRepository])
], EventService);
