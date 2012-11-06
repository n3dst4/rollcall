/*
 * RollCall
 * A JS arraylike with events
 */
/*global _:false, Backbone:false*/
(function(global){
    "use strict";
    
    // constructor - initialise backing store from source, if given
    var RollCall = function (source) {
        var i;
        this.ary = [];
        this.set = {};
        if (source && source.length) {
            for (i = source.length; i--; i > 0) {
                this.ary[i] = source[i];
            }
        }
    };
    
    // make it eventy
    _(RollCall.prototype).extend(Backbone.Events);
    
    function wrapNative (method, events) {
        RollCall.prototype[method] = function (item) {
            var ret = this.ary[method].apply(this.ary, arguments);
            this.trigger(events, item? item : ret);
            return ret;
        };
    }
        
    wrapNative("push", "add push change");
    wrapNative("pop", "pop change");    
    wrapNative("unshift", "unshift change");    
    wrapNative("shift", "shift change");
    
    _(RollCall.prototype).extend({
        count: function() {
            return this.ary.length;
        },
        get: function(idx) {
            return this.ary[idx];
        }
    });
       
       
    RollCall.prototype.at = RollCall.prototype.get;
    RollCall.prototype.add = RollCall.prototype.push;
    RollCall.prototype.length = RollCall.prototype.count;
    
    global.RollCall = RollCall;
}(window));