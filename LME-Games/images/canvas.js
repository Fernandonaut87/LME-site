function Player() {
  this.x = 0;
  this.y = 0;
}

Player.prototype.draw = function(context) {
  context.fillRect(this.x, this.y, 32, 32);
};

Player.prototype.moveLeft = function() {
  this.x -= 1;
};

Player.prototype.moveRight = function() {
  this.x += 1;
};

Player.prototype.moveUp = function() {
  this.y -= 1;
};

Player.prototype.moveRight = function() {
  this.y += 1;
};

Game.start = function() {
  ...
  
  Game.player = new Player();
  
  ...
};

Game.draw = function() {
  ...
  
  Game.player.draw(Game.context);

  ...
};

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      Game.player.moveLeft();
    break;

    case 38: // Up
      Game.player.moveUp();
    break;

    case 39: // Right
      Game.player.moveRight();
    break;

    case 40: // Down
      Game.player.moveDown();
    break;
  }
}, false);

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

Player.prototype.update = function() {
  if (Key.isDown(Key.UP)) this.moveUp();
  if (Key.isDown(Key.LEFT)) this.moveLeft();
  if (Key.isDown(Key.DOWN)) this.moveDown();
  if (Key.isDown(Key.RIGHT)) this.moveRight();
};

Game.update = function() {
  ...
  Game.player.update();
  ...
};

