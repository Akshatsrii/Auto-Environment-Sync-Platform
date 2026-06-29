const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { syncQueue, driftQueue, deadLetterQueue } = require('./queue');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullMQAdapter(syncQueue),
    new BullMQAdapter(driftQueue),
    new BullMQAdapter(deadLetterQueue),
  ],
  serverAdapter,
});

module.exports = { serverAdapter };