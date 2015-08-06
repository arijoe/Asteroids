"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this);
  };

  MovingObject.prototype.addFriction = function () {
    this.vel = [this.vel[0] * .997, this.vel[1] * .997];
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    if (this === otherObject) {
      return false;
    };

    var eventHorizon = this.radius + otherObject.radius;
    var x_1 = this.pos[0];
    var y_1 = this.pos[1];
    var x_2 = otherObject.pos[0];
    var y_2 = otherObject.pos[1];

    var distance = Math.sqrt((x_1 - x_2) * (x_1 - x_2) +
                             (y_1 - y_2) * (y_1 - y_2));

    return (distance < eventHorizon) ? true : false;
  };
})();
