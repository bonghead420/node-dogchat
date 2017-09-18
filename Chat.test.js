import _Dog from './Dog'
import _Chat from './Chat'

const Dog = new _Dog()
const Chat = new _Chat(Dog, {
  delay: 1000,
  test: true,
})

test('write', () => {
  process.stdout.write = jest.fn()
  Chat.write('hello')
  expect(process.stdout.write.mock.calls.length).toBe(1)
  expect(process.stdout.write.mock.calls[0][0]).toEqual('hello')
})

test('isExitSequence', () => {
  expect(Chat.isExitSequence(Buffer.from('foo\n'))).toBe(false)
  expect(Chat.isExitSequence(Buffer.from('...goodbye\n'))).toBe(false)
  expect(Chat.isExitSequence(Buffer.from('goodbye\n'))).toBe(true)
})

test('handleInput calls isExitSequence', () => {
  Chat.isExitSequence = jest.fn()
  Chat.handleInput(Buffer.from(''))
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

/* TODO: more tests */
