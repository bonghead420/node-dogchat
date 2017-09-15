import {
  output
} from './output'
import {
  write,
  isExitSequence,
  handleInput
} from './dogchat'

test('write', () => {
  process.stdout.write = jest.fn()
  write('hello')
  expect(process.stdout.write.mock.calls.length).toBe(1)
  expect(process.stdout.write.mock.calls[0][0]).toEqual('hello')
})

test('isExitSequence', () => {
  expect(isExitSequence(Buffer.from('foo\n'))).toBe(false)
  expect(isExitSequence(Buffer.from('...goodbye\n'))).toBe(false)
  expect(isExitSequence(Buffer.from('goodbye\n'))).toBe(true)
})

test('handleInput calls isExitSequence', () => {
  const isExitSequence = jest.fn()
  handleInput(Buffer.from(''))
  setTimeout(() => {
    expect(isExitSequence.mock).toBe(1)
  }, 20)
})

test('handleInput w/out ExitSequence', () => {
  const write = process.stdout.write = jest.fn()
  handleInput('')
  expect(write.mock.calls.length).toBe(1)
  expect(write.mock.calls[0][0]).toEqual(output.busy)
})

/* TODO: more tests */
