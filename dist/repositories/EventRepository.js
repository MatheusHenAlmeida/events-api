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
exports.EventRepository = void 0;
const tsyringe_1 = require("tsyringe");
const connection_1 = require("../database/connection");
let EventRepository = class EventRepository {
    constructor(db) {
        this.db = db;
    }
    /**
     * Get all events from database
     */
    async getAllEvents() {
        const result = await this.db.query('SELECT * FROM events ORDER BY date ASC');
        return result.rows.map(this.mapRowToEvent);
    }
    /**
     * Get event by ID from database
     */
    async getEventById(id) {
        const result = await this.db.query('SELECT * FROM events WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.mapRowToEvent(result.rows[0]);
    }
    /**
     * Check if event exists in database
     */
    async eventExists(id) {
        const result = await this.db.query('SELECT 1 FROM events WHERE id = $1', [id]);
        return result.rows.length > 0;
    }
    /**
     * Map database row to Event object
     */
    mapRowToEvent(row) {
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
};
exports.EventRepository = EventRepository;
exports.EventRepository = EventRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(connection_1.DatabaseConnection)),
    __metadata("design:paramtypes", [connection_1.DatabaseConnection])
], EventRepository);
