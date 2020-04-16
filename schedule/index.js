const moment = require('moment')
const DAY_LIST = ['월', '화', '수', '목', '금', '토', '일']

/**
 * 신청서 일정 정보를 받아 실제 놀이 날짜 목록으로 변환
 * @param {Object[]} schedules 신청서 일정 정보를 담은 객체
 * @param {string} schedules[].startDate 시작 날짜
 * @param {string} schedules[].endDate 종료 날짜
 * @param {number} schedules[].start 시작 시간 index
 * @param {number} schedules[].hour 놀이 시간
 * @return {Object[]}
 */
const getDatesFromSchedules = schedules => {
  let dates = []
  schedules.forEach(({
    startDate,
    endDate,
    start,
    hour,
  }) => {
    const firstDate = {
      date: startDate,
      start,
      hour,
    }
    dates.push(firstDate)
    if (endDate) {
      let tempDate = moment(startDate)
      while(tempDate.add(7, 'd').isSameOrBefore(endDate)) {
        const date = tempDate.format('YYYY-MM-DD')
        dates.push({
          date,
          start,
          hour,
        })
      }
    }
  })
  dates = dates.sort((a, b) => moment(a.date).isBefore(b.date) ? -1 : 1)
  return dates
}

/**
 * 시작 날짜를 기점으로 같은 요일의 날짜 목록을 반환
 * @param {string} date 시작 날짜
 * @param {number} count 총 날짜 수
 * @param {boolean} firstDateIncluded 시작 날짜 포함 여부
 */
const getDatesOnSameWeekday = (
  date,
  count = 8,
  firstDateIncluded
) => {
  const format = 'YYYY-MM-DD'
  let dates = []
  let repeatCount = firstDateIncluded ? count - 1 : count
  
  let tempDate = moment(date)
  if (firstDateIncluded) { dates.push(tempDate.format(format)) }
  for (let i = 0; i < repeatCount; i++) {
    tempDate.add('7', 'd')
    dates.push(tempDate.format(format))
  }
  return dates
}

/**
 * schedule 객체에서 정보 추출
 * @param {Object[]} schedules 신청서 일정 정보를 담은 객체
 * @param {number} schedules[].day 요일 index. 월요일 0, 일요일 6
 * @param {number} schedules[].hour 놀이 진행 시간
 * @param {string} schedules[].startDate 시작 날짜
 * @param {string} schedules[].endDate 종료 날짜
 */
const getScheduleInfo = schedules => {
  let days = []
  let totalHour = 0
  let count = 0
  let firstDate = ''
  let lastDate = ''
  schedules.forEach(({ day, hour, startDate, endDate }) => {
    let tempCount = 0
    if (!days.includes(day)) days.push(day)

    if (firstDate === '') firstDate = startDate
    else if (moment(firstDate).isAfter(startDate)) firstDate = startDate

    let tempLastDate = !endDate ? startDate : endDate
    if (lastDate === '') lastDate = tempLastDate
    else if (moment(lastDate).isBefore(tempLastDate)) lastDate = tempLastDate

    if (!endDate) {
      tempCount = 1
    } else {
      tempCount += (moment(endDate).diff(moment(startDate), 'w') + 1)
    }
    totalHour += (tempCount * hour)
    count += tempCount
  })

  return {
    days,
    totalHour,
    count,
    firstDate,
    lastDate,
  }
}

/**
 * schedule 정보를 요약한 텍스트로 변환
 * @param {Object[]} schedules 신청서 일정 정보를 담은 객체
 * @param {number} schedules[].day 요일 index. 월요일 0, 일요일 6
 * @param {number} schedules[].hour 놀이 진행 시간
 * @param {string} schedules[].startDate 시작 날짜
 * @param {string} schedules[].endDate 종료 날짜
 */
const getScheduleSummary = schedules => {
  const format = 'M월 D일'
  const {
    days,
    count,
    firstDate,
    lastDate,
  } = getScheduleInfo(schedules)
  const lastDateText = lastDate ? ` - ${moment(lastDate).format(format)}` : ''
  const text = `${moment(firstDate).format(format)}${lastDateText} (총 ${count}회 놀이)`
  const dayText = days.sort((a, b) => a - b).map(item => DAY_LIST[item]).join(',')
  return {
    days,
    count,
    firstDate,
    lastDate,
    text,
    dayText,
  }
}

const schedule = {
  getDatesFromSchedules,
  getDatesOnSameWeekday,
  getScheduleInfo,
  getScheduleSummary
};

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['schedule'], factory)
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(schedule)
  } else {
    // browser
    root.isDev = factory()
  }
})(this, function() {
  return schedule
})