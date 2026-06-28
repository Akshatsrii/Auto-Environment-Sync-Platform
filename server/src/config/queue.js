const { Queue, Worker, QueueEvents } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null, // BullMQ requirement
});

// Queues
const syncQueue = new Queue('environment-sync', { connection });
const driftQueue = new Queue('drift-scan', { connection });

module.exports = { syncQueue, driftQueue, connection };