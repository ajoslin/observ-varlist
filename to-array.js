var value = require('observ-value')
var ObservArray = require('observ-array')

module.exports = function toArray (list) {
  var isObserv = typeof list === 'function'

  var array = []
  var from = value(list.from)
  var count = value(list.count)

  for (var index = from, length = from + count; index < length; index++) {
    array.push(value(list[index]))
  }

  return isObserv ? ObservArray(array) : array
}
