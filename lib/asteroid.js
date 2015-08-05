"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MAX_SPEED = 2;
  var COLOR = "red";
  var RADIUS = 35;
  var Asteroid = Asteroids.Asteroid = function (options) {
    this.max = options.max === undefined ? MAX_SPEED : options.max + 1;
    this.bgColor = options.bgColor;

    var self = this;
    Asteroids.MovingObject.call(
      this,
      {
        pos: options.pos,
        vel: options.vel || Asteroids.Util.randomVec(self.max),
        radius: options.radius || RADIUS,
        color: options.color || COLOR,
        game: options.game
      }
    );
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (ctx) {
    ctx.save();

    var theta = Math.atan2(this.vel[1], this.vel[0]) + Math.PI
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(theta);

    ctx.fillStyle = this.bgColor;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;

    var profileNum = Math.floor(this.radius / 10) - 1;
    var profiles = [this.profile1, this.profile2, this.profile3]

    profiles[profileNum].call(this, ctx, this.radius);

    ctx.stroke();
    ctx.fill();
    ctx.restore();
  };

  Asteroid.prototype.profile1 = function (ctx, r) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(-.28 * r, -.95 * r);
    ctx.lineTo(-.6 * r, -.75 * r);
    ctx.lineTo(-r, -.20 * r);
    ctx.lineTo(-.91 * r, .04 * r);
    ctx.lineTo(-.71 * r, .24 * r);
    ctx.lineTo(-.52 * r, .42 * r);
    ctx.lineTo(-.33 * r, .68 * r);
    ctx.lineTo(-.16 * r, .91 * r);
    ctx.lineTo(.28 * r, .78 * r);
    ctx.lineTo(.85 * r, .5 * r);
    ctx.lineTo(.91 * r, .13 * r);
    ctx.lineTo(.98 * r, -.04 * r);
    ctx.lineTo(.55 * r, -.36 * r);
    ctx.lineTo(.24 * r, -.94 * r);
    ctx.closePath();
  };

  Asteroid.prototype.profile2 = function (ctx, r) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(-.22 * r, -.76 * r);
    ctx.lineTo(-.64 * r, -.52 * r);
    ctx.lineTo(-.9 * r, -.11 * r);
    ctx.lineTo(-.8 * r, .28 * r);
    ctx.lineTo(-.5 * r, .64 * r);
    ctx.lineTo(-.22 * r, .98 * r);
    ctx.lineTo(.12 * r, .61 * r);
    ctx.lineTo(.67 * r, .4 * r);
    ctx.lineTo(.99 * r, -.04 * r);
    ctx.lineTo(.54 * r, -.41 * r);
    ctx.lineTo(.36 * r, -.35 * r);
    ctx.lineTo(.4 * r, -.66 * r);
    ctx.lineTo(.12 * r, -.94 * r);
    ctx.closePath();
  };

  Asteroid.prototype.profile3 = function (ctx, r) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(-.28 * r, -.95 * r);
    ctx.lineTo(-.6 * r, -.65 * r);
    ctx.lineTo(-r, -.27 * r);
    ctx.lineTo(-.91 * r, .04 * r);
    ctx.lineTo(-.72 * r, .35 * r);
    ctx.lineTo(-.33 * r, .68 * r);
    ctx.lineTo(-.02 * r, .98 * r);
    ctx.lineTo(.12 * r, .91 * r);
    ctx.lineTo(.67 * r, .4 * r);
    ctx.lineTo(.99 * r, -.04 * r);
    ctx.lineTo(.56 * r, -.5 * r);
    ctx.lineTo(.4 * r, -.86 * r);
    ctx.lineTo(.12 * r, -.94 * r);
    ctx.closePath();
  }

  // draw as hollow circle
  // Asteroid.prototype.draw = function (ctx) {
  //   ctx.fillStyle = this.bgColor;
  //   ctx.strokeStyle = this.color;
  //   ctx.beginPath();
  //   ctx.lineWidth = 3;
  //
  //   ctx.arc(
  //     this.pos[0],
  //     this.pos[1],
  //     this.radius,
  //     0,
  //     2 * Math.PI
  //   );
  //
  //   ctx.stroke();
  //   ctx.fill();
  // };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Bullet) {
      this.game.addPoints();
      this.game.remove(otherObject);
      this.game.remove(this);

      if (this.radius > 20) {
        this.split();
      }

      if ( this.game.checkField() ) {
        this.game.levelUp();
      }

    } else if (otherObject instanceof Asteroids.Ship) {
      otherObject.collideWith(this);
    } else {
      return;
    }
  };

  Asteroid.prototype.split = function () {
    for (var i = 1; i <= 3; i++) {
      var self = this;

      var newStroid = new Asteroids.Asteroid({
        max: self.max,
        pos: self.pos,
        vel: Asteroids.Util.randomVec(self.max),
        radius: (self.radius - 10),
        color: COLOR,
        bgColor: self.bgColor,
        game: self.game
      });

      this.game.allObjects.push(newStroid);
    }
  };
}) ();
