# Scalize Systems website: Codex maintenance guide

# Working with Katie

I am not a developer and am still learning. Please follow these rules in every response:

- Use plain language, not technical jargon. If a technical term is unavoidable, explain it in one plain sentence immediately after using it.
- Always tell me explicitly what action I need to take, where to do it, and what I should expect to see when it worked.
- Do not assume I know what any command does. If I need to run something in the terminal, tell me the exact command and explain in plain English what it does before I run it.
- When something goes wrong, explain what happened in plain language before jumping to a fix.
- When you finish a task, tell me clearly what you did, what changed, and what I should check to confirm it worked.
- If you need me to make a decision, explain my options in plain language with the tradeoff of each before asking me to choose.
- Do not give me multiple next steps at once. Give me one step at a time and wait for me to confirm before moving on.


## Project map
- Existing React/TypeScript site built with Vite and Tailwind. Preserve established design unless Katie requests a change.
- Routes and application entry: App.tsx, main.tsx. Shared wording: siteCopy.ts.
- Main pages are root-level TSX files. Contact.tsx owns the EmailJS contact form and embedded Calendly scheduler.
- Calendly booking tracking: calendlyConversion.ts; sitewide Google Analytics and Ads setup: index.html. Preserve the single Google tag load, origin validation, and booking deduplication.
- Writing content comes from Sanity. Consult README.md and applicable Sanity guidance before changes. The separate sibling scalize-studio project owns CMS schemas; do not treat it as part of this repository.
- Vercel configuration: vercel.json. Build prerendering: entry-server.tsx and prerender.mjs.

## Working practices
- Inspect Git status before edits; preserve existing user changes. Never reset, clean, or overwrite unrelated work.
- Use the existing package-lock.json; do not upgrade dependencies incidentally.
- npm run dev starts the local preview. npm run build builds the browser and server bundles and prerenders pages. npm run preview serves the built site.
- Run the relevant checks and inspect changed pages at desktop and mobile sizes. Do not claim a check passed unless it was run.
- Keep credentials in existing environment/configuration storage. Do not print secrets or commit .env.local.
- A Git push may trigger the hosting deployment. Verify the repository's deployment behavior before pushing; ask before publishing unless Katie already authorized that specific release.
- Preserve CLAUDE.md as reference; there is no need to delete Claude configuration to use Codex.

## Business and measurement context (confirmed November 2026)
- Primary buyer: founder/CEO of a growth-stage software startup in the US or Canada. CPO/CTO are secondary buyers.
- Explain why human-only PDLC/SDLC processes need reimagining for AI agents; avoid generic AI-tool marketing.
- Preferred positioning: Get more from AI by reimagining processes built for human-only teams. Katie also approved Reimagine an AI-Driven PDLC and AI Processes for Growth Teams as short ad headlines.
- Successful contact-form submissions and completed Calendly bookings are lead actions. Page views, scheduler opens, and time selections are not booked appointments.
- Existing booking destination: AW-18529566855/kx5MCPTOmKcdEIeBy4NF. Google Ads action Book appointment was restored as Primary/Count One; book_appointment is Secondary. Verify current account state before future changes.
- Contact form currently awaits EmailJS success, but does not send a separate Google Ads form conversion. Add this only using a verified form-action destination; never reuse the booking label for messages.
- Performance Max was paused November 1, 2026, after Katie explicitly approved stopping it to prevent video ad delivery. Do not resume, launch a replacement, or raise the $20/day budget without authorization.
- Katie wants no video ads, no Google-generated videos, and no app placements. Do not enable automated creative or placements that conflict with this.
