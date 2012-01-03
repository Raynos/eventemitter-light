# eventemitter-light [![Build Status][1]][2]

Tiny event emitter for node and the browser

## Status: Beta

## Example

```javascript
var EventEmitter = require("eventemitter-light");

var ee = Object.create(EventEmitter).constructor();

ee.on('foo.namespaces', logFoo);
ee.emit('*.namespaces');

function logFoo() {
	console.log('foo');
}
```

## Motivation

EventEmitter2 is 2kb. That's far too much. EE-light is a sensible 400bytes.

## Documentation

It's like EventEmitter build into node.

The only difference is that it supports namespaces

so 

ee.on('foo.namespace', works);
ee.on('*.namespace', works);
ee.on('foo.*', works);

ee.emit('foo.namespace');
// works 3 times

function works() { console.log('works'); }

## Installation

`npm install eventemitter-light`

## Test

`make test`

## Contributors

 - Raynos

## MIT Licenced

 [1]: https://secure.travis-ci.org/Raynos/eventemitter-light.png
 [2]: http://travis-ci.org/Raynos/eventemitter-light