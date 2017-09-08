const vocabulary = ['woof']
const output = {
  greeting: 'Dog is standing by! Type something and press ENTER key.' +
    '\nType `bye` or `CTRL+D` when you are done chatting.' +
    '\n',
  salutation: `\rDog: *waves goodbye*` +
    '\n\nYour session has ended. Thank you for chatting with Dog.' +
    '\n',
  busy: 'Dog is typing...',
  responseTemplate: `\rDog: ${vocabulary[0]}` +
    '\n',
}
const defaultResponseDelay = 1000
let timers = []

const init = () => {
  console.clear()
  write(output.greeting)
  renderPrompt()
  process.openStdin().on('data', handleInput)
}

const renderPrompt = () => write('\n> ')

const renderResponse = () => write(output.responseTemplate)

const handleInput = (chunk) => {
  write(output.busy)
  if (isExitSequence(chunk)) return handleExitSequence()
  timers.push(setTimeout(respond, defaultResponseDelay))
}

const isExitSequence = chunk => chunk.toString('utf8').match(/bye\.*\n$/i)

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

const clearTimer = () => {
  typeof timers === 'array' && timers.forEach(timer => clearTimeout(timer))
}

module.exports = {
  DogChat: init,
}
