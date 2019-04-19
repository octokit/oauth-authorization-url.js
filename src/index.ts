export interface Options {
  clientId: string

  allowSignup?: boolean
  login?: string
  scopes?: string | string[]
  redirectUrl?: string
  state?: string
  log?: {
    [key: string]: (message: string) => void
  }
}

export interface Result {
  allowSignup: boolean,
  clientId: string,
  login: string | null,
  redirectUrl: string | null,
  scopes: string[],
  state: string,
  url: string
}

export const BASE_URL = 'https://github.com/login/oauth/authorize'

export function oauthLoginUrl (options: Options): Result {
  const scopesNormalized = typeof options.scopes === 'string'
    ? options.scopes.split(/[,\s]+/).filter(Boolean)
    : Array.isArray(options.scopes) ? options.scopes : []

  const result: Result = {
    allowSignup: options.allowSignup === false ? false : true,
    clientId: options.clientId,
    login: options.login || null,
    redirectUrl: options.redirectUrl || null,
    scopes: scopesNormalized,
    state: options.state || Math.random().toString(36).substr(2),
    url: ''
  }
  result.url = urlBuilderAuthorize(BASE_URL, result)

  return result
}
type ResultKeys = Exclude<keyof Result, 'url'>
function urlBuilderAuthorize (base: string, options: Result) {
  const nonNullKeys = Object.keys(options).filter(e => options[e as keyof Result] !== null)
  const map = {
    allowSignup: 'allow_signup',
    clientId: 'client_id',
    login: 'login',
    redirectUrl: 'redirect_url',
    scopes: 'scopes',
    state: 'state',
  }
  let url = `${base}`
  nonNullKeys.forEach((value, index) => {
    url += index === 0 ? '?' : '&'
    url += `${map[value as ResultKeys]}=${options[value as ResultKeys]}`
  })
  return url
}
