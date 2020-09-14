const {
  getUnitPrice,
  getTotalPrice,
  getCategory,
} = require('../matching')

describe('price func', () => {
  const schedules = [
    {
      startDate: '2020-04-13',
      start: 14,
      hour: 2,
    }
  ]

  test('getUnitPrice', () => {
    expect(getUnitPrice({
      rank: 'B',
      childCount: 2,
    })).toBe(20000)
  })

  test('getUnitPrice', () => {
    expect(getUnitPrice({
      special: 'tri_cooking',
      option1: 1,
      childCount: 2,
    })).toBe(49000)
  })

  test('getUnitPrice', () => {
    expect(getUnitPrice({
      special: 'shhport',
      childCount: 2,
    })).toBe(30000)
  })

  test('getTotalPrice', () => {
    const a = { childCount: 2,
      special: 'tri_cooking',
      rank: 'B',
      option1: 0,
      option2: null,
      option3: null }
    expect(getTotalPrice(schedules, a)).toBe(88000)
  })

  test('getCategory', () => {
    expect(getCategory('hungry_2008')).toBe('with')
  })

  test('getCategory', () => {
    expect(getCategory()).toBe('one')
  })
})
