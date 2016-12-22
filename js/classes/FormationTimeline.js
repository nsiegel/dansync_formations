var FormationTimeline = function() {
  this.formations = [];
  this.cursor = 0;
};

FormationTimeline.prototype = {
  addFormation: function(formation) {
    this.formations.push(formation);
  },
  next: function() {
    // uses cursor
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
  }
};
