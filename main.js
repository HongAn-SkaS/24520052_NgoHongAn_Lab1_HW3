
"use strict";

// Slice 1: Drift-Free Countdown Engine

const target = new Date("2026-12-31T23:59:59Z").getTime();

const countdownDisplay = document.querySelector("#countdown-display");

function update() {
    const remaining = target - Date.now();

    if (remaining <= 0) {
        countdownDisplay.textContent = "Launched!";
        clearInterval(countdownInterval);
        return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const display = 
        days + "d " +
        String(hours).padStart(2, "0") + "h " +
        String(minutes).padStart(2, "0") + "m " +
        String(seconds).padStart(2, "0") + "s";

    countdownDisplay.textContent = display;
}

const countdownInterval = setInterval(update, 1000);

// Update immediately instead of waiting for the first interval.
update();
