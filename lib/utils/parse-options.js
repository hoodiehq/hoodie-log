module.exports = parseOptions

parseOptions.browserSupportsLogStyles = require('browser-supports-log-styles')

var DEFAULT_LEVEL = 'warn'
var DEFAULT_STYLES = {
  default: 'color: white; padding: .2em .4em; border-radius: 1em',
  debug: 'background: green',
  log: 'background: gray',
  info: 'background: blue',
  warn: 'background: orange',
  error: 'background: red',
  reset: 'background: inherit; color: inherit'
}

function parseOptions (options) {
  if (typeof options === 'string') {
    options = {
      prefix: options
    }
  }

  if (!options || !options.prefix) {
    throw new TypeError('"prefix" required for new Log(options)')
  }

  if (options.styles === false) {
    options.styles = false
  }

  if (typeof options.styles === 'undefined') {
    options.styles = parseOptions.browserSupportsLogStyles()
  }

  if (options.styles === true) {
    options.styles = {
      default: DEFAULT_STYLES.default,
      log: DEFAULT_STYLES.log,
      debug: DEFAULT_STYLES.debug,
      info: DEFAULT_STYLES.info,
      warn: DEFAULT_STYLES.warn,
      error: DEFAULT_STYLES.error,
      reset: DEFAULT_STYLES.reset
    }
  }

  options.level = options.level || DEFAULT_LEVEL

  return options
}
