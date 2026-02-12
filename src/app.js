const express = require('express');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/events');
const { connectProducer } = require('./services/producer');
const { connectConsumer } = require('./services/consumer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/events', eventsRouter);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Start Producer, Consumer and Server
const startServer = async () => {
    await connectProducer();
    await connectConsumer();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

if (require.main === module) {
    startServer();
}

module.exports = app; // Export for testing
