const localInfo = document.querySelector(".local"),
  localTime = document.querySelector(".localTime"),
  usEastTime = document.querySelector(".usEastTime"),
  krSeoulTime = document.querySelector(".krSeoulTime");

let timeDiff = 0;

function getUsEastTime(hours, minutes, seconds) {
  const hourDiff = timeDiff - 4;
  const usEastHours = (hours + hourDiff) % 24;
  usEastTime.innerText = `${
    usEastHours < 10 ? `0${usEastHours}` : usEastHours
  }:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }(${hourDiff < 0 ? `-${hourDiff}:00` : `+${hourDiff}:00`})`;
}

function getKrSeoulTime(hours, minutes, seconds) {
  const hourDiff = timeDiff + 9;
  const krSeoulHours = (hours + hourDiff) % 24;
  krSeoulTime.innerText = `${
    krSeoulHours < 10 ? `0${krSeoulHours}` : krSeoulHours
  }:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }(${hourDiff < 0 ? `-${hourDiff}:00` : `+${hourDiff}:00`})`;
}

function getTimeDiff() {
  const date = new Date();
  timeDiff = date.getTimezoneOffset() / 60;
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  localTime.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  getUsEastTime(hours, minutes, seconds);
  getKrSeoulTime(hours, minutes, seconds);
}

function init() {
  getTimeDiff();
  getTime();
  setInterval(getTime, 1000);
}

init();
