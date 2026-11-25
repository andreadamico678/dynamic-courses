export const BACHELOR_COURSES = {
  'systems-theory': {
    label: 'Linear Systems Theory',
    prefaceLabel: 'Preface & Exam Scope',
    parts: [
      { label: 'Part I — Dynamic State Models', collapsed: true, dir: '01-state-models' },
      { label: 'Part II — Laplace & State Resolvent', collapsed: true, dir: '02-laplace-resolvent' },
      { label: 'Part III — Matrix Exponential & Response', collapsed: true, dir: '03-time-response' },
      { label: 'Part IV — Stability & Routh-Hurwitz', collapsed: true, dir: '04-stability-routh' },
      { label: 'Part V — Frequency Response & Bode', collapsed: false, dir: '05-frequency-bode' },
      { label: 'Part VI — Kalman Structure', collapsed: true, dir: '06-kalman-structure' },
      { label: 'Part VII — State Feedback Control', collapsed: true, dir: '07-state-feedback' },
      { label: 'Part VIII — Observers & Compensation', collapsed: true, dir: '08-observers-compensation' },
    ],
  },
  elettronica: {
    label: 'Elettronica (Microelettronica)',
    prefaceLabel: 'Prefazione e Programma d’Esame',
    parts: [
      { label: 'Parte I — Fondamenti dei Dispositivi', collapsed: true, dir: '01-fondamenti-dispositivi' },
      { label: 'Parte II — Transistori MOS', collapsed: true, dir: '02-transistori-mos' },
      { label: 'Parte III — Amplificatori Operazionali', collapsed: true, dir: '03-amplificatori-operazionali' },
      { label: 'Parte IV — Amplificatori e Frequenza', collapsed: true, dir: '04-amplificatori-frequenza' },
      { label: 'Parte V — Logica Combinatoria CMOS', collapsed: true, dir: '05-logica-cmos' },
      { label: 'Parte VI — Sequenziali, Memorie e CAD', collapsed: true, dir: '06-sequenziali-memorie' },
    ],
  },
  'computer-architecture': {
    label: 'Computer Architecture',
    prefaceLabel: 'Preface & Exam Scope',
    parts: [
      { label: 'Part I — Synchronous Digital Systems', collapsed: true, dir: '01-synchronous-digital-systems' },
      { label: 'Part II — Computer Performance', collapsed: true, dir: '02-computer-performance' },
      { label: 'Part III — RISC-V Instruction Set', collapsed: true, dir: '03-riscv-instructions' },
      { label: 'Part IV — RISC-V Subroutines & Systems', collapsed: true, dir: '04-riscv-subroutines' },
      { label: 'Part V — Pipelined Processor', collapsed: true, dir: '05-pipelined-processor' },
      { label: 'Part VI — Cache Memory Systems', collapsed: true, dir: '06-cache-memory' },
    ],
  },
};

export const MASTER_PROGRAM_LABEL = 'MSc Robot Systems (SDU)';

export const MASTER_COURSES = [
  { slug: 'introduction-to-drone-technology', label: 'Introduction to Drone Technology', semester: 1, ects: '5 ECTS' },
  { slug: 'control-of-autonomous-systems', label: 'Control of Autonomous Systems', semester: 1, ects: '5 ECTS' },
  { slug: 'embedded-systems', label: 'Embedded Systems', semester: 1, ects: '5 ECTS' },
  { slug: 'introduction-to-embodied-ai', label: 'Introduction to Embodied AI', semester: 1, ects: '5 ECTS' },
  { slug: 'multivariate-statistics', label: 'Multivariate Statistics', semester: 1, ects: '5 ECTS' },
  { slug: 'scientific-method', label: 'Scientific Method', semester: 1, ects: '5 ECTS' },
  { slug: 'guidance-navigation-and-control', label: 'Guidance, Navigation and Control', semester: 2, ects: '5 ECTS' },
  { slug: 'large-scale-drone-perception', label: 'Large-scale Drone Perception', semester: 2, ects: '5 ECTS' },
  { slug: 'mechanical-aerial-systems', label: 'Mechanical Aerial Systems', semester: 2, ects: '5 ECTS' },
  { slug: 'bio-inspired-autonomous-systems', label: 'Bio-Inspired Autonomous Systems', semester: 2, ects: '5 ECTS' },
  { slug: 'tools-of-artificial-intelligence', label: 'Tools of Artificial Intelligence', semester: 2, ects: '5 ECTS' },
  { slug: 'engineering-of-innovative-robotic-technologies', label: 'Engineering of Innovative Robotic Technologies', semester: 3, ects: '15 ECTS' },
  { slug: 'electives-and-in-company-track', label: 'Electives, Study Abroad & In-Company Track', semester: 3, ects: '5–15 ECTS' },
  { slug: 'masters-thesis', label: "Master's Thesis", semester: 4, ects: '30 / 40 ECTS' },
];

const MASTER_BY_SLUG = Object.fromEntries(MASTER_COURSES.map((course) => [course.slug, course]));

export function normalizeRoutePath(pathname = '/') {
  const clean = pathname.split('?')[0].split('#')[0] || '/';
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function getCourseContext(pathname = '/', scope = 'all') {
  const path = normalizeRoutePath(pathname);

  const masterCourseMatch = path.match(/^\/dynamic-courses\/master\/([^/]+)\//);
  if (masterCourseMatch && MASTER_BY_SLUG[masterCourseMatch[1]]) {
    const mc = MASTER_BY_SLUG[masterCourseMatch[1]];
    return {
      layer: 'master-course',
      courseSlug: mc.slug,
      label: mc.label,
      prefix: `/dynamic-courses/master/${mc.slug}/`,
    };
  }

  if (path === '/dynamic-courses/master/') {
    return {
      layer: 'master-hub',
      courseSlug: 'master',
      label: MASTER_PROGRAM_LABEL,
      prefix: '/dynamic-courses/master/',
    };
  }

  const bachelorMatch = path.match(/^\/dynamic-courses\/(systems-theory|elettronica|computer-architecture)(?:\/|$)/);
  if (bachelorMatch) {
    const slug = bachelorMatch[1];
    return {
      layer: 'bachelor',
      courseSlug: slug,
      label: BACHELOR_COURSES[slug].label,
      prefix: `/dynamic-courses/${slug}/`,
    };
  }

  if (scope !== 'all' && scope !== 'hub' && BACHELOR_COURSES[scope]) {
    return {
      layer: 'bachelor',
      courseSlug: scope,
      label: BACHELOR_COURSES[scope].label,
      prefix: `/dynamic-courses/${scope}/`,
    };
  }

  return {
    layer: 'hub',
    courseSlug: '',
    label: '',
    prefix: '/dynamic-courses/',
  };
}
