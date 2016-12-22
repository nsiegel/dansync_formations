// game loop
var Loop = function() {};

Loop.prototype = {
  run: function() {
    // this fn runs a loop that will update the program state and then
    // render(as in draw) the current models to screen
  },
  stop: function() {
    // stop the loop so we can pause it
  },
  update: function() {
    // update internal logic such as requesting a new formation from the
    // timeline whenever its needed so that render can print it
  },
  render: function() {
    // draw the current formation from the timeline
  }
};
