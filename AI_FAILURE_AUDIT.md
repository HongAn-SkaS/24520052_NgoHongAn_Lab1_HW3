# AI_FAILURE_AUDIT.md

## Purpose

This document records three defects introduced by AI-generated suggestions during the development of HW3 — Resilient Landing Page.

Each entry must be supported by an observed implementation, a reproducible test, or relevant Git history. Hypothetical defects must not be reported as confirmed incidents.

---

## Defect 1 — Countdown Drift

### Description

**Observed defect:** [Describe the actual AI-generated countdown implementation and its incorrect behavior.]

Potential issue to investigate: the countdown decreases a stored counter by one every time a timer callback runs, assuming that each callback executes exactly on schedule.

### Detection

- Test the countdown over a longer interval.
- Compare the displayed remaining time against the target timestamp.
- Introduce a delayed callback or temporarily leave the browser tab in the background.
- Record the observed difference and reproduction steps.

**Evidence:** [Test result, screenshot, commit, or relevant code location.]

### Root Cause

[Explain why the original implementation did not account for delayed timer callbacks or elapsed-time measurement.]

### Correction

[Describe the actual correction made.]

The intended design should recalculate remaining time from the target timestamp and current time. A monotonic clock such as `performance.now()` may be used for elapsed-time measurement, but it must not be mistaken for a UTC timestamp.

### Verification After Fix

[Record the test performed and the observed result.]

---

## Defect 2 — Invalid Form State Transition

### Description

**Observed defect:** [Describe the actual AI-generated state-machine or form-handling defect.]

Potential issue to investigate: the form enters `Submitting` but does not return to a usable state after a rejected request or exception.

### Detection

- Simulate a failed submission.
- Observe the displayed state and submit control.
- Check whether the user can retry.
- Inspect the state-transition logic and relevant console errors.

**Evidence:** [Test result, screenshot, commit, or relevant code location.]

### Root Cause

[Explain which missing transition, incomplete error handler, or incorrect UI update caused the defect.]

### Correction

[Describe the actual correction made.]

The state machine should explicitly handle submission failure and provide a documented recovery path. The UI should remain consistent with the current state.

### Verification After Fix

[Record the failure scenario, retry scenario, and observed results.]

---

## Defect 3 — Duplicate Submission or Unsafe Input Rendering

### Description

**Observed defect:** [Choose and document one actual defect.]

Potential issue A — duplicate submission: repeated click or Enter-key events start multiple operations before the first operation completes.

Potential issue B — unsafe rendering: user-controlled text is inserted into an HTML parsing sink, allowing markup or event-handler payloads to be interpreted as HTML.

Do not combine these into one incident unless the evidence demonstrates both problems in the same defect.

### Detection

For duplicate submission:
- Trigger rapid repeated submissions.
- Count how many submission operations begin.
- Confirm whether more than one operation is active.

For unsafe rendering:
- Submit a harmless test payload containing HTML-like text.
- Verify whether it appears as plain text or is interpreted as markup.
- Inspect DOM-writing code for unsafe HTML injection.

**Evidence:** [Reproduction steps, test result, code location, or commit.]

### Root Cause

[Explain the actual missing submission guard or unsafe DOM rendering pattern.]

### Correction

[Describe the actual fix.]

For duplicate submission, the guard should be established synchronously before starting asynchronous work.

For input rendering, prefer safe DOM APIs such as `textContent` and `createElement` when HTML formatting is unnecessary. Validate input according to the documented rules and perform server-side validation if a backend is involved.

### Verification After Fix

[Record the test performed and its result.]

---

## Audit Summary

| Defect | Detection evidence | Correction evidence | Regression test |
|---|---|---|---|
| Countdown drift | [Fill in] | [Fill in] | [Fill in] |
| Form state failure | [Fill in] | [Fill in] | [Fill in] |
| Duplicate submission or unsafe rendering | [Fill in] | [Fill in] | [Fill in] |

## Audit Integrity

- Only verified defects are reported as observed.
- Corrections are linked to actual code changes or commits where possible.
- Test results reflect tests that were actually performed.
- AI-generated suggestions are reviewed and verified before being accepted.
