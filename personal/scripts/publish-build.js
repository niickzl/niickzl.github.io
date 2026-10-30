import { cpSync, copyFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const buildDirectory = resolve(projectRoot, 'build');
rmSync(resolve(projectRoot, 'assets'), { recursive: true, force: true });
copyFileSync(resolve(buildDirectory, 'src/index.html'), resolve(projectRoot, 'index.html'));
cpSync(resolve(buildDirectory, 'assets'), resolve(projectRoot, 'assets'), {
  recursive: true,
});
