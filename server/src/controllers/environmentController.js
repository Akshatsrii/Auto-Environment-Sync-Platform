const mongoose = require('mongoose')
const Environment = require('../models/Environment')
const { compareVariables, summarize } = require('../utils/compareEnvironments')

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

// GET /api/environments/compare?source=<id>&target=<id>
const compareEnvironments = async (req, res) => {
  try {
    const { source, target } = req.query

    if (!source || !target) {
      return res.status(400).json({ message: 'source and target environment IDs are required' })
    }

    if (source === target) {
      return res.status(400).json({ message: 'Select two different environments to compare' })
    }

    if (!mongoose.Types.ObjectId.isValid(source) || !mongoose.Types.ObjectId.isValid(target)) {
      return res.status(400).json({ message: 'Invalid environment ID' })
    }

    const [sourceEnv, targetEnv] = await Promise.all([
      Environment.findOne({ _id: source, createdBy: req.user._id }),
      Environment.findOne({ _id: target, createdBy: req.user._id }),
    ])

    if (!sourceEnv || !targetEnv) {
      return res.status(404).json({ message: 'One or both environments not found' })
    }

    const differences = compareVariables(sourceEnv.variables, targetEnv.variables)
    const summary = summarize(differences)

    res.json({
      source: { id: sourceEnv._id, name: sourceEnv.name },
      target: { id: targetEnv._id, name: targetEnv.name },
      differences,
      summary,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createEnvironment, getEnvironments, getEnvironmentById, deleteEnvironment, compareEnvironments }