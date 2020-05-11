const moment = require('moment')

/**
 * 시간 index 값을 통해 시간 문자열 값 추출
 * @param {number} index 0~23.5까지
 * @param {string} format 시간 표현 방식
 */
const getTimeFromIndex = (index, format = 'A hh:mm') => {
  const hour = Math.floor(index)
  const min = index - hour === 0.5 ? 30 : 0
  return moment().hour(hour).minute(min).format(format)
}

/**
 * date와 시간 index 값을 통해 Date 형식 반환
 * @param {string} date 날짜
 * @param {number} index 0~23.5까지
 */
const getDateFromIndex = (date, index) => {
  const hour = Math.floor(index)
  const min = index - hour === 0.5 ? 30 : 0
  return moment(date).hour(hour).minute(min).toDate()
}

/**
 * 시작 시간부터 종료 시간까지의 표현 방식 반환
 * @param {number} start 시작 시간 index
 * @param {number} hour 놀이 시간
 * @param {string} format 시간 표현 방식
 * @param {string} separator 구분자
 * @param {boolean} displayHour 맨 끝에 '(n시간)' 표현 여부
 */
const fromToTime = (
  start,
  hour,
  format = 'A hh:mm',
  separator = ' - ',
  displayHour = false,
  ) => {
  const from = getTimeFromIndex(start, format)
  const to = getTimeFromIndex(start + hour, format)
  let result = `${from}${separator}${to}`
  if (displayHour) result += `(${hour}시간)`
  return result
}

exports.getTimeFromIndex = getTimeFromIndex
exports.getDateFromIndex = getDateFromIndex
exports.fromToTime = fromToTime