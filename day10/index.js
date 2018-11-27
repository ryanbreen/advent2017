const _ = require('lodash')
const fs = require('fs');

const knot = input => {
  const steps = _.split(input, ',')
  const knotworkSize = steps.length > 4 ? 256 : 5
  const knotwork = []

  // Initialize knotwork
  _.each(_.range(0, knotworkSize), n => { knotwork.push(n) })
  
  let current = 0
  let skip = 0
  _.each(steps, step => {
    const length = parseInt(step)

    const segments = current + length < knotworkSize ?
      [[current, length]] :
      [[current, knotworkSize - current], [0, length - (knotworkSize - current)]]

    // Grab an array of length items
    const newSlice = _.reverse(
      _.flatten(
        _.concat(
          _.map(segments, seg => {
            return _.slice(knotwork, seg[0], seg[1] + seg[0])
          })
        )
      )
    )

    let j = 0
    _.each(segments, seg => {
      for(let i = seg[0]; i < seg[0] + seg[1]; ++i) {
        knotwork[i] = newSlice[j]
        j += 1
      }
    })

    current += length + skip
    if (current >= knotworkSize) current -= knotworkSize

    skip += 1
  })

  return knotwork[0] * knotwork[1]
}

const part1 = input => {
  return knot(input)
}

const part2 = input => {
}

const input = '147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70'

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