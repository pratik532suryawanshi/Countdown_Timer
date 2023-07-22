let countdown;
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  const seconds = parseInt(prompt('Enter the countdown time in seconds:'));
  if (isNaN(seconds) || seconds <= 0) {
    alert('Please enter a valid positive number of seconds.');
    return;
  }

  timer(seconds);
  startButton.disabled = true;
}

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      startButton.disabled = false;
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainderSeconds = seconds % 60;
  const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
  timerDisplay.textContent = display;

  // Add pulse animation when less than 10 seconds left
  if (seconds <= 10) {
    timerDisplay.classList.add('countdown-pulse');
  } else {
    timerDisplay.classList.remove('countdown-pulse');
  }
}

function stopTimer() {
  clearInterval(countdown);
  startButton.disabled = false;
}

function resetTimer() {
  clearInterval(countdown);
  timerDisplay.textContent = '00:00:00';
  timerDisplay.classList.remove('countdown-pulse');
  startButton.disabled = false;
}
