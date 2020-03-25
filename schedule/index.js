const moment = require('moment')
const DEFAULT_TIME_CODE = '00000000000000000000000000'

/**
 * 시작, 끝 인덱스를 받아 26자리 코드를 생성
 * @param {number} start 0~24 사이 시작 index 값
 * @param {number} end 1~25 사이 종료 index 값
 * @returns {string}
 */
const generateCode = (start, end) => {
  if (typeof start !== 'number' && typeof end !== 'number') return null
  let code = ''
  for (let i = 0; i < end - start; i++) {
    code += '1'
  }
  return (
    DEFAULT_TIME_CODE.substring(0, start) +
    code +
    DEFAULT_TIME_CODE.substring(end)
  )
}

/**
 * 신청서 일정 정보를 받아 실제 놀이 날짜 목록으로 변환
 * @param {Object[]} schedules 신청서 일정 정보를 담은 객체
 * @param {string} schedules[].fromDate 시작 날짜
 * @param {string} schedules[].toDate 종료 날짜
 * @param {number} schedules[].start 시작 시간 index
 * @param {number} schedules[].hour 놀이 시간
 * 
 */
const getDatesFromSchedules = schedules => {
  let dates = []
  schedules.forEach(({
    fromDate,
    toDate,
    start,
    hour,
  }) => {
    const firstDate = {
      date: fromDate,
      start,
      hour,
    }
    dates.push(firstDate)
    if (toDate) {
      let tempDate = moment(fromDate)
      while(tempDate.add(7, 'd').isSameOrBefore(toDate)) {
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

exports.generateCode = generateCode
exports.getDatesFromSchedules = getDatesFromSchedules