# Changelog

## Unreleased

### Added
- Wired the Writing page to Sanity CMS — article content is now authored and published in Sanity Studio instead of local Markdown files.
- Renamed the Writing page to **Library** (nav label and page title) and restructured it into four alternating sections: Articles, Templates & Tools, Podcast, and LinkedIn.
- Added Sanity schema types and GROQ queries for `templateOrTool`, `podcastEpisode`, and `linkedinPost`, each capped at 5 items per section with a "Show more" expansion.

### Notes
- All four sections currently render their empty states except Articles, until content is published for the new types in Studio.
