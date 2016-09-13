'use strict'

var test = require('tape')
var Struct = require('observ-struct')
var Observ = require('observ')
var List = require('../')

function Item (value, index) {
  return Struct({
    value: Observ(value),
    index: Observ(index)
  })
}

test('api', function (t) {
  var list = List()

  t.ok(list.prepend)
  t.ok(list.append)
  t.ok(list.from)
  t.ok(list.count)
  t.ok(list.set)
  t.notOk(list.delete)
  t.notOk(list.put)

  t.end()
})

test('initialState', function (t) {
  var list = List(['a'], Item)

  t.equal(list.from(), 0)
  t.equal(list.count(), 1)
  t.deepEqual(list.get(0)(), {
    value: 'a',
    index: 0
  })

  t.end()
})

test('append', function (t) {
  var list = List(['foo'])

  t.deepEqual(list(), {
    from: 0,
    count: 1,
    0: 'foo'
  })

  list.append('bar')
  t.deepEqual(list(), {
    from: 0,
    count: 2,
    0: 'foo',
    1: 'bar'
  })
  t.end()
})

test('prepend', function (t) {
  var list = List(['a'])

  list.prepend('pre')

  t.deepEqual(list(), {
    from: -1,
    count: 2,
    '0': 'a',
    '-1': 'pre'
  })
  t.end()
})

test('list.reset', function (t) {
  var list = List()

  list.reset({
    from: -1,
    count: 4,
    '-1': 'a',
    '0': 'b',
    '1': 'c',
    '2': 'd'
  })

  t.deepEqual(list(), {
    from: -1,
    count: 4,
    '-1': 'a',
    '0': 'b',
    '1': 'c',
    '2': 'd'
  })

  list.reset({
    from: -2,
    count: 3,
    '-2': 'd',
    '-1': 'a2'
  })

  t.deepEqual(list(), {
    from: -2,
    count: 3,
    '-2': 'd',
    '-1': 'a2',
    '0': null // this was not provided in the reset
  })

  t.end()
})

test('list.forEach', function (t) {
  var list = List({
    from: -1,
    count: 2,
    '-1': 'a',
    0: 'b'
  })

  var calls = []
  list.forEach(function (value, index) {
    calls.push({value, index})
  })

  t.deepEqual(calls, [
    {value: 'a', index: -1},
    {value: 'b', index: 0}
  ])

  t.end()
})
