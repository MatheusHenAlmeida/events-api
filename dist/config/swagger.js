"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
                    ? 'https://your-production-url.com'
                    : `http://localhost:${process.env.PORT || 3000}`,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API files
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
