'use strict'

var test = require('tape')
var List = require('../')
var toArray = require('../to-array')

test('wrapped List to array', function (t) {
  var list = List({
    from: -1,
    count: 3,
    '-1': '0',
    0: '1',
    1: '2'
  })

  var array = toArray(list)

  // Should be a wrapped observ-array
  t.equal(typeof array, 'function')
  t.equal(typeof array.set, 'function')
  t.deepEqual(toArray(list)(), ['0', '1', '2'])
  t.end()
})

test('unwrapped List to array', function (t) {
  var list = List({
    from: -1,
    count: 3,
    '-1': '0',
    0: '1',
    1: '2'
  })

  t.deepEqual(toArray(list()), ['0', '1', '2'])
  t.end()
})
