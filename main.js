
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
let inFlight = false;


function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function sanitizeInput(str, maxLength) {
    return escapeHtml(String(str).trim().slice(0, maxLength));
}


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

    // Block duplicate submissions.
    if (currentState !== formStates.IDLE || inFlight) {
        return;
    }

    // Lock immediately before starting the request.
    inFlight = true;
    submitButton.disabled = true;

    
    setState(formStates.SUBMITTING);

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    const name = sanitizeInput(nameInput.value, 100);
    const email = sanitizeInput(emailInput.value, 254);
    const message = sanitizeInput(messageInput.value, 1000);

    try {
        // Simulate an API request.
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Demo only: randomly simulate success or failure.
        const isSuccess = Math.random() < 0.5;

        
        if (isSuccess) {
            setState(formStates.SUCCESS);
            formStatus.textContent = `Thanks, ${name}!`;
        } else {
            setState(formStates.ERROR);
    }


        // Return to idle after displaying the result for 2 seconds.
        setTimeout(() => {
            inFlight = false;
            setState(formStates.IDLE);
        }, 2000);
    } catch (error) {
        setState(formStates.ERROR);

        setTimeout(() => {
            inFlight = false;
            setState(formStates.IDLE);
        }, 2000);
    }
});


