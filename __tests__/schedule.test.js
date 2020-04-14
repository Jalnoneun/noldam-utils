const {
  getDatesFromSchedules,
  getDatesOnSameWeekday,
  getScheduleInfo,
  getScheduleSummary
} = require('../schedule')

describe('schedule funcs', () => {
  test('getDatesFromSchedules', () => {
    expect(getDatesFromSchedules([
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
    ])).toStrictEqual([
      {
        date: '2020-04-11',
        start: 18,
        hour: 2,
      },
      {
        date: '2020-04-13',
        start: 14,
        hour: 3.5
      },
      {
        date: '2020-04-18',
        start: 18,
        hour: 2,
      },
      {
        date: '2020-04-25',
        start: 18,
        hour: 2,
      },
    ])
  })

  test('getDatesOnSameWeekday firstDateIncludes=true', () => {
    expect(getDatesOnSameWeekday('2020-04-10', 3, true)).toStrictEqual([
      '2020-04-10', '2020-04-17', '2020-04-24', 
    ])
  })

  test('getDatesOnSameWeekday firstDateIncludes=false', () => {
    expect(getDatesOnSameWeekday('2020-04-10', 3, false)).toStrictEqual([
      '2020-04-17', '2020-04-24', '2020-05-01',
    ])
  })
})