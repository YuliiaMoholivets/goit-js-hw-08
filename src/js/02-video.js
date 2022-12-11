
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';


player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function currentTime({ seconds }) {
  const timeToStart = Math.round(seconds);
  localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, timeToStart);
}

let savedTime = localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);
savedTime = savedTime ? savedTime : 0;

console.log(`Paused on: ${savedTime} second`);

const throttleCurrentTime = throttle(currentTime, 1000);

player.on('timeupdate', throttleCurrentTime);

player.setCurrentTime(savedTime);