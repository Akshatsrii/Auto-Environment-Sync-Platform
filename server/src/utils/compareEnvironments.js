// Pure comparison logic for the Drift Detection Engine.
// No DB or Express code here on purpose — keeps it framework-free and unit-testable.

function compareVariables(sourceVariables = [], targetVariables = []) {
  const sourceMap = new Map(sourceVariables.map((v) => [v.key, v]))
  const targetMap = new Map(targetVariables.map((v) => [v.key, v]))

  const differences = []

  // Pass 1: every key the source has — matched / modified / missing
  for (const [key, sourceVar] of sourceMap) {
    const targetVar = targetMap.get(key)

    if (!targetVar) {
      differences.push({
        key,
        status: 'missing', // present in source, absent in target
        sourceValue: maskIfSecret(sourceVar),
        targetValue: null,
      })
      continue
    }

    const valuesMatch = sourceVar.value === targetVar.value

    differences.push({
      key,
      status: valuesMatch ? 'matched' : 'modified',
      sourceValue: maskIfSecret(sourceVar),
      targetValue: maskIfSecret(targetVar),
    })
  }

  // Pass 2: whatever is left in target was never in source -> extra
  for (const [key, targetVar] of targetMap) {
    if (!sourceMap.has(key)) {
      differences.push({
        key,
        status: 'extra', // present in target, absent in source
        sourceValue: null,
        targetValue: maskIfSecret(targetVar),
      })
    }
  }

  return differences
}

// Secrets should never leak through a comparison response.
function maskIfSecret(variable) {
  if (!variable) return null
  return variable.isSecret ? '••••••••' : variable.value
}

function summarize(differences) {
  return differences.reduce(
    (acc, diff) => {
      acc[diff.status] += 1
      acc.total += 1
      return acc
    },
    { matched: 0, modified: 0, missing: 0, extra: 0, total: 0 }
  )
}

module.exports = { compareVariables, summarize }