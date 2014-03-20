var Entity = function(entityOptions, env) {
  this.weapon_ = entityOptions.weapon;
  this.vehicle_ = entityOptions.vehicle;
  this.detector_ = entityOptions.detector;

  env.timer.on('tick', function() {
    // ...
  })
};



module.exports = Entity;