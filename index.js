'use strict'

var VarHash = require('observ-varhash')
var Observ = require('observ')
var extend = require('xtend')

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

  var obs = VarHash(initialState(data, from, count), Item)

  var remove = obs.delete
  var put = obs.put
  delete obs.put
  delete obs.delete

  setNonEnumerable(obs, 'reset', reset)
  setNonEnumerable(obs, 'prepend', prepend)
  setNonEnumerable(obs, 'append', append)

  return obs

  function Item (value, key) {
    // Make sure user sees number indexes instead of string keys
    return createItem(value, parseInt(key, 10))
  }

  function reset (data) {
    from.set(data.from || 0)
    count.set(data.count || data.length || 0)

    var newState = initialState(data, from, count)
    var combinedKeys = extend(newState, obs())

    for (var key in combinedKeys) {
      if (!(key in newState)) {
        remove(key)
      } else {
        put(key, newState[key])
      }
    }

    return obs
  }

  function initialState (data, from, count) {
    var initial = {
      from: from,
      count: count
    }
    for (var i = from(), ii = count(); i < ii; i++) {
      initial[i] = data[i] || null
    }

    return initial
  }

  function prepend (item) {
    from.set(from() - 1)
    count.set(count() + 1)

    put(from(), item)
  }

  function append (item) {
    count.set(count() + 1)

    put(count() - 1, item)
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
