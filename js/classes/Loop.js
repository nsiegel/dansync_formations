// game loop
var Loop = function() {
  this.running = false;
  this.loop = null;
};

Loop.prototype = {
  run: function(canvas, formationTimeline) {
    // this fn runs a loop that will update the program state and then
    // render the current models to screen
    var self = this;
    self.running = true;
    var formations = formationTimeline.formations;
    var transitions = formationTimeline.transitions;
    var video = formationTimeline.video;
    var i = 0;

    self.loop = setInterval(function () {
      if (i >= formations.length) {
        self.stop();
        return;
      }
      var currTime = video.getCurrentTime();
      if (formations[i].time[0] <= currTime) {
        self.render(canvas, formations[i]);
      }
      if (formations[i].time[1] <= currTime) {
        self.render(canvas, transitions[i]);
        i++;
      }
    }, 10);
  },
  stop: function() {
    // stop the loop so we can pause it
    if (this.running) {
      clearInterval(this.loop);
      this.running = false;
    }
  },
  render: function(canvas, formationOrTransition) {
    // draw the current formation/transition from the timeline
    if (formationOrTransition instanceof Transition) {
      formationOrTransition.run(canvas);
    }
    else if (formationOrTransition instanceof Formation) {
      canvas.drawFormation(formationOrTransition.spots);
    }
  }
};
