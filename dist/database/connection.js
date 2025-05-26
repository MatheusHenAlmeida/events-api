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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const pg_1 = require("pg");
const tsyringe_1 = require("tsyringe");
let DatabaseConnection = class DatabaseConnection {
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });
    }
    /**
     * Get database connection pool
     */
    getPool() {
        return this.pool;
    }
    /**
     * Execute a query with parameters
     */
    async query(text, params) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(text, params);
            return result;
        }
        finally {
            client.release();
        }
    }
    /**
     * Close all database connections
     */
    async close() {
        await this.pool.end();
    }
};
exports.DatabaseConnection = DatabaseConnection;
exports.DatabaseConnection = DatabaseConnection = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseConnection);
