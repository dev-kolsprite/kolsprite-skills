---
name: tiktok-account-audit
description: Analyze a public TikTok profile when the user provides a profile URL and asks for account diagnosis, competitor research, content patterns, commerce signals, reusable operating logic, or growth opportunities. Do not use for a video-only URL, shop link, nickname-only lookup, or a combined account-category 30-day plan.
---

# TikTok Account Audit

Diagnose a public TikTok account from traceable public evidence without treating inaccessible or missing data as zero.

## Compatible MCP routing

- Use one active connection that exposes the compatible KOLSprite semantic tool contract; prefer the SellerSpace Yunya unified MCP when available and authenticated.
- Support direct business tools plus current and legacy Yunya facade entrypoints.
- In direct mode, resolve each required enrichment tool by its semantic business name.
- In Yunya facade mode, when an enrichment tool is not visible at the host's top level, make at most one host-level discovery attempt and prefer the product-specific `yunya_search_kolsprite_tools`. Query the smallest required enrichment set; use the exact internal tool names and complete input schemas returned, then invoke them through `call_read_tool`.
- If the product-specific entrypoint is unavailable but the legacy generic `yunya__search_tools` is discoverable, use it with provider `kolsprite`, operation `read`, and the same query. Do not prefer the generic entrypoint when the product-specific one is available.
- Do not guess a facade namespace, internal tool name, wrapper, or arguments. Reuse discovered names, schemas, and evidence for the run.
- A host-level miss for an enrichment tool is not proof of internal absence. Only mark the business tool missing after direct exposure and the available current or legacy facade lookup fail. If neither facade entrypoint can be discovered, report a connector-discovery failure and continue only with the explicitly bounded public-evidence path below, not an unrelated substitute.
- A standalone KOLSprite MCP remains compatible only when the required tool names, input schemas, and response shapes match.
- If both connections are enabled, keep all MCP enrichment on Yunya for the run and never duplicate a paid call across services.
- Treat a missing or incompatible enrichment tool as an evidence gap; preserve the public-evidence fallback below.

## Required references

Read [workflow.md](references/workflow.md) before collecting evidence and [report-template.md](references/report-template.md) before delivering a full audit.

## Control flow

1. Require a public TikTok profile URL and validate it according to the workflow. A nickname alone is not enough to confirm identity.
2. Use a capable browser to read only public profile/video pages when available. Stop on login, CAPTCHA, anti-bot, regional, or access restrictions.
3. Use the public `creator_search` tool only to enrich an identity already confirmed from the canonical profile or a verified video. Accept enrichment only when the returned Handle or creator ID matches exactly.
4. Use `video_search` only as a supplementary source when returned video creator identity can be cross-confirmed; do not call keyword results the account's complete video list.
5. Use `caption_extract_url` on a small set of verified representative videos when spoken Hook, selling points, proof, objections, or CTA matter.
6. If no browser is available, continue with exact MCP matches and user-provided public screenshots/exports when sufficient. Otherwise deliver a bounded partial audit or ask for the single missing input that would materially change the diagnosis.

## Point-aware execution

- All MCP enrichment uses one compatible active service. Point usage follows the actual search/caption tools executed, not selection of this Skill.
- Start with identity confirmation and public evidence, then call only the smallest MCP enrichment and representative-caption sample that changes the diagnosis. Reuse a valid transcript or upstream record instead of repeating a paid call.
- Do not hardcode point prices. Report actual usage only when returned by MCP/the host, and stop remaining enrichment on insufficient points while preserving a bounded partial audit.

## Output boundary

- Separate public-page observations, KOLSprite MCP observations, client calculations, and business judgments.
- Report requested and actual sample, collection window, source ledger, missing fields, stop reason, and A/B/C confidence.
- Distinguish content-led, commerce-led, brand-led, and mixed accounts using repeated sample evidence rather than one video or follower count.
- Keep pinned, recent, high-performing, low-performing, and commerce videos distinct.
- Describe “operating logic” only when repeated evidence supports it. Label a reusable launch process as a derived plan, not a reconstruction of private account history.
- Do not publish, message, follow, order, modify an account, bypass controls, or expose credentials/contact details.
