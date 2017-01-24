var dancerUL = document.getElementById('dancer-list');
var formationImages = document.getElementById('formation-images');
var assigningSpot = false;
var dancerLI = null; // dancer list element currently selected
var dancerList = {}; // dancer spots before it's officially saved

document.getElementById('add-dancer').onclick = addDancer;
dancerUL.onclick = selectDancer;
document.getElementById('save-spots').onclick = saveSpots;

function addDancer() {
  var name = document.getElementById('name').value;
  if (dancerList[name] !== undefined) {
    return alert('You already entered a dancer with this name.');
  }
  dancerList[name] = null;
  var text = document.createTextNode(name);
  appendToList(dancerUL, text);
}

function selectDancer(e) {
  var li = e.target || e.srcElement;

  if (assigningSpot === true) {
    dancerLI.className = '';
    if (dancerLI === li) {
      dancerLI = null;
      assigningSpot = false;
    } else {
      dancerLI = li;
      dancerLI.className = 'bold';
    }
  } else {
    assigningSpot = true;
    dancerLI = li;
    dancerLI.className = 'bold';
  }
}

function saveSpots() {
  var dataURL = graphics.canvas.toDataURL();
  currentFormation.setImage(dataURL);
  formationTimeline.addFormation(currentFormation);
  currentFormation = new Formation(dancerList);

  // add image to html
  var img = new Image(250);
  img.src = dataURL;
  appendToList(formationImages, img)
}


function getLIindex(node) {
  var index = 0
  var li = node;
  while (li.nodeName !== 'LI') {
    li = li.parentNode;
  }
  while (li.previousSibling !== null) {
    li = li.previousSibling;
    index++;
  }
  return index;
}

function appendToList(list, data) {
  var li = document.createElement('li');
  li.appendChild(data);
  list.appendChild(li);

}
