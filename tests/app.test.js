const request = require('supertest');
const app = require('../src/app');
const memoryStore = require('../src/store/memoryStore');

// Mock Kafka producer/consumer to avoid actual connection during unit tests
jest.mock('../src/services/producer', () => ({
    connectProducer: jest.fn(),
    sendEvent: jest.fn().mockResolvedValue(true)
}));

jest.mock('../src/services/consumer', () => ({
    connectConsumer: jest.fn()
}));

describe('Event Service API', () => {
    beforeEach(() => {
        // Clear memory store before each test
        memoryStore.events = [];
        memoryStore.processedEventIds = new Set();
    });

    it('should generate an event successfully', async () => {
        const res = await request(app)
            .post('/events/generate')
            .send({
                eventType: 'TEST_EVENT',
                payload: { key: 'value' }
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Event generated successfully');
        expect(res.body).toHaveProperty('eventId');
    });

    it('should return 400 if eventType is missing', async () => {
        const res = await request(app)
            .post('/events/generate')
            .send({
                payload: { key: 'value' }
            });

        expect(res.statusCode).toEqual(400);
    });

    it('should retrieve processed events', async () => {
        const mockEvent = { eventId: '123', eventType: 'TEST', payload: {} };
        memoryStore.addEvent(mockEvent);

        const res = await request(app).get('/events/processed');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(1);
        expect(res.body[0].eventId).toBe('123');
    });
});
