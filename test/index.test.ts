import { oauthLoginUrl } from '../src/index'

beforeAll(() => {
  Math.random = jest.fn(() => 0.123)
});

// afterAll(() => {
//   Math.random.mockRestore()
// });

test('oauthLoginUrl({clientId: "1234567890abcdef1234"})', () => {
  expect(oauthLoginUrl({
    clientId: '1234567890abcdef1234'
  })).toEqual({
    allowSignup: true,
    clientId: '1234567890abcdef1234',
    login: null,
    redirectUrl: null,
    scopes: [],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})

test('oauthLoginUrl({clientId: "4321fedcba0987654321"})', () => {
  expect(oauthLoginUrl({
    clientId: '4321fedcba0987654321'
  })).toEqual({
    allowSignup: true,
    clientId: '4321fedcba0987654321',
    login: null,
    redirectUrl: null,
    scopes: [],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=4321fedcba0987654321'
  })
})

test('redirectUrl option', () => {
  expect(oauthLoginUrl({
    clientId: '1234567890abcdef1234',
    redirectUrl: 'https://example.com'
  })).toEqual({
    allowSignup: true,
    clientId: '1234567890abcdef1234',
    login: null,
    redirectUrl: 'https://example.com',
    scopes: [],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})

test('login option', () => {
  expect(oauthLoginUrl({
    clientId: '1234567890abcdef1234',
    login: 'octocat'
  })).toEqual({
    allowSignup: true,
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    redirectUrl: null,
    scopes: [],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})

test('scopes = []', () => {
  expect(oauthLoginUrl({
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    scopes: []
  })).toEqual({
    allowSignup: true,
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    redirectUrl: null,
    scopes: [],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})

test('scopes = ""', () => {
  expect(oauthLoginUrl({
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    scopes: ''
  })).toEqual({
    allowSignup: true,
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    redirectUrl: null,
    scopes: [],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})

test('scopes = "user,public_repo, gist notifications"', () => {
  expect(oauthLoginUrl({
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    scopes: 'user,public_repo, gist notifications'
  })).toEqual({
    allowSignup: true,
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    redirectUrl: null,
    scopes: ['user', 'public_repo', 'gist', 'notifications'],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})

test('allowSignup = false', () => {
  expect(oauthLoginUrl({
    allowSignup: false,
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    scopes: 'user,public_repo, gist notifications'
  })).toEqual({
    allowSignup: false,
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    redirectUrl: null,
    scopes: ['user', 'public_repo', 'gist', 'notifications'],
    state: '4feornbt361',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})

test('state = Sjn2oMwNFZPiVm6Mtjn2o9b3xxZ4sVEI', () => {
  expect(oauthLoginUrl({
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    state: 'Sjn2oMwNFZPiVm6Mtjn2o9b3xxZ4sVEI'
  })).toEqual({
    allowSignup: true,
    clientId: '1234567890abcdef1234',
    login: 'octocat',
    redirectUrl: null,
    scopes: [],
    state: 'Sjn2oMwNFZPiVm6Mtjn2o9b3xxZ4sVEI',
    url: 'https://github.com/login/oauth/authorize?client_id=1234567890abcdef1234'
  })
})
