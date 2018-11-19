
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
  const lines = fs.readFileSync(input).toString().split("\n");
  return _.reduce(
    _.map(lines, line => {
      const sortedEntries = _.sortBy(_.map(_.split(line,' '), entry => { return parseInt(entry) }))
      for (let i=0; i<sortedEntries.length - 1; ++i) {
        for (let j=i+1; j<sortedEntries.length; ++j) {
          const val = sortedEntries[j] / sortedEntries[i]
          if (Number.isInteger(val)) {
            return val
          }
        }
      }
    }),
    (sum, n) => {return sum + n},
    0
  )
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