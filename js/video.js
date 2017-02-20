
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var video;

document.getElementById('get-video').onclick = getVideo;
document.getElementById('start-time').onclick = setTime('start');
document.getElementById('end-time').onclick = setTime('end');

var videoId;

function getVideo() {
  var url = document.getElementById('yt-url').value;
  video = new Video(url);
  formationTimeline.setVideo(video);
  return video.player;
}

function getCurrentTime() {
  var time = video.getCurrentTime();
  return time;
}

function setTime(startOrEnd) {
  return function(e) {
    var time = getCurrentTime();
    currentFormation.setTime(time, startOrEnd);

    // this assumes that when you set a start time, the end time
    // of the previous formation is already set -- meaning you
    // can create the transition between the 2 formations
    if (startOrEnd === 'start') {
      var formation2 = currentFormation;
      var formation1;
      if (formationIndex === null) {
        if (formationTimeline.formations.length) {
          formation1 = formationTimeline.formations[formationTimeline.formations.length -1]
        }
      } else if (formationIndex > 0){
        formation1 = formationTimeline.formations[formationIndex -1];
      } else {
        return;
      }
      var transition = new Transition(formation1, formation2);
      formationTimeline.addTransition(transition);
    }
  }
}
