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

- Replaced the rotating Home statistics carousel with three static proof cards below the hero (30× faster releases, 50% faster time to first value, 25% lower operating costs); removed the $150K-under-budget and $100M+ revenue slides. The cards also appear in llms.txt.
- Removed the Case Studies and Writing preview sections from the Home page; the page now ends with the Services preview.
- Services: removed the rotating third-party AI statistics; added a "How the diagnostic leads to the build" three-step flow between the two services; added selected past results beside the service descriptions (20% on-time delivery in the Operating Diagnostic; 25% lower operating costs and the 30x product rewrite in the Build Engagement), each linking to its case study.
- Case Studies: added a summary panel (setting, role, challenge, outcomes) and one explanatory diagram to each case study; renamed sections to The problem / My contribution / The result. Narrative text unchanged.

- Added a fourth case study, "Rebuilding a Legal Research and Drafting Platform for Faster Releases and Faster Customer Value," which supports the 30× and 50% homepage cards and the Services rewrite result; all link to it.
- Wayfair case study: added the $40M+ shipping cost reduction and the three-year revenue total ($100M, including the first-year $48M).
- Endurance case study: added the 25% operating cost reduction and its causes; the Services 25% box now links to it.
- Legal-tech case study: softened the claim that every correction improved the model to say expert corrections informed each round of retraining.

- Added decorative background art behind the Home hero at 20% opacity (wide version on desktop, tall version on phones); the hero fits its text with 80px (desktop) / 48px (phones) above the headline, and the art covers it edge to edge, cropping on wider screens. Selected results is now its own section below the hero.

- Added the Google Ads tag (AW-18529566855) immediately after <head> on every page, alongside the existing Google Analytics tag.
- Page views are now recorded by the Google tags' own automatic tracking instead of the site's PageViewTracker, which fixes Analytics (and Ads) counting every page after the first twice.

### Notes
- All four sections currently render their empty states except Articles, until content is published for the new types in Studio.
