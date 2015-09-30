var test = require('tape')

var warn = require('../../lib/warn')

test('warn("bar")', function (t) {
  t.plan(2)

  var state = {
    prefix: 'foo',
    styles: false,
    console: {
      warn: function (prefix, message) {
        t.is(prefix, '(foo:warn)')
        t.is(message, 'bar')
      }
    }
  }

  warn(state, 'bar')
})

test('warn("bar") with styles', function (t) {
  t.plan(4)

  var state = {
    prefix: 'foo',
    styles: {
      default: '<default styles>',
      warn: '<warn styles>',
      reset: '<reset styles>'
    },
    console: {
      warn: function (prefix, prefixStyle, messageStyle, message) {
        t.is(prefix, '%cfoo%c')
        t.is(prefixStyle, '<default styles>; <warn styles>')
        t.is(messageStyle, '<reset styles>')
        t.is(message, 'bar')
      }
    }
  }

  warn(state, 'bar')
})

test('warn("bar") with level=warn', function (t) {
  t.plan(1)

  var state = {
    prefix: 'foo',
    styles: false,
    level: 'warn',
    console: {
      warn: function () {
        t.pass('console.warn called')
      }
    }
  }

  warn(state, 'bar')
  t.end()
})

test('warn("bar") with level=error', function (t) {
  var state = {
    prefix: 'foo',
    styles: false,
    level: 'error',
    console: {
      warn: t.fail
    }
  }

  warn(state, 'bar')
  t.pass('does not call console.warn')
  t.end()
})
