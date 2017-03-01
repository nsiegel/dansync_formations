var Transition = function(formation1, formation2) {
  this.spots = [];
  this.dancers = {}
  this.time = null;
  this.fps = 60;

  this.setTime(formation1.time, formation2.time);
  this.makeDancerObj(formation1, formation2);
  this.makeSpots();
}

Transition.prototype = {
  setTime: function(start, end) {
    this.time = end[0] - start[1];
  },
  setFps: function(fps) {
    this.fps = fps;
  },
  makeSpots: function() {
    for (var dancer in this.dancers) {
      var start = this.dancers[dancer][0];
      var end = this.dancers[dancer][1];
      var currentSpot = start;
      var dist = this.distance(start, end);
      var i = 0;
      while (i < dist.numSpots) {
        if (!(this.spots[i] instanceof Formation)) {
          this.spots.push(new Formation());
        }
        currentSpot[0] += dist.x;
        currentSpot[1] += dist.y;
        this.spots[i].addSpot(currentSpot[0], currentSpot[1], dancer);
        i++;
      }
    }
  },
  distance: function(start, end) {
    // this will return the distance you need to travel
    // on the x and y axis for each frame
    // it also returns the number of times you have
    // to move to get from the start to end spot

    var numSpots = this.time / (1000/this.fps);
    // positive moves right or up, negative moves left or down
    var distX = end[0] - start[0];
    var distY = end[1] - start[1];
    return {x: distX/numSpots, y: distY/numSpots, numSpots: numSpots};
  },
  makeDancerObj: function(start, end) {
    for (var i = 0; i < start.spots.length; i++) {
      var spot = start.spots[i]
      this.dancers[spot.name] = [[spot.x, spot.y]];
    }
    for (var i = 0; i < end.spots.length; i++) {
      var spot = end.spots[i]
      this.dancers[spot.name].push([spot.x, spot.y]);
    }
  },
  run: function(canvas) {
    // TODO: figure out when this broke!
    var numSpots = this.spots.length;
    var i = 0;
    var self = this;
    var interval = setInterval(function () {
      if (i === numSpots) {
        clearInterval(interval);
        return;
      }
      canvas.drawFormation(self.spots[i].spots);
      i++;
    }, 1000/this.fps);
  },

}
