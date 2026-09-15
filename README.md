# KOLSprite Skills

**English** | [简体中文](README.zh-CN.md)

> 中文用户可查看[简体中文说明](README.zh-CN.md)和[中文 Skill 导航](locales/zh-CN/README.md)，或使用 GitHub Release 中标记为 `zh-CN` 的发行包。

Official AI Agent Skills for KOLSprite capabilities and SellerSprite-to-KOLSprite workflows exposed through the SellerSpace Yunya unified MCP or backward-compatible standalone MCPs.

KOLSprite Skills helps compatible agents route natural-language TikTok requests to the appropriate public MCP tools and turn current product, creator, video, shop, and caption data into evidence-bounded recommendations.

## Installation

```bash
npx skills add dev-kolsprite/kolsprite-skills
```

This default GitHub installation uses the English Skill entrypoints. Chinese environments such as Doubao Work should use the `zh-CN` localized release package; do not install both locales in the same client.

Restart or reload the AI client after installation. New installations should use one authenticated Streamable HTTP connection to the SellerSpace Yunya unified MCP:

```json
{
  "mcpServers": {
    "yunyamcp": {
      "type": "streamableHttp",
      "url": "https://www.sellerspace.com/yunya_mcp/",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}
```

Replace the placeholder only in the local client's secret configuration; never commit or publish a real key. For Codex, prefer an environment-backed header in `~/.codex/config.toml`:

```toml
[mcp_servers.yunyamcp]
url = "https://www.sellerspace.com/yunya_mcp/"
env_http_headers = { "x-api-key" = "YUNYA_MCP_KEY" }
```

The standalone KOLSprite endpoint at `https://mcp.kolsprite.com/mcp` remains a compatible runtime for KOLSprite-only Skills when it exposes the same required tool names, schemas, and response shapes. Most Skills use either Yunya or standalone KOLSprite. For `amazon-to-tiktok-validator`, a compatible standalone SellerSprite MCP can complete the Amazon stage; completing the full workflow through standalone connections also requires a compatible standalone KOLSprite MCP. The preferred Yunya route needs only one connection. If unified and standalone routes are both present, the Skills prefer Yunya and must not duplicate a paid call across services.

### Direct tools and the Yunya facade

Compatible hosts may expose business tools in either of two ways:

- **Direct mode:** tools such as `caption_extract_url`, `video_search`, or `creator_search` are directly callable by semantic name.
- **Yunya facade mode:** the host exposes product-specific search entrypoints plus `call_read_tool`; provider business tools remain in an internal dynamic catalogue.

The current preferred facade entrypoints are `yunya_search_sellersprite_tools`, `yunya_search_kolsprite_tools`, and `yunya_search_sellerspace_tools`. For KOLSprite workflows, make at most one host-level discovery attempt, prefer `yunya_search_kolsprite_tools`, query the smallest required tool set, then use the exact internal `toolName` and complete input schema returned to invoke `call_read_tool`.

If the relevant product-specific entrypoint is unavailable, the legacy generic `yunya__search_tools` remains compatible: call it with the corresponding provider and `operation=read`. Do not prefer the generic entrypoint when a product-specific entrypoint is available. The Amazon stage of `amazon-to-tiktok-validator` uses `yunya_search_sellersprite_tools`, completes or explicitly degrades that stage, and only then uses `yunya_search_kolsprite_tools` for TikTok validation. Direct standalone tools remain supported. In every mode, do not guess a host-specific namespace, wrapper, schema, or arguments; do not repeat a paid call across routes or switch to an unrelated fallback merely because an internal tool was not top-level.

If upgrading from an early version of this repository, remove obsolete skill folders named `kolsprite_search`, `kolsprite_caption`, or `shop_research` from the client's local skills directory after confirming the new hyphenated folders were installed. Keeping both versions can cause duplicate triggers.

## Available Skills

| Skill | Use it for | Public MCP dependency |
|---|---|---|
| [`amazon-tiktok-signal`](amazon-tiktok-signal/SKILL.md) | Amazon ASIN TikTok heat, rough recent-month direction, commerce evidence, and 2–3 ASIN comparisons | Compatible KOLSprite tool contract; requires `asin_analysis_video` |
| [`amazon-to-tiktok-validator`](amazon-to-tiktok-validator/SKILL.md) | Decide whether one Amazon product merits a bounded TikTok test and define the smallest content-and-creator experiment | Preferred: one Yunya connection; legacy: both standalone SellerSprite and KOLSprite |
| [`kolsprite-search`](kolsprite-search/SKILL.md) | Straightforward creator, product, video, or shop searches and filters | Compatible KOLSprite tool contract |
| [`kolsprite-caption`](kolsprite-caption/SKILL.md) | Extracting or analyzing the spoken text or subtitles of a supplied TikTok video | Compatible KOLSprite tool contract |
| [`tiktok-shop-growth-research`](tiktok-shop-growth-research/SKILL.md) | Multi-step opportunity, cold-start, content, creator, and competitor decisions | Compatible KOLSprite tool contract |
| [`tiktok-account-audit`](tiktok-account-audit/SKILL.md) | Public TikTok account diagnosis, content patterns, operating logic, and seven-day actions | Public browser when available; compatible MCP for verified enrichment |
| [`tiktok-growth-plan`](tiktok-growth-plan/SKILL.md) | Account-category fit, retain/stop/add decisions, and a 30-day product/content/creator roadmap | Compatible MCP; public browser when available; bundled audit/research methods |

### Standalone distribution

An independently distributed public Skill must contain a root `SKILL.md` and every reference it needs at runtime. `tiktok-growth-plan` and `amazon-to-tiktok-validator` both enforce this contract by bundling every workflow and evidence reference they need instead of requiring sibling Skill directories. Compatible evidence already present in a conversation can still be reused without rerunning paid tools.

Skill instructions use semantic MCP tool names rather than a client-specific namespace. Compatible agents may expose the same tool as `creator_category_list`, a server-qualified variant, or another host-specific callable name; the agent should resolve the callable supplied by its MCP host instead of rewriting the workflow.

### Trigger ownership

- An Amazon ASIN or Listing plus a request about TikTok offsite heat, recent-month direction, or ASIN comparison belongs to `amazon-tiktok-signal`.
- One Amazon ASIN or Listing plus a decision about whether to enter TikTok, or a request for the smallest content-and-creator test, belongs to `amazon-to-tiktok-validator`.
- A TikTok-only product/category follow-up that asks for a broader cold-start, content, or creator program belongs to `tiktok-shop-growth-research`; reuse any compatible evidence already established without rerunning paid tools.
- A direct lookup such as “find US beauty creators” or “show recent skincare products” belongs to `kolsprite-search`.
- A supplied TikTok video plus a request about its transcript, hook, script, selling points, or CTA belongs to `kolsprite-caption`.
- A decision question such as “is this category worth testing?”, “how should this product cold-start?”, or “why does this competitor appear to be growing?” belongs to `tiktok-shop-growth-research`.
- A public TikTok profile URL plus an account/content/operating diagnosis belongs to `tiktok-account-audit`.
- A public account plus a target category/market and a request for fit, repositioning, or a 30-day plan belongs to `tiktok-growth-plan`.

Do not load multiple skills merely because a query mentions several TikTok entities. The growth-research skill may call multiple MCP tools itself when one business decision requires cross-entity evidence.

## Compatible MCP capability boundary

All Skills prefer `yunyamcp` at `https://www.sellerspace.com/yunya_mcp/`. KOLSprite-only Skills use one active MCP connection per run: Yunya facade or the compatible directly exposed standalone KOLSprite endpoint. `amazon-to-tiktok-validator` also uses one connection on Yunya; its compatible standalone route uses SellerSprite for the Amazon stage and additionally requires standalone KOLSprite to complete TikTok validation. “Search,” “caption,” and “growth research” remain Skill/tool-routing boundaries rather than separate MCP installations.

The underlying Yunya business-tool contract was verified against authenticated MCP metadata on 2026-09-04. The facade-discovery defect reproduced in published Doubao Work on 2026-09-14 was fixed and passed end-to-end Doubao Work verification on 2026-09-15. The shortest current route uses the matching product-specific search entrypoint followed by `call_read_tool`; `yunya__search_tools` remains a compatibility fallback. For `amazon-to-tiktok-validator`, the verified core path includes SellerSprite `asin_detail` followed by KOLSprite `asin_analysis_video`, `product_search`, and `video_search`; full test planning can also use `creator_search` and `caption_extract_url`. Runtime metadata still takes precedence if an account lacks entitlement or a future schema changes.

The `0.4.2` release contract requires these KOLSprite capabilities from whichever endpoint is active:

- `creator_category_list`
- `product_category_list`
- `creator_search`
- `product_search`
- `video_search`
- `shop_search`
- `caption_extract_url`
- `asin_analysis_video`

The two category-list tools are conditional resolvers rather than mandatory calls on every search. `creator_category_list` maps Chinese or English creator-category labels to the accepted `creator_search.category_list` value. `product_category_list` returns a recursive product-category tree used by `product_search.cat_ids`, `shop_search.category`, `video_search.product_category_list`, and `creator_search.product_category_list`. Agents should call the relevant resolver when a category filter is needed and no verified current value is already available, reuse the mapping during the run, and never hardcode the returned catalogue into the Skill package.

`amazon-tiktok-signal` requires `asin_analysis_video`; its Yunya availability is included in the authenticated MCP verification recorded for this release. Future releases must refresh the contract if current metadata changes. If a client cannot access it, the Skill reports the missing dependency and stops; it must not substitute a generic keyword search and present that as ASIN-specific evidence.

KOLSprite-only Skills do not assume unavailable detail, historical-trend, advertising, SKU, review, livestream, audience-demographic, or exact product-to-creator relationship tools. The validator may use the SellerSprite capabilities documented in its own self-contained capability map. A Skill may calculate a clearly labelled metric from returned records, but it must not present missing data as observed fact.

MCP usage consumes KOLSprite points. Different executed tools or operations may deduct different amounts under the current account rules. Skill selection itself is not reported as a deduction: point usage follows the actual tool calls. The Skills do not hardcode point prices; they minimize duplicate/discretionary calls, stop on insufficient points, and report actual usage only when the MCP or host client returns it.

`tiktok-account-audit` may read public TikTok profile/video pages when the host client has a capable browser. It does not promise unpublished `creator_profile` or `creator_videos` MCP tools. Without a browser, it uses exact public MCP matches and user-supplied public evidence where sufficient, then reports a partial result or the smallest material evidence gap.

## Operational evidence and reliability

- Substantial and partner-facing runs use the shared [run evidence display](tiktok-shop-growth-research/references/evidence-display.md) to separate MCP/public-page observations, client calculations, external facts, business judgments, and action proposals.
- The [known-issues ledger](tiktok-shop-growth-research/references/known-issues.md) records dated observations and safe retest paths. Historical entries are not treated as permanent tool behavior until reproduced against the current schema and response.
- Creator-program research includes a conditional [video-first creator discovery fallback](tiktok-shop-growth-research/references/creator-partnership.md#conditional-video-first-fallback) when current direct creator results are empty, materially off-category, or suspiciously repeated. It remains a bounded video-index-derived sample and requires stable-ID confirmation.

## Community-contributed workflow foundations

The workflow foundations for `tiktok-account-audit` and `tiktok-growth-plan`, plus operating controls adapted into `tiktok-shop-growth-research`, were contributed by community partner [aronhy / Aron Houyu](https://github.com/aronhy) through [aronhy/tiktok-agent-skills](https://github.com/aronhy/tiktok-agent-skills). KOLSprite adapted them to the official public MCP capability and trigger boundaries.

See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) and the preserved [upstream MIT license](third_party/aronhy-tiktok-agent-skills-LICENSE). Attribution is maintained in repository documentation rather than repeated in every runtime answer.

## Repository structure

```text
kolsprite-skills/
├── LICENSE
├── README.md
├── package.json
├── ATTRIBUTIONS.md
├── third_party/
│   └── aronhy-tiktok-agent-skills-LICENSE
├── amazon-tiktok-signal/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
├── amazon-to-tiktok-validator/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
├── kolsprite-search/
│   ├── SKILL.md
│   └── agents/openai.yaml
├── kolsprite-caption/
│   ├── SKILL.md
│   └── agents/openai.yaml
├── tiktok-shop-growth-research/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
├── tiktok-account-audit/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
├── tiktok-growth-plan/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
└── test/
```

## Validation

```bash
npm test
```

The repository tests validate public capability boundaries, Skill metadata, local references, documented directories, routing-contract fixtures, and the isolated-install contract for `tiktok-growth-plan`.

## About KOLSprite

KOLSprite provides MCP-powered TikTok creator intelligence, content analysis, and commerce data discovery.

- Website and public API documentation: <https://o.kolsprite.com/doc/api.html>

## License

[MIT](LICENSE)
