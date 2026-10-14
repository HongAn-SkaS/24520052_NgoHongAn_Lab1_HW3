# AI Failure Audit

## 1. Countdown Timing Issue
- **Defect:** Countdown may drift if implemented by decrementing a stored counter.
- **Detection:** Compared displayed time with the actual target time.
- **Fix:** Recalculate remaining time using `target - Date.now()` on each update.

## 2. Duplicate Form Submission
- **Defect:** Repeated clicks or Enter presses may trigger duplicate submissions.
- **Detection:** Submitted the form repeatedly while the simulated request was processing.
- **Fix:** Added an `inFlight` flag, disabled the submit button immediately, and blocked submissions while processing.

## 3. Unsafe User Input Rendering
- **Defect:** Rendering user input with `innerHTML` can introduce XSS risks.
- **Detection:** Reviewed how user-provided values were inserted into the page.
- **Fix:** Added input trimming, length limits, `escapeHtml()`, and used `textContent` to display user input.

