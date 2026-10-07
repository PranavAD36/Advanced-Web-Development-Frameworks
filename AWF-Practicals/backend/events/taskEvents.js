const EventEmitter = require('events');

// Practical 10 - a dedicated EventEmitter instance shared across the app.
class TaskEvents extends EventEmitter {}

module.exports = new TaskEvents();
