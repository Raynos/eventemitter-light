var slice = [].slice,
    EventEmitter = {};

module.exports = EventEmitter;

EventEmitter.on = on;
EventEmitter.removeListener = removeListener;
EventEmitter.emit = emit;
EventEmitter.once = once;
EventEmitter.removeAllListeners = removeAllListeners;
EventEmitter.constructor = constructor;

function on(ev, handler) {
    var events = this._events;

    if (!events[ev]) {
        events[ev] = [];
    }

    if (ev.indexOf("*") > -1) {
        this._hasWildCard = true;
    }

    events[ev].push(handler);
}

function removeListener(ev, handler) {
    var array = this._events[ev];

    array && array.splice(array.indexOf(handler), 1);
}

function emit(ev) {
    var args = slice.call(arguments, 1),
        array,
        events = this._events;

    if (this._hasWildCard || ev.indexOf("*") > -1) {
        var namespace = ev.split(".");
        array = [];

        Object.keys(events).forEach(addToArrayIfMatchesNamespace)
    } else {
        array = events[ev];
    }

    array && array.forEach(invokeHandler, this);

    function addToArrayIfMatchesNamespace(ev) {
        var handlerArray = events[ev];
        if (ev === "*") {
            return array = array.concat(handlerArray);    
        }
        var delimited = ev.split(".");
        for (var i = 0, len = delimited.length; i < len; i++) {
            if (namespace[i] !== '*' && 
                delimited[i] !== '*' &&
                delimited[i] !== namespace[i]
            ) {
                return;
            }
        }
        array = array.concat(handlerArray);
    }

    function invokeHandler(handler) {
        handler.apply(this, args);
    }
}

function once(ev, handler) {
    this.on(ev, proxy);

    function proxy() {
        handler.apply(this, arguments);
        this.removeListener(ev, handler);
    }
}

function removeAllListeners(ev) {
    if (ev) {
        this._events[ev] = [];
    } else {
        this._events = {};
    }
}

function constructor() {
    this._events = {};

    return this;
}