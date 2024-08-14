let startTime, updatedTime, difference, tInterval;
let running = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let lapCount = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(updateDisplay, 1);
    }
}

function stopTimer() {
    if (running) {
        running = false;
        clearInterval(tInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCount = 1;
    display.innerHTML = '00:00:00';
    lapList.innerHTML = '';
}

function recordLap() {
    if (running) {
        let lapTime = formatTime(hours, minutes, seconds);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    hours = Math.floor(difference / (1000 * 60 * 60));

    display.innerHTML = formatTime(hours, minutes, seconds);
}

function formatTime(hours, minutes, seconds) {
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    return `${hours}:${minutes}:${seconds}`;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
