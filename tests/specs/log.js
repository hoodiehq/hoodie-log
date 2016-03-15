var test = require('tape')
var simple = require('simple-mock')
var Log = require('../../client')
var log = require('../../lib/log')

test('log("bar")', function (t) {
  t.plan(2)

  var state = {
    prefix: 'hoodie',
    styles: false,
    console: {
      log: function (prefix, message) {
        t.is(prefix, '(hoodie:log)')
        t.is(message, 'bar')
      }
    }
  }

  log(state, 'bar')
})

test('log("bar") with styles', function (t) {
  t.plan(4)

  var state = {
    prefix: 'hoodie',
    styles: {
      default: '<default styles>',
      log: '<log styles>',
      reset: '<reset styles>'
    },
    console: {
      log: function (prefix, prefixStyle, messageStyle, message) {
        t.is(prefix, '%choodie%c')
        t.is(prefixStyle, '<default styles>; <log styles>')
        t.is(messageStyle, '<reset styles>')
        t.is(message, 'bar')
      }
    }
  }

  log(state, 'bar')
})

test('log.prefix will throw if changed', function (t) {
  simple.mock(Log.console, 'log')
  var log = new Log('foo')

  t.throws(function () {
    log.prefix = 'test'
  })
  t.end()
  simple.restore()
})
