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
exports.EventController = void 0;
const tsyringe_1 = require("tsyringe");
const EventService_1 = require("../services/EventService");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    /**
     * Get all events endpoint handler
     */
    async getAllEvents(req, res) {
        try {
            const events = await this.eventService.getAllEvents();
            res.json(events);
        }
        catch (error) {
            console.error('Get all events error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    /**
     * Get event by ID endpoint handler
     */
    async getEventById(req, res) {
        try {
            const { eventId } = req.params;
            const event = await this.eventService.getEventById(eventId);
            if (!event) {
                res.status(404).json({ error: 'Event not found' });
                return;
            }
            res.json(event);
        }
        catch (error) {
            console.error('Get event by ID error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    /**
     * Process checkin endpoint handler
     */
    async processCheckin(req, res) {
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
        }
        catch (error) {
            console.error('Process checkin error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
exports.EventController = EventController;
exports.EventController = EventController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(EventService_1.EventService)),
    __metadata("design:paramtypes", [EventService_1.EventService])
], EventController);
