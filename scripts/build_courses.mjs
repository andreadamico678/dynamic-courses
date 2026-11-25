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

fs.mkdirSync(emptyPublic, { recursive: true });

if (!argCourse) {
  fs.rmSync(distDir, { recursive: true, force: true });
} else {
  const subDist = argCourse.endsWith('=hub') ? null : path.join(distDir, targetScopes[0]);
  if (subDist) fs.rmSync(subDist, { recursive: true, force: true });
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
  const secs = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`<== Finished ${scope} in ${secs}s`);
}
