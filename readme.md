# observ-varlist [![Build Status](https://travis-ci.org/ajoslin/observ-varlist.svg?branch=master)](https://travis-ci.org/ajoslin/observ-list)

> An observable list that can grow negatively or positively

## Install

```
$ npm install --save observ-varlist
```

## Usage

```js
var ObservList = require('observ-varlist')
var toArray = require('observ-varlist/to-array')

var list = ObservList(['b', 'c'])

list.prepend('a')

list.from() // => -1
list.count() // => 3

list() // => {from: -1, count: 3, '-1': 'a', 0: 'b', 1: 'c'}
toArray(list) // => ObservArray(['a', 'b', 'c'])
toArray(list()) // => ['a', 'b', 'c']
```

## API

Once an item at an index is set, it's immutable (its value can't be changed, only removed via `.reset()`).

#### `ObservList([initial], [constructor])` -> `observList`

##### initial

*Optional*
Type: `object|array`

Either an array, or an object containing `from: Number`, `count: Number`, and optional indices containing data between `from` and `from + count`.

##### constructor

*Optional*
Type: `function`

Every item put into the list will go through this constructor. Whatever the constructor returns will be stored in the list.

### `observList` Instance

Returned from the ObservList constructor, this is an observable with the following methods:

##### `list.prepend(item)`

- Expands the list backwards and inserts the item. Can go into negative indexes.

##### `list.append(item)`

- Expands the list forwards and inserts the item.

##### `list.reset(data)`

Resets the list. Data is either an array or an object containing `from: Number`, `count: Number`, and optional indices containing data between `from` and `from + count`.

##### `list.forEach, list.map, list.filter`

Convenience functions that return an array.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
