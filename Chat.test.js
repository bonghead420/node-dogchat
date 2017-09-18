import _Dog from './Dog'
import _Chat from './Chat'

const Dog = new _Dog()
const Chat = new _Chat({
  bot: Dog,
  delay: 1000,
  test: true,
})

const prepareString = (str) => {
  return Chat.getStringFromChunk(Buffer.from(`${str}\n`))
}

test('write', () => {
  process.stdout.write = jest.fn()
  Chat.write('hello')
  expect(process.stdout.write.mock.calls.length).toBe(1)
  expect(process.stdout.write.mock.calls[0][0]).toEqual('hello')
})

test('isExitSequence', () => {
  expect(Chat.isExitSequence(prepareString('foo'))).toBe(false)
  expect(Chat.isExitSequence(prepareString('...goodbye'))).toBe(false)
  expect(Chat.isExitSequence(prepareString('goodbye\n'))).toBe(true)
})

test('handleInput saves user message', () => {
  Chat.handleInput(prepareString('hello'))
  expect(Chat.messages.user.length).toBe(1)
  expect(Chat.messages.user[0].message).toEqual('hello')
})

test('handleInput calls isExitSequence', () => {
  Chat.isExitSequence = jest.fn()
  Chat.handleInput(prepareString(''))
  setTimeout(() => {
    expect(Chat.isExitSequence.mock.calls.length).toBe(1)
  }, 20)
})

test('handleInput w/out ExitSequence', () => {
  Chat.write = process.stdout.write = jest.fn()
  Chat.handleInput('')
  expect(Chat.write.mock.calls.length).toBe(1)
  expect(Chat.write.mock.calls[0][0]).toEqual(Dog.output.busy)
})

test('renderResponse saves bot message', () => {
  Chat.write = process.stdout.write = jest.fn()
  Chat.renderResponse()
  expect(Chat.messages.bot.length).toBe(1)
})

/* TODO: more tests */
