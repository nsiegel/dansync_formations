
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.getElementById('get-video').onclick = getVideo;
document.getElementById('play-dance').onclick = playDance;
document.getElementById('start-time').onclick = setTime('start');
document.getElementById('end-time').onclick = setTime('end');

var videoId;

function getVideo() {
  var url = document.getElementById('yt-url').value;
  DANCE.video = new Video(url);
  DANCE.formationTimeline.setVideo(DANCE.video);
  return DANCE.video.player;
}

function getCurrentTime() {
  var time = DANCE.video.getCurrentTime();
  return time;
}

function playDance() {
  DANCE.video.playVideo();
  DANCE.run(DANCE.graphics, DANCE.formationTimeline);
}

function setTime(startOrEnd) {
  return function(e) {
    var time = getCurrentTime();
    DANCE.currentFormation.setTime(time, startOrEnd);

    // this assumes that when you set a start time, the end time
    // of the previous formation is already set -- meaning you
    // can create the transition between the 2 formations
    if (startOrEnd === 'start') {
      var formation2 = DANCE.currentFormation;
      var formation1;
      if (formationIndex === null) {
        if (DANCE.formationTimeline.formations.length) {
          formation1 = DANCE.formationTimeline.formations[DANCE.formationTimeline.formations.length -1]
        }
      } else if (formationIndex > 0){
        formation1 = DANCE.formationTimeline.formations[formationIndex -1];
      } else {
        return;
      }
      var transition = new Transition(formation1, formation2);
      DANCE.formationTimeline.addTransition(transition);
    }
  }
}
