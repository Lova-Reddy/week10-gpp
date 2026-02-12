class MemoryStore {
    constructor() {
        this.processedEventIds = new Set();
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
        this.processedEventIds.add(event.eventId);
    }

    hasProcessed(eventId) {
        return this.processedEventIds.has(eventId);
    }

    getEvents() {
        return this.events;
    }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;
