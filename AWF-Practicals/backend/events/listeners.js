const taskEvents = require('./taskEvents');

// Practical 10 - background notification listeners.
// This file is required once in server.js so that the listeners are
// registered before the first request can emit an event.

taskEvents.on('task-created', (task) => {
  const receivedAt = new Date().toISOString();

  // The delay simulates slower background work (e.g. sending an email or
  // calling another service) so the timing difference is visible.
  setTimeout(() => {
    const finishedAt = new Date().toISOString();
    console.log(`[Notification] Task created: "${task.title}"`);
    console.log(`  event received at ${receivedAt}`);
    console.log(`  handler finished at ${finishedAt} (after the API responded)`);
  }, 500);
});

taskEvents.on('task-deleted', (task) => {
  console.log(`[Notification] Task deleted: "${task.title}" at ${new Date().toISOString()}`);
});

// EventEmitter treats an unhandled 'error' event specially: it throws.
// Always keep a listener attached.
taskEvents.on('error', (err) => {
  console.error('[TaskEvents] error:', err.message);
});

module.exports = taskEvents;
