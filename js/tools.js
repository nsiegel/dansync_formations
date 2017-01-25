var dancerUL = document.getElementById('dancer-list');
var formationImages = document.getElementById('formation-images');
var assigningSpot = false;
var formationIndex = null;
var dancerLI = null; // dancer list element currently selected
var dancerList = {};

document.getElementById('add-dancer').onclick = addDancer;
dancerUL.onclick = selectDancer;
document.getElementById('save-spots').onclick = saveSpots;
formationImages.onclick = editFormation;

function addDancer() {
  var name = document.getElementById('name').value;
  if (dancerList[name] !== undefined) {
    return alert('You already entered a dancer with this name.');
  }
  dancerList[name] = null;
  currentFormation.dancers = dancerList;
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
  formationTimeline.addFormation(currentFormation, formationIndex);
  currentFormation = new Formation(dancerList);

  // add image to html
  var img = new Image(250);
  img.src = dataURL;
  appendToList(formationImages, img, formationIndex)
}

function editFormation(e) {
  var node = e.target || e.srcElement;
  var i = getLIindex(node);
  currentFormation = new Formation(dancerList);

  if (i === formationIndex) {
    formationIndex = null;
  } else {
    formationIndex = i;
    var form = formationTimeline.formations[i];
    currentFormation.copyInfo(form);
  }
  graphics.drawFormation(currentFormation.spots);
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

function goToListIndex(list, i) {
  return list.childNodes[i];
}

function appendToList(list, data, i) {
  var li = null;
  if (i === null || i === undefined) {
    li = document.createElement('li');
    li.appendChild(data);
    list.appendChild(li);
  } else {
    li = goToListIndex(list, i);
    li.childNodes[0].src = data.src;
  }

}
