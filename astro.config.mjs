import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://andreadamico678.github.io',
  base: '/dynamic-courses',
  integrations: [
    starlight({
      title: 'Dynamic Courses',
      description: 'Interactive, pageless engineering textbooks with Matryoshka mind maps and live math simulators.',
      head: [
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
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      sidebar: [
        {
          label: 'Platform Home',
          link: '/',
        },
        {
          label: 'Linear Systems Theory',
          items: [
            { label: 'Preface & Exam Scope', link: '/systems-theory/' },
            {
              label: 'Part I — Dynamic State Models',
              collapsed: true,
              autogenerate: { directory: 'systems-theory/01-state-models' },
            },
            {
              label: 'Part II — Laplace & State Resolvent',
              collapsed: true,
              autogenerate: { directory: 'systems-theory/02-laplace-resolvent' },
            },
            {
              label: 'Part III — Matrix Exponential & Response',
              collapsed: true,
              autogenerate: { directory: 'systems-theory/03-time-response' },
            },
            {
              label: 'Part IV — Stability & Routh-Hurwitz',
              collapsed: true,
              autogenerate: { directory: 'systems-theory/04-stability-routh' },
            },
            {
              label: 'Part V — Frequency Response & Bode',
              collapsed: false,
              autogenerate: { directory: 'systems-theory/05-frequency-bode' },
            },
            {
              label: 'Part VI — Kalman Structure',
              collapsed: true,
              autogenerate: { directory: 'systems-theory/06-kalman-structure' },
            },
            {
              label: 'Part VII — State Feedback Control',
              collapsed: true,
              autogenerate: { directory: 'systems-theory/07-state-feedback' },
            },
            {
              label: 'Part VIII — Observers & Compensation',
              collapsed: true,
              autogenerate: { directory: 'systems-theory/08-observers-compensation' },
            },
          ],
        },
        {
          label: 'Elettronica (Microelettronica)',
          items: [
            { label: 'Prefazione e Programma d’Esame', link: '/elettronica/' },
            {
              label: 'Parte I — Fondamenti dei Dispositivi',
              collapsed: true,
              autogenerate: { directory: 'elettronica/01-fondamenti-dispositivi' },
            },
            {
              label: 'Parte II — Transistori MOS',
              collapsed: true,
              autogenerate: { directory: 'elettronica/02-transistori-mos' },
            },
            {
              label: 'Parte III — Amplificatori Operazionali',
              collapsed: true,
              autogenerate: { directory: 'elettronica/03-amplificatori-operazionali' },
            },
            {
              label: 'Parte IV — Amplificatori e Frequenza',
              collapsed: true,
              autogenerate: { directory: 'elettronica/04-amplificatori-frequenza' },
            },
            {
              label: 'Parte V — Logica Combinatoria CMOS',
              collapsed: true,
              autogenerate: { directory: 'elettronica/05-logica-cmos' },
            },
            {
              label: 'Parte VI — Sequenziali, Memorie e CAD',
              collapsed: true,
              autogenerate: { directory: 'elettronica/06-sequenziali-memorie' },
            },
          ],
        },
        {
          label: 'Computer Architecture',
          items: [
            { label: 'Preface & Exam Scope', link: '/computer-architecture/' },
            {
              label: 'Part I — Synchronous Digital Systems',
              collapsed: true,
              autogenerate: { directory: 'computer-architecture/01-synchronous-digital-systems' },
            },
            {
              label: 'Part II — Computer Performance',
              collapsed: true,
              autogenerate: { directory: 'computer-architecture/02-computer-performance' },
            },
            {
              label: 'Part III — RISC-V Instruction Set',
              collapsed: true,
              autogenerate: { directory: 'computer-architecture/03-riscv-instructions' },
            },
            {
              label: 'Part IV — RISC-V Subroutines & Systems',
              collapsed: true,
              autogenerate: { directory: 'computer-architecture/04-riscv-subroutines' },
            },
            {
              label: 'Part V — Pipelined Processor',
              collapsed: true,
              autogenerate: { directory: 'computer-architecture/05-pipelined-processor' },
            },
            {
              label: 'Part VI — Cache Memory Systems',
              collapsed: true,
              autogenerate: { directory: 'computer-architecture/06-cache-memory' },
            },
          ],
        },
      ],
    }),
    react(),
    mdx({ optimize: true }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
