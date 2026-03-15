import { BasePlugin, type PluginTool } from "@phantasy/agent/plugins";

export class InstagramPlugin extends BasePlugin {
  name = "instagram";
  version = "2.0.0";
  description = "Instagram publishing integration plugin for Phantasy companions.";

  protected displayName = "Instagram";
  protected category = "social";
  protected tags = ["instagram","social","creator","content"];
  protected permissions = ["internet"];
  protected workspace = "business" as const;
  protected extensionKind = "integration" as const;
  protected adminSurface =   {
    "tabId": "instagram",
    "label": "Instagram",
    "section": "business",
    "workspace": "business",
    "kind": "generic",
    "keywords": [
      "instagram",
      "social",
      "creator",
      "content"
    ]
  } as const;
  protected configSchema =   {
    "type": "object",
    "properties": {
      "enabled": {
        "type": "boolean",
        "default": true
      }
    }
  };

  getTools(): PluginTool[] {
    return [];
  }
}

export default InstagramPlugin;
