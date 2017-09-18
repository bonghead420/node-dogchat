const vocabulary = ['woof']

const output = {
  greeting: 'Dog is standing by! Type something and press ENTER key.' +
    '\nType `goodbye` when you are finished chatting' +
    '\n',
  salutation: '\rDog: *waves goodbye*' +
    '\n\nYour session has ended. Thank you for chatting with Dog.' +
    '\n',
  busy: 'Dog is typing...',
}

class Dog {
  constructor() {
    this.vocabulary = vocabulary
    this.output = output
  }

  speak() {
    const words = Array.from(Array(Math.ceil(Math.random() * 8)).keys())
    return `\rDog: ${words.map(() => this.vocabulary[0]).join(' ')}\n`
  }
}

module.exports = Dog
