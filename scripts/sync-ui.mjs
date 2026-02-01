import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

if (process.env.PTLIVE_SKIP_SYNC === "1") {
  console.log("[sync-ui] PTLIVE_SKIP_SYNC=1 detected. Skipping UI sync.");
  process.exit(0);
}

const repo = process.env.PTLIVE_UI_REPO ?? "https://github.com/murdadrum/Ptlive";
const ref = process.env.PTLIVE_UI_REF ?? "main";
const cacheDir = path.join(os.tmpdir(), "ptlive-ui-sync");
const cwd = process.cwd();

const pathsToSync = [
  "index.html",
  "src/app",
  "src/assets",
  "src/imports",
  "src/styles",
  "src/main.tsx",
];

const run = (command) => {
  execSync(command, { stdio: "inherit" });
};

const ensureRepo = () => {
  if (fs.existsSync(path.join(cacheDir, ".git"))) {
    run(`git -C "${cacheDir}" fetch --depth 1 origin "${ref}"`);
    run(`git -C "${cacheDir}" checkout -f FETCH_HEAD`);
    return;
  }

  fs.rmSync(cacheDir, { recursive: true, force: true });
  run(`git clone --depth 1 --branch "${ref}" "${repo}" "${cacheDir}"`);
};

const removeIfExists = (targetPath) => {
  fs.rmSync(targetPath, { recursive: true, force: true });
};

const copyPath = (source, target) => {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    fs.cpSync(source, target, { recursive: true });
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
};

const syncPaths = () => {
  pathsToSync.forEach((relativePath) => {
    const sourcePath = path.join(cacheDir, relativePath);
    const targetPath = path.join(cwd, relativePath);

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing ${relativePath} in ${repo}`);
    }

    removeIfExists(targetPath);
    copyPath(sourcePath, targetPath);
  });
};

const replaceTileHoverImages = () => {
  const tilePath = path.join(cwd, "src/app/components/Tile.tsx");
  if (!fs.existsSync(tilePath)) {
    return;
  }

  const replacements = [
    {
      match: /import\s+tile1Image\s+from\s+['"]figma:asset\/[^'"]+['"];/,
      replaceWith: "import tile1Image from '../../../images/Tile1.png';",
    },
    {
      match: /import\s+tile5Image\s+from\s+['"]figma:asset\/[^'"]+['"];/,
      replaceWith: "import tile5Image from '../../../images/Tile5.png';",
    },
    {
      match: /import\s+tile16Image\s+from\s+['"]figma:asset\/[^'"]+['"];/,
      replaceWith: "import tile16Image from '../../../images/Tile16.png';",
    },
  ];

  let contents = fs.readFileSync(tilePath, "utf8");
  let updated = contents;
  replacements.forEach(({ match, replaceWith }) => {
    updated = updated.replace(match, replaceWith);
  });

  if (updated !== contents) {
    fs.writeFileSync(tilePath, updated);
  }
};

console.log(`[sync-ui] Syncing UI from ${repo} (${ref})`);
ensureRepo();
syncPaths();
replaceTileHoverImages();
console.log("[sync-ui] UI sync complete.");
