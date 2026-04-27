/* global React, PROJECTS_SEED */
// Portfolio data layer with localStorage persistence.
// Seeded from the existing hobsonfilms.com portfolio entries.

const STORAGE_KEY = 'hobsonfilms.portfolio.v7';

const SEED_PROJECTS = [
  {
    id: 'jura-whisky',
    title: 'Jura Whisky',
    sub: 'Brand spot — atmosphere over ingredient.',
    client: 'Jura Whisky',
    cat: 'Commercial',
    year: 2015,
    img: 'assets/thumbs/jura-whisky.jpeg',
    vimeo: '134037067',
    span: 'big',
    role: 'Director of Photography',
    camera: 'ARRI Alexa',
    lenses: 'Cooke S4',
    format: '4K · 24p · ProRes 4444',
    lede: 'Brand spot for Jura — *atmosphere over ingredient*. Slow, weathered, textural.',
    body: 'A short-form brand piece leaning on negative space and natural light. The brief asked for a sense of place rather than a product hero, so we composed wide and let the frame breathe. Talent and props were treated as compositional weight, not subject — the bottle never anchors a shot.',
    credits: [
      { role: 'DP', name: 'Rob Hobson' },
      { role: '1st AC', name: 'D. Velez' },
      { role: 'Gaffer', name: 'M. Suzuki' },
      { role: 'Producer', name: 'A. Kim' },
    ],
  },
  {
    id: 'love-and-hip-hop-promo',
    title: 'Love and Hip Hop Promo',
    sub: 'Multi-day promo shoot.',
    client: 'VH1 / Viacom',
    cat: 'Reality',
    year: 2018,
    img: 'assets/thumbs/love-hip-hop.jpeg',
    vimeo: '279085781',
    span: 'xl',
    role: 'Director of Photography',
    camera: 'ARRI Alexa Mini',
    lenses: 'Cooke S4',
    format: '4.5K · 24p · ProRes 4444',
    lede: 'Multi-day promo shoot for the cast of *Love & Hip Hop*. Hard light, hard looks. We pulled the talent out of their natural set and into a controlled, stylized environment.',
    body: 'A two-day promo cycle covering hero portraits and short-form motion. We rotated three lighting setups across a single soundstage so the edit had options without losing through-line. Color was final in-camera; the team pulled stills directly from the master.',
    credits: [
      { role: 'Director', name: 'M. Cortez' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: '1st AC', name: 'D. Velez' },
      { role: 'Gaffer', name: 'M. Suzuki' },
      { role: 'Producer', name: 'A. Kim' },
      { role: 'Color', name: 'In-house' },
    ],
  },
  {
    id: 'logo-network-bianca-rolodex',
    title: 'LOGO Network — Bianca Rolodex',
    sub: 'One-day shoot with Viacom for a LOGO Network feature.',
    client: 'LOGO Network / Viacom',
    cat: 'Reality',
    year: 2018,
    img: 'assets/thumbs/logo-bianca.jpeg',
    vimeo: '271527925',
    span: 'big',
    role: 'Director of Photography',
    camera: 'ARRI Alexa Mini',
    lenses: 'Cooke S4',
    format: '4.5K · 24p · ProRes 4444',
    lede: 'A one-day, single-location shoot for a LOGO Network feature. Quick, clean, character-first.',
    body: 'Single-camera package with a tight three-person crew. Practical-first lighting plan; we used what was on the wall and added two soft sources to lift the shadows. The schedule allowed eight setups; we delivered ten.',
    credits: [
      { role: 'Director', name: 'J. Patel' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: '1st AC', name: 'D. Velez' },
      { role: 'Producer', name: 'Viacom' },
      { role: 'Color', name: 'In-house' },
    ],
  },
  {
    id: 'untying-the-knot',
    title: 'Untying the Knot',
    sub: 'Zen and the Art of Marriage Maintenance.',
    client: 'Bravo',
    cat: 'Reality',
    year: 2016,
    img: 'assets/thumbs/untying-the-knot.jpeg',
    vimeo: '180927164',
    span: 'std',
    role: 'Director of Photography',
    camera: 'Sony FS7',
    lenses: 'Canon 17-120 + primes',
    format: '4K · 24p · XAVC',
    lede: 'Observational reality. Long days, real conversations, two cameras catching what mattered.',
    body: 'A docu-style series that lived or died on coverage. We shot loose-handheld with a B-cam shoulder rig, designed so an interview never had to break for a reset. Lighting was minimal — soft fill from a window source where possible.',
    credits: [
      { role: 'Director', name: 'R. Khan' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'B-Cam', name: 'T. Reed' },
      { role: 'Sound', name: 'B. Aguilar' },
      { role: 'Producer', name: 'Bravo' },
    ],
  },
  {
    id: 'black-keys',
    title: 'The Black Keys',
    sub: 'MTV’s Live in NYC.',
    client: 'MTV',
    cat: 'Music',
    year: 2017,
    img: 'assets/thumbs/black-keys.jpeg',
    vimeo: '88960482',
    span: 'tall',
    role: 'Director of Photography',
    camera: 'ARRI Alexa Mini + RED',
    lenses: 'Zeiss Master Primes',
    format: '4.5K · 24p · ProRes 4444',
    lede: 'Live performance, single venue, four cameras. The band played, we caught it. No second takes.',
    body: 'Live music is unforgiving — one shot, no resets. We ran a four-camera package: two on dollies in the pit, one locked-off wide, and a long lens roving the balcony. Lighting was the venue rig, augmented with two backlights we put up for the band. Color was finished in-house off the live grade.',
    credits: [
      { role: 'Director', name: 'S. Avalos' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'B-Cam', name: 'T. Reed' },
      { role: 'C-Cam', name: 'J. Park' },
      { role: 'Sound', name: 'MTV' },
      { role: 'Color', name: 'In-house' },
    ],
  },
  {
    id: 'college-hoops-confidential',
    title: 'College Hoops Confidential — Vets Classic',
    sub: 'Follow-doc of the US Naval Academy Basketball Tournament.',
    client: 'Independent',
    cat: 'Sports',
    year: 2017,
    img: 'assets/thumbs/college-hoops.jpeg',
    vimeo: '246126516',
    span: 'wide',
    role: 'Director of Photography',
    camera: 'Sony FX9 + ARRI Mini',
    lenses: 'Canon CN-E + 70-200',
    format: '4K · 24p · XAVC',
    lede: 'A follow-doc shot inside the US Naval Academy basketball tournament. Run-and-gun on three cameras over a four-day window.',
    body: 'Coverage rotated between locker-room observational, courtside, and B-roll campus. The doc team needed flexibility, so the package was light: handheld primaries, a single locked-off long lens for the games. Audio was wrapped on talent and ambient at the rim.',
    credits: [
      { role: 'Director', name: 'C. Halper' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'Camera Op', name: 'T. Reed' },
      { role: 'Sound', name: 'B. Aguilar' },
      { role: 'Editor', name: 'A. Reyes' },
      { role: 'Color', name: 'In-house' },
    ],
  },
  {
    id: 'cookies-and-cocktails',
    title: 'Cookies and Cocktails',
    sub: 'Food Network holiday special.',
    client: 'Food Network',
    cat: 'Reality',
    year: 2017,
    img: 'assets/thumbs/cookies-cocktails.jpeg',
    vimeo: '199180789',
    span: 'std',
    role: 'Director of Photography',
    camera: 'ARRI Alexa Mini',
    lenses: 'Cooke S4 + macro',
    format: '4.5K · 24p · ProRes 4444',
    lede: 'A holiday special for Food Network. Warm, glossy, edible.',
    body: 'Two-camera kitchen package with a dedicated macro slider for the food beauty work. We pre-lit each station the night before so the day cooked clean: A-cam stayed wide, B-cam lived on the talent. Color was warm — slight push to amber on the practicals, contrast in the shadows held flat for the food.',
    credits: [
      { role: 'Director', name: 'L. Bernstein' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'B-Cam', name: 'T. Reed' },
      { role: '1st AC', name: 'D. Velez' },
      { role: 'Color', name: 'In-house' },
    ],
  },
  {
    id: 'daily-show-podium-pandemonium',
    title: 'Daily Show — Podium Pandemonium',
    sub: 'With Trevor Noah.',
    client: 'The Daily Show',
    cat: 'Corporate',
    year: 2017,
    img: 'assets/thumbs/daily-show.jpeg',
    vimeo: '180797522',
    span: 'tall',
    role: 'Director of Photography',
    camera: 'Sony FS7 + Canon C300',
    lenses: 'Canon CN-E',
    format: '4K · 24p · XAVC',
    lede: 'Field segment for The Daily Show — Trevor Noah on the road.',
    body: 'A field package built to move. Two cameras, three lenses, no sticks unless we needed them. We shot through a half-day of pickups and an evening event; lighting was practical-only with one bounce in the bag for emergencies.',
    credits: [
      { role: 'Director', name: 'The Daily Show' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'Sound', name: 'B. Aguilar' },
      { role: 'Producer', name: 'Comedy Central' },
    ],
  },
  {
    id: 'womens-health',
    title: 'Women’s Health',
    sub: 'Kayla Itsines’ workout video.',
    client: 'Women’s Health',
    cat: 'Corporate',
    year: 2017,
    img: 'assets/thumbs/womens-health.jpeg',
    vimeo: '178994345',
    span: 'std',
    role: 'Director of Photography',
    camera: 'ARRI Alexa Mini',
    lenses: 'Cooke S4',
    format: '4.5K · 24p · ProRes 4444',
    lede: 'A workout series for Women’s Health — clean, athletic, kinetic.',
    body: 'Two-camera package on a cyc stage. We used a slider for the wide profile and a handheld B for closer work. Color held a slight push toward green to keep the skin tones true on stage lighting.',
    credits: [
      { role: 'Director', name: 'WH Editorial' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'B-Cam', name: 'T. Reed' },
      { role: 'Producer', name: 'Hearst' },
    ],
  },
  {
    id: 'gayle-king-show',
    title: 'Gayle King Show',
    sub: 'Featuring Matt Nathanson.',
    client: 'OWN',
    cat: 'Music',
    year: 2017,
    img: 'assets/thumbs/gayle-king.jpeg',
    vimeo: '93330772',
    span: 'wide',
    role: 'Director of Photography',
    camera: 'Sony F55',
    lenses: 'Fujinon Cabrio',
    format: '4K · 24p · XAVC',
    lede: 'Acoustic performance segment. One song. One take. One eye on the artist.',
    body: 'A studio session built around a single performance. We pre-lit for two camera positions and used a slider to add motion to the wide. The performance was captured live to camera; audio was post-tracked from the studio mix.',
    credits: [
      { role: 'Director', name: 'OWN' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'Camera Op', name: 'T. Reed' },
      { role: 'Sound', name: 'OWN Audio' },
    ],
  },
  {
    id: 'notes-from-the-road',
    title: 'Notes From The Road',
    sub: 'Featuring Darius Rucker.',
    client: 'Independent',
    cat: 'Music',
    year: 2017,
    img: 'assets/thumbs/notes-from-the-road.png',
    vimeo: '88961316',
    span: 'std',
    role: 'Director of Photography',
    camera: 'Sony FS7',
    lenses: 'Canon CN-E',
    format: '4K · 24p · XAVC',
    lede: 'Tour-doc style coverage with Darius Rucker. Bus to stage and back.',
    body: 'A run-and-gun touring package. We shot what was happening — load-in, sound check, the show, the wind-down. No lighting beyond what was on the venue rig and a battery-powered LED for emergencies.',
    credits: [
      { role: 'Director', name: 'Independent' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'Sound', name: 'B. Aguilar' },
    ],
  },
  {
    id: 'nyc-soundtracks',
    title: 'NYC Soundtracks',
    sub: 'New York City subway performers.',
    client: 'Independent',
    cat: 'Music',
    year: 2017,
    img: 'assets/thumbs/nyc-soundtracks.png',
    vimeo: '88961314',
    span: 'std',
    role: 'Director of Photography',
    camera: 'Sony FS7',
    lenses: '24-105 + 50mm',
    format: '4K · 24p · XAVC',
    lede: 'Portraits of subway performers underground. Real people, real reverb.',
    body: 'A guerrilla doc shot across six subway stations. Two cameras, no permits where the law didn’t require them, full permits where it did. Lighting was the platform fluorescents and a small on-camera LED. Audio was wrapped on the performers.',
    credits: [
      { role: 'Director', name: 'Independent' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'Sound', name: 'B. Aguilar' },
    ],
  },
  {
    id: 'knicks-poetry-slam',
    title: 'Knicks Poetry Slam',
    sub: 'Madison Square Garden, 2012.',
    client: 'NY Knicks',
    cat: 'Sports',
    year: 2012,
    img: 'assets/thumbs/knicks-poetry-slam.png',
    vimeo: '88960483',
    span: 'std',
    role: 'Director of Photography',
    camera: 'Canon C300',
    lenses: 'Canon CN-E',
    format: '1080p · 24p',
    lede: 'A live poetry showcase staged at the Garden. Performers, court, crowd.',
    body: 'A three-camera live capture for the Knicks’ community-event series. We used the venue’s house lighting and added a single hard backlight for the poets. The edit needed long takes — we kept rolling.',
    credits: [
      { role: 'Director', name: 'NYK Productions' },
      { role: 'DP', name: 'Rob Hobson' },
      { role: 'B-Cam', name: 'T. Reed' },
    ],
  },
];

function loadProjects() {
  try {
    // Migrate: clear any old vN storage so the fresh seed loads
    try { localStorage.removeItem('hobsonfilms.portfolio.v1'); } catch (e) {}
    try { localStorage.removeItem('hobsonfilms.portfolio.v2'); } catch (e) {}
    try { localStorage.removeItem('hobsonfilms.portfolio.v3'); } catch (e) {}
    try { localStorage.removeItem('hobsonfilms.portfolio.v4'); } catch (e) {}
    try { localStorage.removeItem('hobsonfilms.portfolio.v5'); } catch (e) {}
    try { localStorage.removeItem('hobsonfilms.portfolio.v6'); } catch (e) {}
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_PROJECTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) {
      // Auto-merge: if a stored project is missing a Vimeo ID but the seed has one
      // (e.g. we added it after the user already had a saved copy), pick it up.
      // Stored values always win when present — user edits are never overwritten.
      const seedById = {};
      for (const s of SEED_PROJECTS) seedById[s.id] = s;
      const merged = parsed.map(p => {
        const s = seedById[p.id];
        if (!s) return p;
        const out = { ...p };
        if (!p.vimeo && s.vimeo) out.vimeo = s.vimeo;
        return out;
      });
      // Also pick up any *new* seed projects that aren't in the stored list yet.
      const storedIds = new Set(parsed.map(p => p.id));
      const additions = SEED_PROJECTS.filter(s => !storedIds.has(s.id));
      // New seed projects are prepended so they appear first.
      return [...additions, ...merged];
    }
  } catch (e) {}
  return SEED_PROJECTS;
}

function saveProjects(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
}

function resetProjects() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

function newProject() {
  const id = 'proj-' + Math.random().toString(36).slice(2, 8);
  return {
    id,
    title: 'New project',
    sub: 'Short subtitle.',
    client: 'Client',
    cat: 'Music',
    year: new Date().getFullYear(),
    img: 'still-09-hero.png',
    span: 'std',
    role: 'Director of Photography',
    camera: 'ARRI Alexa Mini',
    lenses: 'Cooke S4',
    format: '4.5K · 24p · ProRes 4444',
    lede: 'Short lede sentence about the project.',
    vimeo: '',
    body: 'Longer body paragraph describing approach, crew, and result.',
    credits: [
      { role: 'Director', name: 'TBD' },
      { role: 'DP', name: 'Rob Hobson' },
    ],
  };
}

window.SEED_PROJECTS = SEED_PROJECTS;
window.loadProjects = loadProjects;
window.saveProjects = saveProjects;
window.resetProjects = resetProjects;
window.newProject = newProject;
