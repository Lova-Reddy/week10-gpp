const kafka = require('../config/kafka');
const memoryStore = require('../store/memoryStore');
require('dotenv').config();

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'user-activity-consumer-group' });

const connectConsumer = async () => {
    try {
        await consumer.connect();
        console.log('Kafka Consumer connected');

        await consumer.subscribe({ topic: process.env.KAFKA_TOPIC || 'user-activity-events', fromBeginning: true });
        console.log(`Subscribed to topic: ${process.env.KAFKA_TOPIC || 'user-activity-events'}`);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const event = JSON.parse(message.value.toString());

                    // Idempotency check
                    if (memoryStore.hasProcessed(event.eventId)) {
                        console.log(`Duplicate event detected and ignored: ${event.eventId}`);
                        return;
                    }

                    // Log event details as per requirements
                    console.log('Processing Event:', {
                        eventId: event.eventId,
                        userId: event.userId,
                        eventType: event.eventType,
                        timestamp: event.timestamp,
                        payload: event.payload
                    });

                    // Store event
                    memoryStore.addEvent(event);

                } catch (error) {
                    console.error('Error processing message:', error);
                }
            },
        });
    } catch (error) {
        console.error('Error connecting Kafka Consumer:', error);
    }
};

module.exports = {
    connectConsumer
};
