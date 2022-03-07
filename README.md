<p align="center">
  <a href="https://github.com/plasmo-corp/gh-action-template/actions">
    <img alt="typescript-action status" src="https://github.com/plasmo-corp/gat/actions/workflows/pr-test.yml/badge.svg">
  </a>
</p>

# Plasmo Github Action Template

Use this template to bootstrap new github action.

## Usage

```yaml
steps:
  - uses: plasmo-corp/gh-action-template@v1
    with:
      milliseconds: "2000"
```

## CI guideline

1. When PR from a feature branch to `main`, the [deploy-staging](./.github/workflows/deploy-staging.yml) workflow will be triggered: It deploy the compiled action to the `staging` branch and run test on it.
2. When pushed to `main` branch, the [deploy-v](./.github/workflows/deploy-v.yml) workflow will be triggered: It force push staging into v\* branch (configured via the action's environment variable), and ensure the integrity of the deployment after force push.
