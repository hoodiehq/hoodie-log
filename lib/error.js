module.exports = error

var prepareLogArguments = require('./utils/prepare-log-arguments')

function error (state) {
  var args = prepareLogArguments(state, 'error', [].slice.call(arguments, 1))
  state.console.error.apply(state.console, args)
}
