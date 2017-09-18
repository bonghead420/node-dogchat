'use strict'

class Chat {
  constructor(config) {
    this.config = config
    this.bot = config.bot
    this.timers = []
    this.messages = {
      user: [],
      bot: [],
    }
    if (!this.config.test) {
      console.clear() // eslint-disable-line no-console
      process.openStdin().on('data', this.handleInput.bind(this))
    }
    this.render()
  }

  render() {
    this.write(this.bot.output.greeting)
    this.renderPrompt()
  }

  renderPrompt() {
    this.write('\n> ')
  }

  renderResponse() {
    const response = this.bot.speak()
    this.saveMessage('bot', response)
    this.write(response)
  }

  isExitSequence(str) {
    return str.match(/^goodbye\.*$/i)
      ? true
      : false
  }

  getStringFromChunk(chunk) {
    return chunk.toString('utf8').replace(/\n*$/, '')
  }

  saveMessage(key, str) {
    this.messages[key].push({
      timestamp: Date.now(),
      message: str,
    })
  }

  handleInput(chunk) {
    const input = this.getStringFromChunk(chunk)
    this.saveMessage('user', input)
    if (this.isExitSequence(input)) {
      return this.handleExitSequence()
    }
    this.write(this.bot.output.busy)
    this.timers.push(setTimeout(
      this.respond.bind(this),
      this.config.delay)
    )
  }

  write(str) {
    process.stdout.write(str)
  }

  respond() {
    process.stdout.clearLine()
    this.renderResponse()
    this.renderPrompt()
  }

  handleExitSequence() {
    this.timers.push(
      setTimeout(() => {
        this.write(this.bot.output.salutation)
        process.exit()
      }, this.config.delay)
    )
  }
}

module.exports = Chat
