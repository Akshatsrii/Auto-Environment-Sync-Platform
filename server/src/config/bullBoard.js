const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { syncQueue, driftQueue, deadLetterQueue, notificationQueue } = require('./queue');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullMQAdapter(syncQueue),
    new BullMQAdapter(driftQueue),
    new BullMQAdapter(deadLetterQueue),
    new BullMQAdapter(notificationQueue),
  ],
  serverAdapter,
});

module.exports = { serverAdapter };