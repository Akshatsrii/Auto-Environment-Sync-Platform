const Environment = require('../models/Environment')

// POST /api/environments
const createEnvironment = async (req, res) => {
  try {
    const { name, description, variables } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Environment name is required' })
    }

    const environment = await Environment.create({
      name,
      description,
      variables: variables || [],
      createdBy: req.user._id,
    })

    res.status(201).json({ message: 'Environment created', environment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/environments
const getEnvironments = async (req, res) => {
  try {
    const environments = await Environment.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })

    res.json({ environments })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/environments/:id
const getEnvironmentById = async (req, res) => {
  try {
    const environment = await Environment.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    if (!environment) {
      return res.status(404).json({ message: 'Environment not found' })
    }

    res.json({ environment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/environments/:id
const deleteEnvironment = async (req, res) => {
  try {
    const environment = await Environment.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    if (!environment) {
      return res.status(404).json({ message: 'Environment not found' })
    }

    res.json({ message: 'Environment deleted successfully' })
} catch (error) {
  console.log("DELETE ENV ERROR =>", error)

  res.status(500).json({
    message: error.message,
  })
}
}

module.exports = { createEnvironment, getEnvironments, getEnvironmentById, deleteEnvironment }