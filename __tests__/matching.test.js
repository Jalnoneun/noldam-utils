const {
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

  test('', () => {

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
