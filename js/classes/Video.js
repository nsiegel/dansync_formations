var Video = function(url) {
  this.id = this.getVideoId(url);
  this.player = this.loadVideo();
};

Video.prototype = {
  loadVideo: function() {
    // Replace the 'ytplayer' element with an <iframe> and
    // YouTube player after the API code downloads.
    return new YT.Player('ytplayer', {
      height: '350',
      width: '550',
      videoId: this.id
    });
  },
  playVideo: function() {
    this.player.playVideo();
  },
  getVideoId: function(url) {
    var id = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      id = url[2].split(/[^0-9a-z_\-]/i);
      id = id[0];
    } else {
      id = url;
    }
    return id;
  },
  getCurrentTime: function() {
    // returns current time in ms
    var time = this.player.getCurrentTime();
    return time.toFixed(2) * 1000;
  },
}
