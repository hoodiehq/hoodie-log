var test = require('tape')

var error = require('../../lib/error')

test('error("bar")', function (t) {
  t.plan(2)

  var state = {
    prefix: 'foo',
    styles: false,
    console: {
      error: function (prefix, message) {
        t.is(prefix, '(foo:error)')
        t.is(message, 'bar')
      }
    }
  }

  error(state, 'bar')
})

test('error("bar") with styles', function (t) {
  t.plan(4)

  var state = {
    prefix: 'foo',
    styles: {
      default: '<default styles>',
      error: '<error styles>',
      reset: '<reset styles>'
    },
    console: {
      error: function (prefix, prefixStyle, messageStyle, message) {
        t.is(prefix, '%cfoo%c')
        t.is(prefixStyle, '<default styles>; <error styles>')
        t.is(messageStyle, '<reset styles>')
        t.is(message, 'bar')
      }
    }
  }

  error(state, 'bar')
})
