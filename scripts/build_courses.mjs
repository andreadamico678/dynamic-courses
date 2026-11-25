import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { MASTER_COURSES } from '../src/lib/courseRegistry.mjs';

const root = path.resolve(import.meta.dirname, '..');
const emptyPublic = path.join(root, '.astro', 'empty-public');
const distDir = path.join(root, 'dist');

const ALL_SCOPES = ['hub', 'systems-theory', 'elettronica', 'computer-architecture', 'master'];

const argCourse = process.argv.find((a) => a.startsWith('--course='));
const targetScopes = argCourse ? [argCourse.split('=')[1]] : ALL_SCOPES;

for (const s of targetScopes) {
  if (!ALL_SCOPES.includes(s)) {
    console.error(`Unknown build scope "${s}". Valid scopes: ${ALL_SCOPES.join(', ')}`);
    process.exit(1);
  }
}

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Avoid recursing into sub-courses when validating hub root
      if (dir === distDir && ALL_SCOPES.includes(entry.name)) continue;
      walkHtml(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function getSidebarLinks(html) {
  const navMatch = html.match(/<nav[^>]*aria-label="Main"[\s\S]*?<\/nav>/);
  if (!navMatch) return [];
  return [...navMatch[0].matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => m[1]);
}

function verifyScopeOutput(scope) {
  const scopeDir = scope === 'hub' ? distDir : path.join(distDir, scope);
  const htmlFiles = walkHtml(scopeDir);

  // 1. Zero red KaTeX parse errors
  const katexBad = [];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf-8');
    if (html.includes('katex-error')) {
      const count = (html.match(/katex-error/g) || []).length;
      katexBad.push(`${path.relative(root, file)} (${count})`);
    }
  }
  if (katexBad.length > 0) {
    console.error(`\n[GATE FAILED] Red KaTeX parse errors detected in ${scope}:`);
    for (const item of katexBad) console.error(`  - ${item}`);
    process.exit(1);
  }

  // 2. Sidebar integrity & isolation check
  if (scope === 'hub') {
    const idxHtml = fs.readFileSync(path.join(scopeDir, 'index.html'), 'utf-8');
    if (getSidebarLinks(idxHtml).length > 0) {
      console.error('\n[GATE FAILED] Platform hub index.html should use splash layout without a main sidebar.');
      process.exit(1);
    }
    console.log(`    ✓ Verified hub: ${htmlFiles.length} HTML files, 0 katex-error, splash hub active`);
    return;
  }

  if (scope === 'master') {
    const hubHtml = fs.readFileSync(path.join(scopeDir, 'index.html'), 'utf-8');
    if (getSidebarLinks(hubHtml).length > 0) {
      console.error('\n[GATE FAILED] Master hub /master/index.html should use splash layout without a main sidebar.');
      process.exit(1);
    }
    for (const mc of MASTER_COURSES) {
      const shellPath = path.join(scopeDir, mc.slug, 'index.html');
      if (!fs.existsSync(shellPath)) {
        console.error(`\n[GATE FAILED] Missing Master course shell build output: ${path.relative(root, shellPath)}`);
        process.exit(1);
      }
      const shellHtml = fs.readFileSync(shellPath, 'utf-8');
      const links = getSidebarLinks(shellHtml);
      const expectedPrefix = `/dynamic-courses/master/${mc.slug}/`;
      const badLinks = links.filter((href) => !href.startsWith(expectedPrefix));
      if (links.length === 0 || badLinks.length > 0) {
        console.error(
          `\n[GATE FAILED] Master course "${mc.slug}" sidebar leakage/empty (${links.length} link(s), bad=${JSON.stringify(badLinks)})`
        );
        process.exit(1);
      }
    }
    console.log(`    ✓ Verified master: ${htmlFiles.length} HTML files, 0 katex-error, ${MASTER_COURSES.length} isolated shells`);
    return;
  }

  const idxPath = path.join(scopeDir, 'index.html');
  const idxHtml = fs.readFileSync(idxPath, 'utf-8');
  const links = getSidebarLinks(idxHtml);
  if (links.length < 5) {
    console.error(
      `\n[GATE FAILED] Course "${scope}" sidebar only has ${links.length} link(s) in ${path.relative(root, idxPath)} (expected >= 5).`
    );
    process.exit(1);
  }
  console.log(`    ✓ Verified ${scope}: ${htmlFiles.length} HTML files, 0 katex-error, ${links.length} sidebar links`);
}

fs.mkdirSync(emptyPublic, { recursive: true });

if (!argCourse) {
  fs.rmSync(distDir, { recursive: true, force: true });
} else if (!argCourse.endsWith('=hub')) {
  fs.rmSync(path.join(distDir, targetScopes[0]), { recursive: true, force: true });
}

for (const scope of targetScopes) {
  const start = Date.now();
  console.log(`\n==> Building scope: ${scope}`);
  execSync('pnpm exec astro build', {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      COURSE_SCOPE: scope,
    },
  });
  verifyScopeOutput(scope);
  const secs = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`<== Finished ${scope} in ${secs}s`);
}

if (!process.env.CI) {
  console.log('\n==> Restoring full content store for pnpm dev (astro sync)...');
  execSync('pnpm exec astro sync', {
    cwd: root,
    stdio: 'inherit',
  });
}
