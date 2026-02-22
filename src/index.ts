import { BasePlugin, PluginManifest, PluginTool } from "@phantasy/plugin-base";

export class InstagramPlugin extends BasePlugin {
  readonly name = "instagram";
  readonly version = "1.0.0";

  getManifest(): PluginManifest {
    return { name: this.name, version: this.version, description: "Instagram integration for posting media and stories", author: "Phantasy", license: "BUSL-1.1", repository: "https://github.com/phantasy-bot/plugin-instagram", category: "social", isPlatform: true };
  }
  getTools(): PluginTool[] { return []; }
  async initialize(): Promise<void> {}
}
export default InstagramPlugin;
