const { getScheduleInfo } = require('../schedule')
const { toCurrency } = require('../wage')
const { HOURLY_PRICE, SIBLING_HOURLY } = require("../lib/values")

const getUnitPrice = ({
  childCount,
  category,
  special,
  rank,
  option1,
  option2,
  option3,
}) => {
  if (category === 'one') {
    if (special === '') {
      
    } else if (special === 'booktalk') {
      let hourlyPrice = 16000
      return hourlyPrice

    } else {
      const hourlyPrice = HOURLY_PRICE[rank] + 3000 * (childCount - 1)
      return hourlyPrice
    }
  } else if (category === 'group') {
    if (special === 'tri_cooking') {
      // 삼총사 쿠킹 클래스 - 2시간 고정
      // option1: option1 -> A타입, B타입 2가지 타입 각각 A타입: 0, B타입: 1
      // (불필요) option2: option2 -> A타입, B타입 각각 2개의 선택지. 가격과는 무관

      // option1 Validation
      if (![0, 1].includes(option1)) {
        throw '[option1] A,B타입 선택 오류'
      }

      // childCount Validation
      if (![2, 3].includes(childCount)) {
        throw '[childCount] 참여 아이 수 오류 2,3명만 가능'
      }
      let hourlyPrice = null
      if (option1 === 0) {
        hourlyPrice = childCount === 3 ? 35000 : 44000
      } else if (option1 === 1) {
        hourlyPrice = childCount === 3 ? 40000 : 49000
      }
      return hourlyPrice

    } else if (special === 'tri_mongcle') {
      // 삼총사 클레이 클래스 - 2시간 고정
      // option1: option1 -> A타입, B타입, C타입 3가지 타입 각각 A타입: 0, B타입: 1, C타입: 2

      // option1 Validation
      if (![0, 1, 2].includes(option1)) {
        throw '[option1] A,B,C타입 선택 오류'
      }

      // childCount Validation
      if (![2, 3].includes(childCount)) {
        throw '[childCount] 참여 아이 수 오류 2,3명만 가능'
      }
      let hourlyPrice = null
      if (option1 === 0) {
        hourlyPrice = childCount === 3 ? 36000 : 46000
      } else if (option1 === 1) {
        hourlyPrice = childCount === 3 ? 38000 : 48000
      } else if (option1 === 2) {
        hourlyPrice = childCount === 3 ? 39000 : 49000
      }
      return hourlyPrice

    } else if (special === 'town') {
      // 동네탐구생활
      let hourlyPrice = childCount === 1 ? 14000 : 10000 * childCount
      return hourlyPrice

    } else if (special === 'shhport') {
      // 쉿포츠
      let hourlyPrice = 22000 + 8000 * (childCount - 1)
      if (childCount > 3) {
        throw '[childCount] 아이 수는 1명에서 3명까지만 가능합니다.'
      }
      return hourlyPrice
    }
  } else if (category === 'with') {
    return 0
  }

  throw '[childCount] 참여 아이 수 오류 2,3명만 가능'
}



const getTotalPrice = (schedules, params) => {
  const {
    childCount,
    category,
    special,
    rank,
    option1,
    option2,
    option3,
  } = params
  const { totalHour } = getScheduleInfo(schedules)
  const hourlyWage = getUnitPrice({
    childCount,
    category,
    special,
    rank,
    option1,
    option2,
    option3,
  })
  return hourlyWage * totalHour
}

const getItemName = (schedules, params) => {
  const {
    childCount,
    category,
    special,
    rank,
  } = params
  const { totalHour } = getScheduleInfo(schedules)
  if (category === 'one') {
    if (special === 'tutor') {
      return `놀담 학습도우미 ${totalHour}시간`
    } else if (special === 'booktalk') {
      return `온라인 북토크 ${totalHour}시간`
    } else {
      let strRank = '일반'
      if (rank === 'B') strRank = '우수'
      if (rank === 'A') strRank = '전문'
      let strChildOption = ''
      if (childCount > 1) strChildOption = `(아이추가 ${childCount - 1}명)`
      return `${strRank}시터 ${totalHour}시간${strChildOption}`
    }
  } else if (category === 'group') {
    if (special === 'tri_cooking') {
      let strChildOption = ''
      if (childCount !== 3) strChildOption = `(${childCount}인)`
      return `삼총사 클래스 요리사편 ${totalHour}시간${strChildOption}`
    } else if (special === 'tri_mongcle') {
      let strChildOption = ''
      if (childCount !== 3) strChildOption = `(${childCount}인)`
      return `삼총사 클래스 클레이 아트편 ${totalHour}시간${strChildOption}`
    } else if (special === 'town') {
      let strChildOption = ''
      if (childCount !== 2) strChildOption = `(${childCount}인)`
      return `동네탐구생활 ${totalHour}시간${strChildOption}`
    } else if (special === 'shhport') {
      let strChildOption = `(${childCount}인)`
      return `쉿포츠 ${totalHour}시간${strChildOption}`
    }
  } else if (category === 'with') {
    if (special === 'sk_2005') {
      return `SK 함께돌봄 ${totalHour}시간`
    } else if (special === 'hungry') {
      return `기아대책 ${totalHour}시간`
    }
    return 0
  }
}



/**
 * 시간당 가격 조회
 * @param {string} rank 시터 등급 A, B, C
 * @param {number} siblings 아이 추가 수
 * @returns {Object} 시급 정보
 */
const getHourlyPrice = (rank, siblings) => {
  const price = HOURLY_PRICE[rank]
  const sibling = SIBLING_HOURLY * siblings
  return {
    total: price + sibling,
    price,
    sibling,
  }
}

/**
 * schedules 객체 배열을 통해 가격 추출
 * @param {Object[]} schedules 일정 정보를 담은 배열
 * @param {number} schedules[].day 요일 index. 월요일 0, 일요일 6
 * @param {number} schedules[].hour 놀이 진행 시간
 * @param {string} schedules[].startDate 시작 날짜
 * @param {string} schedules[].endDate 종료 날짜
 * @param {number} siblings 아이 추가 수
 * @param {string} rank 시터 등급 A, B, C
 * @returns {Object} 해당 일정에 따른 금액 정보
 */
const calPriceForSchedules = (schedules, siblings, rank) => {
  const { totalHour } = getScheduleInfo(schedules)
  const { total, price, sibling } = getHourlyPrice(rank, siblings)
  return {
    total: total * totalHour,
    price: price  * totalHour,
    sibling: sibling * totalHour,
  }
}

/**
 * schedules 객체 배열을 통해 가격 추출
 * @param {number} hour 놀이시간
 * @param {number} siblings 아이 추가 수
 * @param {string} rank 시터 등급 A, B, C
 * @returns {Object} 놀이 1회분 금액 정보
 */
const calPriceForOnePlay = (hour, siblings, rank) => {
  const { total, price, sibling } = getHourlyPrice(rank, siblings)
  return {
    total: total * hour,
    price: price  * hour,
    sibling: sibling * hour,
  }
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
  discountPrice = Math.ceil(discountPrice)
  if (discountPrice < 0) discountPrice = 0
  return discountPrice
}

const getDiscountInfo = discount => {
  const { type, value } = discount
  let strInfo = ''
  if (type === 'amount') {
    strInfo = `${toCurrency(value)}원 할인`
  } else if (type === 'percent') {
    strInfo = `${value}% 할인`
  } else if (type === 'hour') {
    strInfo = `${value} 시간 무료`
  }
  return strInfo
}

const matching = {
  getUnitPrice,
  getTotalPrice,
  getItemName,
  getHourlyPrice,
  calPriceForSchedules,
  calPriceForOnePlay,
  calDiscountPrice,
  getDiscountInfo,
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