const _ = require('lodash')
const fs = require('fs');

const part1 = input => {
  const lines = fs.readFileSync(input).toString().split("\n");

  const nodes = {}

  _.each(lines, line => {
    // Add each node to the nodes array
    const fields = line.split(' ')

    // if name is already in the node list, update it, otherwise create
    const node = nodes[fields[0]] || { name: fields[0] }
    nodes[fields[0]] = node
    nodes[fields[0]].weight = fields[1].substring(1, fields[1].length-1)

    // If this node has children, either update their parents or create a stub record
    if (fields[2]) {
      const children = _.map(_.takeRightWhile(fields, f => { return f != '->'}), childName => {
        return childName.charAt(childName.length-1) === ',' ?
          childName.substring(0, childName.length-1) : childName
        }
      )
      _.each(children, childName => {
        const child = nodes[childName] || { name: childName }
        child.parent = node
        nodes[childName] = child
      })
    }
  })

  return _.find(nodes, n => { return !n.parent }).name
}

const part2 = input => {

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