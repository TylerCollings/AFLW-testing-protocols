#!/usr/bin/env node
/**
 * Reads test_information.md and syncs shared/prototype-data.js.
 *
 * Preserved fields : id, abbrev, image, videos, setupDiagram, setupImage
 * Updated fields   : title, equipment, purpose, why, sections (Setup / Protocol / Key Variables / Cues)
 *
 * Usage: node update-data.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const MD_PATH = path.join(ROOT, 'test_information.md');
const DATA_PATH = path.join(ROOT, 'shared', 'prototype-data.js');

function stripMd(text) {
  return text
    .replace(/\(\*\*Â°\*\*\)/g, '(Â°)')
    .replace(/\(\*Â°\*\)/g, '(Â°)')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .trim();
}

function extractBullets(block) {
  return block
    .split('\n')
    .filter((line) => /^\s*- /.test(line))
    .map((line) => stripMd(line.replace(/^\s*- /, '')))
    .filter(Boolean);
}

function getNamedSection(block, name) {
  const re = new RegExp(`### ${name}\\s*\\n([\\s\\S]+?)(?=\\n### |\\n---|$)`);
  const match = block.match(re);
  return match ? extractBullets(match[1]) : [];
}

function parseMd(content) {
  const blocks = content.split(/^(?=## )/m).filter((block) => block.startsWith('## '));

  return blocks.map((block) => {
    const title = block.split('\n')[0].replace(/^## /, '').trim();

    const equipMatch = block.match(/\*\*Equipment:\*\*\s*(.+)/);
    const equipment = equipMatch ? equipMatch[1].trim() : '';

    const purposeMatch = block.match(/### Purpose\s*\n+([\s\S]+?)(?=\n\s*\n\*\*Why\?\*\*|\n\*\*Why\?\*\*)/);
    const purpose = purposeMatch ? purposeMatch[1].trim() : '';

    const whyMatch = block.match(/\*\*Why\?\*\*\s+([\s\S]+?)(?=\n\n|\n###|$)/);
    const why = whyMatch ? whyMatch[1].replace(/\n/g, ' ').trim() : '';

    const setup = getNamedSection(block, 'Setup');
    const protocol = getNamedSection(block, 'Protocol');
    const keyVariables = getNamedSection(block, 'Key Variables');
    const cues = getNamedSection(block, 'Cues')
      .map((cue) => cue.replace(/^["\u201C\u201D]|["\u201C\u201D]$/g, '').trim());

    return { title, equipment, purpose, why, setup, protocol, keyVariables, cues };
  });
}

function loadExisting(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx.window.AFLW_TESTS;
}

const STOP = new Set([
  'isometric', 'weight', 'bearing', 'range', 'of', 'and', 'the',
  'a', 'an', 'in', 'for', 'to', 'at', 'on', '3d',
]);

const TITLE_ALIASES = new Map([
  ['unanticipated sidestep', ['reactive change of direction']],
]);

function keywords(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP.has(word));
}

function similarity(a, b) {
  const aWords = new Set(keywords(a));
  const bWords = new Set(keywords(b));
  let overlap = 0;
  for (const word of aWords) {
    if (bWords.has(word)) {
      overlap += 1;
    }
  }
  return overlap / Math.max(aWords.size, bWords.size, 1);
}

function findMatch(parsed, existingTitle) {
  const aliases = TITLE_ALIASES.get(existingTitle.toLowerCase()) || [];
  for (const alias of aliases) {
    const aliasMatch = parsed.find((item) => item.title.toLowerCase() === alias);
    if (aliasMatch) {
      return aliasMatch;
    }
  }

  const exact = parsed.find((item) => item.title.toLowerCase() === existingTitle.toLowerCase());
  if (exact) {
    return exact;
  }

  let best = null;
  let bestScore = 0;
  for (const item of parsed) {
    const score = similarity(item.title, existingTitle);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }

  return bestScore >= 0.5 ? best : null;
}

function autoDetectVideos(existingTests) {
  const videosDir = path.join(ROOT, 'videos');
  let files = [];

  try {
    files = fs.readdirSync(videosDir).filter((file) => /\.mp4$/i.test(file));
  } catch (_) {
    return existingTests;
  }

  return existingTests.map((test) => {
    const match = files.find(
      (file) => file.replace(/\.mp4$/i, '').toLowerCase() === test.title.toLowerCase()
    );

    if (!match) {
      return test;
    }

    const hasEntry = test.videos.some((video) => video.src === match);
    if (hasEntry) {
      return test;
    }

    console.log(`  [VIDEO] Adding "${match}" to "${test.title}"`);
    return {
      ...test,
      videos: [{ title: test.title, description: '', src: match }],
    };
  });
}

function merge(existing, parsed) {
  return existing.map((test) => {
    const match = findMatch(parsed, test.title);
    if (!match) {
      console.warn(`  [WARN] No markdown match for: "${test.title}" - left unchanged.`);
      return test;
    }

    if (match.title !== test.title) {
      console.log(`  [MATCH] "${test.title}" -> "${match.title}"`);
    }

    return {
      id: test.id,
      abbrev: test.abbrev,
      title: match.title,
      equipment: match.equipment || test.equipment,
      image: test.image,
      purpose: match.purpose || test.purpose,
      why: match.why,
      ...(test.setupDiagram ? { setupDiagram: test.setupDiagram } : {}),
      ...(test.setupImage ? { setupImage: test.setupImage } : {}),
      sections: {
        Setup: match.setup.length ? match.setup : test.sections.Setup,
        Protocol: match.protocol.length ? match.protocol : test.sections.Protocol,
        'Key Variables': match.keyVariables.length ? match.keyVariables : test.sections['Key Variables'],
        Cues: match.cues.length ? match.cues : test.sections.Cues,
      },
      videos: test.videos,
    };
  });
}

function strArr(items, depth) {
  const pad = ' '.repeat(depth);
  if (!items.length) {
    return '[]';
  }
  return `[\n${items.map((item) => `${pad}  ${JSON.stringify(item)}`).join(',\n')}\n${pad}]`;
}

function serialise(tests) {
  const entries = tests.map((test) => {
    const sectionLines = ['Setup', 'Protocol', 'Key Variables', 'Cues']
      .map((name) => `      ${JSON.stringify(name)}: ${strArr((test.sections || {})[name] || [], 6)}`)
      .join(',\n');

    const videoItems = (test.videos || []).map((video) =>
      `      {\n        title: ${JSON.stringify(video.title)},\n` +
      `        description: ${JSON.stringify(video.description)},\n` +
      `        src: ${JSON.stringify(video.src)}\n      }`
    );

    const videosStr = videoItems.length ? `[\n${videoItems.join(',\n')}\n    ]` : '[]';

    const lines = [
      '  {',
      `    id: ${JSON.stringify(test.id)},`,
      `    abbrev: ${JSON.stringify(test.abbrev)},`,
      `    title: ${JSON.stringify(test.title)},`,
      `    equipment: ${JSON.stringify(test.equipment)},`,
      `    image: ${JSON.stringify(test.image)},`,
      `    purpose: ${JSON.stringify(test.purpose)},`,
      `    why: ${JSON.stringify(test.why)},`,
    ];

    if (test.setupDiagram) {
      lines.push('    setupDiagram: {');
      lines.push(`      src: ${JSON.stringify(test.setupDiagram.src)},`);
      lines.push(`      alt: ${JSON.stringify(test.setupDiagram.alt)}`);
      lines.push('    },');
    }

    if (test.setupImage) {
      lines.push('    setupImage: {');
      lines.push(`      src: ${JSON.stringify(test.setupImage.src)},`);
      lines.push(`      alt: ${JSON.stringify(test.setupImage.alt)}`);
      lines.push('    },');
    }

    lines.push('    sections: {');
    lines.push(sectionLines);
    lines.push('    },');
    lines.push(`    videos: ${videosStr}`);
    lines.push('  }');

    return lines.join('\n');
  });

  return `window.AFLW_TESTS = [\n${entries.join(',\n')}\n];\n`;
}

function buildPrototypeData() {
  const mdContent = fs.readFileSync(MD_PATH, 'utf8');
  const parsed = parseMd(mdContent);
  console.log(`Parsed ${parsed.length} tests from ${path.basename(MD_PATH)}.`);

  const existing = loadExisting(DATA_PATH);
  console.log(`Loaded ${existing.length} tests from ${path.basename(DATA_PATH)}.`);

  const merged = autoDetectVideos(merge(existing, parsed));
  const output = serialise(merged);

  fs.writeFileSync(DATA_PATH, output, 'utf8');
  console.log(`\nUpdated ${DATA_PATH}`);

  return {
    tests: merged,
    dataPath: DATA_PATH,
    markdownPath: MD_PATH,
  };
}

module.exports = {
  ROOT,
  MD_PATH,
  DATA_PATH,
  buildPrototypeData,
  loadExisting,
};

if (require.main === module) {
  buildPrototypeData();
}
