# Attributions

## aronhy/tiktok-agent-skills

- Author/community partner: [aronhy / Aron Houyu](https://github.com/aronhy)
- Upstream repository: <https://github.com/aronhy/tiktok-agent-skills>
- Adapted upstream snapshot: [`ef939f8fa1204af33a8fba3d8cda759d0596217b`](https://github.com/aronhy/tiktok-agent-skills/commit/ef939f8fa1204af33a8fba3d8cda759d0596217b)
- Upstream license: MIT; preserved in [`third_party/aronhy-tiktok-agent-skills-LICENSE`](third_party/aronhy-tiktok-agent-skills-LICENSE)
- Permission/context: workflow foundations contributed for adaptation into the official KOLSprite Skills repository with attribution.

KOLSprite adapted the upstream material to the currently public KOLSprite MCP tools, official trigger ownership, progressive reference loading, concise default outputs, and repository validation contracts. The official adaptation does not promise upstream optional/private tools or browser capability in every client.

### Adapted workflow foundations

| Upstream source | Official adaptation |
|---|---|
| `skills/tiktok-shop-operator` | Pagination, stable-ID deduplication, incomplete-result handling, sort scope, ambiguous growth-unit protection, ID joins, caption batch progress, query scope, and action/metric/stop controls in `kolsprite-search` and `tiktok-shop-growth-research` references |
| `skills/tiktok-category-strategy` | Category normalization, keyword/category-ID boundaries, cross-layer evidence, Creative Center as optional separate evidence, opportunity labels, and platform/compliance checks in `opportunity-scan.md`, `cold-start.md`, and `judgment-guide.md` |
| `skills/tiktok-account-audit` | `tiktok-account-audit`, rewritten for canonical public profile URLs, optional public-browser evidence, exact `creator_search` enrichment, verified-video captions, source ledger, A/B/C confidence, account types, representative video roles, reusable process, and seven-day actions |
| `skills/tiktok-growth-plan` | `tiktok-growth-plan`, rewritten to orchestrate the official account audit and Shop growth research into a gap matrix, retain/pause/add decisions, three growth paths, and a 30-day test rhythm |
| `skills/*/agents/openai.yaml` | User-facing display names, concise descriptions, and default-prompt patterns adapted for the five official Skills and current KOLSprite MCP dependency names |

No `tiktok-lead-generation-operator` or `tiktok-ads-operator` material is included in this first integration batch.
