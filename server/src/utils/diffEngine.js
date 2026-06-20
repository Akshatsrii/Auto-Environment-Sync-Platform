function getVariableMap(variables) {
  const map = {}
  variables.forEach(v => {
    map[v.key] = v.value
  })
  return map
}

/**
 * Full comparison engine
 * Categorizes each variable as: missing, modified, extra, or matched
 */
function compareEnvironments(envA, envB) {
  const mapA = getVariableMap(envA.variables)
  const mapB = getVariableMap(envB.variables)

  const allKeys = new Set([...Object.keys(mapA), ...Object.keys(mapB)])

  const result = {
    missing: [],
    extra: [],
    modified: [],
    matched: [],
  }

  allKeys.forEach(key => {
    const inA = key in mapA
    const inB = key in mapB

    if (inA && !inB) {
      result.missing.push({ key, valueInA: mapA[key] })
    } else if (!inA && inB) {
      result.extra.push({ key, valueInB: mapB[key] })
    } else if (inA && inB) {
      if (mapA[key] !== mapB[key]) {
        result.modified.push({ key, valueInA: mapA[key], valueInB: mapB[key] })
      } else {
        result.matched.push({ key, value: mapA[key] })
      }
    }
  })

  return result
}

/**
 * Generates a health/compatibility score based on diff result
 */
function calculateDriftScore(diffResult) {
  const total =
    diffResult.missing.length +
    diffResult.extra.length +
    diffResult.modified.length +
    diffResult.matched.length

  if (total === 0) return 100

  const issues = diffResult.missing.length + diffResult.modified.length
  const score = Math.round(((total - issues) / total) * 100)

  return Math.max(0, score)
}

/**
 * Generates a sync plan WITHOUT applying changes
 */
function generateSyncPlan(diffResult, removeExtra = false) {
  const plan = []

  diffResult.missing.forEach(item => {
    plan.push({ key: item.key, action: 'add', value: item.valueInA })
  })

  diffResult.modified.forEach(item => {
    plan.push({ key: item.key, action: 'update', oldValue: item.valueInB, newValue: item.valueInA })
  })

  if (removeExtra) {
    diffResult.extra.forEach(item => {
      plan.push({ key: item.key, action: 'remove', value: item.valueInB })
    })
  }

  return plan
}

module.exports = { getVariableMap, compareEnvironments, calculateDriftScore, generateSyncPlan }