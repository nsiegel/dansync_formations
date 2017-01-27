var Transition = function() {
  this.spots = [];
  this.time = null;
}

Transition.prototype = {
  setTime: function(start, end) {
    this.time = end[0] - start[1];
  },
  makeSpots: function(start, end, fps) {
    if (fps === undefined) {
      fps = 20;
    }
  }
}
