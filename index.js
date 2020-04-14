const moment = require('moment')
moment.updateLocale('ko', {
  meridiem: hour => {
    if (hour < 12) return '오전'
    else return '오후'
  },
  isPM: function(input) {
    return input.includes('오후')
  },
  meridiemParse: /오전|오후/,
  weekdays: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일'
  ],
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  week: { dow: 1 },
})

const a = require('./matching')