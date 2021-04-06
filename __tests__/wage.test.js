const {
  toCurrency,
  getHourlyWage,
  getWageForOnePlay,
  getWageForRequest,
  getTotalWage,
} = require('../wage')
const { getUnitPrice } = require('../matching')

describe('wage funcs', () => {
  const schedules = [
    {
      startDate: '2020-04-13',
      start: 14,
      hour: 2,
    }
  ]

  const schedules2 = [
    {
      startDate: '2020-04-13',
      start: 14,
      hour: 4,
    },
    {
      startDate: '2020-04-11',
      endDate: '2020-04-25',
      start: 18,
      hour: 2,
    },
  ]

  test('toCurrency', () => {
    expect(toCurrency(1234000)).toBe('1,234,000')
  })

  test('getTotalWage', () => {
    expect(getTotalWage(schedules, {
      childCount: 3,
      rank: 'A',
    })).toBe(40000)
  })

  test('getTotalWage', () => {
    expect(getTotalWage(schedules, {
      childCount: 2,
      special: 'shhport',
    })).toBe(40000)
  })

  test('getTotalWage', () => {
    expect(getTotalWage(schedules, {
      childCount: 1,
      special: 'sk_2005',
    })).toBe(20000)
  })

  test('getTotalWage', () => {
    expect(getTotalWage(schedules, {
      childCount: 1,
      special: 'sk_2005',
    })).toBe(20000)
  })

  test('getHourlyWage 전문 현재', () => {
    expect(getHourlyWage('A')).toBe(14000)
  })

  test('getHourlyWage 우수 단발성 2019-04-01', () => {
    expect(getHourlyWage('B', '2019-04-01', 'S')).toBe(11500)
  })

  test('getHourlyWage 일반 단발성 2018-09-01', () => {
    expect(getHourlyWage('C', '2018-09-01', 'S')).toBe(9600)
  })

  test('getWageForOnePlay 전문 현재', () => {
    expect(getWageForOnePlay('A', 3, 1)).toBe(51000)
  })

  test('getWageForOnePlay 우수 단발성 2019-04-01', () => {
    expect(getWageForOnePlay('B', 2, 0, '2019-04-01', 'S')).toBe(23000)
  })

  test('getWageForOnePlay 일반 단발성 2018-09-01', () => {
    expect(getWageForOnePlay('C', 4, 2, '2018-09-01', 'S')).toBe(62400)
  })

  test('getWageForRequest', () => {
    expect(getWageForRequest(schedules2, 'C', 1)).toBe(130000)
  })

  test('getWageForRequest', () => {
    expect(getWageForRequest(schedules2, 'C', 1)).toBe(130000)
  })
})
