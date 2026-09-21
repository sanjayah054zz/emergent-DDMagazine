# Daily Driver — Living Specification

## Product

Daily Driver is a responsive interactive digital automotive magazine prototype. It defaults to Track Mode, a premium asphalt-black editorial experience, and can switch the full UI to Street Mode, a crisp off-white layout.

## Key flows

- Browse the Artura hero, advance the five-story carousel, and trigger the feature CTA toast.
- Use the masthead navigation to open the magazine archive, Tools hub, detailed Pitstop community, and Membership page.
- Select any two of eight varied vehicles—adventure bikes, roadster, EV, hybrid SUV, hot hatch, off-roader, and Artura—and reveal a side-by-side spec comparison.
- Edit commute, fuel-efficiency, and annual-tax inputs to calculate monthly running cost using the $1.75/L benchmark.
- Upvote any Pitstop community post.
- Select one of three livery swatches and toggle windshield masking in the visualizer.
- Toggle Track/Street Mode from the navbar; all page surfaces respond through CSS variables.
- Open lightweight editorial detail routes for the Artura hero, overlanding, compact EV, and Miata stories, then return through the back-to-magazine links or Daily Driver logo.
- Homepage is editorial-only; Garage, Ownership, and Livery live at `/tools`, Pitstop lives at `/pitstop`, the full archive lives at `/archive`, and Membership lives at `/membership`.
- Shared navigation has no search icon; it includes Login/Register for guests, Account/Logout for active users, and routes to separate Help and Contact pages.
- Local accounts expose membership status, benefits, and special member events; the demo Grid Member account is documented in `memory/test_credentials.md`.

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
- Pitstop seeds a clearly labeled example photo post and shows practical upload guidance beside the composer.
- Livery Visualizer Pro supports body color, gloss/satin/metallic finish, wheel color, four graphic packages, windshield masking, live build telemetry, multiple session-saved builds, and downloadable SVG build cards.
- Membership supports all browser-provided ISO currency codes. Sixteen major currencies use fixed demo conversion rates; remaining codes use clearly labeled prototype estimates.
- Guest and free Paddock readers see one premium sponsor block inside articles; Grid and Factory members read ad-free.
- Live comparison columns show a representative image for each of the eight vehicles.
- Pitstop includes topic search across title, body, author, and category.
- Help offers searchable FAQs at `/help`; Contact provides a functional local form at `/contact`.