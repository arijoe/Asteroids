"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var ADD_SPEED = 3;
  var COLOR = "#FFFF00";
  var RADIUS = 2;
  var Bullet = Asteroids.Bullet = function (options) {
    var v0 = options.vel[0];
    var v1 =  options.vel[1];
    var theta = options.theta;

    Asteroids.MovingObject.call(
      this,
      {
        pos: options.pos,
        vel: [v0 + v0 * ADD_SPEED, v1 + v1 * ADD_SPEED],
        radius: RADIUS,
        color: COLOR,
        game: options.game,
      }
    );
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    };
  };
}) ();
