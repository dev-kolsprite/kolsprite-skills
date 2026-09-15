import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const outputsRoot = path.join(root, "outputs");
const locale = process.argv[2] ?? "zh-CN";
const supportedLocales = new Set(["en-US", "zh-CN"]);
const skills = [
  "amazon-tiktok-signal",
  "amazon-to-tiktok-validator",
  "kolsprite-caption",
  "kolsprite-search",
  "tiktok-account-audit",
  "tiktok-growth-plan",
  "tiktok-shop-growth-research",
];

if (!supportedLocales.has(locale)) {
  throw new Error(`Unsupported locale: ${locale}. Use en-US or zh-CN.`);
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const bundleName = `kolsprite-skills-${manifest.version}-${locale}`;
const bundleRoot = path.join(outputsRoot, bundleName);
const archivePath = path.join(outputsRoot, `${bundleName}.zip`);
const copyFilter = (source) => ![".DS_Store", "Thumbs.db"].includes(path.basename(source));

fs.mkdirSync(outputsRoot, { recursive: true });
for (const target of [bundleRoot, archivePath]) {
  const resolved = path.resolve(target);
  if (!resolved.startsWith(`${path.resolve(outputsRoot)}${path.sep}`)) {
    throw new Error(`Refusing to replace a path outside outputs: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}
fs.mkdirSync(bundleRoot, { recursive: true });

for (const file of ["LICENSE", "ATTRIBUTIONS.md", "CHANGELOG.md", "package.json"]) {
  fs.copyFileSync(path.join(root, file), path.join(bundleRoot, file));
}
fs.cpSync(path.join(root, "third_party"), path.join(bundleRoot, "third_party"), {
  recursive: true,
  filter: copyFilter,
});

if (locale === "zh-CN") {
  const chineseReadme = fs.readFileSync(path.join(root, "README.zh-CN.md"), "utf8")
    .replace("[English](README.md)", "[English](README.en-US.md)");
  fs.writeFileSync(path.join(bundleRoot, "README.md"), chineseReadme);
  fs.copyFileSync(path.join(root, "README.md"), path.join(bundleRoot, "README.en-US.md"));
  fs.copyFileSync(path.join(root, "README.zh-CN.md"), path.join(bundleRoot, "README.zh-CN.md"));
} else {
  fs.copyFileSync(path.join(root, "README.md"), path.join(bundleRoot, "README.md"));
  fs.copyFileSync(path.join(root, "README.zh-CN.md"), path.join(bundleRoot, "README.zh-CN.md"));
}
fs.cpSync(path.join(root, "locales"), path.join(bundleRoot, "locales"), {
  recursive: true,
  filter: copyFilter,
});

for (const skill of skills) {
  const source = path.join(root, skill);
  const destination = path.join(bundleRoot, skill);
  fs.cpSync(source, destination, { recursive: true, filter: copyFilter });
  if (locale === "zh-CN") {
    fs.copyFileSync(
      path.join(root, "locales", "zh-CN", `${skill}.md`),
      path.join(destination, "SKILL.md"),
    );
  }
}

const zip = spawnSync("zip", ["-qr", `${bundleName}.zip`, bundleName], {
  cwd: outputsRoot,
  encoding: "utf8",
});
if (zip.error) throw zip.error;
if (zip.status !== 0) {
  throw new Error(`zip failed: ${zip.stderr || zip.stdout}`);
}

console.log(`Built ${path.relative(root, bundleRoot)}`);
console.log(`Built ${path.relative(root, archivePath)}`);
