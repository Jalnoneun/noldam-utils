const {
  getTotalPrice,
  getHourlyPrice,
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

  test('getHourlyPrice - 전문 아이3', () => {
    expect(getHourlyPrice({
      childCount: 3,
      rank: 'A'
    })).toBe(30000)
  })

  test('getHourlyPrice - 우수 아이2', () => {
    expect(getHourlyPrice({
      childCount: 2,
      rank: 'B'
    })).toBe(22000)
  })

  test('getTotalPrice - tri_cooking(옵션0)', () => {
    expect(getTotalPrice(hour2_schedules, {
      childCount: 3,
      special: 'tri_cooking',
      option1: 0,
    })).toBe(99000)
  })

  test('getTotalPrice - tri_cooking(옵션3)', () => {
    expect(getTotalPrice(hour2_schedules, {
      childCount: 2,
      special: 'tri_cooking',
      option1: 3,
    })).toBe(88000)
  })

  test('getTotalPrice - tri_cooking(옵션5)', () => {
    expect(getTotalPrice(hour2_schedules, {
      childCount: 3,
      special: 'tri_cooking',
      option1: 5,
    })).toBe(120000)
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
