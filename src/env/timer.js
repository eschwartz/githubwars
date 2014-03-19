var EventEmitter = require('events').EventEmitter
var _ = require('underscore');

var Timer = function(int) {
  this.int_ = int || Timer.fps(60);

  EventEmitter.call(this);

  setInterval(function() {
    this.emit('tick');
  }.bind(this), this.int_)
};
_.extend(Timer.prototype, EventEmitter.prototype);


Timer.fps = function(fps) {
  return Math.ceil(1000 / fps);
};

module.exports = Timer;