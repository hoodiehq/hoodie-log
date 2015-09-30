var test = require('tape')

var debug = require('../../lib/debug')

test('debug("bar")', function (t) {
  t.plan(2)

  var state = {
    prefix: 'foo',
    styles: false,
    console: {
      log: function (prefix, message) {
        t.is(prefix, '(foo:debug)')
        t.is(message, 'bar')
      }
    }
  }

  debug(state, 'bar')
})

test('debug("bar") with styles', function (t) {
  t.plan(4)

  var state = {
    prefix: 'foo',
    styles: {
      default: '<default styles>',
      debug: '<debug styles>',
      reset: '<reset styles>'
    },
    console: {
      log: function (prefix, prefixStyle, messageStyle, message) {
        t.is(prefix, '%cfoo%c')
        t.is(prefixStyle, '<default styles>; <debug styles>')
        t.is(messageStyle, '<reset styles>')
        t.is(message, 'bar')
      }
    }
  }

  debug(state, 'bar')
})

test('debug("bar") with level=debug', function (t) {
  t.plan(1)

  var state = {
    prefix: 'foo',
    styles: false,
    level: 'debug',
    console: {
      log: function () {
        t.pass('console.log called')
      }
    }
  }

  debug(state, 'bar')
  t.end()
})

test('debug("bar") with level=info', function (t) {
  var state = {
    prefix: 'foo',
    styles: false,
    level: 'info',
    console: {
      log: t.fail
    }
  }

  debug(state, 'bar')
  t.pass('does not call console.info')
  t.end()
})
