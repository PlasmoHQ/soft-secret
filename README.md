<p align="center">
  <a href="https://github.com/plasmo-corp/soft-secret/actions">
    <img alt="typescript-action status" src="https://github.com/plasmo-corp/soft-secret/actions/workflows/deploy-v.yml/badge.svg">
  </a>
</p>

# 🍦 Soft Secret

Inject client-side tokens (public access token, anon api keys, client ids) into the build step. DO NOT inject server-side keys or private secrets.

## Why?

1. Developers want to keep config separated from the code.
2. Rotating a client tokens/ids/keys should not require a source code push.
3. Make it easier to reuse the same application code for a new project.

This action allows developer to store their configuration in a remote file, in a github secret, or in the action declaration itself (CI layer).

## Security through obscrurity?

Not the case. The client-side tokens mentioned here were meant to be bundled into client-side code anyway. DO NOT use this action to inject private keys!

## Disclaimer

**It is your responsibility for leaked secrets and credentials. Please audit this action closely before deploying it to production to ensure it is not tampering with your keys.**

## Usage

```yaml
steps:
  - uses: plasmo-corp/soft-secret@v1
    with:
      secret: ${{ secrets.TEST }}
      target: "core/test/key.ts"
```

You can also host the keys in a publicly accessible location, and specify a `fetch` argument. This will let the action know to treat secret as an url, and fetch it:

```yaml
steps:
  - uses: plasmo-corp/soft-secret@v1
    with:
      secret: https://github.com/plasmo-corp/soft-secret/releases/download/test/key.json
      target: "deep/path/key.json"
      fetch: "true"
```

See [action.yml](./action.yml) for more details about arguments and their aliases.

# License

[MIT](./license) ⭐ [Plasmo Corp.](https://plasmo.com)
