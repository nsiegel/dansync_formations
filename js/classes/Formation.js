var Formation = function(dancers) {
  this.spots = [];
  this.time = null;
  this.dancers = dancers;
  this.image = null;
};

Formation.prototype = {
  addSpot: function(x, y, name) {
    var spot = new Spot(x, y, name);
    // if the dancers spot was already assigned
    // change the coordinates of the spot
    // otherwise save the index of the dancers spot
    if (this.dancers[name] !== null) {
      var i = this.dancers[name];
      this.spots[i] = spot;
    } else {
      this.dancers[name] = this.spots.length;
      this.spots.push(spot);
    }
  },
  removeSpot: function(name) {
    if (this.dancers[name] !== null) {
      var i = this.dancers[name];
      var removed = this.spots.splice(i, 1);
      this.dancers[name] = null;
      // decrement index
      for (var dancer in this.dancers) {
        if (this.dancers[dancer] > i) { this.dancers[dancer]--; }
      }
      return removed;
    }
  },
  moveSpot: function(x, y, name) {
    if (this.dancers[name] !== null) {
      var i = this.dancers[name];
      this.spots[i].move(x, y);
    }
  },
  setTime: function(time) {
    this.time = time;
  },
  setImage: function(imgData) {
    this.image = imgData;
  }
};
