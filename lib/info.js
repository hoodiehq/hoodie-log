module.exports = info

var logLevelIgnored = require('./utils/log-level-ignored')
var prepareLogArguments = require('./utils/prepare-log-arguments')

function info (state) {
  if (logLevelIgnored(state, 'info')) {
    return
  }
  var args = prepareLogArguments(state, 'info', [].slice.call(arguments, 1))
  state.console.info.apply(state.console, args)
}
