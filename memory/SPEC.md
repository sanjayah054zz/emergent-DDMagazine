# Daily Driver — Living Specification

## Product

Daily Driver is a responsive interactive digital automotive magazine prototype. It defaults to Track Mode, a premium asphalt-black editorial experience, and can switch the full UI to Street Mode, a crisp off-white layout.

## Key flows

- Browse the Artura hero, advance the five-story carousel, and trigger the feature CTA toast.
- Use the masthead navigation to open the magazine archive, Tools hub, detailed Pitstop community, and Membership page.
- Select two vehicles and reveal a side-by-side spec comparison.
- Edit commute, fuel-efficiency, and annual-tax inputs to calculate monthly running cost using the $1.75/L benchmark.
- Upvote any Pitstop community post.
- Select one of three livery swatches and toggle windshield masking in the visualizer.
- Toggle Track/Street Mode from the navbar; all page surfaces respond through CSS variables.
- Open lightweight editorial detail routes for the Artura hero, overlanding, compact EV, and Miata stories, then return through the back-to-magazine links or Daily Driver logo.
- Homepage is editorial-only; Garage, Ownership, and Livery live at `/tools`, Pitstop lives at `/pitstop`, the full archive lives at `/archive`, and Membership lives at `/membership`.

## Data model

The prototype uses local React state and static in-memory dummy data only. The existing FastAPI status endpoints and Mongo connection remain untouched. No auth, user roles, seeded accounts, or third-party integrations are used.

## Design system

- Asphalt Black `#1A1A1A`, Orange Safety `#FF6600`, Off White `#F8F8F8`, Steel Silver `#CCCCCC`.
- Space Grotesk and IBM Plex Sans are bundled local stand-ins for the requested Barlow / Eurostile mechanical editorial direction.
- Full-width performance hero, asymmetric bento grid, dashed section dividers, telemetry micro-labels, responsive layouts.
- Detail routes live at `/articles/:slug` and use shared static article story data with image, category, title, dek, byline/date, read time, and short editorial body.
- The Artura cover story uses the user-supplied overhead orange supercar image consistently across the homepage hero, archive card, and article detail page.
- **LOCAL STATE MOCKED**: Tools calculations, comparisons, Pitstop votes/posts, and Membership joining are interactive browser state only; no persistence or integrations were added.
- Pitstop accepts local JPG/PNG/WebP uploads up to 5 MB, previews the image, and publishes it inside the new in-memory discussion post.
- Livery Visualizer Pro supports body color, gloss/satin/metallic finish, wheel color, four graphic packages, windshield masking, live build telemetry, multiple session-saved builds, and downloadable SVG build cards.