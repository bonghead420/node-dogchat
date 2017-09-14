const {write, isExitSequence} = require('./dogchat')

test('write', () => {
  process.stdout.write = jest.fn()
  write('foo')
  expect(process.stdout.write.mock.calls.length).toEqual(1)
  expect(process.stdout.write.mock.calls[0]).toEqual(['foo'])
})

test('isExitSequence', () => {
  expect(isExitSequence(Buffer.from('foo\n'))).toBe(false)
  expect(isExitSequence(Buffer.from('...goodbye\n'))).toBe(false)
  expect(isExitSequence(Buffer.from('goodbye\n'))).toBe(true)
})

/* TODO: more tests */
