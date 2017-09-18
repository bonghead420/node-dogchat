'use strict'

class Chat {
  constructor(thing, config) {
    this.config = config
    this.thing = thing
    this.timers = []
    if (!this.config.test) {
      console.clear() // eslint-disable-line no-console
      process.openStdin().on('data', this.handleInput.bind(this))
    }
    this.render()
  }

  render() {
    this.write(this.thing.output.greeting)
    this.renderPrompt()
  }

  renderPrompt() {
    this.write('\n> ')
  }

  renderResponse() {
    this.write(this.thing.speak())
  }

  isExitSequence(chunk) {
    return chunk.toString('utf8').match(/^goodbye\.*\n$/i)
      ? true
      : false
  }

  handleInput(chunk) {
    if (this.isExitSequence(chunk)) {
      return this.handleExitSequence()
    }
    this.write(this.thing.output.busy)
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
        this.write(this.thing.output.salutation)
        process.exit()
      }, this.config.delay)
    )
  }
}

module.exports = Chat
