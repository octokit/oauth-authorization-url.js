export interface Options {
  clientId: string;

  allowSignup?: boolean;
  login?: string;
  scopes?: string | string[];
  redirectUrl?: string;
  state?: string;
}

export interface Result {
  allowSignup: boolean;
  clientId: string;
  login: string | null;
  redirectUrl: string | null;
  scopes: string[];
  state: string;
  url: string;
}

export type ResultKeys = Exclude<keyof Result, "url">;
