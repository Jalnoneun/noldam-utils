const {
  calPriceForSchedules,
  calPriceForOnePlay,
  calDiscountPrice,
} = require('../matching')

describe('matching funcs', () => {
  test('calPriceForSchedules', () => {
    expect(calPriceForSchedules([
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
    ], 0, 'C')).toBe(133000)
  })

  test('calPriceForOnePlay', () => {
    expect(calPriceForOnePlay(3, 2, 'B')).toBe(69000)
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
