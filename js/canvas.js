var canvas = document.getElementById('canvas');

if (canvas.getContext){
  var graphics = new Graphics(canvas);
  var currentFormation = new Formation(dancerList);
  var formationTimeline = new FormationTimeline();
  graphics.init();
  document.getElementById('save-pdf').onclick = formationTimeline.savePDF.bind(formationTimeline);
  canvas.onclick = addSpotToFormation;
} else {
  console.log('Canvas not supported');
}

function addSpotToFormation(e) {
  if (!dancerLI) { return; }
  var name = dancerLI.innerText;
  var canvas = e.target || e.srcElement;
  var coordinates = graphics.convertSize(e.offsetX, e.offsetY, canvas.offsetWidth);

  currentFormation.addSpot(coordinates[0], coordinates[1], name);
  graphics.drawFormation(currentFormation.spots);
}
