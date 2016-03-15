var test = require('tape')

var Log = require('../../client')

test('log.scoped("bar").info("baz")', function (t) {
  var log = new Log({
    prefix: 'foo',
    level: 'debug'
  })
  var barLog = log.scoped('bar')

  t.is(barLog.prefix, 'foo:bar', 'extends prefix')
  t.is(barLog.level, 'debug', 'passes level')

  t.is(typeof barLog, 'function', 'log.scoped("bar") can be called as function')
  t.is(typeof barLog.info, 'function', 'log.scoped("bar").info() is function')
  t.is(typeof barLog.warn, 'function', 'log.scoped("bar").warn() is function')
  t.is(typeof barLog.error, 'function', 'log.scoped("bar").error() is function')
  t.is(typeof barLog.scoped, 'function', 'log.scoped("bar").scoped() is function')

  t.end()
})
