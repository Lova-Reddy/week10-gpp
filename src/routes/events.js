const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');

router.post('/generate', eventsController.generateEvent);
router.get('/processed', eventsController.getProcessedEvents);

module.exports = router;
