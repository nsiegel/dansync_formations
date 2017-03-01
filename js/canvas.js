var DANCE = (function() {
  var that = new Loop();
  that.graphics = new Graphics(document.getElementById('canvas'));

  if (that.graphics.canvas.getContext) {
    that.currentFormation = new Formation(DANCER_UTILS.list);
    that.formationTimeline = new FormationTimeline();

    that.graphics.init();
    that.graphics.canvas.onclick = FORMATION_UTILS.addSpot;
    document.getElementById('save-pdf').onclick = that.formationTimeline.savePDF.bind(that.formationTimeline);

    return that;
  } else {
    console.log('Canvas not supported');
  }
}());


// function seed() {
//   DANCER_UTILS.addDancer('nicole');
//   DANCER_UTILS.addDancer('michelle');
//   DANCE.currentFormation.addSpot(100, 100, 'nicole');
//   DANCE.currentFormation.addSpot(300, 300, 'michelle');
//   DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
//   DANCE.currentFormation.time = [0, 5000];
//   FORMATION_UTILS.saveSpots();
//   DANCE.currentFormation.addSpot(200, 200, 'nicole');
//   DANCE.currentFormation.addSpot(400, 400, 'michelle');
//   DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
//   DANCE.currentFormation.time = [10000, 15000];
//   FORMATION_UTILS.saveSpots();
//   DANCE.currentFormation.addSpot(400, 400, 'nicole');
//   DANCE.currentFormation.addSpot(600, 600, 'michelle');
//   DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
//   DANCE.currentFormation.time = [18000, 20000];
//   FORMATION_UTILS.saveSpots();
//   DANCE.currentFormation.addSpot(800, 400, 'nicole');
//   DANCE.currentFormation.addSpot(600, 600, 'michelle');
//   DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
//   DANCE.currentFormation.time = [23000, 28000];
//   FORMATION_UTILS.saveSpots();
//   DANCE.currentFormation.addSpot(1000, 200, 'nicole');
//   DANCE.currentFormation.addSpot(800, 400, 'michelle');
//   DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
//   DANCE.currentFormation.time = [30000, 33000];
//   FORMATION_UTILS.saveSpots();
//   DANCE.currentFormation.addSpot(1000, 100, 'nicole');
//   DANCE.currentFormation.addSpot(900, 300, 'michelle');
//   DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
//   DANCE.currentFormation.time = [35000, 40000];
//   FORMATION_UTILS.saveSpots();
//   console.log(DANCE.formationTimeline);
//
//   var a = new Transition(FORMATION_TIMELINE.formations[0], FORMATION_TIMELINE.formations[1]);
//   FORMATION_TIMELINE.addTransition(a);
//   console.log(a);
//   a.run(GRAPHICS);
// }
// seed();
