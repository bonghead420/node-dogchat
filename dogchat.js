'use strict'
const {output} = require('./output')
const defaultResponseDelay = 1000
let timers = []

const initialize = () => {
  console.clear()
  write(output.greeting)
  renderPrompt()
  process.openStdin().on('data', handleInput)
}

const renderPrompt = () => write('\n> ')

const renderResponse = () => write(output.responseTemplate)

const handleInput = chunk => {
  if (isExitSequence(chunk)) {
    return handleExitSequence()
  }
  write(output.busy)
  timers.push(setTimeout(respond, defaultResponseDelay))
}

const isExitSequence = chunk => chunk.toString('utf8').match(/^goodbye\.*\n$/i)

const write = str => process.stdout.write(str)

const respond = (chunk) => {
  process.stdout.clearLine()
  renderResponse()
  renderPrompt()
}

const handleExitSequence = () => {
  timers.push(
    setTimeout(() => write(output.salutation), defaultResponseDelay),
    setTimeout(() => process.exit(), defaultResponseDelay),
  )
}

module.exports = {
  DogChat: initialize,
}
