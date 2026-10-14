
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


/* Slice 2: Form State Machine */

const registerForm = document.querySelector("#register-form");
const formStatus = document.querySelector("#form-status");
const submitButton = registerForm.querySelector('button[type="submit"]');

const formStates = {
    IDLE: "idle",
    SUBMITTING: "submitting",
    SUCCESS: "success",
    ERROR: "error"
};

let currentState = formStates.IDLE;

function setState(newState) {
    currentState = newState;

    const stateMessages = {
        idle: "",
        submitting: "Submitting...",
        success: "Registration successful!",
        error: "Registration failed. Please try again."
    };

    formStatus.textContent = stateMessages[currentState];
    submitButton.disabled = currentState !== formStates.IDLE;

    registerForm.setAttribute(
        "aria-busy",
        String(currentState === formStates.SUBMITTING)
    );
}

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (currentState !== formStates.IDLE) {
        return;
    }

    setState(formStates.SUBMITTING);

    try {
        // Simulate an API request.
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Demo only: randomly simulate success or failure.
        const isSuccess = Math.random() < 0.5;

        if (isSuccess) {
            setState(formStates.SUCCESS);
        } else {
            setState(formStates.ERROR);
        }

        // Return to idle after displaying the result for 2 seconds.
        setTimeout(() => {
            setState(formStates.IDLE);
        }, 2000);
    } catch (error) {
        setState(formStates.ERROR);

        setTimeout(() => {
            setState(formStates.IDLE);
        }, 2000);
    }
});

// Initialize the form state.
setState(formStates.IDLE);
