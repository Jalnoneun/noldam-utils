const {
  getDatesFromSchedules,
  getDatesOnSameWeekday,
  getScheduleInfo,
  getScheduleSummary
} = require('../schedule')

describe('schedule funcs', () => {
  const schedules = [
    {
      startDate: '2020-04-13',
      start: 14,
      hour: 3.5,
      day: 1,
    },
    {
      startDate: '2020-04-11',
      endDate: '2020-04-25',
      start: 18,
      hour: 2,
      day: 6,
    },
  ]

  test('getDatesFromSchedules', () => {
    expect(getDatesFromSchedules(schedules)).toStrictEqual([
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

  test('getScheduleInfo', () => {
    expect(getScheduleInfo(schedules)).toStrictEqual({
      days: [1, 6],
      totalHour: 9.5,
      count: 4,
      firstDate: '2020-04-11 18:00',
      lastDate: '2020-04-25 18:00',
    })
  })

  test('getScheduleSummary', () => {
    expect(getScheduleSummary(schedules)).toStrictEqual({
      days: [1, 6],
      count: 4,
      firstDate: '2020-04-11 18:00',
      lastDate: '2020-04-25 18:00',
      text: '4월 11일 - 4월 25일 (총 4회 놀이)',
      dayText: '월,토',
    })
  })
})