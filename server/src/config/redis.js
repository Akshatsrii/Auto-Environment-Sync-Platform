const { createClient } = require('redis')

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis: too many retries, giving up')
        return new Error('Redis retries exhausted')
      }
      return Math.min(retries * 100, 3000) // exponential backoff, capped
    },
  },
})

redisClient.on('connect', () => console.log('Redis: connecting...'))
redisClient.on('ready', () => console.log('Redis: connected & ready'))
redisClient.on('error', (err) => console.error('Redis Error:', err.message))
redisClient.on('end', () => console.log('Redis: connection closed'))

async function connectRedis() {
  try {
    await redisClient.connect()
  } catch (error) {
    console.error('Redis connection failed:', error.message)
  }
}

module.exports = { redisClient, connectRedis }