/*global test, asyncTest, start, stop, equal, RollCall*/
"use strict";

var r;

function createDummy () {
    r = new RollCall(["fe", "fi", "fo", "fum"]);
}

////////////////////////////////////////////////////////////////////////////////
module("creators and accessors");

test("Can create an empty rollcall", function () {
    r = new RollCall();
    equal(r.count(), 0);
    equal(r.get(0), undefined, "1st element is undefined");
});

test("Can create a rollcall from a source array", function () {
    r = new RollCall(["fe", "fi", "fo", "fum"]);
    equal(r.count(), 4, "length is 4");
    equal(r.get(0), "fe", "1st element is 'fe'");
    equal(r.get(1), "fi", "2nd element is 'fi'");
    equal(r.get(2), "fo", "3rd element is 'fo'");
    equal(r.get(3), "fum", "4th element is 'fum'");
});


////////////////////////////////////////////////////////////////////////////////
module("mutators", { setup: createDummy });

test("Can push", function () {
    r.push("foo");
    r.push("bar");
    equal(r.count(), 6, "length is 6");
    equal(r.get(4), "foo", "1st element is 'foo'");
    equal(r.get(5), "bar", "2nd element is 'bar'");
});

test("Can pop", function () {
    var popped = r.pop();
    equal(r.count(), 3, "after popping, length is 3");
    equal(popped, "fum", "popped value is 'fum'");
    popped = r.pop();
    equal(r.count(), 2, "after popping, length is 2");
    equal(popped, "fo", "popped value is 'fo'");
});

test("Can unshift", function () {
    r.unshift("foo");
    r.unshift("bar");
    equal(r.count(), 6, "length is 6");
    equal(r.get(1), "foo", "2nd element is 'foo'");
    equal(r.get(0), "bar", "1st element is 'bar'");
});

test("Can shift", function () {
    var shifted = r.shift();
    equal(r.count(), 3, "after shifting, length is 3");
    equal(shifted, "fe", "shifted value is 'fe'");
    shifted = r.shift();
    equal(r.count(), 2, "after shifting, length is 2");
    equal(shifted, "fi", "shifted value is 'fi'");
});


////////////////////////////////////////////////////////////////////////////////
module("events", { setup: createDummy });

test("change event fired on mutation", 0, function () {
    stop(4); // need 4 start()s to carry on
    r.on("change", function () { start(); });
    r.push("foo");
    r.pop();
    r.unshift("foo");
    r.shift();
});

asyncTest("push event fired on push", 1, function () {
    r.on("push", function (val) { 
        equal(val, "foo", "event is passed the pushed value");
        start(); 
    });
    r.push("foo");
});

asyncTest("pop event fired on pop", 1, function () {
    r.on("pop", function (val) { 
        equal(val, "fum", "event is passed the popped value");
        start(); 
    });
    r.pop("fum");
});

asyncTest("unshift event fired on unshift", 1, function () {
    r.on("unshift", function (val) { 
        equal(val, "foo", "event is passed the unshifted value");
        start(); 
    });
    r.unshift("foo");
});

asyncTest("shift event fired on shift", 1, function () {
    r.on("shift", function (val) { 
        equal(val, "fe", "event is passed the shifted value");
        start(); 
    });
    r.shift();
});



















