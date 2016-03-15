var test = require('tape')

var Log = require('../../client')

test('Constructor', function (t) {
  var log = new Log('foo')

  t.is(typeof log, 'function', 'log() can be called as function')
  t.is(typeof log.debug, 'function', 'log.debug() is function')
  t.is(typeof log.info, 'function', 'log.info() is function')
  t.is(typeof log.warn, 'function', 'log.warn() is function')
  t.is(typeof log.error, 'function', 'log.error() is function')
  t.is(typeof log.scoped, 'function', 'log.scoped() is function')

  t.is(log.prefix, 'foo', 'sets prefix')

  t.end()
})
