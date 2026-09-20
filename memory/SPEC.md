# Daily Driver — Living Specification

## Product

Daily Driver is a responsive interactive digital automotive magazine prototype. It defaults to Track Mode, a premium asphalt-black editorial experience, and can switch the full UI to Street Mode, a crisp off-white layout.

## Key flows

- Browse the Artura hero, advance the five-story carousel, and trigger the feature CTA toast.
- Use the masthead navigation to scroll to Garage, Ownership, Pitstop, or Livery sections.
- Select two vehicles and reveal a side-by-side spec comparison.
- Edit commute, fuel-efficiency, and annual-tax inputs to calculate monthly running cost using the $1.75/L benchmark.
- Upvote any Pitstop community post.
- Select one of three livery swatches and toggle windshield masking in the visualizer.
- Toggle Track/Street Mode from the navbar; all page surfaces respond through CSS variables.

## Data model

The prototype uses local React state and static in-memory dummy data only. The existing FastAPI status endpoints and Mongo connection remain untouched. No auth, user roles, seeded accounts, or third-party integrations are used.

## Design system

- Asphalt Black `#1A1A1A`, Orange Safety `#FF6600`, Off White `#F8F8F8`, Steel Silver `#CCCCCC`.
- Space Grotesk and IBM Plex Sans are bundled local stand-ins for the requested Barlow / Eurostile mechanical editorial direction.
- Full-width performance hero, asymmetric bento grid, dashed section dividers, telemetry micro-labels, responsive layouts.