var UTILS = function(list) {
  return {
    getLIindex: function(node) {
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
    },
    appendLI: function(data) {
      var content = data.content;
      var i = data.index;
      var li = undefined;
      var style = undefined;
      if (data.style !== undefined) { style = data.style; }

      if (i === null || i === undefined) {
        li = document.createElement('li');
        li.appendChild(content);
        if (style !== undefined) { li.className = style; }
        list.appendChild(li);
      } else {
        li = list.childNodes[i];
        li.childNodes[0].src = content.src;
      }
    }
  }
};

var DANCER_UTILS = (function() {
  var dancerUL = document.getElementById('dancer-list');
  var that = UTILS(dancerUL);
  var assigningSpot = false;

  that.list = {};
  that.selected = undefined;
  that.selectDancer = function(e) {
    var li = e.target || e.srcElement;

    if (assigningSpot === true) {
      that.selected.className = '';
      if (that.selected === li) {
        that.selected = undefined;
        assigningSpot = false;
      } else {
        that.selected = li;
        that.selected.className = 'bold';
      }
    } else {
      assigningSpot = true;
      that.selected = li;
      that.selected.className = 'bold';
    }
  }
  that.addDancer = function(name) {
    if (typeof name !== 'string') {
      name = document.getElementById('name').value;
    }
    if (that.list[name] !== undefined) {
      return alert('You already entered a dancer with this name.');
    }
    that.list[name] = undefined;
    DANCE.currentFormation.dancers[name] = null;
    var text = document.createTextNode(name);
    that.appendLI({ content:text, style:'list-group-item' });
  }

  dancerUL.onclick = that.selectDancer;
  document.getElementById('add-dancer').onclick = that.addDancer;

  return that;
}());

var FORMATION_UTILS = (function() {
  var formationImages = document.getElementById('formation-images');
  var that = UTILS(formationImages);
  var formationIndex = null;

  that.saveSpots = function() {
    var dataURL = DANCE.graphics.canvas.toDataURL();
    DANCE.currentFormation.setImage(dataURL);
    DANCE.formationTimeline.addFormation(DANCE.currentFormation, formationIndex);
    DANCE.currentFormation = new Formation(DANCER_UTILS.list);

    // add image to html
    var img = new Image(250);
    img.src = dataURL;
    that.appendLI({ content:img, index:formationIndex});
    formationIndex = null;
    DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
  };
  that.editFormation = function(e) {
    var node = e.target || e.srcElement;
    var i = that.getLIindex(node);
    DANCE.currentFormation = new Formation(DANCER_UTILS.list);

    if (i === formationIndex) {
      formationIndex = null;
    } else {
      formationIndex = i;
      var form = DANCE.formationTimeline.formations[i];
      DANCE.currentFormation.copyInfo(form);
    }
    DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
  };
  that.addSpot = function(e) {
    if (!DANCER_UTILS.selected) { return; }
    var name = DANCER_UTILS.selected.innerText;
    var canvas = e.target || e.srcElement;
    var coordinates = DANCE.graphics.convertSize(e.offsetX, e.offsetY, canvas.offsetWidth);

    DANCE.currentFormation.addSpot(coordinates[0], coordinates[1], name);
    DANCE.graphics.drawFormation(DANCE.currentFormation.spots);
  }

  formationImages.onclick = that.editFormation;
  document.getElementById('save-spots').onclick = that.saveSpots;

  return that;
}());
