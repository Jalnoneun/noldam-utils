const { isValidRank } = require('../lib/validation')

const HOURLY_WAGE_MANUAL = [
  {
    A: 12000,
    B: 10000,
    C: 8000,
  },
  {
    A: 12500,
    B: 10500,
    C: 8500,
  },
  {
    A: 14000,
    B: 12000,
    C: 10000,
  },
]

const SIBLING_HOURLY_WAGE = 3000

const getHourlyWage = (type, rank, date) => {
  let index = 2
  if (moment(date).isBefore('2019-01-01')) index = 0
  else if (moment(date).isBefore('2019-10-01')) index = 1

  const index = moment(date).isSameOrAfter('2019-10-01') ? 2 : moment(date).isSameOrBefore('2019-01-01') ? 1 : 0
  let hourlyWage = HOURLY_WAGE_MANUAL[index][rank]
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
 * 화폐 단위 문자열로 변환
 * @param {number} price
 * @returns {string}
 */
const toCurrency = price => {
  if (typeof price !== 'number') return '0'
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 놀이 1회당 시급
 * @param {string} rank 시터 등급
 * @param {number} hour 놀이 시간
 * @param {number} sibling 형제 추가 옵션
 * @returns {number}
 */
const getWageForOnePlay = (type, rank, hour, date, sibling) => {
  if (isValidRank(rank)
  && typeof hour === 'number'
  && typeof sibling === 'number') {
    const hourlyWage =
      getHourlyWage(type, rank, date) + sibling * SIBLING_HOURLY_WAGE
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