const stdin = process.openStdin();

const vocabulary = ['woof']

const output = {
  greeting: 'Dog is standing by! Type something and press ENTER key.' +
    '\nType `bye` or `CTRL+D` when you are done chatting.' +
    '\n',
  salutation: `\rDog: *waves goodbye*` + 
    '\n\nYour session has ended. Thank you for chatting with Dog.' +
    '\n',
  busy: 'Dog is typing...',
  response: `\rDog: ${vocabulary[0]}` +
    '\n',
}

let timer = null

const init = () => {
  console.clear()
  write(output.greeting)
  renderPrompt()
  handleInput()
}

const handleInput = () => {
  stdin.on('data', (chunk) => { 
    isExitSequence(chunk) && exit()
    write(output.busy)
    timer = setTimeout(respond, 1000)
  })
}

const exit = () => {
  timer = setTimeout(() => {
    write(output.salutation)
    process.exit()
  }, 1000)
}

const renderPrompt = () => write('\n> ')

const respond = (chunk) => {
  process.stdout.clearLine()
  write(output.response)
  renderPrompt()
}

const write = (str) => process.stdout.write(str)

const isExitSequence = (chunk) => chunk.toString('utf8').match(/^bye\n$/i)

init()
