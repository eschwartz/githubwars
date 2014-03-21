var EntityController = require('Entity/Controller/EntityController');
var assert = require('test/assert/entitycontroller');
var sinon = require('sinon');
var MockEnv = require('test/mock/MockEnv');
var MockTimer = require('env/Timer');
var _ = require('underscore');

describe('Entity', function() {
  var clock, mockTimer, entityController, env;
  var SPEED;

  beforeEach(function() {
    mockTimer = new MockTimer();        // Allows us to tick X number of frames (using sinon fake timer)
    SPEED = 10;

    clock = sinon.useFakeTimers();
    env = new MockEnv({
      maxPlayerSpeed: SPEED,
      tickPerSeconds: FPS
    });
    entityController = new EntityController({}, env);
  });

  afterEach(function() {
    mockTimer.restore();
  });

  function tickFrames(frames) {

  }


  describe('move', function() {
    var DISTANCE;
    // NOTE: Azssuming we're starting at 0 degrees (facing right), and position (0, 0)

    beforeEach(function() {
      // Use an not-divisible-by-speed distance
      // to make sure we are not overstepping
      // in our last tick.
      DISTANCE = SPEED * 20.12345;
    });


    it('should move in current direction until the specified distance is reached', function() {
      var DISTANCE = SPEED * 20.12345;
      entityController.move(DISTANCE);

      // Tick until at destination
      _.times(Math.floor(DISTANCE / SPEED), function(ticksElapsed) {
        mockTimer.tick(1);

        // Move horizontally
        assert.atPosition(entityController, {
          x: SPEED * ticksElapsed,
          y: 0
        });
      });

      // Should not go any further
      mockTimer.tick(5);
      assert.atPosition(entityController, {
        x: DISTANCE,
        y: 0
      });
    });


    it('should move in the direction of the entity, after the entity turns', function() {
      // MockTimer#tickUtil: ticks until
      // the provided promise is resolved
      mockTimer.tickUntil(
        entityController.turn(-45)
      );

      entityController.move(DISTANCE);

      // Tick until at destination
      _.times(Math.floor(DISTANCE / SPEED), function(ticksElapsed) {
        mockTimer.tick(1);

        // Move towards NE @ 45d angle
        assert.atPosition(entityController, {
          x: SPEED * ticksElapsed * 0.5,
          y: SPEED * ticksElapsed * 0.5
        });
      });
    });

    it('should return a promise to complete move', function(done) {
      entityController.move(DISTANCE).
        then(function(position) {
          assert.atPosition(entityController, position);
        }).
        catch(done).
        finally(done);

      // Timer#tickAsync
      // should tick like a real clock, to allow
      // async timer testing
      mockTimer.tickAsync(Math.ceil(DISTANCE / SPEED));
    });

    it('should notify on every tick with the entity\'s position', function() {
      var onProgress = sinon.spy();

      entityController.move(DISTANCE).
        progress(onProgress);
        progress(function(position) {
          // Move horizontally
          assert.atPosition(entityController, position);
        }).
        finally(function() {
          assert.equals(spy.callCount, Math.ceil(DISTANCE / SPEED));
        }).
        catch(done).
        finally(done);

      mockTimer.tickAsync(Math.ceil(DISTANCE / SPEED));
    });

  });

});