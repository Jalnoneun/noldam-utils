const {
  getUnitPrice,
} = require('../matching')

describe('price func', () => {
  test('getUnitPrice', () => {
    expect(getUnitPrice({
      category: 'one',
      option1: 'B',
      childCount: 2,
    })).toBe(20000)
  })

  test('getUnitPrice', () => {
    expect(getUnitPrice({
      category: 'group',
      special: 'tri_cooking',
      option1: 1,
      childCount: 2,
    })).toBe(49000)
  })

  test('getUnitPrice', () => {
    expect(getUnitPrice({
      category: 'group',
      special: 'shhport',
      childCount: 2,
    })).toBe(30000)
  })
})
