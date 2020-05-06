const delayRequest = (delay) => {
  if (delay == null) delay = 1000
  return new Promise(resolve => setTimeout(resolve, delay))
}

module.exports = delayRequest
