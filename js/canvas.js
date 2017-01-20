var canvas = document.getElementById('canvas');

if (canvas.getContext){
  window.graphics = new Graphics(canvas);
  window.formation = new Formation(dancerList);
  window.formation_timeline = new FormationTimeline();
  graphics.init();
  document.getElementById('save-pdf').onclick = formation_timeline.savePDF.bind(formation_timeline);
  canvas.onclick = addSpotToFormation(formation, graphics);
} else {
  console.log('Canvas not supported');
}

function addSpotToFormation(formation, canvas) {
  return function(e) {
    var canv = e.target || e.srcElement;
    var canvasWidth = canv.offsetWidth;
    var perc = canvas.width / canvasWidth;
    if (e !== undefined) {
      x = e.offsetX * perc;
      y = e.offsetY * perc;
    }
    if (!dancerLI) { return; }
    var name = dancerLI.innerText;

    formation.addSpot(x, y, name);
    graphics.drawFormation(formation.spots);
  };
}
