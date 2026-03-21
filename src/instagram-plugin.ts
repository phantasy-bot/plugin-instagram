import {
  BasePlugin,
  type PluginConfig,
  type PluginTool,
} from "@phantasy/agent/plugins";

type InstagramPluginConfig = PluginConfig & {
  accessToken?: string;
  appId?: string;
  appSecret?: string;
  accountId?: string;
  username?: string;
};

function jsonResponse(body: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function getTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function describeInstagramConfig(config: InstagramPluginConfig) {
  const accessToken = getTrimmedString(config.accessToken);
  const username = getTrimmedString(config.username);
  const accountId = getTrimmedString(config.accountId);
  const appId = getTrimmedString(config.appId);

  const configured = Boolean(accessToken && accountId);

  return {
    configured,
    accessTokenConfigured: Boolean(accessToken),
    username: username || null,
    accountId: accountId || null,
    appId: appId || null,
    error: configured
      ? undefined
      : "Set an Instagram access token and account ID before using this integration.",
  };
}

export class InstagramPlugin extends BasePlugin {
  name = "instagram";
  version = "0.1.0";
  description = "Instagram publishing integration for Phantasy.";

  protected displayName = "Instagram";
  protected category = "social";
  protected tags = ["instagram", "social", "creator", "content"];
  protected permissions = ["internet"];
  protected workspace = "business" as const;
  protected extensionKind = "integration" as const;
  protected adminSurface = {
    tabId: "instagram",
    label: "Instagram",
    section: "business",
    workspace: "business",
    kind: "generic",
    keywords: ["instagram", "social", "creator", "content"],
    dashboardIcon: "instagram",
  } as const;
  protected configSchema = {
    type: "object",
    properties: {
      enabled: { type: "boolean", default: true },
      accessToken: { type: "string" },
      appId: { type: "string" },
      appSecret: { type: "string" },
      accountId: { type: "string" },
      username: { type: "string" },
    },
  };

  getTools(): PluginTool[] {
    return [];
  }

  async handleCustomEndpoint(
    request: Request,
    path: string,
  ): Promise<Response | null> {
    const status = describeInstagramConfig(this.getConfig() as InstagramPluginConfig);

    if (path === "/status" && request.method === "GET") {
      return jsonResponse({
        enabled: this.isEnabled(),
        ...status,
      });
    }

    if (path === "/test" && request.method === "POST") {
      if (!status.configured) {
        return jsonResponse(
          {
            success: false,
            error: status.error,
          },
          400,
        );
      }

      return jsonResponse({
        success: true,
        message: "Instagram integration is configured.",
        ...status,
      });
    }

    return null;
  }
}

export default InstagramPlugin;
