import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Events Management API',
      version: '1.0.0',
      description: 'API for managing events and user checkins',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://events-api-jsdg.onrender.com' 
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API files
};

export const specs = swaggerJsdoc(options);