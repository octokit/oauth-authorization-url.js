# oauth-login-url.js

> Universal library to retrieve GitHub’s identity URL for the OAuth web flow

[![@latest](https://img.shields.io/npm/v/@octokit/oauth-login-url.svg)](https://www.npmjs.com/package/@octokit/oauth-login-url)
[![Build Status](https://travis-ci.com/octokit/oauth-login-url.js.svg?branch=master)](https://travis-ci.com/octokit/oauth-login-url.js)
[![Greenkeeper](https://badges.greenkeeper.io/octokit/oauth-login-url.js.svg)](https://greenkeeper.io/)

See [GitHub’s Developer Guide for the OAuth web application flow](https://developer.github.com/enterprise/2.16/apps/building-oauth-apps/authorizing-oauth-apps/#1-request-a-users-github-identity).

## Usage

### Browsers

```html
<script type="module">
  import { oauthLoginUrl } from 'https://unpkg.com/@octokit/oauth-login-url';

  // get login URL
  const { url } = oauthLoginUrl({
    clientId: '1234567890abcdef1234'
  })

  // redirect to login page
  location.href = url
</script>
```

### Node

```js
const { oauthLoginUrl } = require('@octokit/oauth-login-url')
// or: import { oauthLoginUrl } from '@octokit/oauth-login-url'

// get login URL
const { url } = oauthLoginUrl({
  clientId: '1234567890abcdef1234'
})

// do something with the url :)
```

### Full usage example

```js
const { 
  url,
  clientId,
  redirectUri,  
  login,
  scopes,
  state
} = oauthLoginUrl({
  clientId: '1234567890abcdef1234',
  redirectUri: 'https://example.com',
  login: 'octocat',
  scopes: ['repo', 'admin:org'],
  state: 'secret123',
  log: {
    warn (message) {
      myLogger.log(message, { level: 'warn' })
    }
  }
})
```

Override or set default options

```js
const myLogin = login.defaults({
  baseUrl: 'https://github.my-enterprise.com',
  defaultRedirectUri: 'https://app.my-enterprise.com',
  client: '1234567890abcdef1234'
})

location.href = oauthLoginUrl().url
```

## Options

<table>
  <thead align=left>
    <tr>
      <th width=200>
        name
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>clientId</code>
      </th>
      <td>
        <strong>Required</strong>. The client ID you received from GitHub when you registered.
      </td>
    </tr>
    <tr>
      <th>
        <code>redirectUri</code>
      </th>
      <td>
        The URL in your application where users will be sent after authorization. See <a href="https://developer.github.com/enterprise/2.16/apps/building-oauth-apps/authorizing-oauth-apps/#redirect-urls">Redirect URLs</a> in GitHub’s Developer Guide.
      </td>
    </tr>
    <tr>
      <th>
        <code>login</code>
      </th>
      <td>
        Suggests a specific account to use for signing in and authorizing the app.
      </td>
    </tr>
    <tr>
      <th>
        <code>scopes</code>
      </th>
      <td>
        An array of scope names (or: space-delimited list of scopes). If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
      </td>
    </tr>
    <tr>
      <th>
        <code>state</code>
      </th>
      <td>
        An unguessable random string. It is used to protect against cross-site request forgery attacks.
        Defaults to <code>Math.random().toString(36).substr(2)</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>allowSignup</code>
      </th>
      <td>
        Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is <code>true</code>. Use <code>false</code> in the case that a policy prohibits signups.
      </td>
    </tr>
    <tr>
      <th>
        <code>log</code>
      </th>
      <td>
        When invalid options are passed, warnings are logged using <code>log.warn(message)</code>. Defaults to <a href="https://developer.mozilla.org/en-US/docs/Web/API/console"><code>console</code></a>.
      </td>
    </tr>
    <tr>
      <th>
        <code>baseUrl</code>
      </th>
      <td>
        When using GitHub Enterprise Server, set the baseUrl to the origin, e.g. <code>https://github.my-enterprise.com/</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>defaultRedirectUri</code>
      </th>
      <td>
        Set to the redirect URL as defined in your OAuth app. When a <code>redirectUri</code> is passed which does not include <code>defaultRedirectUri</code>, an error is thrown.
      </td>
    </tr>
  </tbody>
</table>

## Result

`oauthLoginUrl()` returns an object with the following properties

<table>
  <thead align=left>
    <tr>
      <th width=200>
        name
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>allowSignup</code>
      </th>
      <td>
        Returns <code>options.allowSignup</code> if it was set. Defaults to <code>true</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientId</code>
      </th>
      <td>
        Returns <code>options.clientId</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>login</code>
      </th>
      <td>
        Returns <code>options.login</code> if it was set. Defaults to <code>null</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>redirectUri</code>
      </th>
      <td>
        Returns <code>options.redirectUri</code> if it was set. Defaults to <code>options.defaultRedirectUri</code> if it was set, otherwise <code>null</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>scopes</code>
      </th>
      <td>
        Always returns an array of strings. Returns <code>options.scopes</code> if it was set and turns the string into an array if a string was passed. Defaults to <code>[]</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>state</code>
      </th>
      <td>
        Returns <code>options.state</code> if it was set. Defaults to <code>Defaults to <code>Math.random().toString(36).substr(2)</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>url</code>
      </th>
      <td>
        The authorization URL
      </td>
    </tr>
  </tbody>
</table>

## License

[MIT](LICENSE)