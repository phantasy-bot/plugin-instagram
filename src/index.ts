/**
 * Instagram Plugin for Phantasy
 * 
 * Instagram integration for posting media and stories.
 * 
 * @package @phantasy/plugin-instagram
 * @version 1.0.0
 */

import { BasePlugin, PluginManifest, PluginTool, PluginConfig } from "@phantasy/core";

export interface InstagramPluginConfig extends PluginConfig {
  enabled?: boolean;
  username?: string;
  password?: string;
  accessToken?: string;
}

export class InstagramPlugin extends BasePlugin {
  name = "instagram";
  version = "1.0.0";
  description = "Instagram integration for posting media and stories";

  private config: InstagramPluginConfig = {};
  private initialized = false;

  constructor(config: InstagramPluginConfig = {}) {
    super();
    this.config = { enabled: true, ...config };
  }

  getManifest(): PluginManifest {
    return {
      name: this.name,
      displayName: "Instagram",
      version: this.version,
      description: this.description,
      author: "Phantasy",
      homepage: "https://instagram.com",
      repository: "https://github.com/phantasy-bot/plugin-instagram",
      license: "BUSL-1.1",
      category: "social",
      tags: ["instagram", "social-media", "media", "platform"],
      isPlatform: true,
      platformFeatures: { messaging: false, streaming: false, autonomous: true },
      configSchema: {
        type: "object",
        properties: {
          enabled: { type: "boolean", default: true },
          username: { type: "string", title: "Username" },
          accessToken: { type: "string", title: "Access Token", format: "password" },
        },
      },
    };
  }

  getTools(): PluginTool[] {
    return [
      {
        name: "post_image",
        description: "Post an image to Instagram",
        parameters: { type: "object", properties: { imageUrl: { type: "string" }, caption: { type: "string" } }, required: ["imageUrl"] },
        handler: async () => { throw new Error("Instagram API requires Meta Developer account"); },
      },
    ];
  }

  async initialize(): Promise<void> {
    this.initialized = true;
    console.log("[InstagramPlugin] Initialized");
  }
}

export default InstagramPlugin;
