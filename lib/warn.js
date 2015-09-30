module.exports = warn

var logLevelIgnored = require('./utils/log-level-ignored')
var prepareLogArguments = require('./utils/prepare-log-arguments')

function warn (state) {
  if (logLevelIgnored(state, 'warn')) {
    return
  }
  var args = prepareLogArguments(state, 'warn', [].slice.call(arguments, 1))
  state.console.warn.apply(state.console, args)
}
