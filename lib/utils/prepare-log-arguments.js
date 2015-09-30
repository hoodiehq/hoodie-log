module.exports = prepareLogArguments

function prepareLogArguments (state, type, args) {
  if (state.styles) {
    return ['%c' + state.prefix + '%c', state.styles.default + '; ' + state.styles[type], state.styles.reset].concat(args)
  }

  return ['(' + state.prefix + ':' + type + ')'].concat(args)
}
