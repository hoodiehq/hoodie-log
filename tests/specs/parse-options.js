var test = require('tape')

var parseOptions = require('../../lib/utils/parse-options')

test('without options', function (t) {
  t.plan(2)
  try {
    parseOptions()
  } catch (error) {
    t.ok(error, 'throws error')
    t.is(error.message, '"prefix" required for new Log(options)')
  }
})

test('options: {}', function (t) {
  t.plan(2)
  try {
    parseOptions({})
  } catch (error) {
    t.ok(error, 'throws error')
    t.is(error.message, '"prefix" required for new Log(options)')
  }
})

test('options: "something" if styles supported', function (t) {
  parseOptions.browserSupportsLogStyles = function () { return true }
  var options = parseOptions('something')
  t.is(options.prefix, 'something', 'sets prefix')

  t.is(typeof options.styles, 'object', 'defaults styles')
  t.is(options.styles.default, 'color: white; padding: .2em .4em; border-radius: 1em', 'defaults default style')
  t.is(options.styles.log, 'background: gray', 'defaults log style')
  t.is(options.styles.debug, 'background: green', 'defaults debug style')
  t.is(options.styles.info, 'background: blue', 'defaults info style')
  t.is(options.styles.warn, 'background: orange', 'defaults warn style')
  t.is(options.styles.error, 'background: red', 'defaults error style')
  t.is(options.styles.reset, 'background: inherit; color: inherit', 'defaults reset style')

  t.is(options.level, 'warn', 'defaults log level to "warn"')

  t.end()
})
test('options: {prefix: "something", styles: false} if styles supported', function (t) {
  parseOptions.browserSupportsLogStyles = function () { return true }
  var options = parseOptions({prefix: 'something', styles: false})
  t.is(options.styles, false, 'sets options.styles = false')

  t.end()
})

test('options: {prefix: "something"}', function (t) {
  var options = parseOptions({prefix: 'something'})
  t.is(options.prefix, 'something', 'sets prefix')

  t.end()
})
