const { getScheduleInfo } = require('../schedule')
const { HOURLY_PRICE, SIBLING_HOURLY } = require("../lib/values")

/**
 * schedules 객체 배열을 통해 가격 추출
 * @param {Object[]} schedules 일정 정보를 담은 배열
 * @param {number} schedules[].day 요일 index. 월요일 0, 일요일 6
 * @param {number} schedules[].hour 놀이 진행 시간
 * @param {string} schedules[].startDate 시작 날짜
 * @param {string} schedules[].endDate 종료 날짜
 * @param {number} siblings 아이 추가 수
 * @param {string} rank 시터 등급 A, B, C
 * @returns {number} 해당 일정에 따른 금액
 */
const calPriceForSchedules = (schedules, siblings, rank) => {
  const { totalHour } = getScheduleInfo(schedules)
  const hourlyPrice = HOURLY_PRICE[rank] + (SIBLING_HOURLY * siblings)
  return totalHour * hourlyPrice
}

/**
 * schedules 객체 배열을 통해 가격 추출
 * @param {number} hour 놀이시간
 * @param {number} siblings 아이 추가 수
 * @param {string} rank 시터 등급 A, B, C
 * @returns {number} 놀이 1회분 금액
 */
const calPriceForOnePlay = (hour, siblings, rank) => {
  const hourlyPrice = HOURLY_PRICE[rank] + SIBLING_HOURLY * siblings
  return hour * hourlyPrice
}

/**
 * 할인 금액 계산
 * @param {number} price 기존 
 * @param {Object} discount 할인 정보를 담은 객체
 * @param {string} discount.type 3가지 할인 유형. amount: 정해진 금액, percent: 기존가의 n%만큼의 금액, hour: n시간분 금액
 * @param {number} discount.value 할인 값 amount: 금액, percent: 할인율, hour: 시간 
 * @param {number} hourlyPrice 시간 당 가격. discount.type이 hour인 경우에만 유효
 * @returns {number} 할인되는 금액
 */
const calDiscountPrice = (price, discount, hourlyPrice) => {
  const { type, value } = discount
  let discountPrice = 0
  if (type === 'amount') {
    discountPrice = value
  } else if (type === 'percent') {
    discountPrice = price * (value / 100)
  } else if (type === 'hour' && hourlyPrice) {
    discountPrice = hourlyPrice * value
  }
  return discountPrice
}

/**
 * 아이 추가 금액 계산
 * @param {number} siblings 아이 추가 수
 * @returns {number} 추가된 아이 수에 따른 금액
 */
const calSiblingPrice = siblings => {
  const siblingPrice = SIBLING_HOURLY * siblings
  return siblingPrice
}

const matching = {
  calPriceForSchedules,
  calPriceForOnePlay,
  calDiscountPrice,
  calSiblingPrice,
};

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['matching'], factory)
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(matching)
  } else {
    // browser
    root.isDev = factory()
  }
})(this, function() {
  return matching
})