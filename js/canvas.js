var GRAPHICS = new Graphics(document.getElementById('canvas'));

if (GRAPHICS.canvas.getContext){
  var CURRENT_FORMATION = new Formation(dancerList);
  var FORMATION_TIMELINE = new FormationTimeline();
  var LOOP = new Loop();

  GRAPHICS.init();
  GRAPHICS.canvas.onclick = addSpotToFormation;
  document.getElementById('save-pdf').onclick = FORMATION_TIMELINE.savePDF.bind(FORMATION_TIMELINE);
} else {
  console.log('Canvas not supported');
}

function addSpotToFormation(e) {
  if (!dancerLI) { return; }
  var name = dancerLI.innerText;
  var canvas = e.target || e.srcElement;
  var coordinates = GRAPHICS.convertSize(e.offsetX, e.offsetY, canvas.offsetWidth);

  CURRENT_FORMATION.addSpot(coordinates[0], coordinates[1], name);
  GRAPHICS.drawFormation(CURRENT_FORMATION.spots);
}

function seed() {
  addDancer('nicole');
  addDancer('michelle');
  CURRENT_FORMATION.addSpot(100, 100, 'nicole');
  CURRENT_FORMATION.addSpot(300, 300, 'michelle');
  GRAPHICS.drawFormation(CURRENT_FORMATION.spots);
  CURRENT_FORMATION.time = [0, 2000];
  saveSpots();
  CURRENT_FORMATION.addSpot(200, 200, 'nicole');
  CURRENT_FORMATION.addSpot(400, 400, 'michelle');
  GRAPHICS.drawFormation(CURRENT_FORMATION.spots);
  CURRENT_FORMATION.time = [5000, 8000];
  saveSpots();
  CURRENT_FORMATION.addSpot(400, 400, 'nicole');
  CURRENT_FORMATION.addSpot(600, 600, 'michelle');
  GRAPHICS.drawFormation(CURRENT_FORMATION.spots);
  CURRENT_FORMATION.time = [5000, 8000];
  saveSpots();
  CURRENT_FORMATION.addSpot(800, 400, 'nicole');
  CURRENT_FORMATION.addSpot(600, 600, 'michelle');
  GRAPHICS.drawFormation(CURRENT_FORMATION.spots);
  CURRENT_FORMATION.time = [5000, 8000];
  saveSpots();
  CURRENT_FORMATION.addSpot(1000, 200, 'nicole');
  CURRENT_FORMATION.addSpot(800, 400, 'michelle');
  GRAPHICS.drawFormation(CURRENT_FORMATION.spots);
  CURRENT_FORMATION.time = [5000, 8000];
  saveSpots();
  CURRENT_FORMATION.addSpot(1000, 100, 'nicole');
  CURRENT_FORMATION.addSpot(900, 300, 'michelle');
  GRAPHICS.drawFormation(CURRENT_FORMATION.spots);
  CURRENT_FORMATION.time = [5000, 8000];
  saveSpots();
  console.log(FORMATION_TIMELINE);

  // var a = new Transition(FORMATION_TIMELINE.formations[0], FORMATION_TIMELINE.formations[1]);
  // FORMATION_TIMELINE.addTransition(a);
  // console.log(a);
  // a.run(GRAPHICS);
}
seed();
