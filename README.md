# hoodie-log

> Custom log API for the browser

[![Build Status](https://travis-ci.org/hoodiehq/hoodie-log.svg?branch=master)](https://travis-ci.org/hoodiehq/hoodie-log)
[![Coverage Status](https://coveralls.io/repos/hoodiehq/hoodie-log/badge.svg?branch=master)](https://coveralls.io/r/hoodiehq/hoodie-log?branch=master)
[![Dependency Status](https://david-dm.org/hoodiehq/hoodie-log.svg)](https://david-dm.org/hoodiehq/hoodie-log)
[![devDependency Status](https://david-dm.org/hoodiehq/hoodie-log/dev-status.svg)](https://david-dm.org/hoodiehq/hoodie-log#info=devDependencies)

`hoodie-log` is a standalone JavaScript library for logging to the
browser console. If available, it takes advantage of [CSS-based styling of console
log outputs](https://developer.mozilla.org/en-US/docs/Web/API/Console#Styling_console_output).

## Example

```js
var log = new Log('hoodie')

log('ohaj!')
// (hoodie) ohaj!
log.debug('This will help with debugging.')
// (hoodie:debug) This will help with debugging.
log.info('This might be of interest. Or not.')
// (hoodie:info) This might be of interest. Or not.
log.warn('Something is fishy here!')
// (hoodie:warn) Something is fishy here!
log.error('oooops')
// (hoodie:error) oooops

var fooLog = log.scoped('foo')
fooLog('baz!')
// (hoodie:foo) baz!
```

## API

- [Constructor](#constructor)
- [log.prefix](#logprefix)
- [log.level](#loglevel)
- [log()](#log)
- [log.debug()](#logdebug)
- [log.info()](#loginfo)
- [log.warn()](#logwarn)
- [log.error()](#logerror)
- [log.scoped()](#logscoped)

### Constructor

```js
new Log(prefix)
// or
new Log(options)
```

<table>
  <thead>
    <tr>
      <th align="left">Argument</th>
      <th align="left">Type</th>
      <th align="left">Description</th>
      <th align="left">Required</th>
    </tr>
  </thead>
  <tr>
    <th align="left">prefix</th>
    <td>String</td>
    <td>Prefix for log messages</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th align="left">options.prefix</th>
    <td>String</td>
    <td>Prefix for log messages</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th align="left">options.level</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>warn</code></em>. One of <code>debug</code>,
      <code>info</code>, <code>warn</code> or <code>error</code>.
      <code>debug</code> is the lowest level, and everything will be logged to
      the console. <code>error</code> is the highest level and nothing but
      errors will be logged.
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles</th>
    <td>Boolean or Object</td>
    <td>
      <em>Defaults to <code>true</code></em>. If set to false, all log messages
      are prefixed by <code>(&lt;prefix&gt;:&lt;log type&gt;)</code>, e.g.
      <code>(fooprefix:warn) bar is not available.</code>. If set to true,
      styles are applied to the prefix. The styles can be customised, see below
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles.default</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>color: white; padding: .2em .4em; border-radius: 1em</code></em>.
      Base CSS styles for all log types
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles.reset</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>background: inherit; color: inherit</code></em>.
      Reset CSS styles, applied for message after prefix
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles.log</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>background: gray</code></em>.
      CSS Styles for default log calls without log level
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles.debug</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>background: green</code></em>.
      CSS Styles for debug logs
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles.info</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>background: blue</code></em>.
      CSS Styles for info logs
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles.warn</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>background: orange</code></em>.
      CSS Styles for warn logs
    </td>
    <td>No</td>
  </tr>
  <tr>
    <th align="left">styles.error</th>
    <td>String</td>
    <td>
      <em>Defaults to <code>background: red</code></em>.
      CSS Styles for error logs
    </td>
    <td>No</td>
  </tr>
</table>

Example

```js
var log = new Log({
  prefix: 'hoodie',
  level: 'warn',
  styles: {
    default: 'color: white; padding: .2em .4em; border-radius: 1em',
    debug: 'background: green',
    log: 'background: gray',
    info: 'background: blue',
    warn: 'background: orange',
    error: 'background: red',
    reset: 'background: inherit; color: inherit'
  }
}
```

### log.prefix

_Read-only_

```js
log.prefix
```

Prefix used in log messages

Example

```js
log = new Log('hoodie')
log.prefix // hoodie
log.warn("Something is fishy here!")
// (hoodie:warn) Something is fishy here!
```

---

---

### log.level

One of <code>debug</code>, <code>info</code>, <code>warn</code> or
<code>error</code>. <code>debug</code> is the lowest level, and everything will
be logged to the console. <code>error</code> is the highest level and nothing
but errors will be logged.

```js
log.level
```

Example

```js
log.level = 'debug'
log.debug('This will help with debugging.')
// (hoodie:debug) This will help with debugging.
log.level = 'info'
log.debug('This will help with debugging.')
// <no log>
log.level = 'foo'
// throws InvalidValue error
```

### log()

Logs message to browser console. Accepts same arguments as [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)

```js
log("ohaj!")
```

### log.debug()

Logs debug message to browser console if `level` is set to `debug`.
Accepts same arguments as [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)

```js
log.debug('This will help with debugging.')
```

### log.info()

Logs info message to browser console if `level` is set to `debug` or `info`
Accepts same arguments as [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)

```js
log.info('This might be of interest. Or not.')
```

### log.warn()

Logs warning to browser console unless `level` is set to `error`
Accepts same arguments as [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)

```js
log.warn('Something is fishy here!')
```

### log.error()

Logs error message to browser console.
Accepts same arguments as [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)

```js
log.error('oooops')
```

### log.scoped()

```js
log.scoped(prefix)
```

<table>
  <thead>
    <tr>
      <th align="left">Argument</th>
      <th align="left">Type</th>
      <th align="left">Description</th>
      <th align="left">Required</th>
    </tr>
  </thead>
  <tr>
    <th align="left">prefix</th>
    <td>String</td>
    <td>Prefix for log messages</td>
    <td>Yes</td>
  </tr>
</table>

Returns `log` API with extended `prefix`

Example

```js
var log = new Log('hoodie')
log('ohaj!')
// (hoodie) ohaj!
var fooLog = log.scoped('foo')
fooLog('baz!')
// (hoodie:foo) baz!
```

## Testing

Local setup

```
git clone git@github.com:hoodiehq/hoodie-log.git
cd hoodie-log
npm install
```

Run all tests and code style checks

```
npm test
```

Run all tests on file change

```
npm run test:watch
```

Run specific tests only

```
node tests/specs/debug.js # run .debug() unit tests
```

**PROTIP™:** pipe output through a [pretty reporter](https://www.npmjs.com/package/tape#pretty-reporters)

### License

[Apache-2.0](https://github.com/hoodiehq/hoodie/blob/master/LICENSE)
