#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT, buildPrototypeData } = require('./update-data');

const INDEX_PATH = path.join(ROOT, 'index.html');
const BUILD_DIR = path.join(ROOT, 'build');
const BUILD_INDEX_PATH = path.join(BUILD_DIR, 'index.html');
const IMAGE_DIR = path.join(ROOT, 'vector_crop');
const SETUP_IMAGE_DIR = path.join(ROOT, 'images');
const VIDEO_DIR = path.join(ROOT, 'videos');
const DIAGRAM_DIR = path.join(ROOT, 'diagrams');
const LOGO_DIR = path.join(ROOT, 'logos');
const SHARED_DIR = path.join(ROOT, 'shared');

function validateAssets(tests) {
  const missing = [];

  for (const test of tests) {
    if (!fs.existsSync(path.join(IMAGE_DIR, test.image))) {
      missing.push(`Missing image for "${test.title}": vector_crop/${test.image}`);
    }

    for (const video of test.videos || []) {
      if (!fs.existsSync(path.join(VIDEO_DIR, video.src))) {
        missing.push(`Missing video for "${test.title}": videos/${video.src}`);
      }
    }

    if (test.setupDiagram && !fs.existsSync(path.join(DIAGRAM_DIR, test.setupDiagram.src))) {
      missing.push(`Missing diagram for "${test.title}": diagrams/${test.setupDiagram.src}`);
    }

    if (test.setupImage && !fs.existsSync(path.join(SETUP_IMAGE_DIR, test.setupImage.src))) {
      missing.push(`Missing setup image for "${test.title}": images/${test.setupImage.src}`);
    }
  }

  if (missing.length) {
    throw new Error(missing.join('\n'));
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function resetDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  ensureDir(dirPath);
}

function copyDirectory(sourceDir, targetDir) {
  ensureDir(targetDir);
  fs.cpSync(sourceDir, targetDir, { recursive: true });
}

function copySetupImages(tests) {
  const targetDir = path.join(BUILD_DIR, 'images');
  resetDir(targetDir);

  const imageNames = new Set(tests.map((test) => test.setupImage?.src).filter(Boolean));

  for (const imageName of imageNames) {
    fs.copyFileSync(path.join(SETUP_IMAGE_DIR, imageName), path.join(targetDir, imageName));
  }
}

function writeBuildIndex() {
  if (!fs.existsSync(INDEX_PATH)) {
    throw new Error(`Missing site template: ${path.relative(ROOT, INDEX_PATH)}`);
  }

  ensureDir(BUILD_DIR);
  fs.copyFileSync(INDEX_PATH, BUILD_INDEX_PATH);
  console.log(`Wrote ${path.relative(ROOT, BUILD_INDEX_PATH)} from ${path.basename(INDEX_PATH)}.`);
}

function copyBuildAssets(tests) {
  copyDirectory(IMAGE_DIR, path.join(BUILD_DIR, 'vector_crop'));
  copySetupImages(tests);
  copyDirectory(VIDEO_DIR, path.join(BUILD_DIR, 'videos'));
  copyDirectory(DIAGRAM_DIR, path.join(BUILD_DIR, 'diagrams'));
  copyDirectory(LOGO_DIR, path.join(BUILD_DIR, 'logos'));
  copyDirectory(SHARED_DIR, path.join(BUILD_DIR, 'shared'));
  console.log(`Copied assets into ${path.relative(ROOT, BUILD_DIR)}.`);
}

function main() {
  console.log('Building site assets...');
  const { tests } = buildPrototypeData();
  validateAssets(tests);
  writeBuildIndex();
  copyBuildAssets(tests);
  console.log('Build complete.');
}

if (require.main === module) {
  main();
}
