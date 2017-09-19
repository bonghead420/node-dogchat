const _vocabulary = ['woof', 'woof', 'woof', 'WOOF', 'grrr']

const maxPhraseLengthInWords = 5

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
  constructor(vocabulary = _vocabulary) {
    this.vocabulary = vocabulary
    this.output = output
  }

  getRandomVocabularyIndex() {
    return Math.round(Math.random() * (this.vocabulary.length -1))
  }

  getRandomPhraseLength() {
    return Math.ceil(Math.random() * maxPhraseLengthInWords)
  }

  getWords() {
    const words = Array.from(Array(this.getRandomPhraseLength()).keys())
    return words.map(() => this.vocabulary[this.getRandomVocabularyIndex()])
  }

  speak() {
    const message = this.getWords().join(' ')
    return `\rDog: ${message}\n`
  }
}

module.exports = Dog
