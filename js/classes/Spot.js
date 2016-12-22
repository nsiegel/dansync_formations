var Spot = function(x, y, name) {
  this.x = x;
  this.y = y;
  this.name = name;
};

Spot.prototype = {
  move: function(x, y) {
    this.x = x;
    this.y = y;
  }
};
