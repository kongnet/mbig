const assert = (global.assert = require('assert'))
const { Big } = require('./index.js')
describe.isException = () => {}

module.exports = {
  test: describe,
  Big,
  assert
}
