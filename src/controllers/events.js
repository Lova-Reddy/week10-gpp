const { v4: uuidv4 } = require('uuid');
const { sendEvent } = require('../services/producer');
const memoryStore = require('../store/memoryStore');

const generateEvent = async (req, res) => {
    try {
        const { eventType, payload } = req.body;

        if (!eventType || !payload) {
            return res.status(400).json({ error: 'eventType and payload are required' });
        }

        const event = {
            eventId: uuidv4(),
            timestamp: new Date().toISOString(),
            eventType,
            payload
        };

        await sendEvent(event);

        res.status(200).json({ message: 'Event generated successfully', eventId: event.eventId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate event' });
    }
};

const getProcessedEvents = (req, res) => {
    const events = memoryStore.getEvents();
    res.status(200).json(events);
};

module.exports = {
    generateEvent,
    getProcessedEvents
};
