const vocabulary = ['woof']

const output = {
  greeting: 'Dog is standing by! Type something and press ENTER key.' +
    '\nType `goodbye` when you are finished chatting' +
    '\n',
  salutation: '\rDog: *waves goodbye*' +
    '\n\nYour session has ended. Thank you for chatting with Dog.' +
    '\n',
  busy: 'Dog is typing...',
  responseTemplate: `\rDog: ${vocabulary[0]}` +
    '\n',
}

module.exports = {output}
