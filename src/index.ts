import { Options, Result, ResultKeys } from "./types";

export const BASE_URL = "https://github.com/login/oauth/authorize";

export function oauthAuthorizationUrl(options: Options): Result {
  const scopesNormalized =
    typeof options.scopes === "string"
      ? options.scopes.split(/[,\s]+/).filter(Boolean)
      : Array.isArray(options.scopes)
      ? options.scopes
      : [];

  const result: Result = {
    allowSignup: options.allowSignup === false ? false : true,
    clientId: options.clientId,
    login: options.login || null,
    redirectUrl: options.redirectUrl || null,
    scopes: scopesNormalized,
    state:
      options.state ||
      Math.random()
        .toString(36)
        .substr(2),
    url: ""
  };
  result.url = urlBuilderAuthorize(BASE_URL, result);

  return result;
}

function urlBuilderAuthorize(base: string, options: Result) {
  const map = {
    allowSignup: "allow_signup",
    clientId: "client_id",
    login: "login",
    redirectUrl: "redirect_uri",
    scopes: "scope",
    state: "state"
  };

  let url = base;

  Object.entries(options)
    .filter(([k, v]) => v !== null && k !== "url") // Filter out keys that are null and remove the url key
    .filter(([, v]) => (Array.isArray(v) ? v.length !== 0 : true)) // Filter out empty Array
    .map(([key]) => [map[key as ResultKeys], `${options[key as ResultKeys]!}`]) // Map Array with the proper URL parameter names and change the value to a string using template strings
    .forEach(([key, value], index) => {
      // Finally, build the URL
      url += index === 0 ? `?` : "&";
      url += `${key}=${value}`;
    });
  return url;
}
