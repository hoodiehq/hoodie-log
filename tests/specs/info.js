var test = require('tape')

var info = require('../../lib/info')

test('info("bar")', function (t) {
  t.plan(2)

  var state = {
    prefix: 'foo',
    styles: false,
    console: {
      info: function (prefix, message) {
        t.is(prefix, '(foo:info)')
        t.is(message, 'bar')
      }
    }
  }

  info(state, 'bar')
})

test('info("bar") with styles', function (t) {
  t.plan(4)

  var state = {
    prefix: 'foo',
    styles: {
      default: '<default styles>',
      info: '<info styles>',
      reset: '<reset styles>'
    },
    console: {
      info: function (prefix, prefixStyle, messageStyle, message) {
        t.is(prefix, '%cfoo%c')
        t.is(prefixStyle, '<default styles>; <info styles>')
        t.is(messageStyle, '<reset styles>')
        t.is(message, 'bar')
      }
    }
  }

  info(state, 'bar')
})

test('info("bar") with level=info', function (t) {
  t.plan(1)

  var state = {
    prefix: 'foo',
    styles: false,
    level: 'info',
    console: {
      info: function () {
        t.pass('console.info called')
      }
    }
  }

  info(state, 'bar')
  t.end()
})

test('info("bar") with level=warn', function (t) {
  var state = {
    prefix: 'foo',
    styles: false,
    level: 'warn',
    console: {
      info: t.fail
    }
  }

  info(state, 'bar')
  t.pass('does not call console.info')
  t.end()
})
