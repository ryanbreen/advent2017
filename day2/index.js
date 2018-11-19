
const _ = require('lodash')
const fs = require('fs');

const part1 = input => {
  const lines = fs.readFileSync(input).toString().split("\n");
  return _.reduce(
    _.map(lines, line => {
      let lowest = Number.MAX_SAFE_INTEGER, highest = -1
      _.forEach(_.split(line,' '), entry => {
        const val = parseInt(entry)
        if (val < lowest) lowest = val
        if (val > highest) highest = val
      })

      return highest - lowest
    }),
    (sum, n) => {return sum + n},
    0
  )
}

const part2 = input => {

}

const input = './day2/input'

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