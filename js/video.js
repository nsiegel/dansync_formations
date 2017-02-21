
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var VIDEO;

document.getElementById('get-video').onclick = getVideo;
document.getElementById('play-dance').onclick = playDance;
document.getElementById('start-time').onclick = setTime('start');
document.getElementById('end-time').onclick = setTime('end');

var videoId;

function getVideo() {
  var url = document.getElementById('yt-url').value;
  VIDEO = new Video(url);
  FORMATION_TIMELINE.setVideo(VIDEO);
  return VIDEO.player;
}

function getCurrentTime() {
  var time = VIDEO.getCurrentTime();
  return time;
}

function playDance() {
  VIDEO.playVideo();
  // LOOP = new Loop();
  LOOP.run(GRAPHICS, FORMATION_TIMELINE);
}

function setTime(startOrEnd) {
  return function(e) {
    var time = getCurrentTime();
    CURRENT_FORMATION.setTime(time, startOrEnd);

    // this assumes that when you set a start time, the end time
    // of the previous formation is already set -- meaning you
    // can create the transition between the 2 formations
    if (startOrEnd === 'start') {
      var formation2 = CURRENT_FORMATION;
      var formation1;
      if (formationIndex === null) {
        if (FORMATION_TIMELINE.formations.length) {
          formation1 = FORMATION_TIMELINE.formations[FORMATION_TIMELINE.formations.length -1]
        }
      } else if (formationIndex > 0){
        formation1 = FORMATION_TIMELINE.formations[formationIndex -1];
      } else {
        return;
      }
      var transition = new Transition(formation1, formation2);
      FORMATION_TIMELINE.addTransition(transition);
    }
  }
}
