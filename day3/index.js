
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

const build_positions = cap => {
  const counter_to_pos = [{}, {x: 0, y: 0}]
  let counter = 2

  let currentX = 1
  let currentY = 0

  let level = 1
  let levelSize = 1

  while (counter < cap) {

    const levelSize = 8 * level

    // For each array entry at this level, figure out where to put it
    const legLength = (levelSize / 4)

    // Right column first
    const topRightCorner = currentY + legLength - 2
    while (currentY <= topRightCorner) {
      counter_to_pos[counter] = { x: currentX, y: currentY }
      currentY += 1
      counter += 1
    }

    // Then top
    const topLeftCorner = currentX - legLength + 1
    while (currentX >= topLeftCorner) {
      counter_to_pos[counter] = { x: currentX, y: currentY }
      currentX -= 1
      counter += 1
    }

    // The left column
    const bottomLeftCorner = currentY - legLength + 1
    while (currentY >= bottomLeftCorner) {
      counter_to_pos[counter] = { x: currentX, y: currentY }
      currentY -= 1
      counter += 1
    }

    // Now bottom
    const bottomRightCorner = currentX + legLength
    while (currentX <= bottomRightCorner) {
      counter_to_pos[counter] = { x: currentX, y: currentY }
      currentX += 1
      counter += 1
    }

    level += 1
  }

  return counter_to_pos
}

const part2 = input => {
  const matrix = {
    0 : {
      0 : 1
    }
  }

  let val = 1
  const spread = [-1, 0, 1]

  let counter = 2
  let counter_to_pos = build_positions(480)

  while (val < input) {

    // Move x or y
    const x = counter_to_pos[counter]['x']
    const y = counter_to_pos[counter]['y']

    // Gather and sum adjacent squares
    val = _.reduce(
      _.compact(_.flatten(
        _.map(spread, deltaX => {
          return _.map(spread, deltaY => {
            if (matrix[x + deltaX] !== undefined && matrix[y + deltaY] !== undefined) {
              return matrix[x + deltaX][y + deltaY]
            }
          })
        })
      )), (sum, n) => {
        if (n) return sum + parseInt(n)
        return sum
      }, 0
    )

    // Deposit sum at this x and y
    if (!matrix[x]) matrix[x] = {}
    matrix[x][y] = val

    counter += 1
  }

  return val
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