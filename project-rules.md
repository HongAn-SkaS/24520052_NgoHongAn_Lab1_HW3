# Project Rules – Resilient Landing Page
- Vanilla HTML5, modern CSS, ES6+ JS only.
- No CDN, no jQuery, no Bootstrap, no Tailwind.
- const by default, let only if reassigned.
- Never innerHTML with user input (XSS).
- Use performance.now() or Date.now() with UTC ISO 8601.
- Atomic commits. No monolithic. No one-shot AI.
- Every AI output must be reviewed; log defects to AI_FAILURE_AUDIT.md.