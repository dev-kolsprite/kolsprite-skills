# Changelog

## 0.4.2

- Added Simplified Chinese entrypoints for all seven Skills while keeping the default GitHub Skill sources in English.
- Added one-click English/Chinese README navigation and locale-specific internal packaging for Doubao delivery and maintenance.
- Simplified release channels: GitHub keeps the default English online-install source, Doubao Work distributes its Chinese version through the Doubao client, and `locales/zh-CN/` remains in source for bilingual consistency without requiring a Chinese GitHub Release asset.
- Added localization parity tests for Skill names, MCP tool tokens, relative references, and standalone-install boundaries.
- Added dual exposure-mode routing for directly callable business tools and the Yunya `search_tools` → `call_read_tool` facade.
- Distinguished a host-level business-tool miss from an internal-catalogue absence, with one facade-discovery attempt, exact returned-schema use, per-run reuse, and no unrelated fallback.
- Recorded the 2026-09-14 published Doubao Work facade-discovery reproduction and updated routing/contract acceptance coverage without changing `agents/openai.yaml`.
- Aligned the preferred facade path with `yunya_search_sellersprite_tools`, `yunya_search_kolsprite_tools`, and `yunya_search_sellerspace_tools`, while retaining `yunya__search_tools` as the legacy provider-based fallback.
- Recorded that the facade-discovery fix passed end-to-end verification in published Doubao Work on 2026-09-15 and removed the obsolete pending-fix language.
- Clarified that a compatible standalone SellerSprite MCP can complete the Amazon stage, while the full standalone validator workflow additionally requires a compatible KOLSprite MCP; standardized the standalone-connection terminology.
- Added copy-ready installation examples for both the recommended SellerSpace Yunya unified MCP and the compatible standalone KOLSprite MCP, using secret placeholders only.

## 0.4.1

- Added `amazon-to-tiktok-validator` as the seventh independently distributable Skill.
- Made SellerSpace Yunya the default MCP dependency for all seven Skills.
- Kept one Skill source compatible with the standalone KOLSprite MCP when tool names, schemas, and response shapes match.
- Kept backward compatibility for the Amazon-to-TikTok validator through a dual standalone route that requires both SellerSprite and KOLSprite MCP connections.
- Added one-connection routing: prefer Yunya when both routes are available and never duplicate a paid call.
- Added explicit routing precedence between ASIN signal lookup and full Amazon-to-TikTok test validation.
- Recorded the authenticated Yunya capability verification date and runtime metadata boundary.
- Recorded Yunya authentication through `x-api-key` without storing a real secret.
- Made `tiktok-growth-plan` independently distributable by bundling its account-audit, opportunity-research, and evidence-display methods.
- Removed runtime references from `tiktok-growth-plan` to sibling Skill directories.
- Added an isolated-directory contract test for the standalone package.
- Added live category resolution through `creator_category_list` and `product_category_list`.
- Documented conditional, single-category, recursive-tree, fallback, and current-run reuse behavior.
- Kept tool invocation portable across agents by using semantic MCP names instead of a client-specific namespace.
- Added UI metadata, release-contract coverage, and routing fixtures for all seven Skills.

## 0.4.0

- Established the six-Skill public routing and unified KOLSprite MCP release contract.
