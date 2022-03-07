<p align="center">
  <a href="https://github.com/plasmo-corp/gh-action-template/actions">
    <img alt="typescript-action status" src="https://github.com/plasmo-corp/gat/actions/workflows/pr-test.yml/badge.svg">
  </a>
</p>

# 🍦 Soft Secret

Inject client-side tokens (public access token, anon api keys, client ids) into the build step. DO NOT inject server-side keys or private secrets.

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
