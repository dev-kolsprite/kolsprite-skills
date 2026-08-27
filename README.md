# KOLSprite Skills

Official AI Agent Skills for the public KOLSprite MCP service.

KOLSprite Skills helps compatible agents route natural-language TikTok requests to the appropriate public MCP tools and turn current product, creator, video, shop, and caption data into evidence-bounded recommendations.

## Installation

```bash
npx skills add dev-kolsprite/kolsprite-skills
```

Restart or reload the AI client after installation. Live workflows require one authenticated Streamable HTTP MCP connection at `https://mcp.kolsprite.com/mcp` with the `secret-key` header. See the official [MCP configuration guide](https://o.kolsprite.com/doc/api.html#mcp-config).

If upgrading from an early version of this repository, remove obsolete skill folders named `kolsprite_search`, `kolsprite_caption`, or `shop_research` from the client's local skills directory after confirming the new hyphenated folders were installed. Keeping both versions can cause duplicate triggers.

## Available Skills

| Skill | Use it for | Public MCP dependency |
|---|---|---|
| [`amazon-tiktok-signal`](amazon-tiktok-signal/SKILL.md) | Amazon ASIN TikTok heat, rough recent-month direction, commerce evidence, and 2–3 ASIN comparisons | Unified KOLSprite MCP; requires `asin_video_search` |
| [`kolsprite-search`](kolsprite-search/SKILL.md) | Straightforward creator, product, video, or shop searches and filters | Unified KOLSprite MCP |
| [`kolsprite-caption`](kolsprite-caption/SKILL.md) | Extracting or analyzing the spoken text or subtitles of a supplied TikTok video | Unified KOLSprite MCP |
| [`tiktok-shop-growth-research`](tiktok-shop-growth-research/SKILL.md) | Multi-step opportunity, cold-start, content, creator, and competitor decisions | Unified KOLSprite MCP |
| [`tiktok-account-audit`](tiktok-account-audit/SKILL.md) | Public TikTok account diagnosis, content patterns, operating logic, and seven-day actions | Public browser when available; unified KOLSprite MCP for verified enrichment |
| [`tiktok-growth-plan`](tiktok-growth-plan/SKILL.md) | Account-category fit, retain/stop/add decisions, and a 30-day product/content/creator roadmap | Orchestrates account audit and growth research |

### Trigger ownership

- An Amazon ASIN or Listing plus a request about TikTok offsite heat, recent-month direction, or ASIN comparison belongs to `amazon-tiktok-signal`.
- An ASIN follow-up that asks for a complete TikTok cold-start, content, or creator program belongs to `tiktok-shop-growth-research` after the ASIN signal is established.
- A direct lookup such as “find US beauty creators” or “show recent skincare products” belongs to `kolsprite-search`.
- A supplied TikTok video plus a request about its transcript, hook, script, selling points, or CTA belongs to `kolsprite-caption`.
- A decision question such as “is this category worth testing?”, “how should this product cold-start?”, or “why does this competitor appear to be growing?” belongs to `tiktok-shop-growth-research`.
- A public TikTok profile URL plus an account/content/operating diagnosis belongs to `tiktok-account-audit`.
- A public account plus a target category/market and a request for fit, repositioning, or a 30-day plan belongs to `tiktok-growth-plan`.

Do not load multiple skills merely because a query mentions several TikTok entities. The growth-research skill may call multiple MCP tools itself when one business decision requires cross-entity evidence.

## Public MCP capability boundary

All public MCP tools use the same service connection: `https://mcp.kolsprite.com/mcp`. “Search,” “caption,” and “growth research” remain Skill/tool-routing boundaries, not separate MCP endpoints or separately configured services.

The `0.4.0` release package requires these unified-MCP capabilities:

- `creator_search`
- `product_search`
- `video_search`
- `shop_search`
- `caption_extract_url`
- `asin_video_search`

`amazon-tiktok-signal` requires `asin_video_search`. During deployment, verify that the unified MCP `tools/list` exposes this tool before publishing the Skills package. If a client cannot access it, the Skill reports the missing dependency and stops; it must not substitute a generic keyword search and present that as ASIN-specific evidence.

They do not assume unavailable detail, historical-trend, advertising, SKU, review, livestream, audience-demographic, or exact product-to-creator relationship tools. A skill may calculate a clearly labelled metric from returned records, but it must not present missing data as observed fact.

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
├── AGENTS.md
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

The repository tests validate public capability boundaries, Skill metadata, local references, documented directories, and routing-contract fixtures.

## About KOLSprite

KOLSprite provides MCP-powered TikTok creator intelligence, content analysis, and commerce data discovery.

- Website and public API documentation: <https://o.kolsprite.com/doc/api.html>

## License

[MIT](LICENSE)
