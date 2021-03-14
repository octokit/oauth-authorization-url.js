import { ClientType, Options, Result } from "./types";

export function oauthAuthorizationUrl<
  TClientType extends ClientType = "oauth-app"
>(options: Options<TClientType>): Result<TClientType> {
  const scopesNormalized =
    typeof options.scopes === "string"
      ? options.scopes.split(/[,\s]+/).filter(Boolean)
      : Array.isArray(options.scopes)
      ? options.scopes
      : [];

  const clientType = options.clientType || "oauth-app";
  const baseUrl = options.baseUrl || "https://github.com";
  const common = {
    allowSignup: options.allowSignup === false ? false : true,
    clientId: options.clientId,
    login: options.login || null,
    redirectUrl: options.redirectUrl || null,
    state: options.state || Math.random().toString(36).substr(2),
    url: "",
  };

  const result =
    clientType === "oauth-app"
      ? {
          ...common,
          clientType: "oauth-app",
          scopes: scopesNormalized,
        }
      : {
          ...common,
          clientType: "github-app",
        };

  result.url = urlBuilderAuthorize(`${baseUrl}/login/oauth/authorize`, result);

  return result as Result<TClientType>;
}

function urlBuilderAuthorize(
  base: string,
  options: Record<string, unknown>
): string {
  const map = {
    allowSignup: "allow_signup",
    clientId: "client_id",
    login: "login",
    redirectUrl: "redirect_uri",
    scopes: "scope",
    state: "state",
  };

  let url = base;

  Object.keys(map)
    .filter((k) => options[k] !== null) // Filter out keys that are null and remove the url key
    .filter((k) => {
      if (k !== "scopes") return true;
      if (options.clientType === "github-app") return false;

      return !Array.isArray(options[k]) || (options[k] as string[]).length > 1;
    }) // Filter out empty scopes array
    // @ts-ignore
    .map((key) => [map[key], `${options[key]}`]) // Map Array with the proper URL parameter names and change the value to a string using template strings
    .forEach(([key, value], index) => {
      // Finally, build the URL
      url += index === 0 ? `?` : "&";
      url += `${key}=${value}`;
    });

  return url;
}
