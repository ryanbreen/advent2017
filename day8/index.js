const _ = require('lodash')
const fs = require('fs');

const part1 = input => {
  const instructions = fs.readFileSync(input).toString().split("\n");

  const registers = {}

  _.each(instructions, line => {
    const instruction = line.split(' ')

    const register = registers[instruction[0]] || { name: instruction[0], value: 0 }
    registers[instruction[0]] = register

    const operand = registers[instruction[4]] || { name: instruction[4], value: 0 }
    let test = false

    switch (instruction[5]) {
      case '>':
        test = operand.value > parseInt(instruction[6])
        break
      case '>=':
        test = operand.value >= parseInt(instruction[6])
        break
      case '<':
        test = operand.value < parseInt(instruction[6])
        break
      case '<=':
        test = operand.value <= parseInt(instruction[6])
        break
      case '==':
        test = operand.value == parseInt(instruction[6])
        break
      case '!=':
        test = operand.value != parseInt(instruction[6])
        break
      default:
        console.log(`ERRRRRRRRRRRRRRRRRRROR ${instruction[5]}`)
    }

    if (test) {
      switch (instruction[1]) {
        case 'inc':
          register.value += parseInt(instruction[2])
          break
        case 'dec':
          register.value -= parseInt(instruction[2])
          break
      }
    }
  })

  return _.reverse(_.sortBy(registers, o => { return o.value } ))[0].value
}

const part2 = input => {

}

const input = './day8/input'

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