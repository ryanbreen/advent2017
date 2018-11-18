const argv = require('minimist')(process.argv.slice(2))

var part = require(`./day${argv.d}`)[`part${argv.p}`]
var input = argv.i || part.input
console.log(part.exec(input))