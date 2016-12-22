
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

// On click load
document.getElementById('get-video').onclick = getVideo;

var videoId;

function getVideo() {
  videoId = getVideoId();
  return loadVideo();
}

function getVideoId() {
  var url = document.getElementById('yt-url').value;
  var id = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    id = url[2].split(/[^0-9a-z_\-]/i);
    id = id[0];
  }
  else {
    id = url;
  }
  return id;
}

function loadVideo() {
  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  player = new YT.Player('ytplayer', {
    height: '350',
    width: '550',
    videoId: videoId
  });
}
