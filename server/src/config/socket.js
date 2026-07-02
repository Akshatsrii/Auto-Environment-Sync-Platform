const { Server } = require('socket.io')

let io

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    // User joins their own room (userId as room)
    socket.on('join', (userId) => {
      socket.join(userId)
      console.log(`User ${userId} joined room`)
    })

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`)
    })
  })

  return io
}

function getIO() {
  if (!io) throw new Error('Socket.IO not initialized')
  return io
}

module.exports = { initSocket, getIO }