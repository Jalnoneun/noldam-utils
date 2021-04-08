const moment = require('moment')
const { isValidRank } = require('../lib/validation')
const { HOURLY_WAGE, SIBLING_HOURLY } = require("../lib/values")
const { getScheduleInfo } = require('../schedule')

const getUnitWage = ({
  childCount,
  special,
  rank,
}) => {
  if (childCount < 1) {
    throw new Error('아이 수 오류')
  }

  if (!special
    || special === 'normal'
    || special === 'tutor'
    || special === 'homecoming'
    || special === 'group') {
    const baseWage = HOURLY_WAGE[2][rank]
    const extra = 3000 * (childCount - 1)
    const hourlyWage = baseWage + extra

    return hourlyWage
  }

  if (special === 'kidop') {
    const hourlyWage = 14000

    return hourlyWage

  } else if (special === 'booktalk') {
    // 북토크
    const baseWage = 10000
    const extra = 3000 * (childCount - 1)
    const hourlyWage = baseWage + extra

    return hourlyWage
    
  } else if (special.includes('tri_')) {
    const baseWage = 14000
    const extra = 3000 * (childCount - 1)
    const hourlyWage = baseWage + extra

    return hourlyWage

  } else if (special === 'town') {
    // 동네탐구생활
    const baseWage = 10000
    const extra = 3000 * (childCount - 1)
    const hourlyWage = baseWage + extra

    return hourlyWage

  } else if (special === 'shhport') {
    // 쉿포츠
    const baseWage = 14000
    const extra = 6000 * (childCount - 1)
    const hourlyWage = baseWage + extra

    return hourlyWage
  } else if (special === 'makingbox') {
    // 뚝딱 메이킹 박스
    const baseWage = 10000
    const extra = 3000 * (childCount - 1)
    const hourlyWage = baseWage + extra

    return hourlyWage

  } else if (special === 'apart_dreamgreen') {
    return 18000
  } else if (special.includes('sk')
    || special.includes('jongno')
    || special.includes('hungry')
    || special.includes('wadiz')
    || special.includes('posco')
  ) {
    const baseWage = 10000
    const extra = 3000 * (childCount - 1)
    const hourlyWage = baseWage + extra

    return hourlyWage
  }

  throw new Error('잘못된 분류입니다')
}

/**
 * 놀이 전체 시급
 * 적절한 형태가 입력되지 않은 경우 오류 발생
 * @param {object} schedule 일정
 * @param {string} rank 시터 등급
 * @param {number} childCount 아이 수
 * @param {number} special 클래스
 * @returns {number}
 */
const getTotalWage = (schedules, params) => {
  const {
    childCount,
    special,
    rank
  } = params
  const { totalHour } = getScheduleInfo(schedules)
  const hourlyWage = getUnitWage({
    childCount,
    special,
    rank,
  })
  return hourlyWage * totalHour
}

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

/**
 * 놀이 전체 시급
 * @param {object} schedule 일정
 * @param {string} rank 시터 등급
 * @param {number} sibling 형제 추가 옵션
 * @returns {number}
 */
const getWageForRequest = (schedules, rank, sibling = 0) => {
  if (isValidRank(rank)) {
    const { totalHour } = getScheduleInfo(schedules)
    return (getHourlyWage(rank) + (SIBLING_HOURLY * sibling)) * totalHour
  }
  return 0
}

const wage = {
  getUnitWage,
  getTotalWage,
  toCurrency,
  getHourlyWage,
  getWageForOnePlay,
  getWageForRequest,
}

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory)
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