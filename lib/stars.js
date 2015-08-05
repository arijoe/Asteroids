"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLORS = ["#ddffaa", "#aaa", "#fff"];
  var RADII = [1, 2, 3];
  var Star = Asteroids.Star = function (options) {
    this.pos = options.pos;
    this.radius = RADII[Math.floor(Math.random() * 4)];
    this.color = COLORS[Math.floor(Math.random() * 3)];
    this.game = options.game;
  };

  Star.prototype.draw = function (ctx) {
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.translate(this.pos[0], this.pos[1]);
    var r = this.radius;

    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(-.3 * r, -.6 * r);
    ctx.lineTo(-.6 * r, -.3 * r);
    ctx.lineTo(-r, 0);
    ctx.lineTo(-.6 * r, .3 * r);
    ctx.lineTo(-.3 * r, .6 * r);
    ctx.lineTo(0, r);
    ctx.lineTo(.3 * r, .6 * r);
    ctx.lineTo(.6 * r, .3 * r);
    ctx.lineTo(r, 0);
    ctx.lineTo(.6 * r, -.3 * r);
    ctx.lineTo(.3 * r, -.6 * r);
    ctx.closePath();

    ctx.fill();
    ctx.restore();
  };
})();
