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
exports.CheckinRepository = void 0;
const tsyringe_1 = require("tsyringe");
const connection_1 = require("../database/connection");
let CheckinRepository = class CheckinRepository {
    constructor(db) {
        this.db = db;
    }
    /**
     * Create a new checkin record
     */
    async createCheckin(checkinData) {
        const result = await this.db.query('INSERT INTO checkins (event_id, name, email) VALUES ($1, $2, $3) RETURNING *', [checkinData.eventId, checkinData.name, checkinData.email]);
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
    async isUserCheckedIn(eventId, email) {
        const result = await this.db.query('SELECT 1 FROM checkins WHERE event_id = $1 AND email = $2', [eventId, email]);
        return result.rows.length > 0;
    }
};
exports.CheckinRepository = CheckinRepository;
exports.CheckinRepository = CheckinRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(connection_1.DatabaseConnection)),
    __metadata("design:paramtypes", [connection_1.DatabaseConnection])
], CheckinRepository);
