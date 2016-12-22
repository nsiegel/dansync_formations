var Graphics = function(canvas) {
  // this class drives a canvas element in order to draw formations
  // on the screen. It is the only class allowed to use canvas API
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 348;
  this.width = 548;
  this.offset = 15; // space between canvas edge and lines
  this.numLines = 3;
  this.numColumns = 15;


};

Graphics.prototype = {
  init: function(n) {
    if (n !== undefined) { this.numLines = n; }
    var betweenLineHeight = this.height / (this.numLines + 1);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0,0,this.width,this.height);
    // create lines
    for (var i = 1; i <= this.numLines; i++) {
      var y = betweenLineHeight * i;
      this.ctx.strokeStyle = "rgb(0, 0, 0)";
      this.ctx.beginPath();
      this.ctx.moveTo(this.offset, y);
      this.ctx.lineTo(this.width - this.offset, y);
      this.ctx.stroke();

      // create columns
      var colDistance = (this.width - (2 * this.offset)) / (this.numColumns - 1);
      for (var j = this.offset + colDistance; j < this.width - this.offset; j+=colDistance) {
        this.ctx.strokeStyle = "rgba(220, 220, 220, 0.1)";
        this.ctx.beginPath();
        this.ctx.moveTo(j, this.offset);
        this.ctx.lineTo(j, this.height - this.offset);
        this.ctx.stroke();
      }
    }
  },
  drawSpot: function(x, y, name) {
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fillRect(x-5, y-5, 10, 10);
    this.ctx.fillText(name, x, y-12);
  },
  drawFormation: function(formation) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.textAlign = 'center';
    this.init();

    for (var i = 0; i < formation.length; i++) {
      var spot = formation[i];
      this.drawSpot(spot.x, spot.y, spot.name);
    }
  }
};
