const { isValidRank } = require('../lib/validation')

const hourlyObj = {
  price: {
    A: 20000,
    B: 17000,
    C: 14000,
  },
  wage: {
    A: 14000,
    B: 12000,
    C: 10000,
  }
}

const SIBLING_HOURLY_WAGE = 3000

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
const getWageForOnePlay = (rank, hour, sibling) => {
  if (isValidRank(rank)
  && typeof hour === 'number'
  && typeof sibling === 'number') {
    const type = code.charAt(0)
    const rank = code.charAt(3)
    const wagePerHour =
      getHourlyWage(type, rank, isOld) + sibling * SIBLING_HOURLY_WAGE
    return wagePerHour * hour
  }
  return 0
}

exports.toCurrency = toCurrency
exports.getWageForOnePlay = getWageForOnePlay