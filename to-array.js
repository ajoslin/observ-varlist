var ObservArray = require('observ-array')

module.exports = function toArray (list) {
  var isObserv = typeof list === 'function'

  var array = []
  var from = isObserv ? list.from() : list.from
  var count = isObserv ? list.count() : list.count

  for (var index = from, length = from + count; index < length; index++) {
    array.push(list[index])
  }

  return isObserv ? ObservArray(array) : array
}
