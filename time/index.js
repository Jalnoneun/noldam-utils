const moment = require('moment')

const getTimeFromIndex = (index, format) => {
  const hour = Math.floor(index)
  const min = index - hour === 0.5 ? 30 : 0
  return moment().hour(hour).minute(min).format(format)
}

exports.getTimeFromIndex = getTimeFromIndex