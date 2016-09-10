var ObservArray = require('observ-array')

module.exports = function toArray (list) {
  var isObserv = typeof list === 'function'

  var from = isObserv ? list.from() : list.from
  var count = isObserv ? list.count() : list.count
  var array = new Array(from + count)
  var arrayIndex = 0

  for (var index = from, length = from + count; index < length; index++) {
    if (list[index] == null) continue
    array[arrayIndex++] = list[index]
  }

  return isObserv ? ObservArray(array) : array
}
