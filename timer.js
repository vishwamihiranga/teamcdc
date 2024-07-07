document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const timeInMinutes = parseInt(urlParams.get('time'), 10);

    let totalSeconds = timeInMinutes * 60;
    let interval;
    let isPaused = false;

    const timerDisplay = document.getElementById('timer-display');
    const startButton = document.getElementById('start-timer');
    const pauseButton = document.getElementById('pause-timer');
    const resetButton = document.getElementById('reset-timer');

    function updateTimerDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        if (interval) clearInterval(interval);
        isPaused = false;
        interval = setInterval(() => {
            if (!isPaused && totalSeconds > 0) {
                totalSeconds--;
                updateTimerDisplay();
            } else if (totalSeconds === 0) {
                clearInterval(interval);
                alert('Time is up!');
            }
        }, 1000);
    }

    function pauseTimer() {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
    }

    function resetTimer() {
        if (interval) clearInterval(interval);
        totalSeconds = timeInMinutes * 60;
        updateTimerDisplay();
        isPaused = false;
        pauseButton.textContent = 'Pause';
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    updateTimerDisplay();
});
