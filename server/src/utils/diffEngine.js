/**
 * Generates a sync plan WITHOUT applying changes
 * Uses existing compareEnvironments() result
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