module.exports = Log

Log.console = console

var log = require('./lib/log')
var debug = require('./lib/debug')
var info = require('./lib/info')
var warn = require('./lib/warn')
var error = require('./lib/error')

var parseOptions = require('./lib/utils/parse-options')

function Log (options) {
  var state = parseOptions(options)
  state.console = Log.console

  var api = log.bind(null, state)

  api.debug = debug.bind(null, state)
  api.info = info.bind(null, state)
  api.warn = warn.bind(null, state)
  api.error = error.bind(null, state)
  api.scoped = function (name) {
    return Log({
      prefix: state.prefix + ':' + name,
      level: state.level,
      styles: state.styles
    })
  }

  Object.defineProperty(api, 'level', {
    get: function () {
      return state.level
    },
    set: function (newValue) {
      state.level = newValue
    },
    enumerable: true
  })

  api.prefix = state.prefix

  return api
}
