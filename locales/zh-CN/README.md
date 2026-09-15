# 达人精灵 Skills 简体中文入口

这里保存 7 个 Skill 的简体中文入口文件，用于双语一致性维护、豆包客户端发布和内部留档。GitHub 默认在线安装仍使用仓库根目录下的英文 `SKILL.md`；中文入口不作为 GitHub 在线安装版本，也不应与英文入口同时安装。

| Skill | 中文名称 | 中文说明 |
|---|---|---|
| `amazon-tiktok-signal` | Amazon 商品 TikTok 热度分析 | [查看](amazon-tiktok-signal.md) |
| `amazon-to-tiktok-validator` | Amazon 商品 TikTok 机会验证 | [查看](amazon-to-tiktok-validator.md) |
| `kolsprite-caption` | TikTok 字幕与脚本分析 | [查看](kolsprite-caption.md) |
| `kolsprite-search` | TikTok 数据搜索 | [查看](kolsprite-search.md) |
| `tiktok-account-audit` | TikTok 账号诊断 | [查看](tiktok-account-audit.md) |
| `tiktok-growth-plan` | TikTok 增长计划 | [查看](tiktok-growth-plan.md) |
| `tiktok-shop-growth-research` | TikTok Shop 增长研究 | [查看](tiktok-shop-growth-research.md) |

需要豆包交付或内部留档时，可使用 `npm run build:zh-CN` 生成中文目录和 ZIP。构建过程复用英文源包中的 `agents/openai.yaml` 与 `references/`，只替换每个 Skill 的 `SKILL.md`。生成物默认不上传 GitHub Release。

[返回中文仓库说明](../../README.zh-CN.md) · [English](../../README.md)
