const _ = require('lodash')
const fs = require('fs');

const part1 = input => {
  const memory = _.map(fs.readFileSync(input).toString().split(" "), i => { return parseInt(i) });

  const seen_configs = {}

  seen_configs[_.toString(memory)] = true

  let counter = 0
  while (true) {
    counter += 1

    // Shuffle memory
    let rebalance = _.reverse(_.sortBy(memory))[0]
    let index = _.indexOf(memory, rebalance)

    memory[index] = 0
    
    while (rebalance > 0) {
      index += 1
      if (index === memory.length) {
        index = 0
      }

      memory[index] += 1
      rebalance -= 1
    }

    // Exit if we've already seen this config
    const current = _.toString(memory)
    if (seen_configs[current]) return counter
    seen_configs[_.toString(memory)] = true
  }
}

const part2 = input => {
  const jumps = _.map(fs.readFileSync(input).toString().split("\n"), i => { return parseInt(i) });

  let pc = 0
  let counter = 0
  while (pc >= 0 && pc < jumps.length) {
    const jumpDistance = jumps[pc]
    jumps[pc] = jumpDistance >= 3 ? jumpDistance - 1 : jumpDistance + 1
    pc += jumpDistance
    counter += 1
  }

  return counter
}

const input = './day6/input'

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