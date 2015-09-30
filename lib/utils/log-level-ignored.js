module.exports = logLevelIgnored

function logLevelIgnored (state, target) {
  return LEVELS[target] < LEVELS[state.level]
}

var LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}
