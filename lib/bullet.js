"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "#FFFF00";
  var RADIUS = 2;
  var Bullet = Asteroids.Bullet = function (options) {
    Asteroids.MovingObject.call(
      this,
      {
        pos: options.pos,
        vel: options.vel,
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
