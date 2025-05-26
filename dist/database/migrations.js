"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connection_1 = require("./connection");
const tsyringe_1 = require("tsyringe");
const dotenv_1 = require("dotenv");
/**
 * Create database tables if they don't exist
 */
async function runMigrations() {
    const db = tsyringe_1.container.resolve(connection_1.DatabaseConnection);
    try {
        // Create events table
        await db.query(`
      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date BIGINT NOT NULL,
        image VARCHAR(500),
        longitude DECIMAL(10, 8),
        latitude DECIMAL(10, 8),
        price DECIMAL(10, 2),
        people TEXT[] DEFAULT '{}'
      );
    `);
        // Create checkins table
        await db.query(`
      CREATE TABLE IF NOT EXISTS checkins (
        id SERIAL PRIMARY KEY,
        event_id VARCHAR(255) REFERENCES events(id),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        checkin_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_id, email)
      );
    `);
        // Insert sample data
        await db.query(`
      INSERT INTO events (id, title, description, date, image, longitude, latitude, price, people)
      VALUES 
        ('evt_123456', 'Festa de Verão', 'Um evento incrível com música e comida!', 1697059200000, 'https://exemplo.com/imagem.jpg', -46.633308, -23.550520, 50.0, '{"João", "Maria", "Pedro"}'),
        ('evt_789012', 'Conferência Tech', 'Evento sobre as últimas tecnologias', 1697145600000, 'https://exemplo.com/tech.jpg', -46.640000, -23.560000, 0.0, '{"Ana", "Carlos"}')
      ON CONFLICT (id) DO NOTHING;
    `);
        console.log('Migrations completed successfully');
    }
    catch (error) {
        console.error('Migration error:', error);
    }
    finally {
        await db.close();
    }
}
if (require.main === module) {
    (0, dotenv_1.config)();
    runMigrations();
}
