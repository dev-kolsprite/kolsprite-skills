const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const zhLocaleRoot = path.join(root, "locales", "zh-CN");
const releaseContract = JSON.parse(fs.readFileSync(
  path.join(__dirname, "unified-mcp-tool-contract.json"),
  "utf8",
));
const publicTools = new Set(releaseContract.tools);

function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules", "outputs"].includes(entry.name)) return [];
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

function relativeMarkdownTargets(content) {
  return [...content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
    .map((match) => match[1].split("#")[0])
    .filter((target) => target && !/^[a-z][a-z0-9+.-]*:/i.test(target))
    .sort();
}

function assertSkillSelfContained(skillRoot) {
  const boundary = `${path.resolve(skillRoot)}${path.sep}`;
  for (const file of markdownFiles(skillRoot)) {
    const content = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(
      content,
      /\.\.\//,
      `${path.relative(root, file)} must not reference files outside its Skill package`,
    );
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split("#")[0];
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
      assert.ok(
        resolved === path.resolve(skillRoot) || resolved.startsWith(boundary),
        `${path.relative(root, file)} links outside its Skill package: ${target}`,
      );
      assert.ok(fs.existsSync(resolved), `${path.relative(root, file)} links to missing ${target}`);
    }
  }
}

test("Skill names are unique hyphen-case folder contracts", () => {
  const dirs = skillDirs();
  assert.deepEqual(dirs, [
    "amazon-tiktok-signal",
    "amazon-to-tiktok-validator",
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

test("Every English Skill has one matching zh-CN entrypoint", () => {
  const dirs = skillDirs();
  const localizedFiles = fs.readdirSync(zhLocaleRoot)
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .sort();

  assert.deepEqual(localizedFiles, dirs.map((dir) => `${dir}.md`));

  for (const dir of dirs) {
    const englishFile = path.join(root, dir, "SKILL.md");
    const localizedFile = path.join(zhLocaleRoot, `${dir}.md`);
    const english = fs.readFileSync(englishFile, "utf8");
    const localized = fs.readFileSync(localizedFile, "utf8");
    const englishMetadata = frontmatter(englishFile);
    const localizedMetadata = frontmatter(localizedFile);

    assert.equal(localizedMetadata.name, englishMetadata.name);
    assert.ok(localizedMetadata.description.length <= 1024);
    assert.match(localizedMetadata.description, /[\u3400-\u9fff]/,
      `${dir} zh-CN description must contain Chinese text`);
    assert.deepEqual(
      relativeMarkdownTargets(localized),
      relativeMarkdownTargets(english),
      `${dir} zh-CN entrypoint must preserve relative reference targets`,
    );

    for (const toolName of publicTools) {
      const token = `\`${toolName}\``;
      assert.equal(
        localized.includes(token),
        english.includes(token),
        `${dir} zh-CN entrypoint must preserve tool token ${toolName}`,
      );
    }

    for (const facadeTool of ["yunya_search_kolsprite_tools", "yunya__search_tools", "call_read_tool"]) {
      const token = `\`${facadeTool}\``;
      assert.ok(english.includes(token), `${dir} English entrypoint must document ${facadeTool}`);
      assert.ok(localized.includes(token), `${dir} zh-CN entrypoint must document ${facadeTool}`);
    }

    if (["amazon-to-tiktok-validator", "tiktok-growth-plan"].includes(dir)) {
      const temporaryParent = fs.mkdtempSync(path.join(os.tmpdir(), `kolsprite-zh-${dir}-`));
      const isolated = path.join(temporaryParent, dir);
      try {
        fs.cpSync(path.join(root, dir), isolated, { recursive: true });
        fs.copyFileSync(localizedFile, path.join(isolated, "SKILL.md"));
        assertSkillSelfContained(isolated);
      } finally {
        fs.rmSync(temporaryParent, { recursive: true, force: true });
      }
    }
  }
});

test("Repository exposes a one-click Simplified Chinese entry", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const chineseReadme = fs.readFileSync(path.join(root, "README.zh-CN.md"), "utf8");
  const localeIndex = fs.readFileSync(path.join(zhLocaleRoot, "README.md"), "utf8");

  assert.match(readme, /\[简体中文\]\(README\.zh-CN\.md\)/);
  assert.match(chineseReadme, /\[English\]\(README\.md\)/);
  for (const dir of skillDirs()) {
    assert.match(chineseReadme, new RegExp(`locales/zh-CN/${dir}\\.md`));
    assert.match(localeIndex, new RegExp(`\\(${dir}\\.md\\)`));
  }
});

test("Every relative Markdown reference resolves", () => {
  for (const file of markdownFiles(root)) {
    const content = fs.readFileSync(file, "utf8");
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split("#")[0];
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const isLocalizedSkillSource = path.dirname(file) === zhLocaleRoot && file !== path.join(zhLocaleRoot, "README.md");
      const base = isLocalizedSkillSource
        ? path.join(root, path.basename(file, ".md"))
        : path.dirname(file);
      const resolved = path.resolve(base, decodeURIComponent(target));
      assert.ok(fs.existsSync(resolved), `${path.relative(root, file)} links to missing ${target}`);
    }
  }
});

test("complex orchestration Skills are independently distributable", () => {
  for (const dir of ["amazon-to-tiktok-validator", "tiktok-growth-plan"]) {
    const source = path.join(root, dir);
    assertSkillSelfContained(source);

    const temporaryParent = fs.mkdtempSync(path.join(os.tmpdir(), `kolsprite-${dir}-`));
    const isolated = path.join(temporaryParent, dir);
    try {
      fs.cpSync(source, isolated, { recursive: true });
      assert.ok(fs.existsSync(path.join(isolated, "SKILL.md")));
      assert.equal(frontmatter(path.join(isolated, "SKILL.md")).name, dir);
      assertSkillSelfContained(isolated);
    } finally {
      fs.rmSync(temporaryParent, { recursive: true, force: true });
    }
  }
});

test("Skill instructions stay within the public MCP allowlist", () => {
  const skillFiles = skillDirs().flatMap((dir) => markdownFiles(path.join(root, dir)));
  for (const file of skillFiles) {
    const content = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(content, /kol[-_]asin/i);
    assert.doesNotMatch(content, /`(?:creator_profile|creator_videos|caption_extract)`/,
      `${path.relative(root, file)} must not promise unpublished or misnamed account/caption tools`);
    const toolNames = [...content.matchAll(/`((?:review)|[a-z][a-z0-9_]*(?:_search|_analysis_video|_extract_url|_category_list|_detail|_prediction|_competitor|_stat|_keyword|_trends|_lookup|_statistics|_trend))`/g)]
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

test("Every Skill has valid UI metadata and one default Yunya MCP dependency", () => {
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
    assert.match(content, /^\s*value:\s*"yunyamcp"\s*$/m);
    assert.deepEqual(
      [...content.matchAll(/^\s*url:\s*"([^"]+)"\s*$/gm)].map((match) => match[1]),
      ["https://www.sellerspace.com/yunya_mcp/"],
      `${dir} must use only the default Yunya MCP URL`,
    );
  }
});

test("Every bilingual Skill documents direct and Yunya-facade routing", () => {
  for (const dir of skillDirs()) {
    const english = fs.readFileSync(path.join(root, dir, "SKILL.md"), "utf8");
    const localized = fs.readFileSync(path.join(zhLocaleRoot, `${dir}.md`), "utf8");

    assert.match(english, /## Compatible MCP routing/);
    assert.match(english, /prefer (?:the )?SellerSpace Yunya unified MCP/i);
    assert.match(english, /direct mode/i);
    assert.match(english, /facade mode/i);
    assert.match(english, /at most one host-level discovery attempt/i);
    assert.match(english, /product-specific/i);
    assert.match(english, /`yunya_search_kolsprite_tools`/);
    assert.match(english, /legacy generic `yunya__search_tools`/i);
    assert.match(english, /provider .*`kolsprite`/);
    assert.match(english, /operation `read`/);
    assert.match(english, /exact internal tool name/i);
    assert.match(english, /complete input schema/i);
    assert.match(english, /connector-discovery failure/i);
    assert.match(english, /unrelated (?:fallback|substitute|data source)/i);
    assert.match(english, /never duplicate a paid call/i);
    assert.doesNotMatch(english, /mcp__seller_sprite__/);

    assert.match(localized, /## 兼容 MCP 路由/);
    assert.match(localized, /直接模式/);
    assert.match(localized, /门面模式/);
    assert.match(localized, /最多进行一次宿主级发现/);
    assert.match(localized, /产品专属入口/);
    assert.match(localized, /`yunya_search_kolsprite_tools`/);
    assert.match(localized, /旧版通用入口 `yunya__search_tools`/);
    assert.match(localized, /provider .*`kolsprite`/);
    assert.match(localized, /operation `read`/);
    assert.match(localized, /真实内部工具(?:名)?/);
    assert.match(localized, /完整输入 Schema/);
    assert.match(localized, /连接器发现失败/);
    assert.match(localized, /无关(?:替代|数据源)/);
    assert.match(localized, /不得.*重复执行付费调用/);
    assert.doesNotMatch(localized, /mcp__seller_sprite__/);
  }
  const validator = fs.readFileSync(path.join(root, "amazon-to-tiktok-validator", "SKILL.md"), "utf8");
  const localizedValidator = fs.readFileSync(
    path.join(zhLocaleRoot, "amazon-to-tiktok-validator.md"),
    "utf8",
  );
  assert.match(validator, /both the SellerSprite MCP and the KOLSprite MCP/);
  assert.match(validator, /one MCP connection/);
  assert.match(validator, /compatible standalone SellerSprite MCP can complete the Amazon stage/);
  assert.doesNotMatch(validator, /legacy standalone/i);
  assert.match(localizedValidator, /兼容的独立卖家精灵 MCP.*可以完成 Amazon 阶段/);
  assert.doesNotMatch(localizedValidator, /旧版独立连接/);
  assert.match(validator, /`yunya_search_sellersprite_tools`/);
  assert.match(validator, /Complete or explicitly degrade that stage before using `yunya_search_kolsprite_tools`/);

  const caption = fs.readFileSync(path.join(root, "kolsprite-caption", "SKILL.md"), "utf8");
  assert.match(caption, /prefer the product-specific `yunya_search_kolsprite_tools`/i);
  assert.match(caption, /legacy generic `yunya__search_tools`/i);
  assert.match(caption, /then invoke that tool through `call_read_tool`/);
});

test("Repository contains no legacy split MCP endpoints", () => {
  const files = [
    path.join(root, "README.md"),
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
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  assert.deepEqual(releaseContract.primaryEndpoint, {
    name: "yunyamcp",
    url: "https://www.sellerspace.com/yunya_mcp/",
    authHeader: "x-api-key",
    status: "facade_discovery_fixed_doubao_e2e_verified_2026-09-15",
    verificationBasis: "authenticated_mcp_metadata_validation_plus_published_doubao_end_to_end_verification",
  });
  assert.deepEqual(releaseContract.compatibleEndpoints, [
    {
      name: "kolsprite",
      url: "https://mcp.kolsprite.com/mcp",
      authHeader: "secret-key",
      status: "verified_2026-09-04",
    },
    {
      name: "sellersprite-mcp",
      url: "https://mcp.sellersprite.com/mcp",
      authHeader: "secret-key",
      status: "verified_2026-09-04",
    },
  ]);
  assert.match(releaseContract.preparedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(releaseContract.source, /verified against authenticated MCP metadata/);
  assert.match(releaseContract.source, /product-specific facade discovery fix passed published Doubao Work end-to-end verification/);
  assert.match(releaseContract.source, new RegExp(`\\b${manifest.version.replaceAll(".", "\\.")}\\b`));
  assert.deepEqual(releaseContract.exposureModes, {
    yunya: {
      type: "facade_dynamic_catalog",
      preferredProductSearchEntrypoints: [
        "yunya_search_sellersprite_tools",
        "yunya_search_kolsprite_tools",
        "yunya_search_sellerspace_tools",
      ],
      legacyGenericSearchEntrypoint: "yunya__search_tools",
      topLevelFacadeTools: [
        "yunya_search_sellersprite_tools",
        "yunya_search_kolsprite_tools",
        "yunya_search_sellerspace_tools",
        "yunya__search_tools",
        "call_read_tool",
        "prepare_write_tool",
      ],
      internalProviders: ["sellersprite", "kolsprite", "sellerspace"],
      preferredReadSequence: ["matching_product_search_entrypoint", "call_read_tool"],
      legacyReadSequence: [
        "yunya__search_tools(provider=<product>,operation=read)",
        "call_read_tool",
      ],
      publishedDoubaoVerification: "2026-09-15: the product-specific facade discovery fix passed end-to-end verification in published Doubao Work; yunya_search_kolsprite_tools discovered kolsprite__caption_extract_url with its complete schema and call_read_tool completed the read",
    },
    compatibleStandalone: {
      type: "direct_business_tools",
      resolution: "semantic business name plus live input schema",
    },
  });
  assert.equal(
    releaseContract.exposureModes.yunya.topLevelFacadeTools
      .some((toolName) => releaseContract.tools.includes(toolName)),
    false,
    "facade tools and internal business tools must remain distinct contract layers",
  );
  assert.deepEqual(releaseContract.verifiedFusionCoreTools, [
    "asin_detail",
    "asin_analysis_video",
    "product_search",
    "video_search",
    "creator_search",
    "caption_extract_url",
  ]);
  assert.deepEqual(releaseContract.tools, [
    "asin_detail",
    "asin_prediction",
    "review",
    "asin_competitor",
    "traffic_keyword_stat",
    "traffic_keyword",
    "keyword_research_trends",
    "competitor_lookup",
    "market_research_statistics",
    "asin_sales_trend",
    "creator_category_list",
    "product_category_list",
    "creator_search",
    "product_search",
    "shop_search",
    "video_search",
    "caption_extract_url",
    "asin_analysis_video",
  ]);
});

test("Category resolvers are conditional and portable across agent hosts", () => {
  const search = fs.readFileSync(path.join(root, "kolsprite-search", "SKILL.md"), "utf8");
  const research = fs.readFileSync(path.join(root, "tiktok-shop-growth-research", "SKILL.md"), "utf8");
  const growthMethod = fs.readFileSync(path.join(
    root,
    "tiktok-growth-plan",
    "references",
    "opportunity-research-method.md",
  ), "utf8");

  for (const content of [search, research, growthMethod]) {
    assert.match(content, /`creator_category_list`/);
    assert.match(content, /`product_category_list`/);
    assert.doesNotMatch(content, /mcp__kss__/);
  }
  assert.match(search, /Skip them when no category filter is needed/);
  assert.match(search, /support only one category value/);
  assert.match(search, /Do not set both category filters merely to hedge/);
  assert.match(research, /Do not set both category filters merely to hedge/);
  assert.match(research, /MCP hosts may expose different callable prefixes across agents/);
});

test("Point-aware execution is documented without hardcoded prices", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const chineseReadme = fs.readFileSync(path.join(root, "README.zh-CN.md"), "utf8");
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

  assert.match(readme, /https:\/\/www\.sellerspace\.com\/yunya_mcp\//);
  assert.match(readme, /https:\/\/mcp\.kolsprite\.com\/mcp/);
  assert.match(readme, /YUNYA_MCP_KEY/);
  assert.match(readme, /"secret-key": "<YOUR_MCP_KEY>"/);
  assert.match(chineseReadme, /https:\/\/mcp\.kolsprite\.com\/mcp/);
  assert.match(chineseReadme, /"secret-key": "<YOUR_MCP_KEY>"/);
  assert.match(readme, /Different executed tools or operations may deduct different amounts/);
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

test("Public capability coverage maps every requirement to maintained files", () => {
  const coverage = JSON.parse(fs.readFileSync(path.join(__dirname, "capability-coverage.json"), "utf8"));
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
    "seven-openai-yaml",
    "three-level-attribution",
  ];
  for (const id of required) assert.ok(ids.has(id), `missing required public capability coverage ${id}`);
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

  const crossClientCases = cases.filter((item) => item.id.startsWith("cross-client-"));
  assert.ok(crossClientCases.length >= 12, "include the cross-client prompt set and light-lookup boundaries");
  assert.deepEqual(
    new Set(crossClientCases.map((item) => item.primarySkill).filter(Boolean)),
    knownSkills,
    "the cross-client prompts should exercise all public Skill owners",
  );

  const byId = new Map(cases.map((item) => [item.id, item]));
  assert.deepEqual(byId.get("facade-caption-product-entry-preferred")?.expectedToolFlow, [
    "host_discover_yunya_facade_once",
    "yunya_search_kolsprite_tools(caption_intent)",
    "call_read_tool(returned_toolName,returned_schema_arguments)",
  ]);
  assert.deepEqual(byId.get("facade-caption-legacy-generic-compatible")?.expectedToolFlow, [
    "yunya__search_tools(provider=kolsprite,operation=read)",
    "call_read_tool(returned_toolName,returned_schema_arguments)",
  ]);
  assert.deepEqual(byId.get("facade-caption-unavailable")?.expectedToolFlow, [
    "report_connector_discovery_failure",
    "do_not_use_unrelated_fallback",
  ]);
  assert.deepEqual(byId.get("direct-caption-standalone-compatible")?.expectedToolFlow, [
    "caption_extract_url(direct_live_schema)",
  ]);
  assert.deepEqual(byId.get("facade-amazon-validator-provider-order")?.expectedToolFlow, [
    "yunya_search_sellersprite_tools(amazon_evidence_intent)",
    "call_read_tool(sellersprite_returned_toolName,returned_schema_arguments)",
    "complete_or_degrade_sellersprite_stage",
    "yunya_search_kolsprite_tools(tiktok_validation_intent)",
    "call_read_tool(kolsprite_returned_toolName,returned_schema_arguments)",
  ]);
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

test("Cross-client enhancement coverage maps each requirement to maintained files", () => {
  const coverage = JSON.parse(fs.readFileSync(
    path.join(__dirname, "cross-client-enhancement-coverage.json"),
    "utf8",
  ));
  const expected = new Set([
    "cross-client-prompt-routing",
    "run-evidence-display",
    "dated-known-issues-ledger",
    "conditional-video-first-creator-fallback",
  ]);
  const actual = new Set();

  for (const item of coverage) {
    assert.ok(item.id && Array.isArray(item.owners) && item.owners.length > 0);
    assert.ok(!actual.has(item.id), `duplicate cross-client enhancement id ${item.id}`);
    actual.add(item.id);
    for (const owner of item.owners) {
      assert.ok(fs.existsSync(path.join(root, owner)), `${item.id} maps to missing ${owner}`);
    }
  }

  assert.deepEqual(actual, expected);
});
