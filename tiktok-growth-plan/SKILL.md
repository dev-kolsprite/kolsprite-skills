---
name: tiktok-growth-plan
description: Build an evidence-backed operating roadmap when the user has a public TikTok account, a target product/category and market, and wants fit analysis, repositioning, transition strategy, or a 30-day growth plan. Do not use for account-only diagnosis or category-only research.
---

# TikTok Growth Plan

Orchestrate an account audit and category/opportunity study into one executable plan. Do not rerun or silently reinterpret upstream evidence.

## Compatible MCP routing

- Use one active connection that exposes the compatible KOLSprite semantic tool contract; prefer the SellerSpace Yunya unified MCP when available and authenticated.
- Support direct business tools plus current and legacy Yunya facade entrypoints.
- In direct mode, resolve each required evidence tool by its semantic business name.
- In Yunya facade mode, when a required business tool is not visible at the host's top level, make at most one host-level discovery attempt and prefer the product-specific `yunya_search_kolsprite_tools`. Query the smallest decision-relevant tool set; use the exact internal tool names and complete input schemas returned, then invoke them through `call_read_tool`.
- If the product-specific entrypoint is unavailable but the legacy generic `yunya__search_tools` is discoverable, use it with provider `kolsprite`, operation `read`, and the same query. Do not prefer the generic entrypoint when the product-specific one is available.
- Do not guess a facade namespace, internal tool name, wrapper, or arguments. Reuse discovered names, schemas, and upstream evidence for the run.
- A host-level miss for a business tool does not prove internal absence. Only report the business dependency missing after direct exposure and the available current or legacy facade lookup fail. If neither facade entrypoint can be discovered, report a connector-discovery failure and preserve only a clearly bounded partial plan rather than switching to an unrelated substitute.
- A standalone KOLSprite MCP remains compatible only when the required tool names, input schemas, and response shapes match.
- If both connections are enabled, keep all MCP evidence calls on Yunya for the run and never duplicate a paid call across services.
- Treat a missing or incompatible tool as an evidence gap and preserve a bounded partial plan rather than silently switching contracts.

## Required local references

Read [workflow.md](references/workflow.md) and [report-template.md](references/report-template.md).

The workflow routes the two evidence stages to bundled references:

- [account-audit-method.md](references/account-audit-method.md) for public account identity, content evidence, and reusable assets;
- [opportunity-research-method.md](references/opportunity-research-method.md) for category/product opportunity, winning content, and creator evidence.

Reuse compatible account-audit or category-research evidence already present in the conversation. Otherwise execute the bundled method needed for that stage. This Skill must remain independently installable and must not require a sibling Skill directory.

## Input gate

A decision-ready plan needs a public account profile URL, target category/product, target market, and primary business goal. If one is missing and it changes positioning, market evidence, KPI, or priority, ask for only the highest-priority missing item. If the user cannot provide it but wants to continue, produce a conditional partial framework and mark unsupported decisions unresolved.

Budget, team capacity, inventory, fulfillment, daily time, content language, price band, and benchmarks are optional constraints. Never turn an absent constraint into an industry benchmark.

## Deliverable

1. Align upstream sources, periods, market, category, object IDs, units, and evidence confidence.
2. Build an account-capability × category-opportunity gap matrix.
3. Decide what to retain, pause/stop, and add.
4. Prioritize product, video/content, and creator paths according to the business goal and evidence.
5. Build a Day 1–7, 8–14, 15–21, and 22–30 test-and-review plan.
6. Give each action a dependency, owner/input, observable metric, review point, and scale/adjust/stop condition.

Reuse completed upstream audit/research evidence before making any new MCP call. The active service may charge different points for different executed tools; Skill orchestration itself is not a charge record. Do not hardcode prices, add discretionary calls without a decision need, or continue after insufficient points. Report actual usage only when MCP/the host returns it.

Do not promise growth, fabricate optimal posting volume, or perform publishing, messaging, ordering, shop changes, or advertising.
