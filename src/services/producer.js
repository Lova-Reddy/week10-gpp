const kafka = require('../config/kafka');
require('dotenv').config();

const producer = kafka.producer();

const connectProducer = async () => {
    try {
        await producer.connect();
        console.log('Kafka Producer connected');
    } catch (error) {
        console.error('Error connecting Kafka Producer:', error);
    }
};

const sendEvent = async (event) => {
    try {
        await producer.send({
            topic: process.env.KAFKA_TOPIC || 'user-activity-events',
            messages: [
                { value: JSON.stringify(event) },
            ],
        });
        console.log(`Event sent to Kafka: ${event.eventId}`);
    } catch (error) {
        console.error('Error sending event to Kafka:', error);
        throw error;
    }
};

module.exports = {
    connectProducer,
    sendEvent
};
