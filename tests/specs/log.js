var test = require('tape')

var log = require('../../lib/log')

test('log("bar")', function (t) {
  t.plan(2)

  var state = {
    prefix: 'foo',
    styles: false,
    console: {
      log: function (prefix, message) {
        t.is(prefix, '(foo:log)')
        t.is(message, 'bar')
      }
    }
  }

  log(state, 'bar')
})

test('log("bar") with styles', function (t) {
  t.plan(4)

  var state = {
    prefix: 'foo',
    styles: {
      default: '<default styles>',
      log: '<log styles>',
      reset: '<reset styles>'
    },
    console: {
      log: function (prefix, prefixStyle, messageStyle, message) {
        t.is(prefix, '%cfoo%c')
        t.is(prefixStyle, '<default styles>; <log styles>')
        t.is(messageStyle, '<reset styles>')
        t.is(message, 'bar')
      }
    }
  }

  log(state, 'bar')
})
