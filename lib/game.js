"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 1000;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 3;
  var NUM_STARS = 100;
  var BG_COLOR = "#001122";
  var NUM_LIVES = 3;
  var NUM_BULLETS = 7;

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;

    this.level = 1;
    this.points = 0;
    this.lives = NUM_LIVES;

    this.isOver = false;
    this.started = false;
    this.paused = true;

    this.stars = [];
    this.addStars();
    this.asteroids = [];
    this.addAsteroids(1);

    this.dimX = DIM_X;
    this.dimY = DIM_Y;
    this.ship = new Asteroids.Ship({pos: this.randomPosition(), game: this});
    this.createObjects();
  };

  Game.prototype.addAsteroids = function (level) {
    for (var i = 0; i < (NUM_ASTEROIDS + (level - 1) ); i++) {
      var position = this.randomPosition();
      this.asteroids.push(new Asteroids.Asteroid({
        pos: position,
        game: this,
        max: (2 + this.level / 5),
        bgColor: BG_COLOR
        })
      );
    };

    return this.asteroids;
  };

  Game.prototype.addStars = function () {
    for (var i = 0; i < NUM_STARS; i++) {
      var position = this.randomPosition();
      this.stars.push(new Asteroids.Star({ pos: position, game: this }));
    }
  };

  Game.prototype.addBullet = function (bullet) {
    var count = 0;

    this.allObjects.forEach( function (object) {
      if (object instanceof Asteroids.Bullet) {
        count += 1;
      }
    });

    if (count < NUM_BULLETS) {
      this.allObjects.push(bullet);
    };
  };

  Game.prototype.randomPosition = function() {
    var x_Dimension = Math.random() * DIM_X;
    var y_Dimension = Math.random() * DIM_Y;

    return [x_Dimension, y_Dimension];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, DIM_X, DIM_Y);

    this.stars.forEach(function (star) {
      star.draw(ctx);
    });

    var self = this;
    this.allObjects.forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects.forEach(function (object) {
      object.move();
      if (object instanceof Asteroids.Ship || object instanceof Asteroids.Bullet) {
        object.addFriction();
      }
    });
  }

  Game.prototype.step = function () {
    if (this.paused) {
      this.ship.frozen = true;
    } else {
      this.ship.frozen = false;
      if (this.ship.invincible) this.ship.flash();
      this.moveObjects();
      this.checkCollisions();
    }
  };

  Game.prototype.wrap = function (obj) {
    var x_dim = obj.pos[0];
    var y_dim = obj.pos[1];
    var z = (2 * obj.radius - 1);
    var isOffBoard = ( (x_dim < 0 || x_dim > DIM_X) || (y_dim < 0 || y_dim > DIM_Y) )

    if (obj instanceof Asteroids.Bullet && isOffBoard) {
      return this.remove(obj);
    };

    x_dim = (x_dim > DIM_X + z) ? -z : x_dim;
    x_dim = (x_dim < -z) ? DIM_X + z : x_dim;
    y_dim = (y_dim > DIM_Y + z) ? -z : y_dim;
    y_dim = (y_dim < -z) ? DIM_Y + z : y_dim;

    return [x_dim, y_dim];
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects.length - 1; i++) {
     for (var j = i + 1; j < this.allObjects.length; j++) {
       if (this.allObjects[i].isCollidedWith(this.allObjects[j])) {
         this.allObjects[i].collideWith(this.allObjects[j]);
       };
     }
   };
  };

  Game.prototype.remove = function (item) {
    if ( !(item instanceof Asteroids.Ship) ) {
      var i = this.allObjects.indexOf(item);
      this.allObjects.splice(i, 1);
    };

    return [0,0];
  };

  Game.prototype.createObjects = function () {
    this.allObjects = this.asteroids.concat([this.ship]);
    this.asteroids.splice(0, this.asteroids.length);
    return this.allObjects;
  };

  Game.prototype.checkField = function () {
    return this.allObjects.every( function (obj) {
      return !(obj instanceof Asteroids.Asteroid)
    })
  };

  Game.prototype.levelUp = function () {
    this.level += 1;
    var self = this;

    $(".level-num").html(this.level);
    $(".lives-num").html(this.lives);
    this.asteroids && this.asteroids.splice(0, this.asteroids.length);
    this.stars.splice(0, this.stars.length);

    this.ship.invincible = true;
    this.ship.keepInvincible();

    window.setTimeout( (function () {
      self.addStars();
      self.addAsteroids(self.level).forEach( function (asteroid) {
        self.allObjects.unshift(asteroid);
      });
    }), 250);
  };

  Game.prototype.addPoints = function () {
    this.points += 1;

    if ( this.points % 15 === 0 ) {
      this.lives += 1;
      $(".lives-num").html(this.lives);
    };

    $(".score-num").html(this.points);
  };

  Game.prototype.ghostIt = function () {
    this.lives -= 1;

    if (this.lives < 0) {
      this.isOver = true;
    } else {
      $(".lives-num").html(this.lives);
    }
  };

  Game.prototype.restart = function () {
    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.level = 1;
    this.points = 0;
    this.lives = NUM_LIVES;

    this.isOver = false;
    this.paused = false;
    this.started = true;

    this.ship.frozen = false;
    this.ship.invincible = true;
    this.ship.keepInvincible();

    $(".level-num").html(this.level);
    $(".lives-num").html(this.lives);
    $(".score-num").html(this.points);

    this.stars = [];
    this.addStars();
    this.asteroids = [];
    this.addAsteroids(this.level);

    this.createObjects();
  };

  Game.prototype.jumpToLevel = function (number) {
    this.level = number - 1;
    this.lives = number;
    $(".lives-num").html(this.lives);

    this.remove(this.allObjects[0]);
    this.remove(this.allObjects[0]);
    this.remove(this.allObjects[0]);

    this.levelUp();
  };
}) ();
