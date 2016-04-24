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
