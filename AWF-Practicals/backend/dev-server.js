// Dev-only launcher: starts an in-memory MongoDB (no local install needed),
// then boots the real server with MONGO_URI pointing at it.
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri('taskmanager');
  console.log('In-memory MongoDB started at', process.env.MONGO_URI);
  require('./server.js');
})().catch((err) => {
  console.error('Failed to start in-memory MongoDB:', err);
  process.exit(1);
});