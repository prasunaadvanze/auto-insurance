import { Configuration, LogLevel, RedirectRequest } from "@azure/msal-browser";

const tenantName = process.env.NEXT_PUBLIC_AZURE_TENANT_NAME ?? "gainscopoc";
const tenantId =
  process.env.NEXT_PUBLIC_AZURE_TENANT_ID ??
  "61eccce8-3b49-4b13-a9ba-c125cc0ef7fc";
const clientId =
  process.env.NEXT_PUBLIC_AZURE_CLIENT_ID ??
  "7f25367b-914c-463e-b41a-87d81f5cb45b";
const redirectUri =
  process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI ?? "http://localhost:3000";

/** Linked to the app in Azure Portal (not used in authority URL for CIAM). */
export const userFlowName =
  process.env.NEXT_PUBLIC_AZURE_USER_FLOW ?? "signupsignin";

/**
 * Entra External ID (CIAM) authority — tenant GUID only.
 * User flows (e.g. signupsignin) are linked to the app in Azure Portal,
 * not appended to this URL (unlike legacy Azure AD B2C policies).
 */
export function buildAuthority(): string {
  return `https://${tenantName}.ciamlogin.com/${tenantId}`;
}

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: buildAuthority(),
    knownAuthorities: [`${tenantName}.ciamlogin.com`],
    redirectUri,
    postLogoutRedirectUri: redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      loggerCallback: (_level, message, containsPii) => {
        if (containsPii) return;
        if (process.env.NODE_ENV === "development") {
          console.warn("[MSAL]", message);
        }
      },
    },
  },
};

function parseScopes(): string[] {
  const raw = process.env.NEXT_PUBLIC_AZURE_SCOPES;
  if (raw?.trim()) {
    return raw.split(/[\s,]+/).filter(Boolean);
  }

  const apiScope = process.env.NEXT_PUBLIC_AZURE_API_SCOPE;
  const scopes = ["openid", "profile", "offline_access"];
  if (apiScope) {
    scopes.push(apiScope);
  }
  return scopes;
}

export const loginRequest: RedirectRequest = {
  scopes: parseScopes(),
};
