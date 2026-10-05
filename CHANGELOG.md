# Changelog

## Unreleased

### Added
- Wired the Writing page to Sanity CMS: article content is now authored and published in Sanity Studio instead of local Markdown files.
- Renamed the Writing page to **Library** (nav label and page title) and restructured it into four alternating sections: Articles, Templates & Tools, Podcast, and LinkedIn.
- Added Sanity schema types and GROQ queries for `templateOrTool`, `podcastEpisode`, and `linkedinPost`, each capped at 5 items per section with a "Show more" expansion.
- Added jump links (Templates & Tools, Podcast, LinkedIn) below the Library page title and tightened section/list spacing throughout the page.
- Added a third case study, "Greenfield Customer Acquisition Platform and Cloud Migration," to the Case Studies page.

- Repositioned site copy around redesigning the PDLC and SDLC for human and agent teams (per the PDLC/SDLC copy handoff): Home title, meta and og descriptions, hero, subhead, intro, and service cards; Services diagnostic paragraphs, deliverables, Decision-Making Framework, and two new FAQ items; How I Work methodology and engagement arc; About bio sentences.
- Replaced "pre-seed through Series C" audience language with "growth-stage companies" site-wide (About page career history unchanged).
- Updated llms.txt and structured data to match the new copy.

- Rewrote the Home hero (new headline and subtext) and replaced the "Get in touch" button with "Book a 15-minute call" (opens Calendly) and "Explore services".
- Replaced the paragraph below the Home hero with a "Problems Scalize Systems helps solve" comparison table, with tighter section padding.
- llms.txt and structured data are now generated from the site's own copy (siteCopy.ts and the index.html meta description), so they always match the live pages.

- Added a decorative conversation illustration to the Home hero: a faded layer behind the copy above 760px, and a small centered image below the buttons at 760px and narrower.

### Notes
- All four sections currently render their empty states except Articles, until content is published for the new types in Studio.
