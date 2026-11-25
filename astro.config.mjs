import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {
  BACHELOR_COURSES,
  MASTER_COURSES,
  MASTER_PROGRAM_LABEL,
} from './src/lib/courseRegistry.mjs';

const scope = process.env.COURSE_SCOPE || 'all';
const isSubCourse = scope !== 'all' && scope !== 'hub';

function bachelorSidebarItems(slug, course) {
  return [
    { label: course.prefaceLabel, link: scope === 'all' ? `/${slug}/` : '/' },
    ...course.parts.map((part) => ({
      label: part.label,
      collapsed: part.collapsed,
      autogenerate: { directory: `${slug}/${part.dir}` },
    })),
  ];
}

function masterSidebarGroups() {
  return MASTER_COURSES.map((course) => ({
    label: course.label,
    collapsed: false,
    autogenerate: { directory: `master/${course.slug}` },
  }));
}

function buildSidebar() {
  if (scope === 'hub') {
    return [{ label: 'Platform Home', link: '/' }];
  }

  if (BACHELOR_COURSES[scope]) {
    return bachelorSidebarItems(scope, BACHELOR_COURSES[scope]);
  }

  if (scope === 'master') {
    return masterSidebarGroups();
  }

  return [
    ...Object.entries(BACHELOR_COURSES).map(([slug, course]) => ({
      label: course.label,
      items: bachelorSidebarItems(slug, course),
    })),
    ...masterSidebarGroups(),
  ];
}

const courseThemeScript = `
(function () {
  var fixed = ${JSON.stringify(isSubCourse ? scope : '')};
  var m = window.location.pathname.match(/\\/dynamic-courses\\/(systems-theory|elettronica|computer-architecture|master)(?:\\/|$)/);
  var course = fixed || (m ? m[1] : '');
  if (course) document.documentElement.dataset.dcCourse = course;
  else delete document.documentElement.dataset.dcCourse;
})();
`;

const resolvedTitle =
  BACHELOR_COURSES[scope]?.label ||
  (scope === 'master' ? MASTER_PROGRAM_LABEL : 'Dynamic Courses');

export default defineConfig({
  site: 'https://andreadamico678.github.io',
  base: isSubCourse ? `/dynamic-courses/${scope}` : '/dynamic-courses',
  outDir: isSubCourse ? `./dist/${scope}` : './dist',
  publicDir: isSubCourse ? './.astro/empty-public' : './public',
  cacheDir: `./.astro/cache-${scope}`,
  integrations: [
    starlight({
      title: resolvedTitle,
      description: 'Interactive, pageless engineering textbooks and MSc course shells with live math simulators.',
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
        Pagination: './src/components/Pagination.astro',
        Sidebar: './src/components/Sidebar.astro',
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
