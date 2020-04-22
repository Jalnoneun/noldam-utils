const moment = require('moment')
const { isValidRank } = require('../lib/validation')
const { HOURLY_WAGE, SIBLING_HOURLY } = require("../lib/values")

/**
 * 화폐 단위 문자열로 변환
 * @param {number} price
 * @returns {string}
 */
const toCurrency = price => {
  if (typeof price !== 'number') return '0'
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 날짜별 시급 조회
 * @param {string} rank 시터 등급 A, B, C 중 하나
 * @param {date} date 놀이 진행 날짜
 * @param {string} type 단발성, 정기권, 체험판 등
 */
const getHourlyWage = (rank, date, type) => {
  if (!date) date = moment().toDate()
  let index = 2
  if (moment(date).isBefore('2019-01-01')) index = 0
  else if (moment(date).isBefore('2019-10-01')) index = 1

  let hourlyWage = HOURLY_WAGE[index][rank]
  if (type === 'S') {
    if (index === 0) {
      hourlyWage = hourlyWage * 1.2
    } else if (index === 1) {
      hourlyWage += 1000
    }
  }

  return hourlyWage
}

/**
 * 놀이 1회당 시급
 * @param {string} rank 시터 등급
 * @param {number} hour 놀이 시간
 * @param {number} sibling 형제 추가 옵션
 * @returns {number}
 */
const getWageForOnePlay = (rank, hour, sibling, date, type) => {
  if (isValidRank(rank)) {
    const hourlyWage =
      getHourlyWage(rank, date, type) + sibling * SIBLING_HOURLY
    return hourlyWage * hour
  }
  return 0
}

const wage = {
  toCurrency,
  getHourlyWage,
  getWageForOnePlay,
};

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['wage'], factory)
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(wage)
  } else {
    // browser
    root.isDev = factory()
  }
})(this, function() {
  return wage
})