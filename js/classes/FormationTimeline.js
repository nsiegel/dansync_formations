var FormationTimeline = function() {
  this.formations = [];
  this.transitions = [];
  this.cursor = 0;
  this.time = null;
  this.video = null;
};

FormationTimeline.prototype = {
  addFormation: function(formation, i) {
    if (i === null) {
      this.formations.push(formation);
    } else {
      this.formations[i] = formation;
    }
  },
  next: function() {
    var currentFormation = this.formations[this.cursor];
    this.cursor++;
    return currentFormation;
  },
  savePDF: function() {
    var pdf = new jsPDF();
    var width = 170; var height = 110;
    var x = 20; var y = 25;

    for (var i = 0; i < this.formations.length; i++) {
      if (i%2 === 0 && i > 0) {
        pdf.addPage();
        y = 25;
      }
      pdf.text(x, y, 'Formation #' + (i+1) + ':');
      var img = this.formations[i].image;
      pdf.addImage(img, 'JPEG', x, y+5, width, height);
      y += height + 25;
    }
    pdf.save('download.pdf');
  },
  addTime: function(time) {
    this.time = time;
  },
  setVideo: function(videoUrl) {
    this.video = videoUrl;
  },
  addTransition: function(transition, i) {
    if (i) {
      this.transitions[i] = transition;
    } else {
      this.transitions.push(transition);
    }
  }
};
