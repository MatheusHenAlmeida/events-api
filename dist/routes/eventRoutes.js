"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const EventController_1 = require("../controllers/EventController");
const router = (0, express_1.Router)();
const eventController = tsyringe_1.container.resolve(EventController_1.EventController);
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "evt_123456"
 *         title:
 *           type: string
 *           example: "Festa de Verão"
 *         description:
 *           type: string
 *           example: "Um evento incrível com música e comida!"
 *         date:
 *           type: number
 *           example: 1697059200000
 *         image:
 *           type: string
 *           example: "https://exemplo.com/imagem.jpg"
 *         longitude:
 *           type: number
 *           example: -46.633308
 *         latitude:
 *           type: number
 *           example: -23.550520
 *         price:
 *           type: number
 *           example: 50.0
 *         people:
 *           type: array
 *           items:
 *             type: string
 *           example: ["João", "Maria", "Pedro"]
 *     CheckinRequest:
 *       type: object
 *       required:
 *         - eventId
 *         - name
 *         - email
 *       properties:
 *         eventId:
 *           type: string
 *           example: "evt_123456"
 *         name:
 *           type: string
 *           example: "Ana Silva"
 *         email:
 *           type: string
 *           example: "ana.silva@exemplo.com"
 */
/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all available events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 */
router.get('/events', (req, res) => eventController.getAllEvents(req, res));
/**
 * @swagger
 * /api/events/{eventId}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *         example: "evt_123456"
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get('/events/:eventId', (req, res) => eventController.getEventById(req, res));
/**
 * @swagger
 * /api/checkin:
 *   post:
 *     summary: Register user for an event
 *     tags: [Checkin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckinRequest'
 *     responses:
 *       200:
 *         description: Checkin successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Checkin successful"
 *       400:
 *         description: Bad request - Missing fields or user already checked in
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.post('/checkin', (req, res) => eventController.processCheckin(req, res));
exports.default = router;
