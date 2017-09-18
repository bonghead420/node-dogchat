import _Dog from './Dog'

const Dog = new _Dog()

test('speak', () => {
  const response = Dog.speak()
  expect(response.length > 1).toBe(true)
  expect(!!response.match(Dog.vocabulary[0])).toBe(true)
})
/* TODO: more tests */
