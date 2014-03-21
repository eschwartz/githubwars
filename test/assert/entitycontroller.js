var assert = require('assert');
var _ = require('underscore');

module.exports = _.extend({}, assert, {
  atPosition: function(entityController, position) {
    assert.equals(entityController.getCurrentPosition().x, position.x);
    assert.equals(entityController.getCurrentPosition().y, position.y);
  }
});