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

exports.getTimeFromIndex = getTimeFromIndex