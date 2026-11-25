import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const scope = process.env.COURSE_SCOPE || 'all';
const isSubCourse = scope !== 'all' && scope !== 'hub';

const COURSES = {
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

function buildSidebar() {
  if (scope === 'hub') {
    return [
      { label: 'Platform Home', link: '/' },
      { label: 'Linear Systems Theory', link: '/systems-theory/' },
      { label: 'Elettronica (Microelettronica)', link: '/elettronica/' },
      { label: 'Computer Architecture', link: '/computer-architecture/' },
    ];
  }

  if (isSubCourse && COURSES[scope]) {
    const course = COURSES[scope];
    return [
      { label: course.prefaceLabel, link: '/' },
      ...course.parts.map((part) => ({
        label: part.label,
        collapsed: part.collapsed,
        autogenerate: { directory: part.dir },
      })),
    ];
  }

  return [
    { label: 'Platform Home', link: '/' },
    ...Object.entries(COURSES).map(([slug, course]) => ({
      label: course.label,
      items: [
        { label: course.prefaceLabel, link: `/${slug}/` },
        ...course.parts.map((part) => ({
          label: part.label,
          collapsed: part.collapsed,
          autogenerate: { directory: `${slug}/${part.dir}` },
        })),
      ],
    })),
  ];
}

const courseThemeScript = `
(function () {
  var fixed = ${JSON.stringify(isSubCourse ? scope : '')};
  var m = window.location.pathname.match(/\\/dynamic-courses\\/(systems-theory|elettronica|computer-architecture)(?:\\/|$)/);
  var course = fixed || (m ? m[1] : '');
  if (course) document.documentElement.dataset.dcCourse = course;
  else delete document.documentElement.dataset.dcCourse;
})();
`;

export default defineConfig({
  site: 'https://andreadamico678.github.io',
  base: isSubCourse ? `/dynamic-courses/${scope}` : '/dynamic-courses',
  outDir: isSubCourse ? `./dist/${scope}` : './dist',
  publicDir: isSubCourse ? './.astro/empty-public' : './public',
  cacheDir: `./.astro/cache-${scope}`,
  integrations: [
    starlight({
      title: isSubCourse && COURSES[scope] ? COURSES[scope].label : 'Dynamic Courses',
      description: 'Interactive, pageless engineering textbooks with Matryoshka mind maps and live math simulators.',
      head: [
        {
          tag: 'script',
          content: courseThemeScript,
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
          },
        },
      ],
      customCss: [
        'katex/dist/katex.min.css',
        './src/styles/custom.css',
      ],
      components: {
        Footer: './src/components/CustomFooter.astro',
        SiteTitle: './src/components/SiteTitle.astro',
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      sidebar: buildSidebar(),
    }),
    react(),
    mdx({ optimize: true }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
