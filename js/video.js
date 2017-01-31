
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var video;

// On click load
document.getElementById('get-video').onclick = getVideo;

var videoId;

function getVideo() {
  var url = document.getElementById('yt-url').value;
  video = new Video(url);
  return video.player;
}

}
