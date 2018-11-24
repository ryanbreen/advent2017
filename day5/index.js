const _ = require('lodash')
const fs = require('fs');

const part1 = input => {
  const jumps = _.map(fs.readFileSync(input).toString().split("\n"), i => { return parseInt(i) });

  let pc = 0
  let counter = 0
  while (pc >= 0 && pc < jumps.length) {
    const jumpDistance = jumps[pc]
    jumps[pc] = jumpDistance + 1
    pc += jumpDistance
    counter += 1
  }

  return counter
}

const part2 = input => {

}

const input = './day5/input'

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