
const _ = require('lodash')
const fs = require('fs');

const find_level = val => {
  // Each level beyond the zeroeth is a multiple of 8
  let level = 1
  let levelSize = 1
  let maxValue = 1

  // Keep counting level sizes until we find the right one
  while (val > maxValue) {
    levelSize = 8 * level

    maxValue = maxValue + levelSize

    level += 1
  }

  // Since the very last item in the level is the furthest offset, let's
  // invert the numbers to make the math easier.
  const invertedPos = maxValue - val
  const lastMax = maxValue - (8 * (level - 1))

  // Midpoints against invertedPos would be .5 * legLength + (legLength * [0,1,2,3])
  const legLength = levelSize / 4
  const midpoints = _.map([0, 1, 2, 3], i => { return .5 * legLength + legLength * i})

  const offset = _.reduce(midpoints, (lowest, midpoint) => {
    const candidate = Math.abs(invertedPos - midpoint)
    return candidate < lowest ? candidate : lowest
  }, legLength)

  return { level: level - 1, offset: offset }
}

const part1 = input => {
  if (input == 1) return 0
  const distance = find_level(input)
  return distance.level + distance.offset
}

const part2 = input => {
  
}

module.exports = {
  part1: {
    exec: part1,
    input: "347991"
  },
  part2: {
    exec: part2,
    input: "347991"
  }
}