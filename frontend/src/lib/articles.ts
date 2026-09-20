export type ArticleStory = {
  slug: string;
  category: string;
  issue: string;
  title: string;
  dek: string;
  image: string;
  author: string;
  published: string;
  readTime: string;
  body: string[];
};

export const articleStories: ArticleStory[] = [
  {
    slug: "art-of-hybrid-speed",
    category: "COVER STORY",
    issue: "01 // THE ART OF HYBRID SPEED",
    title: "Driving the New Artura.",
    dek: "Our definitive review of the latest performance benchmark — a supercar that treats every commute like a clean lap.",
    image: "https://images.unsplash.com/photo-1787354478969-e459bfd245a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBjYXIlMjBjb2FzdGFsJTIwcm9hZHxlbnwwfHx8fDE3ODk5NDEwMjd8MA&ixlib=rb-4.1.0&q=85",
    author: "Mara Voss",
    published: "SEPTEMBER 20, 2026",
    readTime: "8 MIN READ",
    body: [
      "There is a particular kind of silence before a fast car moves. In the Artura, it is the quiet click of a selector, the brief electric hum, and then the road unspooling beneath a chassis that feels assembled around the driver.",
      "McLaren's hybrid formula is not here to make the Artura sensible. It is here to make the gaps disappear: the pause between throttle and response, between a tightening corner and the next clean apex. The result feels less like a compromise and more like a sharper definition of speed.",
      "That is what makes this a Daily Driver story. The Artura is still extravagant, but it is unusually legible. It communicates its grip, its energy, and its limits without turning the everyday drive into a ceremony.",
    ],
  },
  {
    slug: "overlanding-for-everyone",
    category: "ADVENTURE",
    issue: "02 // LONG HAUL",
    title: "Building a Budget Adventurer.",
    dek: "You do not need a six-figure build to find the rough road. You need a reliable platform, a sensible kit list, and a reason to leave early.",
    image: "https://images.unsplash.com/photo-1583355497633-e4248ca3fdb0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxvZmZyb2FkJTIwc3V2JTIwYWR2ZW50dXJlfGVufDB8fHx8MTc4OTk0MTAyN3ww&ixlib=rb-4.1.0&q=85",
    author: "Jon Bell",
    published: "SEPTEMBER 16, 2026",
    readTime: "6 MIN READ",
    body: [
      "The best overland rig is the one that gets used. That usually means starting with something familiar, keeping the modifications measured, and spending the money on tires before titanium kitchen drawers.",
      "Our budget build began with a compact four-by-four, a set of recovery boards, and enough lighting to make a campsite feel intentional. The brief was simple: get farther without turning the driveway into a fabrication shop.",
      "On the fire road, restraint became the superpower. A little more sidewall, a little more patience, and the same vehicle that handles a supermarket run on Friday can carry you to a quiet ridgeline by Saturday night.",
    ],
  },
  {
    slug: "future-of-commuting",
    category: "COMMUTE",
    issue: "03 // ELECTRIC AGE",
    title: "Tiny Volvo, Big Impact.",
    dek: "The city-sized EV is not trying to win a drag race. It is trying to make the daily route feel lighter, quieter, and easier to repeat.",
    image: "https://images.unsplash.com/photo-1617727553401-3ec4e92f32a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHx3aGl0ZSUyMGVsZWN0cmljJTIwdmVoaWNsZSUyMGNhcnxlbnwwfHx8fDE3ODk5NDEwMjd8MA&ixlib=rb-4.1.0&q=85",
    author: "Ari Okafor",
    published: "SEPTEMBER 11, 2026",
    readTime: "5 MIN READ",
    body: [
      "The city asks different questions of a vehicle than the open road. How quickly can it change lanes? How much space does it need? Can it make a short trip feel like a reset instead of another task?",
      "This compact Volvo answers with a tidy footprint and the calm, immediate response that makes electric cars so persuasive in traffic. Its real luxury is not power; it is the absence of friction.",
      "For drivers who spend most of their week between traffic lights, the smaller EV is not a lesser experience. It is a better fit — proof that the future of commuting may arrive quietly and park almost anywhere.",
    ],
  },
  {
    slug: "legends-of-lifestyle",
    category: "LIFESTYLE",
    issue: "04 // DRIVER'S CAR",
    title: "The Unbeatable Joy of a Miata.",
    dek: "The classic roadster still knows the fastest route to a good mood: less weight, more sky, and one perfectly placed corner.",
    image: "https://images.pexels.com/photos/9846051/pexels-photo-9846051.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    author: "Theo Grant",
    published: "SEPTEMBER 04, 2026",
    readTime: "7 MIN READ",
    body: [
      "There are cars you admire and cars you look forward to. The Miata has always understood the difference. It makes a short trip feel like a deliberate route, even when the destination is only the next fuel station.",
      "The formula is unchanged because it was right the first time: a compact cabin, a responsive front end, and enough power to make the driver part of the performance. You do not need a racetrack to feel involved.",
      "In an age of bigger screens and bigger numbers, the Miata remains a useful reminder that the best automotive experiences are often measured in inputs, not outputs.",
    ],
  },
  {
    slug: "tire-tech-2026",
    category: "TECH LAB",
    issue: "05 // TECH LAB",
    title: "The Rubber Compound Revolution.",
    dek: "The quiet engineering inside a tire is changing how everyday cars find grip, shed water, and stay calm at speed.",
    image: "https://images.pexels.com/photos/28748682/pexels-photo-28748682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    author: "Nico Hart",
    published: "AUGUST 28, 2026",
    readTime: "6 MIN READ",
    body: [
      "A tire is the only part of a car that touches the road, which makes its quiet work easy to underestimate. Inside the tread pattern and sidewall is a chemistry lesson in heat, water, and compromise.",
      "The newest compounds are less about headline grip and more about the usable middle: predictable braking, consistent steering, and enough efficiency to make a long commute feel less expensive.",
      "For the driver, the revolution arrives as confidence. The best tire technology does not announce itself; it simply gives the next corner a wider margin.",
    ],
  },
  {
    slug: "kilowatts-vs-octane",
    category: "BUYER'S GUIDE",
    issue: "06 // BUYER'S GUIDE",
    title: "The Commuter Dilemma.",
    dek: "Electric calm or combustion character? The right daily driver depends on the route you actually take, not the one on the brochure.",
    image: "https://images.unsplash.com/photo-1704475336842-0ab3798abf0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHx3aGl0ZSUyMGVsZWN0cmljJTIwdmVoaWNsZSUyMGNhcnxlbnwwfHx8fDE3ODk5NDEwMjd8MA&ixlib=rb-4.1.0&q=85",
    author: "Rhea Kim",
    published: "AUGUST 22, 2026",
    readTime: "9 MIN READ",
    body: [
      "The commuter choice is rarely as simple as fuel versus electricity. It is a question of charging access, traffic rhythm, weekend ambition, and what kind of silence you want on the way home.",
      "An EV makes the stop-start route feel almost frictionless, while a good petrol car keeps its own kind of theatre in reserve. Both can be excellent daily drivers when they fit the calendar rather than the argument.",
      "Our buyer's guide starts with the route. Count the miles, the parking spaces, and the moments that make you smile before you count the cylinders.",
    ],
  },
  {
    slug: "night-driving-apex-vision",
    category: "FEATURES",
    issue: "07 // FEATURES",
    title: "Apex Vision & LED Laser Tech.",
    dek: "Modern light is turning the night road into a more readable place, one precisely managed beam at a time.",
    image: "https://images.unsplash.com/photo-1780399823334-778b0787d7aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBjYXIlMjBjb2FzdGFsJTIwcm9hZHxlbnwwfHx8fDE3ODk5NDEwMjd8MA&ixlib=rb-4.1.0&q=85",
    author: "Samir Cole",
    published: "AUGUST 14, 2026",
    readTime: "5 MIN READ",
    body: [
      "The night road is a test of information. You need to see the edge of the lane, the shape of the bend, and the unexpected object just beyond the reflector.",
      "Matrix LEDs and laser-assisted systems now shape the beam around traffic instead of simply turning the brightness up. The result feels less like a spotlight and more like a second set of eyes.",
      "Good lighting cannot replace judgement, but it can give judgement more time. That is the kind of technology that belongs in every serious daily driver conversation.",
    ],
  },
];