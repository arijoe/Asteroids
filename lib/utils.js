"use strict";

(function () {
  if (typeof Asteroids.Util === "undefined") {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function(ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function(maxSpeed) {
    var dx = (( Math.random() * (maxSpeed * 2) - maxSpeed));
    var dy = (( Math.random() * (maxSpeed * 2) - maxSpeed));

    return [dx, dy];
  }

})();
