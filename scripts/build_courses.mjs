import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const emptyPublic = path.join(root, '.astro', 'empty-public');
const distDir = path.join(root, 'dist');

const ALL_SCOPES = ['hub', 'systems-theory', 'elettronica', 'computer-architecture'];

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

  // 2. Sidebar integrity check for course builds (prevents empty-part regressions)
  if (scope !== 'hub') {
    const idxPath = path.join(scopeDir, 'index.html');
    const idxHtml = fs.readFileSync(idxPath, 'utf-8');
    const navMatch = idxHtml.match(/<nav[^>]*aria-label="Main"[\s\S]*?<\/nav>/);
    const links = navMatch ? (navMatch[0].match(/<a[^>]*href="[^"]+"/g) || []).length : 0;
    if (links < 5) {
      console.error(
        `\n[GATE FAILED] Course "${scope}" sidebar only has ${links} link(s) in ${path.relative(root, idxPath)} (expected >= 5).`
      );
      process.exit(1);
    }
    console.log(`    ✓ Verified ${scope}: ${htmlFiles.length} HTML files, 0 katex-error, ${links} sidebar links`);
  } else {
    console.log(`    ✓ Verified hub: ${htmlFiles.length} HTML files, 0 katex-error`);
  }
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
