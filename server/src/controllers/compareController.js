const { redisClient } = require('../config/redis')

// inside compareEnvironmentsHandler — add at the top after fetching IDs
const cacheKey = `compare:${envIdA}:${envIdB}`
const cached = await redisClient.get(cacheKey)
if (cached) {
  return res.json({ ...JSON.parse(cached), cached: true })
}

// ...after computing diffResult and driftScore, before res.json:
const responseData = {
  environmentA: { id: envA._id, name: envA.name },
  environmentB: { id: envB._id, name: envB.name },
  diff: diffResult,
  driftScore,
  summary: { /* ...same as before */ },
}

await redisClient.setEx(cacheKey, 120, JSON.stringify(responseData)) // 2 min TTL

res.json({ ...responseData, cached: false })