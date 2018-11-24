const _ = require('lodash')
const fs = require('fs');

const part1 = input => {
  const lines = fs.readFileSync(input).toString().split("\n");
  return _.reduce(
    _.map(lines, line => {
      let entries = line.split(" ")
      return entries.length == _.uniq(entries).length
    }),
    (sum, n) => {return sum + n},
    0
  )
}

const part2 = input => {
  const lines = fs.readFileSync(input).toString().split("\n");
  return _.reduce(
    _.map(lines, line => {
      let entries = _.map(line.split(" "), word => { return word.split('').sort().join('') })
      return entries.length == _.uniq(entries).length
    }),
    (sum, n) => {return sum + n},
    0
  )
}

const input = './day4/input'

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