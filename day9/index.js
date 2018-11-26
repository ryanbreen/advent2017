const _ = require('lodash')
const fs = require('fs');

const part1 = input => {

  const lines = fs.readFileSync(input).toString().split("\n");

  return _.reduce(
    _.map(lines, line => {
      const lineChars = _.split(line, '')
      let currentlyNegated = false
      let instructions = _.filter(lineChars, char => {
        if (currentlyNegated) {
          currentlyNegated = false
          return false
        }

        if (char === '!') {
          currentlyNegated = true
          return false
        }

        return true
      })

      let inGarbage = false
      instructions = _.filter(instructions, char => {
        if (inGarbage) {
          if (char === '>') {
            inGarbage = false
          }
          return false
        }

        if (char === '<') {
          inGarbage = true
          return false
        }

        return true
      })

      // At this point, we've removed all garbage, so it's a simple matter of counting groups
      let groupValue = 0
      let groupCount = 0

      _.map(instructions, char => {
        if (char === '{') {
          // We are nesting a group
          groupValue += 1
        } else if (char === '}') {
          // We are popping a group
          groupCount += groupValue
          groupValue -= 1
        }
      })

      return groupCount
    })
    , (sum, n) => { return sum + n },
    0
  )
}

const part2 = input => {
  const lines = fs.readFileSync(input).toString().split("\n");

  return _.reduce(
    _.map(lines, line => {
      const lineChars = _.split(line, '')
      let currentlyNegated = false
      const instructions = _.filter(lineChars, char => {
        if (currentlyNegated) {
          currentlyNegated = false
          return false
        }

        if (char === '!') {
          currentlyNegated = true
          return false
        }

        return true
      })

      let garbageCount = 0
      let inGarbage = false
      _.map(instructions, char => {
        if (inGarbage) {
          if (char === '>') {
            inGarbage = false
          } else {
            garbageCount += 1
          }
        }

        if (char === '<') {
          inGarbage = true
        }
      })

      return garbageCount
    })
    , (sum, n) => { return sum + n },
    0
  )
}

const input = './day9/input'

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