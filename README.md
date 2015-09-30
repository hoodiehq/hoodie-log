# hoodie-client-log

> hoodie.log API for the browser

[![Build Status](https://travis-ci.org/hoodiehq/hoodie-client-log.svg?branch=master)](https://travis-ci.org/hoodiehq/hoodie-client-log)
[![Coverage Status](https://coveralls.io/repos/hoodiehq/hoodie-client-log/badge.svg?branch=master)](https://coveralls.io/r/hoodiehq/hoodie-client-log?branch=master)
[![Dependency Status](https://david-dm.org/hoodiehq/hoodie-client-log.svg)](https://david-dm.org/hoodiehq/hoodie-client-log)
[![devDependency Status](https://david-dm.org/hoodiehq/hoodie-client-log/dev-status.svg)](https://david-dm.org/hoodiehq/hoodie-client-log#info=devDependencies)

## API

```js
var log = new Log('hoodie')

log("ohaj!")
// (hoodie) ohaj!
log.debug("This will help with debugging.")
// (hoodie:debug) This will help with debugging.
log.info("This might be of interest. Or not.")
// (hoodie:info) This might be of interest. Or not.
log.warn("Something is fishy here!")
// (hoodie:warn) Something is fishy here!
log.error("oooops")
// (hoodie:error) oooops

var fooLog = log.scoped('foo')
fooLog('baz!')
// (hoodie:foo) baz!
```

### Options

```js
var log = new Log({
  prefix: 'hoodie',
  level: 'debug',
  styles: {
    default: 'border: 1px solid',
    log: 'border-color: black; color: black;',
    debug: 'border-color: black; color: black;',
    info: 'border-color: blue; color: blue;',
    warn: 'border-color: orange; color: orange;',
    error: 'border-color: red; color: red;',
    reset: 'border: inherit; color: inherit'
  }
}
```

#### prefix (required)

Must be a string. A log messages will be prefixed with it

#### level (default: `"warn"`)

One of 'debug', 'info', 'warn', 'error'

#### styles (default: `true` if browser supports it)

If set to false, all log messages are prefixed by `(<prefix>:<log type>) `, e.g. `(fooprefix:warn) bar is not avaiable.`.
If set to true, the respective CSS styles are applied to the `<prefix>` part. Available styles are:

- `default`: base style for all log types
- `reset`: reset style, applied for message after prefix
- `log`: styles for default log calls without log level
- `debug` / `info` / `warn` / `error`: styles for respective log levels

The default styles are defined in [lib/utils/parse-options.js](lib/utils/parse-options.js)

### License

[Apache-2.0](https://github.com/hoodiehq/hoodie/blob/master/LICENSE)