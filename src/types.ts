export type ClientType = "oauth-app" | "github-app";

export type OAuthAppOptions<TClientType extends "oauth-app"> = {
  clientId: string;

  clientType?: TClientType;
  allowSignup?: boolean;
  login?: string;
  scopes?: string | string[];
  redirectUrl?: string;
  state?: string;
  baseUrl?: string;
};

export type GitHubAppOptions<TClientType extends "github-app"> = {
  clientId: string;

  clientType: TClientType;
  /** `scopes` are not permitted for GitHub Apps */
  scopes?: never;
  allowSignup?: boolean;
  login?: string;
  redirectUrl?: string;
  state?: string;
  baseUrl?: string;
};

export type Options<
  TClientType extends ClientType
> = TClientType extends "oauth-app"
  ? OAuthAppOptions<TClientType>
  : TClientType extends "github-app"
  ? GitHubAppOptions<TClientType>
  : never;

type OAuthAppResult<TClientType extends "oauth-app"> = {
  allowSignup: boolean;
  clientId: string;
  clientType: TClientType;
  login: string | null;
  redirectUrl: string | null;
  scopes: string[];
  state: string;
  url: string;
};
type GitHubAppResult<TClientType extends "github-app"> = {
  allowSignup: boolean;
  clientId: string;
  clientType: TClientType;
  login: string | null;
  redirectUrl: string | null;
  state: string;
  url: string;
};

export type Result<
  TClientType extends ClientType
> = TClientType extends "oauth-app"
  ? OAuthAppResult<TClientType>
  : TClientType extends "github-app"
  ? GitHubAppResult<TClientType>
  : never;
