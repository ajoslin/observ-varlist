'use strict'

var VarHash = require('observ-varhash')
var Observ = require('observ')

function identity (value) { return value }

module.exports = ObservList

function ObservList (data, createItem) {
  if (typeof data === 'function') {
    createItem = data
    data = []
  }
  createItem = createItem || identity
  data = data || []

  var from = Observ(data.from || 0)
  var count = Observ(data.count || data.length || 0)

  var obs = VarHash(getItems(data, from(), count()), Item)

  obs.put('from', from)
  obs.put('count', count)

  var remove = obs.delete
  var put = obs.put
  delete obs.put
  delete obs.delete

  setNonEnumerable(obs, 'reset', reset)
  setNonEnumerable(obs, 'prepend', prepend)
  setNonEnumerable(obs, 'append', append)
  setNonEnumerable(obs, 'forEach', forEach)
  setNonEnumerable(obs, 'map', map)
  setNonEnumerable(obs, 'filter', filter)

  return obs

  function Item (value, key) {
    // Make sure user sees number indexes instead of string keys
    return createItem(value, parseInt(key, 10))
  }

  function reset (data) {
    var newFrom = data.from || 0
    var newCount = data.count || data.length || 0

    var items = getItems(data, newFrom, newCount)
    var current = obs()
    var minFrom = Math.min(newFrom, current.from)
    var maxFrom = Math.max(newFrom, current.from)
    var maxCount = Math.max(newCount, current.count)

    for (var i = minFrom, ii = maxFrom + maxCount; i < ii; i++) {
      var outOfBounds = i < newFrom || i > (newFrom + newCount - 1)
      if (outOfBounds) {
        remove(i)
      } else if (!(i in current)) {
        put(i, items[i])
      }
    }

    from.set(newFrom)
    count.set(newCount)

    return obs
  }

  function getItems (data, from, count) {
    var items = {}
    for (var i = from, ii = from + count; i < ii; i++) {
      items[i] = data[i] || null
    }
    return items
  }

  function prepend (item) {
    from.set(from() - 1)
    count.set(count() + 1)

    put(from(), item)
  }

  function append (item) {
    count.set(count() + 1)

    put(from() + count() - 1, item)
  }

  function forEach (iterator, context) {
    for (var i = from(), ii = from() + count(); i < ii; i++) {
      iterator.call(context, obs.get(i), i, obs)
    }
  }

  function map (iterator, context) {
    var results = []
    for (var i = from(), ii = from() + count(); i < ii; i++) {
      results.push(iterator.call(context, obs.get(i), i, obs))
    }
    return results
  }

  function filter (iterator, context) {
    var results = []
    for (var i = from(), ii = from() + count(); i < ii; i++) {
      var result = iterator.call(context, obs.get(i), i, obs)
      if (result) results.push(result)
    }
    return results
  }
}

function setNonEnumerable (object, key, value) {
  Object.defineProperty(object, key, {
    value: value,
    writable: true,
    configurable: true,
    enumerable: false
  })
}
