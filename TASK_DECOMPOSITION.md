# TASK_DECOMPOSITION.md

## 1. Project Overview

**Project:** HW3 — Resilient Landing Page (3 Slices)

**Technology constraints:**
- Vanilla HTML5, modern CSS, and ES6+ JavaScript only.
- No jQuery, Bootstrap, Tailwind CSS, or external CDNs.
- Use semantic HTML and accessible UI states.
- Use `const` by default; use `let` only when reassignment is required.
- Do not use unsafe DOM injection such as assigning untrusted input to `innerHTML`.
- Keep each implementation step small, testable, and independently committed.

### Development Workflow

1. Implement one sub-task at a time.
2. Define and verify the HTML/JavaScript contract before implementing dependent behavior.
3. Test each slice before starting the next slice.
4. Use atomic commits with clear, descriptive messages.
5. Record AI prompts and document AI-generated defects.
6. Ensure every implementation decision can be explained during the live defense.

**Minimum commit requirement:** At least 5 meaningful commits across the three slices.

**Prompting policy:** One-shot prompting is prohibited. Each prompt must address one specific sub-task rather than asking AI to implement the entire assignment at once.

---

## 2. Work Breakdown Structure (WBS)

| WBS ID | Work package | Deliverable |
|---|---|---|
| 0.1 | Repository and project structure | Initial project files and task plan |
| 0.2 | HTML and accessibility contract | Semantic landing-page structure |
| 1.1 | UTC countdown contract | Defined target-time format and behavior |
| 1.2 | Countdown engine | Drift-resistant countdown calculation |
| 1.3 | Countdown verification | Tests for valid, expired, and boundary timestamps |
| 2.1 | Form state contract | Defined states and permitted transitions |
| 2.2 | State-machine implementation | Form state and UI transition logic |
| 2.3 | Form verification | Tests for success and error paths |
| 3.1 | Submission protection | Double-submit prevention |
| 3.2 | Input sanitization | Safe handling and rendering of user input |
| 3.3 | Security verification | XSS-oriented test cases and regression checks |
| 4.1 | AI failure audit | `AI_FAILURE_AUDIT.md` |
| 4.2 | Final review | Verified Git history and live-defense readiness |

---

## 3. Shared Contracts and Conventions

### 3.1 HTML Contract

- Use semantic HTML5 elements appropriate to each section.
- Use unique IDs for elements referenced by JavaScript.
- Associate form controls with accessible labels.
- Provide visible feedback for countdown and form states.
- Ensure interactive controls are keyboard accessible.
- Use `aria-live` or another suitable accessible announcement mechanism for dynamic status messages where appropriate.
- Keep behavior in external JavaScript files rather than inline event handlers.

### 3.2 JavaScript Contract

- Use modern ES6+ syntax.
- Separate calculation, state transitions, validation, and DOM updates where practical.
- Handle invalid input and unexpected failures without leaving the interface in a misleading state.
- Avoid unsafe HTML injection.
- Avoid unnecessary global variables.
- Do not use `Date.now()` as the elapsed-time source for countdown progression.

### 3.3 Git Contract

- Commit one coherent change at a time.
- Each slice must have at least one identifiable commit.
- The project must contain at least five meaningful commits in total.
- Do not combine unrelated HTML, CSS, JavaScript, and security changes into one oversized commit.
- Verify the behavior associated with each commit before proceeding.
- Commit messages must describe the actual changes made; adjust the proposed messages if the implementation differs.

---

## 4. Slice 1 — Drift-Free Countdown Engine (UTC ISO 8601)

### 4.1 Objective

Implement a countdown engine that accepts a target timestamp in UTC ISO 8601 format and calculates the remaining time without accumulating timer drift.

The countdown must handle valid future timestamps, expired timestamps, and invalid configuration.

### 4.2 Files

- `index.html` — countdown markup and target-time configuration.
- `css/style.css` — countdown presentation and responsive layout.
- `js/countdown.js` — countdown calculation, scheduling, and display updates.
- `tests/countdown-test-plan.md` — manual test cases and recorded results, if automated tests are not available.

If the repository uses a different directory structure, document the actual paths before implementation.

### 4.3 Contract

**Input contract**
- The target time must be an explicitly UTC ISO 8601 timestamp, for example a timestamp ending in `Z`.
- Invalid or missing target-time configuration must not produce a misleading countdown.
- The implementation must define how unsupported or malformed timestamps are handled.

**Calculation contract**
- Calculate the remaining time from the target timestamp and the current wall-clock time.
- Derive each displayed value from the target timestamp and the current time, rather than decrementing a counter once per timer callback.
- Use a monotonic clock such as `performance.now()` to measure elapsed time between updates when maintaining a clock baseline.
- Do not treat `performance.now()` as a UTC timestamp; it is an elapsed-time clock.
- Do not use `Date.now()` to measure elapsed intervals.
- Clamp expired countdown values to zero and stop unnecessary updates after expiration.
- Define the rounding rule for displayed seconds and apply it consistently.

**Output contract**
- Display days, hours, minutes, and seconds, or another explicitly documented time format.
- Update the accessible status when the countdown expires.
- Ensure repeated timer callbacks do not cause cumulative countdown drift.

**Boundary conditions**
- Valid future timestamp.
- Timestamp equal to the current time.
- Past timestamp.
- Invalid timestamp.
- Page loaded after the target time has already passed.

### 4.4 Implementation Tasks

1. Define the countdown HTML elements and target-time configuration.
2. Confirm the expected timestamp format and invalid-input behavior.
3. Implement a pure or independently testable remaining-time calculation.
4. Implement periodic rendering based on the calculated remaining time.
5. Handle expiration and invalid configuration.
6. Verify boundary cases before moving to Slice 2.

### 4.5 Verification Criteria

- A valid future UTC timestamp produces a positive countdown.
- The countdown reaches zero and does not display negative values.
- An expired timestamp displays the expired state immediately.
- An invalid timestamp produces a clear fallback message rather than `NaN` or a broken UI.
- Delayed timer callbacks do not accumulate countdown drift because remaining time is recalculated.
- The implementation does not use `Date.now()` as its elapsed-time source.
- The display remains usable on narrow screens.
- Dynamic countdown changes are accessible to users relying on assistive technology.

### 4.6 Proposed Atomic Commits

1. `feat(html): define countdown markup and UTC timestamp contract`
2. `feat(countdown): implement drift-resistant UTC countdown`
3. `test(countdown): verify expiration and invalid timestamp cases`

**Prompt link:** 

---

## 5. Slice 2 — State-Machine Form (Idle → Submitting → Success/Error)

### 5.1 Objective

Implement a form whose behavior is governed by an explicit state machine. The form must provide predictable transitions and clear feedback for submission, success, and failure.

### 5.2 Files

- `index.html` — form fields, submit control, and status message.
- `css/style.css` — visual styles for form states, validation, and feedback.
- `js/form-state.js` — state definitions, transitions, and state-dependent UI updates.
- `js/form-service.js` — submission operation or a clearly isolated mock service if no backend exists.
- `tests/form-test-plan.md` — transition test cases and results, if automated tests are not available.

Adapt the file structure to the actual repository if needed.

### 5.3 State Contract

**Allowed states**
- `Idle` — the form is ready for input and submission.
- `Submitting` — a submission operation is in progress.
- `Success` — the submission has completed successfully.
- `Error` — the submission failed.

**Permitted transitions**
- `Idle → Submitting`
- `Submitting → Success`
- `Submitting → Error`
- `Success → Idle` when the user starts a new submission or the form is explicitly reset.
- `Error → Idle` when the user retries or resets the form.

Any additional transition must be documented and justified.

**State invariants**
- The UI must reflect the current state.
- The submit control must not appear available while a submission is in progress.
- Success feedback must only be shown after the operation reports success.
- Error feedback must not be replaced by success feedback unless a subsequent operation succeeds.
- A failed submission must leave the user with a recoverable form state.
- State transitions must be centralized rather than scattered across unrelated event handlers.

### 5.4 Implementation Tasks

1. Define the form markup and accessible status region.
2. Define the allowed states and transitions.
3. Implement a centralized state transition function.
4. Implement the submission operation and its success/error handling.
5. Connect form events to the state machine.
6. Add state-dependent button and feedback updates.
7. Verify all valid transitions and error recovery paths.

### 5.5 Verification Criteria

- Initial page load produces the `Idle` state.
- Submitting the form changes the state to `Submitting`.
- The UI clearly indicates that submission is in progress.
- Successful completion changes the state to `Success`.
- Failed completion changes the state to `Error`.
- An error can be recovered from through a documented retry or reset path.
- The form cannot enter an undocumented state through ordinary user interaction.
- The state and status message remain consistent.
- Keyboard users and screen-reader users can understand the current state.
- Network or service errors do not leave the form permanently stuck in `Submitting`.

### 5.6 Proposed Atomic Commits

1. `feat(html): define accessible form and status contract`
2. `feat(form): implement explicit submission state machine`
3. `test(form): verify success error and recovery transitions`

**Prompt link:** 

---

## 6. Slice 3