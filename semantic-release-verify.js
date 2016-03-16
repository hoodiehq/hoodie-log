module.exports = verify

/**
 * This is a workaround to `npm run semantic-release` locally
 *
 * @see https://github.com/semantic-release/semantic-release#verifyconditions
 */
function verify (pluginConfig, config, callback) {
  callback()
}
