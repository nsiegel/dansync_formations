var dancerUL = document.getElementById('dancer-list');
var formationImages = document.getElementById('formation-images');
var assigningSpot = false;
var dancerLI = null; // dancer list element currently selected
// var spots = {}; // all saved dancer spots
var dancerList = {}; // dancer spots before it's officially saved

document.getElementById('add-dancer').onclick = addDancer;
dancerUL.onclick = selectDancer;
document.getElementById('save-spots').onclick = saveSpots;

function addDancer() {
  var name = document.getElementById('name').value;
  if (dancerList[name]) {
    return alert('You already entered a dancer with this name.');
  }
  dancerList[name] = null;
  var node = document.createElement('li');
  var text = document.createTextNode(name);
  node.appendChild(text);
  dancerUL.appendChild(node);
}

function selectDancer(e) {
  // if we are currently assigning a spot
  if (assigningSpot === true) {
    dancerLI.className = ''; // remove bold class from prev dancer
    dancerLI = e.path[0]; // reasign selected dancer
    dancerLI.className = 'bold'; // add bold class to new dancer
  } else {
    assigningSpot = true;
    dancerLI = e.target || e.srcElement;; // assign selected dancer
    dancerLI.className = 'bold'; // add bold class
  }
}

function saveSpots() {
  var dataURL = graphics.canvas.toDataURL();
  formation.image = dataURL;

  formation_timeline.addFormation(formation);
  formation = new Formation(dancerList);
  console.log(formation_timeline);

  // add image to html
  var img = new Image(250);
  img.src = dataURL;
  var node = document.createElement('li');
  node.appendChild(img);
  formationImages.appendChild(node);
}
