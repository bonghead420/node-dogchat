import _Dog from './Dog'

const Dog = new _Dog(['woof'])

test('speak', () => {
  const response = Dog.speak()
  expect(response.length > 1).toBe(true)
  expect(!!response.match('woof')).toBe(true)
})
/* TODO: more tests */
