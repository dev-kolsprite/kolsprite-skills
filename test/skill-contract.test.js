const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const releaseContract = JSON.parse(fs.readFileSync(
  path.join(__dirname, "unified-mcp-tool-contract.json"),
  "utf8",
));
const publicTools = new Set(releaseContract.tools);

function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

function skillDirs() {
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(root, name, "SKILL.md")))
    .sort();
}

function frontmatter(file) {
  const content = fs.readFileSync(file, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `${file} must begin with YAML frontmatter`);
  const values = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([a-z-]+):\s*(.*)$/);
    if (field) values[field[1]] = field[2].trim();
  }
  return values;
}

test("Skill names are unique hyphen-case folder contracts", () => {
  const dirs = skillDirs();
  assert.deepEqual(dirs, [
    "amazon-tiktok-signal",
    "kolsprite-caption",
    "kolsprite-search",
    "tiktok-account-audit",
    "tiktok-growth-plan",
    "tiktok-shop-growth-research",
  ]);

  const names = dirs.map((dir) => {
    const metadata = frontmatter(path.join(root, dir, "SKILL.md"));
    assert.equal(metadata.name, dir, `${dir} frontmatter name must match its folder`);
    assert.match(metadata.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(metadata.description, `${dir} requires a discovery description`);
    assert.ok(metadata.description.length <= 1024);
    return metadata.name;
  });
  assert.equal(new Set(names).size, names.length);
});

test("Every relative Markdown reference resolves", () => {
  for (const file of markdownFiles(root)) {
    const content = fs.readFileSync(file, "utf8");
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split("#")[0];
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
      assert.ok(fs.existsSync(resolved), `${path.relative(root, file)} links to missing ${target}`);
    }
  }
});

test("Skill instructions stay within the public MCP allowlist", () => {
  const skillFiles = skillDirs().flatMap((dir) => markdownFiles(path.join(root, dir)));
  for (const file of skillFiles) {
    const content = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(content, /kol[-_]asin|asin_analysis_video/i);
    assert.doesNotMatch(content, /`(?:creator_profile|creator_videos|caption_extract)`/,
      `${path.relative(root, file)} must not promise unpublished or misnamed account/caption tools`);
    const toolNames = [...content.matchAll(/`([a-z][a-z0-9_]*(?:_search|_extract_url))`/g)]
      .map((match) => match[1]);
    for (const toolName of toolNames) {
      assert.ok(publicTools.has(toolName), `${path.relative(root, file)} uses non-public tool ${toolName}`);
    }
  }
});

test("README documents every installed Skill and the license", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  for (const dir of skillDirs()) {
    assert.match(readme, new RegExp(`\\(${dir.replaceAll("-", "\\-")}\\/SKILL\\.md\\)`));
  }
  assert.match(readme, /\[MIT\]\(LICENSE\)/);
  assert.ok(fs.existsSync(path.join(root, "LICENSE")));
});

test("Every Skill has valid UI metadata and one unified KOLSprite MCP dependency", () => {
  for (const dir of skillDirs()) {
    const file = path.join(root, dir, "agents", "openai.yaml");
    assert.ok(fs.existsSync(file), `${dir} requires agents/openai.yaml`);
    const content = fs.readFileSync(file, "utf8");
    const displayName = content.match(/^\s*display_name:\s*"([^"]+)"\s*$/m)?.[1];
    const shortDescription = content.match(/^\s*short_description:\s*"([^"]+)"\s*$/m)?.[1];
    const defaultPrompt = content.match(/^\s*default_prompt:\s*"([^"]+)"\s*$/m)?.[1];
    assert.ok(displayName, `${dir} requires a quoted display_name`);
    assert.ok(shortDescription, `${dir} requires a quoted short_description`);
    assert.ok(shortDescription.length >= 25 && shortDescription.length <= 64,
      `${dir} short_description must be 25-64 characters`);
    assert.ok(defaultPrompt?.includes(`$${dir}`), `${dir} default_prompt must mention $${dir}`);
    assert.match(content, /^\s*allow_implicit_invocation:\s*true\s*$/m);
    assert.equal(
      [...content.matchAll(/^\s*- type:\s*"mcp"\s*$/gm)].length,
      1,
      `${dir} must declare exactly one unified MCP dependency`,
    );
    assert.match(content, /^\s*value:\s*"kolsprite"\s*$/m);
    assert.deepEqual(
      [...content.matchAll(/^\s*url:\s*"([^"]+)"\s*$/gm)].map((match) => match[1]),
      ["https://mcp.kolsprite.com/mcp"],
      `${dir} must use only the unified KOLSprite MCP URL`,
    );
  }
});

test("Repository contains no legacy split MCP endpoints", () => {
  const files = [
    path.join(root, "README.md"),
    path.join(root, "AGENTS.md"),
    ...skillDirs().flatMap((dir) => [
      ...markdownFiles(path.join(root, dir)),
      path.join(root, dir, "agents", "openai.yaml"),
    ]),
  ];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(
      content,
      /https:\/\/mcp\.kolsprite\.com\/(?:universal|caption)\/mcp/,
      `${path.relative(root, file)} contains a legacy split MCP endpoint`,
    );
  }
});

test("Release tool contract includes every Skill dependency", () => {
  assert.equal(releaseContract.endpoint, "https://mcp.kolsprite.com/mcp");
  assert.equal(releaseContract.status, "release_ready");
  assert.match(releaseContract.preparedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(releaseContract.source, /verify against MCP tools\/list during deployment/);
  assert.deepEqual(releaseContract.tools, [
    "creator_search",
    "product_search",
    "shop_search",
    "video_search",
    "caption_extract_url",
    "asin_video_search",
  ]);
});

test("Point-aware execution is documented without hardcoded prices", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const agents = fs.readFileSync(path.join(root, "AGENTS.md"), "utf8");
  const principles = fs.readFileSync(path.join(
    root,
    "tiktok-shop-growth-research",
    "references",
    "principles.md",
  ), "utf8");
  const evidence = fs.readFileSync(path.join(
    root,
    "tiktok-shop-growth-research",
    "references",
    "evidence-display.md",
  ), "utf8");

  assert.match(readme, /https:\/\/mcp\.kolsprite\.com\/mcp/);
  assert.match(readme, /Different executed tools or operations may deduct different amounts/);
  assert.match(agents, /different executed tools\/operations may consume different amounts/);
  assert.match(principles, /## 11\. Use points deliberately/);
  assert.match(principles, /Do not hardcode, estimate, or infer point prices/);
  assert.match(evidence, /actual point deduction\/balance only when returned/);

  for (const dir of ["kolsprite-search", "kolsprite-caption", "tiktok-account-audit"]) {
    const content = fs.readFileSync(path.join(root, dir, "SKILL.md"), "utf8");
    assert.match(content, /## Point-aware execution/);
  }
});

test("Community attribution preserves source, snapshot, and upstream MIT license", () => {
  const attribution = fs.readFileSync(path.join(root, "ATTRIBUTIONS.md"), "utf8");
  const upstreamLicense = fs.readFileSync(
    path.join(root, "third_party", "aronhy-tiktok-agent-skills-LICENSE"),
    "utf8",
  );
  assert.match(attribution, /aronhy \/ Aron Houyu/);
  assert.match(attribution, /ef939f8fa1204af33a8fba3d8cda759d0596217b/);
  assert.match(attribution, /tiktok-shop-operator/);
  assert.match(attribution, /tiktok-category-strategy/);
  assert.match(attribution, /tiktok-account-audit/);
  assert.match(attribution, /tiktok-growth-plan/);
  assert.match(upstreamLicense, /Copyright \(c\) 2026 kss-tiktok-agent-skills contributors/);
  assert.match(upstreamLicense, /Permission is hereby granted, free of charge/);
});

test("First-batch coverage contract maps every recommendation to maintained files", () => {
  const coverage = JSON.parse(fs.readFileSync(path.join(__dirname, "first-batch-coverage.json"), "utf8"));
  const ids = new Set();
  for (const item of coverage) {
    assert.ok(item.id && Array.isArray(item.owners) && item.owners.length > 0);
    assert.ok(!ids.has(item.id), `duplicate coverage id ${item.id}`);
    ids.add(item.id);
    for (const owner of item.owners) {
      assert.ok(fs.existsSync(path.join(root, owner)), `${item.id} maps to missing ${owner}`);
    }
  }

  const required = [
    "pagination-deduplication",
    "incomplete-quota-error",
    "ambiguous-growth-unit",
    "video-creator-id-crosscheck",
    "caption-batch-progress",
    "common-period-sample-comparability",
    "category-synonym-exclusion-catid-normalization",
    "two-independent-signals",
    "creative-center-optional-source",
    "platform-compliance-checks",
    "canonical-profile-validation",
    "account-types-and-video-roles",
    "source-ledger-confidence",
    "no-unpublished-account-tools",
    "account-category-gap-matrix",
    "retain-pause-add",
    "product-content-creator-paths",
    "thirty-day-phases",
    "six-openai-yaml",
    "three-level-attribution",
  ];
  for (const id of required) assert.ok(ids.has(id), `missing required first-batch coverage ${id}`);
});

test("Routing fixtures define one known primary Skill or an intentional no-trigger case", () => {
  const cases = JSON.parse(fs.readFileSync(path.join(__dirname, "routing-cases.json"), "utf8"));
  const knownSkills = new Set(skillDirs());
  const ids = new Set();
  let noTriggerCases = 0;

  for (const item of cases) {
    assert.ok(item.id && item.request && item.reason);
    assert.ok(!ids.has(item.id), `duplicate routing case ${item.id}`);
    ids.add(item.id);
    if (item.primarySkill === null) {
      noTriggerCases += 1;
    } else {
      assert.ok(knownSkills.has(item.primarySkill), `unknown primary Skill ${item.primarySkill}`);
    }
  }

  assert.ok(noTriggerCases >= 1, "include at least one intentional no-trigger boundary case");

  const partnerCases = cases.filter((item) => item.id.startsWith("workbuddy-"));
  assert.ok(partnerCases.length >= 12, "include the adapted WorkBuddy prompt set and light-lookup boundaries");
  assert.deepEqual(
    new Set(partnerCases.map((item) => item.primarySkill).filter(Boolean)),
    knownSkills,
    "the adapted WorkBuddy prompts should exercise all six official Skill owners",
  );
});

test("Run evidence display separates execution evidence from business outcomes", () => {
  const file = path.join(
    root,
    "tiktok-shop-growth-research",
    "references",
    "evidence-display.md",
  );
  const content = fs.readFileSync(file, "utf8");
  for (const label of [
    "MCP observation",
    "Public-page observation",
    "Client calculation",
    "External fact",
    "Business judgment",
    "Action proposal",
  ]) {
    assert.match(content, new RegExp(`\\*\\*${label}\\*\\*`));
  }
  assert.match(content, /Workflow run versus business outcome/);
  assert.match(content, /workflow run example/);
  assert.match(content, /customer outcome/);
  assert.match(content, /Completeness/);
  assert.match(content, /Stop reason/);
});

test("Known issues are dated, inactive until reproduced, and have safe fallbacks", () => {
  const file = path.join(
    root,
    "tiktok-shop-growth-research",
    "references",
    "known-issues.md",
  );
  const content = fs.readFileSync(file, "utf8");
  const entries = [...content.matchAll(/^### (KSI-\d{3})\b/gm)].map((match) => match[1]);
  assert.equal(entries.length, 4);
  assert.equal(new Set(entries).size, entries.length);
  assert.match(content, /historical observation is inactive until reproduced/i);
  assert.match(content, /live tool schema, current response, and current official documentation take precedence/i);
  for (const field of ["Observed", "Status", "Trigger", "Action", "Do not infer", "Retest"]) {
    const count = [...content.matchAll(new RegExp(`^- \\*\\*${field}:\\*\\*`, "gm"))].length;
    assert.equal(count, entries.length, `every known issue requires ${field}`);
  }
});

test("WorkBuddy enhancement coverage maps each requested addition to maintained files", () => {
  const coverage = JSON.parse(fs.readFileSync(
    path.join(__dirname, "workbuddy-enhancement-coverage.json"),
    "utf8",
  ));
  const expected = new Set([
    "partner-prompt-routing",
    "run-evidence-display",
    "dated-known-issues-ledger",
    "conditional-video-first-creator-fallback",
  ]);
  const actual = new Set();

  for (const item of coverage) {
    assert.ok(item.id && Array.isArray(item.owners) && item.owners.length > 0);
    assert.ok(!actual.has(item.id), `duplicate WorkBuddy enhancement id ${item.id}`);
    actual.add(item.id);
    for (const owner of item.owners) {
      assert.ok(fs.existsSync(path.join(root, owner)), `${item.id} maps to missing ${owner}`);
    }
  }

  assert.deepEqual(actual, expected);
});
