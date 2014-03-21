var Entity = function(entityOptions, env) {
  this.weapon_ = entityOptions.weapon;
  this.vehicle_ = entityOptions.vehicle;
  this.detector_ = entityOptions.detector;

  this.speed_ = env.maxPlayerSpeed;

  env.timer.on('tick', function() {
    // ...
  })
};



module.exports = Entity;