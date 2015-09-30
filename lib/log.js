module.exports = log

var prepareLogArguments = require('./utils/prepare-log-arguments')

function log (state) {
  var args = prepareLogArguments(state, 'log', [].slice.call(arguments, 1))
  state.console.log.apply(state.console, args)
}
