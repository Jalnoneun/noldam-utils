const {
  getTotalPrice,
  getUnitPrice,
  calPriceForSchedules,
  calPriceForOnePlay,
  calDiscountPrice,
} = require('../matching')

describe('matching funcs', () => {
  const schedules = [
    {
      startDate: '2020-04-13',
      start: 14,
      hour: 3.5,
    },
    {
      startDate: '2020-04-11',
      endDate: '2020-04-25',
      start: 18,
      hour: 2,
    },
  ]

  const hour2_schedules = [
    {
      startDate: '2020-04-11',
      start: 18,
      hour: 2,
    },
  ]

  test('getUnitPrice', () => {
    expect(getUnitPrice({
      childCount: 3,
      rank: 'A'
    })).toBe(26000)
  })

  test('getUnitPrice - ignoreChildCount', () => {
    expect(getUnitPrice({
      childCount: 3,
      rank: 'A'
    }, true)).toBe(20000)
  })

  test('getTotalPrice - tri_cooking', () => {
    expect(getTotalPrice(hour2_schedules, {
      childCount: 3,
      category: 'group',
      special: 'tri_cooking',
      option1: 0,
    })).toBe(105000)
  })

  test('getTotalPrice - tri_xmas', () => {
    expect(getTotalPrice(hour2_schedules, {
      childCount: 3,
      category: 'group',
      special: 'tri_xmas',
      option1: 0,
    })).toBe(96000)
  })

  test('getTotalPrice - tri_newyear', () => {
    expect(getTotalPrice(hour2_schedules, {
      childCount: 2,
      category: 'group',
      special: 'tri_newyear',
      option1: 0,
    })).toBe(68000)
  })

  test('calPriceForSchedules', () => {
    expect(calPriceForSchedules(schedules, 0, 'C')).toStrictEqual({
      total: 133000,
      price: 133000,
      sibling: 0,
    })
  })

  test('calPriceForOnePlay', () => {
    expect(calPriceForOnePlay(3, 2, 'B')).toStrictEqual({
      total: 69000,
      price: 51000,
      sibling: 18000,
    })
  })

  test('calDiscountPrice "amount"', () => {
    expect(calDiscountPrice(40000, { type: 'amount', value: 5000 })).toBe(5000)
  })

  test('calDiscountPrice "percent"', () => {
    expect(calDiscountPrice(40000, { type: 'percent', value: 10 })).toBe(4000)
  })

  test('calDiscountPrice "hour"', () => {
    expect(calDiscountPrice(40000, { type: 'hour', value: 1 }, 20000)).toBe(20000)
  })
})
