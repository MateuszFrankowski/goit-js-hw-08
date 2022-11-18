import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const saveTimeToLocal = ({ seconds, duration }) => {
  console.log(seconds, duration);
  if (seconds === duration) {
    return localStorage.setItem('videoplayer-current-time', 0);
  }
  localStorage.setItem('videoplayer-current-time', seconds);
};
player.on('timeupdate', throttle(saveTimeToLocal, 1000));

const locallySavedTime = localStorage.getItem('videoplayer-current-time');
const parsedTime = Number(JSON.parse(locallySavedTime));

console.log(parsedTime);

player
  .setCurrentTime(parsedTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
