const listHelper = require('../utils/list_helper')

describe.skip(() => {
  test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
})