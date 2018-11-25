const _ = require('lodash')
const fs = require('fs');

const build_tree = input => {
  const lines = fs.readFileSync(input).toString().split("\n");

  const nodes = {}

  _.each(lines, line => {
    // Add each node to the nodes array
    const fields = line.split(' ')

    // if name is already in the node list, update it, otherwise create
    const node = nodes[fields[0]] || { name: fields[0], children: [] }
    nodes[fields[0]] = node
    nodes[fields[0]].weight = parseInt(fields[1].substring(1, fields[1].length-1))

    // If this node has children, either update their parents or create a stub record
    if (fields[2]) {
      const children = _.map(_.takeRightWhile(fields, f => { return f != '->'}), childName => {
        return childName.charAt(childName.length-1) === ',' ?
          childName.substring(0, childName.length-1) : childName
        }
      )
      _.each(children, childName => {
        const child = nodes[childName] || { name: childName, children: [] }
        child.parent = node
        nodes[childName] = child
        node.children.push(child)
      })
    }
  })

  return _.find(nodes, n => { return !n.parent })
}

const part1 = input => {
  return build_tree(input).name
}

let newWeightNeeded = null

const prefix_sum_subtrees = node => {
  // Edge case of a leaf node
  if (node.children.length === 0) return node.weight

  const weights = _.map(node.children, prefix_sum_subtrees)

  // The first time we find a discrepancy in weights, this is our culprit.
  const groupedWeights = _.groupBy(weights)
  let outlier = _.findKey(groupedWeights, weights => { return weights.length === 1 })
  if (outlier && !newWeightNeeded) {
    outlier = parseInt(outlier)
    const dominant = _.findKey(groupedWeights, weights => { return weights.length !== 1 })
    const deltaNeeded = dominant - outlier
    const indexOfOutlier = _.findIndex(weights, weight => { return weight === outlier })
    newWeightNeeded = node.children[indexOfOutlier].weight + deltaNeeded
  }

  return node.weight + _.reduce(
    weights,
    (sum, n) => { return sum + n },
    0
  )
}

const part2 = input => {
  const tree = build_tree(input)
  prefix_sum_subtrees(tree)
  return newWeightNeeded
}

const input = './day7/input'

module.exports = {
  part1: {
    exec: part1,
    input: input
  },
  part2: {
    exec: part2,
    input: input
  }
}