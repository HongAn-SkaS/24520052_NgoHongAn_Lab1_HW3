# AI Failure Audit

## Project: Resilient Landing Page (3 Slices)

### Purpose

This document records three defects or implementation issues identified in AI-generated code during the development of the Resilient Landing Page. Each issue includes its impact, detection method, and corrective action.

The purpose of this audit is to demonstrate that AI-generated code was reviewed and tested rather than accepted without verification.

---

## Issue 1: Unnecessary HTML Escaping Before Using `textContent`

**Affected area:** Slice 3 – Input Sanitization

### Description

The AI-generated implementation applies `escapeHtml()` to user input and then displays the resulting string using `textContent`.

For example, the input:

`<script>`

is converted into:

`&lt;script&gt;`

When this escaped string is assigned to `textContent`, the browser displays the entity characters literally instead of displaying the original text.

This is unnecessary escaping for a value that is only inserted as text. Although `textContent` prevents the input from being interpreted as HTML, applying HTML escaping beforehand can produce an incorrect user experience.

### Detection

1. Enter a name containing characters such as `<`, `>`, or `&`.
2. Submit the registration form.
3. Inspect the success message.
4. Check whether HTML entities are displayed literally instead of the intended text.

### Corrective Action

Use `textContent` with the trimmed, length-limited original string when displaying user input.

Keep `escapeHtml()` available for contexts that specifically require HTML escaping, but do not combine HTML escaping with `textContent` unnecessarily.

Never use `innerHTML` to display untrusted user input.

---

## Issue 2: Form Validation Is Missing When `novalidate` Is Enabled

**Affected area:** Slice 2 – Form State Machine

### Description

The HTML registration form uses the `novalidate` attribute. This disables the browser's automatic form validation.

However, the submit handler does not implement equivalent custom validation before starting the simulated request.

As a result, an empty or invalid form can enter the `submitting` state and may display a success message.

Input sanitization does not replace validation: trimming and limiting input length do not establish that the submitted values are valid.

### Detection

1. Leave the name, email, and message fields empty.
2. Submit the form.
3. Observe whether the form begins processing despite the missing values.
4. Repeat with an invalid email address.

### Corrective Action

Implement custom validation before setting `inFlight` to `true` and before transitioning to `submitting`.

Check that:

- The name is not empty and satisfies the required length.
- The email has a valid format.
- The message is not empty and satisfies the required minimum length.

Display an appropriate validation message using `textContent` and prevent invalid submissions from starting the simulated request.

---

## Issue 3: Sanitized Email and Message Are Not Used by the Submission Flow

**Affected area:** Slice 3 – Input Sanitization and Form Submission

### Description

The AI-generated code creates sanitized values for the name, email, and message fields. However, the current simulated submission flow only uses the name to construct the success message.

The email and message values are not sent to a server or used by the simulated operation.

This means the current implementation demonstrates input processing but does not implement a complete registration submission.

The random success/failure result is also a demonstration mechanism, not evidence that registration data has actually been stored.

### Detection

1. Enter different values in all three fields.
2. Submit the form and inspect the JavaScript submission handler.
3. Verify that only the name is used in the displayed success message.
4. Confirm that no API request or persistent data storage occurs.

### Corrective Action

For the current lab demonstration, clearly identify the submission as simulated and avoid claiming that registration data has been saved.

When integrating a real backend, submit the validated name, email, and message using an appropriate API request. Handle server responses and failures explicitly.

Perform validation on the server as well; client-side sanitization and validation alone are not sufficient to protect a backend.

---

## Verification Summary

| Issue | Detection method | Corrective action |
|---|---|---|
| Unnecessary HTML escaping | Test special characters in the name field | Use `textContent` with the original trimmed and length-limited string |
| Missing custom validation | Submit empty fields or an invalid email | Validate input before starting submission |
| Email and message are not submitted | Inspect the submission handler and network activity | Connect the fields to a real API when backend integration is implemented |

## Conclusion

AI-generated code can contain usability defects, missing validation, and incomplete functionality even when the page appears to work.

For this project, the generated code must be reviewed against the HTML, JavaScript, accessibility, and security requirements. Each identified issue should be reproduced, documented, corrected, and retested.

The final implementation must remain consistent with the project constraints: vanilla HTML5, modern CSS, and ES6+ JavaScript, without jQuery, Bootstrap, Tailwind CSS, or external CDNs.
