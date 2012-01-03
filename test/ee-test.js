var EventEmitter = require('../lib/ee.js'),
    assert = require('assert');

suite('EventEmitter', function () {
    test('EventEmitter', function () {
        assert(EventEmitter, "EventEmitter does not exist");
        assert(EventEmitter.on, "EventEmitter.on does not exist");
        assert(EventEmitter.removeListener, 
            "EventEmitter.removeListener does not exist");
        assert(EventEmitter.emit, "EventEmitter.emit does not exist");
        assert(EventEmitter.once, "EventEmitter.once does not exist");
        assert(EventEmitter.removeAllListeners,
            "EventEmitter.removeAllListeners does not exist");
    });

    test('EventEmitter.on', function () {
        var ee = instance(),
            counter = 0;

        ee.on('ev', function () {
            counter++;
        });

        ee.emit('ev');
        assert.equal(counter, 1, "counter is not correct");
    });

    test('EventEmitter.removeListener', function () {
        var ee = instance(),
            counter = 0;
            
        ee.on('ev', increment);
        ee.removeListener('ev', increment);

        ee.emit('ev');
        assert.equal(counter, 0, "counter is not correct");

        function increment() {
            counter++;
        }
    });

    test('EventEmitter.removeAllListeners', function () {
        var ee = instance(),
            counter = 0;
            
        ee.on('ev', increment);
        ee.removeAllListeners('ev');

        ee.emit('ev');
        assert.equal(counter, 0, "counter is not correct");

        ee.on('ev', increment);
        ee.removeAllListeners();

        ee.emit('ev');
        assert.equal(counter, 0, "counter is not correct");

        function increment() {
            counter++;
        }
    });

    test('EventEmitter.emit', function () {
        var ee = instance();

        ee.on('ev', function (val) {
            assert.equal(val, 42, "value is not correct");
        });

        ee.emit('ev', 42);
    });

    test('EventEmitter.once', function () {
        var ee = instance(),
            counter = 0;
            
        ee.once('ev', function () {
            counter++;
        });

        ee.emit('ev');
        ee.emit('ev');

        assert.equal(counter, 1, "counter is not correct");
    });

    test('namespaced events', function () {
        var ee = instance(),
            counter = 0;

        ee.on('ev.namespace', function () {
            counter++; 
        });

        ee.emit('ev.*');

        assert.equal(counter, 1, "counter is not correct");

        ee.on('ev2.*', function () {
            counter++;
        });

        ee.emit('ev2.namespace');

        assert.equal(counter, 2, "counter is not correct");
    })
});

function instance() {
    return Object.create(EventEmitter).constructor();
}