# 达人精灵 Skills

[English](README.md) | **简体中文**

达人精灵官方 AI Agent Skills，通过 SellerSpace 云雅统一 MCP，或兼容的独立 MCP，把自然语言形式的 TikTok 需求路由到相应公开工具，并将当前商品、达人、视频、店铺和字幕数据整理为证据边界清晰的建议。

## 选择语言版本

- **豆包工作及中文用户：** 使用 `zh-CN` 中文发行包。
- **GitHub 默认安装及海外用户：** 使用 `en-US` 英文版。
- 两种发行包具有相同能力、工具依赖和版本号，同一环境只安装一种语言版本。

[查看 7 个 Skill 的中文说明](locales/zh-CN/README.md)

## MCP 连接

新安装建议使用一个已鉴权的 SellerSpace 云雅统一 MCP：

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

请只在本地客户端的私密配置中替换占位符，不要提交或公开真实密钥。

独立 KOLSprite MCP 只有在工具名、输入结构和返回结构与 Skill 要求一致时才兼容。对于 `amazon-to-tiktok-validator`，兼容的独立卖家精灵 MCP 可以完成 Amazon 阶段；要通过独立连接完成整个流程，还需要兼容的独立达人精灵 MCP。统一和独立连接同时存在时，Skill 优先使用云雅，并且不得跨服务重复执行付费调用。

### 直接工具与云雅门面

兼容宿主可能用两种方式暴露业务工具：

- **直接模式：** `caption_extract_url`、`video_search`、`creator_search` 等工具可按语义名称直接调用。
- **云雅门面模式：** 宿主顶层暴露产品专属搜索入口和 `call_read_tool`，实际业务工具位于内部动态目录。

当前首选的三个产品专属入口是 `yunya_search_sellersprite_tools`、`yunya_search_kolsprite_tools` 和 `yunya_search_sellerspace_tools`。达人精灵流程最多进行一次宿主级发现，优先找到 `yunya_search_kolsprite_tools`，查询最小必要工具集合，取得真实内部 `toolName` 与完整输入 Schema，最后通过 `call_read_tool` 调用。

如果对应产品专属入口不可用，旧版通用入口 `yunya__search_tools` 继续兼容，此时使用对应 provider 和 `operation=read`。产品专属入口可用时，不应优先使用通用入口。`amazon-to-tiktok-validator` 的 Amazon 阶段先使用 `yunya_search_sellersprite_tools`，完成或明确降级该阶段后，才能使用 `yunya_search_kolsprite_tools` 获取 TikTok 验证工具。独立 MCP 的直接工具模式继续兼容。所有模式都不得猜测客户端专用前缀、包装结构、Schema 或参数，不得跨路径重复付费调用，也不得因为内部工具未在顶层出现就改走无关替代服务。

2026-09-14 在豆包工作发布环境复现的门面发现问题已经修复，并于 2026-09-15 通过豆包工作端到端验证。当前最短路径是“产品专属搜索入口 → `call_read_tool`”，旧版 `yunya__search_tools` 作为兼容路径保留。

## 可用 Skills

| Skill | 适用场景 |
|---|---|
| [`amazon-tiktok-signal`](locales/zh-CN/amazon-tiktok-signal.md) | 分析 Amazon ASIN 的 TikTok 热度、粗略近月变化、商业证据，以及对比 2–3 个 ASIN |
| [`amazon-to-tiktok-validator`](locales/zh-CN/amazon-to-tiktok-validator.md) | 判断一个 Amazon 商品是否值得进行有限 TikTok 测试，并设计最小内容和达人实验 |
| [`kolsprite-search`](locales/zh-CN/kolsprite-search.md) | 直接搜索和筛选 TikTok 达人、商品、视频或店铺 |
| [`kolsprite-caption`](locales/zh-CN/kolsprite-caption.md) | 提取或分析用户提供的 TikTok 视频字幕、口播和脚本 |
| [`tiktok-shop-growth-research`](locales/zh-CN/tiktok-shop-growth-research.md) | 完成机会、冷启动、内容、达人和竞品等多步骤经营决策研究 |
| [`tiktok-account-audit`](locales/zh-CN/tiktok-account-audit.md) | 诊断公开 TikTok 账号、内容模式、运营逻辑和近期行动 |
| [`tiktok-growth-plan`](locales/zh-CN/tiktok-growth-plan.md) | 分析账号与类目适配，并制定 30 天商品、内容和达人增长计划 |

## 路由边界

- 直接查询达人、商品、视频或店铺：使用 `kolsprite-search`。
- 视频链接加字幕、Hook、脚本、卖点或 CTA 需求：使用 `kolsprite-caption`。
- 类目是否值得测试、商品如何冷启动、内容和达人组合、竞品诊断：使用 `tiktok-shop-growth-research`。
- 公开主页加账号或内容诊断：使用 `tiktok-account-audit`。
- 公开账号加目标类目、市场和 30 天计划：使用 `tiktok-growth-plan`。
- ASIN 加 TikTok 站外热度或近月方向：使用 `amazon-tiktok-signal`。
- 单个 Amazon 商品加“是否进入 TikTok、如何测试”的决策：使用 `amazon-to-tiktok-validator`。

不要因为一个请求同时提到多个 TikTok 对象就加载多个 Skill。应由主决策所属的 Skill 在需要时调用多个 MCP 工具。

## 构建本地化发行包

```bash
npm run build:zh-CN
npm run build:en-US
```

构建结果写入 `outputs/`：

```text
outputs/
├── kolsprite-skills-<version>-en-US/
├── kolsprite-skills-<version>-en-US.zip
├── kolsprite-skills-<version>-zh-CN/
└── kolsprite-skills-<version>-zh-CN.zip
```

中文构建仅替换 7 个 Skill 的 `SKILL.md`。`agents/openai.yaml`、`references/`、工具契约和测试规则均与英文源包共用。

## 验证

```bash
npm test
```

测试会检查 7 个中英文入口一一对应、技术标识和引用路径一致，以及每个 Skill 仍满足公开能力与独立安装边界。

## 许可与来源

项目采用 [MIT License](LICENSE)。社区贡献与上游许可见 [ATTRIBUTIONS.md](ATTRIBUTIONS.md)。
