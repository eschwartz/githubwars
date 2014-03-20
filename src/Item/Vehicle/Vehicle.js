/**
 * @class Item.Vehicle.Vehicle
 * @param {Item.Vehicle.Options.VehicleOptions} vehicleOptions
 * @constructor
 */
var Vehicle = function(vehicleOptions) {
  /**
   * Number of distance units the vehicle
   * may move within a given tick.
   *
   * @property velocity_
   * @private
   * @type {number}
  */
  this.velocity_ = vehicleOptions.velocity;

  /**
   * @property position_
   * @type {env.Universe.Arena.Position}
   * @private
   */
  this.position_ = vehicleOptions.position;

  /**
   * Number of distance units by which
   * the vehicle may move within the current tick.
   *
   * @property distanceAvailable_
   * @private
   * @type {number}
  */
  this.distanceAvailable_ = 0;
};


/**
 * @method move
 * @param {number} x
 * @param {number} y
 *
 * @throws {Item.Vehicle.Error.MoveUnavailableError} If more distance units were requested than are available.
 */
Vehicle.prototype.move = function(x, y, opt_distance) {
  var distance = Math.sqrt(Math.pow(x, 2) * Math.pow(y, 2));

  this.ensureAvailableDistance_(distance);

  this.position_.x = this.position_.x + x;
  this.position_.y = this.position_.y + y;
};


/**
 * @method ensureAvailableDistance_
 * @private
 * @throws {Item.Vehicle.Error.MoveUnavailableError}
 * @param {number} distance
 */
Vehicle.prototype.ensureAvailableDistance_ = function(distance) {
  if (distance > this.distanceAvailable_) {
    throw new MoveUnavailableError(
      'Unable to move {du} distance unit. Only {tdu} distance units' +
        'are availble this tick'.
          replace('{du}', distance).
          replace('{tdu}', this.distanceAvailable_)
    );
  }
};

module.exports = Vehicle;