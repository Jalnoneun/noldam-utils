const generateCode = (start, end) => {
  var code = ''
  for (var i = 0; i < end - start; i++) {
    code += '1'
  }
  return (
    DEFAULT_TIME_CODE.substring(0, start) +
    code +
    DEFAULT_TIME_CODE.substring(end)
  )
}

exports.generateCode = generateCode