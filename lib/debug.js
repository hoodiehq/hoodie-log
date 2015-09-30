module.exports = debug

var logLevelIgnored = require('./utils/log-level-ignored')
var prepareLogArguments = require('./utils/prepare-log-arguments')

function debug (state) {
  if (logLevelIgnored(state, 'debug')) {
    return
  }
  var args = prepareLogArguments(state, 'debug', [].slice.call(arguments, 1))
  state.console.log.apply(state.console, args)
}
