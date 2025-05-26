# Events Management API

A robust REST API for managing events and user checkins, built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- **Event Management**: Get all events or specific events by ID
- **User Checkin**: Register users for events with duplicate prevention
- **Swagger Documentation**: Interactive API documentation
- **Database Integration**: PostgreSQL with connection pooling
- **Dependency Injection**: Clean architecture with TSyringe
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Type Safety**: Full TypeScript implementation

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in `.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/events_db
PORT=3000
NODE_ENV=development
```

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{eventId}` - Get specific event by ID

### Checkin
- `POST /api/checkin` - Register user for an event

## Documentation

Visit `http://localhost:3000/api-docs` to access the interactive Swagger documentation.

## Database Schema

### Events Table
- `id` (VARCHAR): Unique event identifier
- `title` (VARCHAR): Event title
- `description` (TEXT): Event description
- `date` (BIGINT): Event date as timestamp
- `image` (VARCHAR): Event image URL
- `longitude` (DECIMAL): Event location longitude
- `latitude` (DECIMAL): Event location latitude
- `price` (DECIMAL): Event price
- `people` (TEXT[]): Array of people names

### Checkins Table
- `id` (SERIAL): Auto-incrementing ID
- `event_id` (VARCHAR): Foreign key to events table
- `name` (VARCHAR): User name
- `email` (VARCHAR): User email
- `checkin_date` (TIMESTAMP): Checkin timestamp

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run migrate` - Run database migrations