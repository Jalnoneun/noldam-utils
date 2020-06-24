const moment = require('moment')
const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토']

/**
 * 신청서 일정 정보를 받아 실제 놀이 날짜 목록으로 변환
 * @param {Object[]} schedules 신청서 일정 정보를 담은 객체
 * @param {string} schedules[].startDate 시작 날짜
 * @param {string} schedules[].endDate 종료 날짜
 * @param {number} schedules[].start 시작 시간 index
 * @param {number} schedules[].hour 놀이 시간
 * @return {Object[]}
 */
const getDatesFromSchedules = (schedules, partialDates) => {
  let dates = []
  schedules.forEach(item => {
    const {
      start,
      hour,
      startDate, // 임시로 두 가지 경우(camelCase, underBar) 다 수용하기로
      start_date,
      endDate,
      end_date,
    } = item
    const sDate = startDate || start_date
    const eDate = endDate || end_date
    const firstDate = {
      date: moment(sDate).format('YYYY-MM-DD'),
      start,
      hour,
    }
    dates.push(firstDate)
    if (eDate) {
      let tempDate = moment(sDate)
      while(tempDate.add(7, 'd').isSameOrBefore(eDate)) {
        const date = tempDate.format('YYYY-MM-DD')
        dates.push({
          date,
          start,
          hour,
        })
      }
    }
  })
  if (Array.isArray(partialDates) && partialDates.length > 0) {
    dates = dates.filter(item => partialDates.includes(item.date))
  }
  dates = dates.sort((a, b) => moment(a.date).isBefore(b.date) ? -1 : 1)
  return dates
}


/**
 * 놀이날짜 정보를 받아 스케줄 목록으로 변경
 * @param {Object} dates 
 * @param {string} dates[].date 종료 날짜
 * @param {number} dates[].start 시작 시간 index
 * @param {number} dates[].hour 놀이 시간
 */
const getSchedulesFromDates = dates => {
  const format = 'YYYY-MM-DD'
  let tempDates = [...dates].sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? -1 : 1)
  const onlyDateList = tempDates.map(item => moment(item.date).format(format))
  let includedDate = []
  let schedules = []
  tempDates.forEach(item => {
    let tempDate = moment(item.date)
    if (includedDate.includes(tempDate.format(format))) {
      return
    }
    let repeatList = []
    while(onlyDateList.includes(tempDate.format(format))) {
      repeatList.push({
        ...item,
        date: tempDate.format(format)
      })
      includedDate.push(tempDate.format(format))
      tempDate.add(1, 'w')
    }
    if (repeatList.length === 0) {
      return
    }
    let schedule = { 
        start: item.start,
        hour: item.hour,
        start_date: repeatList[0].date,
     }
    if (repeatList.length > 1) {
      schedule.end_date = repeatList[repeatList.length - 1].date
    }
    schedules.push(schedule)
  })
  return schedules
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

  schedules.forEach(({
    start,
    hour,
    startDate, // 임시로 두 가지 경우(camelCase, underBar) 다 수용하기로
    start_date,
    endDate,
    end_date,
  }) => {
    const dayStart = startDate || start_date
    const dayEnd = endDate || end_date
    const day = moment(dayStart).day()
    let tempCount = 0

    const setStartTime = date => moment(date).add(start, 'h').format('YYYY-MM-DDTHH:mm:ss')

    if (!days.includes(day)) days.push(day)

    if (firstDate === '') firstDate = setStartTime(dayStart)
    else if (moment(firstDate).isAfter(dayStart)) firstDate = setStartTime(dayStart)

    let tempLastDate = !dayEnd ? dayStart : dayEnd

    if (lastDate === '') lastDate = setStartTime(tempLastDate)
    else if (moment(lastDate).isBefore(tempLastDate)) lastDate = setStartTime(tempLastDate)

    if (!dayEnd) {
      tempCount = 1
    } else {
      tempCount += (moment(dayEnd).diff(moment(dayStart), 'w') + 1)
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
  getSchedulesFromDates,
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