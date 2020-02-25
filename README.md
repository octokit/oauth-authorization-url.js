# oauth-authorization-url.js

> Universal library to retrieve GitHub’s identity URL for the OAuth web flow

[![@latest](https://img.shields.io/npm/v/@octokit/oauth-authorization-url.svg)](https://www.npmjs.com/package/@octokit/oauth-authorization-url)
[![Build Status](https://travis-ci.com/octokit/oauth-authorization-url.js.svg?branch=master)](https://travis-ci.com/octokit/oauth-authorization-url.js)
[![Greenkeeper](https://badges.greenkeeper.io/octokit/oauth-authorization-url.js.svg)](https://greenkeeper.io/)

See [GitHub’s Developer Guide for the OAuth web application flow](https://developer.github.com/enterprise/2.16/apps/building-oauth-apps/authorizing-oauth-apps/#1-request-a-users-github-identity).

## Usage

<table>
  <tbody valign=top align=left>
    <tr>
      <th>
        Browsers
      </th>
      <td width=100%>
  
Load `@octokit/oauth-authorization-url` directly from [cdn.pika.dev](https://cdn.pika.dev)

```html
<script type="module">
  import { oauthAuthorizationUrl } from "https://cdn.pika.dev/@octokit/oauth-authorization-url";
</script>
```

</td></tr>
    <tr>
      <th>
        Node
      </th>
      <td>

Install with <code>npm install @octokit/oauth-authorization-url</code>

```js
const { oauthAuthorizationUrl } = require("@octokit/oauth-authorization-url");
// or: import { oauthAuthorizationUrl } from "@octokit/oauth-authorization-url";
```

</td></tr>
</tbody>
</table>

```js
const {
  url,
  clientId,
  redirectUrl,
  login,
  scopes,
  state
} = oauthAuthorizationUrl({
  clientId: "1234567890abcdef1234",
  redirectUrl: "https://example.com",
  login: "octocat",
  scopes: ["repo", "admin:org"],
  state: "secret123"
});
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
        <code>redirectUrl</code>
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
        <code>baseUrl</code>
      </th>
      <td>
        When using GitHub Enterprise Server, set the baseUrl to the origin, e.g. <code>https://github.my-enterprise.com/</code>.
      </td>
    </tr>
  </tbody>
</table>

## Result

`oauthAuthorizationUrl()` returns an object with the following properties

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
        <code>redirectUrl</code>
      </th>
      <td>
        Returns <code>options.redirectUrl</code> if it was set. Defaults to <code>null</code>.
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
